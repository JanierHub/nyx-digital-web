import express from 'express';
import Review from '../models/Review.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for photo upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
  }
});

// @route   GET /api/reviews
// @desc    Get all reviews (visible ones for users, all for admin)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { admin } = req.query;
    
    // Build query
    const query = {};
    if (admin !== 'true') {
      query.hidden = false;
    }
    
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    
    res.json({
      status: 'success',
      count: reviews.length,
      data: { reviews }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get reviews'
    });
  }
});

// @route   POST /api/reviews
// @desc    Create a new review with optional photo
// @access  Public
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, text, project, rating } = req.body;
    
    if (!name || !text) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide name and text'
      });
    }
    
    // Filter bad words
    const badWords = ['puta', 'puto', 'mierda', 'verga', 'pendejo', 'pendeja', 
                      'cabrón', 'cabron', 'chingar', 'chingada', 'joder', 'coño',
                      'zorra', 'perra', 'culo', 'pene', 'vagina', 'sexo', 'porn'];
    
    let filteredName = name;
    let filteredText = text;
    let filteredProject = project || '';
    
    badWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredName = filteredName.replace(regex, '***');
      filteredText = filteredText.replace(regex, '***');
      filteredProject = filteredProject.replace(regex, '***');
    });
    
    // Convert photo to base64 if uploaded
    let photoData = null;
    if (req.file) {
      photoData = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    
    const review = await Review.create({
      name: filteredName,
      text: filteredText,
      project: filteredProject,
      rating: rating ? parseInt(rating) : 5,
      photo: photoData
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Review created successfully',
      data: { review }
    });
    
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to create review'
    });
  }
});

// @route   POST /api/reviews/:id/like
// @desc    Like a review
// @access  Public
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const clientIP = req.ip || req.connection.remoteAddress;
    
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }
    
    // Check if already liked by this IP
    if (review.likedBy.includes(clientIP)) {
      return res.status(400).json({
        status: 'error',
        message: 'Already liked'
      });
    }
    
    review.likes += 1;
    review.likedBy.push(clientIP);
    await review.save();
    
    res.json({
      status: 'success',
      message: 'Review liked',
      data: { review }
    });
    
  } catch (error) {
    console.error('Like review error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to like review'
    });
  }
});

// @route   PUT /api/reviews/:id/hide
// @desc    Toggle hide/show review (admin only)
// @access  Private/Admin
router.put('/:id/hide', async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }
    
    review.hidden = !review.hidden;
    await review.save();
    
    res.json({
      status: 'success',
      message: `Review ${review.hidden ? 'hidden' : 'shown'}`,
      data: { review }
    });
    
  } catch (error) {
    console.error('Hide review error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update review'
    });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete review (admin only)
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Review deleted'
    });
    
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete review'
    });
  }
});

export default router;
