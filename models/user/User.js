const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: false,
    },
    
    lastName: {
      type: String,
      required: false,
    },
  
    email: {
      type: String,
      required: true,
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

    birthday: {
      type: Date
     
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isVip: {
      type: Boolean,
      default: false,
    },

    lastLogin : {
      type: String
    },

    verificationCode: {
      type: String,
    },
    
    passwordResetExpiry: {
      type: Date,
    },

    activity: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    onlineStatus: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
   
  },
  { timestamps: true }
);

module.exports  = mongoose.model("User", userSchema);

//module.exports = mongoose.model('User', UserSchema)

