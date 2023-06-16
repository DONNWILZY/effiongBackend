const cron = require('node-cron');
const User = require('../../models/user/User');
const mailer = require('../../utility/mailer');
const createError = require('../../utility/createError');

const updateBirthday = async (req, res, next) => {
  const { userId } = req.params;
  const { birthday } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { birthday },
      { new: true }
    );

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).json({ message: 'Birthday updated successfully', user });
  } catch (error) {
    next(createError(500, 'Internal server error'));
  }
};


const sendBirthdayEmails = async () => {
  try {
    // Find all users whose birthday is today
    const today = new Date();
    const users = await User.find({
      birthday: {
        $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      },
    });

    /*
    // Configure the email transport
    const transporter = nodemailer.createTransport({
      // Configure your email transport options here (e.g., SMTP, Gmail, etc.)
    });
*/


    // Send birthday emails to each user
    users.forEach(async (user) => {
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: user.email,
        subject: 'Happy Birthday!',
        text: `Dear ${user.username},\n\nHappy birthday! Wishing you a fantastic day filled with joy and happiness.\n\nBest regards,\nYour Application`,
      };

      // Send the email
      await mailer.sendMail(mailOptions);
    });

    console.log('Birthday emails sent successfully.');
  } catch (error) {
    console.error('Error sending birthday emails:', error);
  }
};

// Schedule the task to run every day at a specific time (e.g., 8:00 AM)
cron.schedule('0 8 * * *', sendBirthdayEmails);




module.exports = { updateBirthday, sendBirthdayEmails };














//module.exports = default