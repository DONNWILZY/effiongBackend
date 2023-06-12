const mongoose = require('mongoose');

const SiteInfoSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String,
      required: true,
      unique: true
    },
    waterark: {
      type: String,
      unique: true
    },
  },
  {
    timestamps: true
  }
);

const SiteInfo = mongoose.model('SiteInfo', SiteInfoSchema);

module.exports = SiteInfo;
