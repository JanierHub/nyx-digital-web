import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

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
// @desc    Create a new review
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, text } = req.body;
    
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
    
    badWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredName = filteredName.replace(regex, '***');
      filteredText = filteredText.replace(regex, '***');
    });
    
    const review = await Review.create({
      name: filteredName,
      text: filteredText
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
      message: 'Failed to create review'
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
