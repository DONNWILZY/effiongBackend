const mongoose = require ("mongoose");

const UserVerificationSchema = new mongoose.Schema(
  {
    userid: {
      type: String
    },

    uniqueString: {
      type: String
      
    },
  },
  { timestamps: true }
);

module.exports  = mongoose.model("UserVerification", UserVerificationSchema);
module.exports = UserVerification;
//module.exports = mongoose.model('User', UserSchema)

