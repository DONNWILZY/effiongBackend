const mongoose = require('mongoose');

const SiteInfoSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    watermark: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);


SiteInfoSchema.pre('save', function (next) {
  const SiteInfo = mongoose.model('SiteInfo', SiteInfoSchema);

  SiteInfo.countDocuments({})
    .then((count) => {
      if (count > 0) {
        throw new Error('Creating new SiteInfo document is not allowed');
      }
      next();
    })
    .catch((err) => {
      next(err);
    });
});

const SiteInfo = mongoose.model('SiteInfo', SiteInfoSchema);

module.exports = SiteInfo;
