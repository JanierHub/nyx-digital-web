import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { sendContactEmail, sendConfirmationEmail } from '../utils/emailService.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Create a new contact submission
// @access  Public
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone number cannot exceed 20 characters'),
  body('company').optional().trim().isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters'),
  body('service').isIn(['web-development', 'mobile-app', 'ui-ux', 'consulting', 'other']).withMessage('Invalid service type'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
  body('budget').optional().isIn(['<1000', '1000-5000', '5000-10000', '10000-25000', '>25000']).withMessage('Invalid budget range'),
  body('timeline').optional().isIn(['asap', '1-2-months', '3-6-months', '6+months']).withMessage('Invalid timeline')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const contactData = {
      ...req.body,
      source: 'website',
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };

    // Create contact submission
    const contact = new Contact(contactData);
    await contact.save();

    // Send email notifications
    try {
      await sendContactEmail(contact);
      await sendConfirmationEmail(contact);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      status: 'success',
      message: 'Contact form submitted successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        service: contact.service,
        status: contact.status
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to submit contact form'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (admin only)
// @access  Private (would need auth middleware)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, service, search } = req.query;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (service) filter.service = service;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('assignedTo', 'name email');

    const total = await Contact.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        contacts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve contacts'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact submission
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.createdBy', 'name');

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    res.json({
      status: 'success',
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve contact'
    });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact submission
// @access  Private
router.put('/:id', [
  body('status').optional().isIn(['new', 'contacted', 'in-progress', 'completed', 'cancelled']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('assignedTo').optional().isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Contact updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update contact'
    });
  }
});

// @route   POST /api/contact/:id/notes
// @desc    Add note to contact
// @access  Private
router.post('/:id/notes', [
  body('content').trim().isLength({ min: 1, max: 500 }).withMessage('Note must be between 1 and 500 characters'),
  body('createdBy').isMongoId().withMessage('Valid user ID required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    contact.notes.push(req.body);
    await contact.save();

    // Populate the new note
    await contact.populate('notes.createdBy', 'name');

    const newNote = contact.notes[contact.notes.length - 1];

    res.status(201).json({
      status: 'success',
      message: 'Note added successfully',
      data: newNote
    });

  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add note'
    });
  }
});

export default router;
