import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  text: {
    type: String,
    required: [true, 'Please provide review text'],
    trim: true,
    maxlength: [500, 'Review cannot be more than 500 characters']
  },
  likes: {
    type: Number,
    default: 0
  },
  hidden: {
    type: Boolean,
    default: false
  },
  likedBy: [{
    type: String // Array of IP addresses or user IDs to prevent duplicate likes
  }]
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
