import express from 'express';
import { body, validationResult } from 'express-validator';
import Service from '../models/Service.js';

const router = express.Router();

// @route   GET /api/services
// @desc    Get all services with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      difficulty, 
      minPrice, 
      maxPrice, 
      isPopular, 
      search,
      page = 1, 
      limit = 10,
      sortBy = 'sortOrder',
      sortOrder = 'asc'
    } = req.query;

    // Build filter
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (isPopular === 'true') filter.isPopular = true;
    
    if (minPrice || maxPrice) {
      filter['price.startingFrom'] = {};
      if (minPrice) filter['price.startingFrom'].$gte = parseFloat(minPrice);
      if (maxPrice) filter['price.startingFrom'].$lte = parseFloat(maxPrice);
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { longDescription: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const services = await Service.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Service.countDocuments(filter);

    // Get categories for filtering
    const categories = await Service.distinct('category', { isActive: true });
    const priceRange = await Service.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, min: { $min: '$price.startingFrom' }, max: { $max: '$price.startingFrom' } } }
    ]);

    res.json({
      status: 'success',
      data: {
        services,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        },
        filters: {
          categories,
          priceRange: priceRange[0] || { min: 0, max: 0 }
        }
      }
    });

  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve services'
    });
  }
});

// @route   GET /api/services/popular
// @desc    Get popular services
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true, isPopular: true })
      .sort({ sortOrder: 1 })
      .limit(6);

    res.json({
      status: 'success',
      data: services
    });

  } catch (error) {
    console.error('Get popular services error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve popular services'
    });
  }
});

// @route   GET /api/services/:slug
// @desc    Get single service by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
    }

    // Get related services
    const relatedServices = await Service.find({
      _id: { $ne: service._id },
      category: service.category,
      isActive: true
    }).limit(3);

    res.json({
      status: 'success',
      data: {
        service,
        relatedServices
      }
    });

  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve service'
    });
  }
});

// @route   POST /api/services
// @desc    Create new service
// @access  Private (admin)
router.post('/', [
  body('title').trim().isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('longDescription').trim().isLength({ min: 50, max: 2000 }).withMessage('Long description must be between 50 and 2000 characters'),
  body('category').isIn(['development', 'design', 'marketing', 'consulting']).withMessage('Invalid category'),
  body('price.startingFrom').isNumeric().withMessage('Starting price must be a number'),
  body('timeline').isIn(['1-2-weeks', '2-4-weeks', '1-2-months', '2-3-months', '3+months']).withMessage('Invalid timeline'),
  body('difficulty').optional().isIn(['basic', 'intermediate', 'advanced', 'enterprise']).withMessage('Invalid difficulty')
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

    const service = new Service(req.body);
    await service.save();

    res.status(201).json({
      status: 'success',
      message: 'Service created successfully',
      data: service
    });

  } catch (error) {
    console.error('Create service error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Service with this slug already exists'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to create service'
    });
  }
});

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Private (admin)
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 2, max: 100 }),
  body('description').optional().trim().isLength({ min: 10, max: 500 }),
  body('longDescription').optional().trim().isLength({ min: 50, max: 2000 }),
  body('category').optional().isIn(['development', 'design', 'marketing', 'consulting']),
  body('price.startingFrom').optional().isNumeric(),
  body('timeline').optional().isIn(['1-2-weeks', '2-4-weeks', '1-2-months', '2-3-months', '3+months']),
  body('difficulty').optional().isIn(['basic', 'intermediate', 'advanced', 'enterprise'])
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

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Service updated successfully',
      data: service
    });

  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update service'
    });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete service (soft delete)
// @access  Private (admin)
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete service'
    });
  }
});

// @route   GET /api/services/categories
// @desc    Get all service categories
// @access  Public
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Service.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      status: 'success',
      data: categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve categories'
    });
  }
});

export default router;
