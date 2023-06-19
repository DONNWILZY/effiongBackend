const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
///////////// ADDING AUTHOR FROM User model
    username: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //required: true
    },

    title: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true
    },
    photos: [{
      type: String,
    }],

    featured: {
      type: Boolean,
      default: false,
    },

    tags: [{
      type: String,
    }],

    category: [{
      type: String
    }],
  },
  {
    timestamps: true
  }
);


///////////// SPECIFY FIELD AUTHOR FROM User model
BlogSchema.virtual('userName', {
  ref: 'User',
  localField: ['username'],
  foreignField: ['username'],
  justOne: true
});

BlogSchema.set('toObject', { virtuals: true });
BlogSchema.set('toJSON', { virtuals: true });



const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
