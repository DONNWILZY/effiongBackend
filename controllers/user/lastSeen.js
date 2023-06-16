const User = require('../../models/user/User');

user.lastLogin = new Date();
user.activity = 'active';
await user.save();

user.activeStatus = new Date();
user.onlineStatus = 'online';
await user.save();


 // Helper function to get the last seen status
 const getLastSeenStatus = (lastLogin) => {
    const currentTime = new Date();
    const timeDiff = currentTime - lastLogin;
  
    if (timeDiff < 60000) { // Less than 1 minute
      return 'Just now';
    } else if (timeDiff < 3600000) { // Less than 1 hour
      const minutes = Math.floor(timeDiff / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDiff < 86400000) { // Less than 1 day
      const hours = Math.floor(timeDiff / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (timeDiff < 2592000000) { // Less than 1 month
      const days = Math.floor(timeDiff / 86400000);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (timeDiff < 31536000000) { // Less than 1 year
      const months = Math.floor(timeDiff / 2592000000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else { // More than 1 year
      const years = Math.floor(timeDiff / 31536000000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
    res.status(200).json({
      status: 'success',
      message: getLastSeenStatus
    })
  };






module.exports = {}