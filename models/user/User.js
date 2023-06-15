const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },

    verified: {
      type: Boolean,
      default: false
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVip: {
      type: Boolean,
      default: false,
    },
    activity: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

module.exports  = mongoose.model("User", userSchema);

//module.exports = mongoose.model('User', UserSchema)

