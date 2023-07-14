const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
///////////// ADDING AUTHOR FROM User model
    username: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //required: true
    },

    produuctName: {
      type: String,
      required: true,
    },

    icon: {
        type: String,
      },

    desc: {
      type: String,
      required: true
    },
    images: [{
      type: String,
    }],

    featured: {
      type: Boolean,
      default: false,
    },

    price: {
        type: String,
      },
    
      status: {
        type: String,
        enum: ["pending", "appproved", 'decline'],
        default: "pending",
      },

    tags: {
      type: String,
      required: true,
    },

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



const Blog = mongoose.model('product', ProductSchema);

module.exports = Blog;
