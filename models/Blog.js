const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
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

    tags: [{
      type: String,
      required: true,
    }],

    category: [{
      type: String
    }],
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
