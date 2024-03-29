const mongoose = require('mongoose');

/////// refrencing username field from User model
const CurrentInfoSchema = new mongoose.Schema({
  // Existing fields
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  title: {
    type: String,
    default: '',
  },

  des: {
        type: String,
        required: true,
}
  ,
  currentDevice: {
    type: String,
    default: '',
  },
  deviceHistory: [
    {
      device: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
  currentIPAddress: {
    type: String,
    default: '',
  },
  ipAddressHistory: [
    {
      ipAddress: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  currentNetwork: {
    type: String,
    default: '',
  },

  networkHistory: [
    {
      network: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});


CurrentInfoSchema.virtual('userName', {
    ref: 'User',
    localField: 'username',
    foreignField: 'name',
    justOne: true
  });
  
  CurrentInfoSchema.set('toObject', { virtuals: true });
  CurrentInfoSchema.set('toJSON', { virtuals: true });

const CurrentInfo = mongoose.model('CurrentInfo', CurrentInfoSchema);

module.exports = CurrentInfo;
