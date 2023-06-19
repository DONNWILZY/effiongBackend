const cron = require('node-cron');
const User = require('../../models/user/User');
const mailer = require('../../utility/mailer');
const emailUsers = require('../../models/user/EmailUsers.js')
const createError = require('../../utility/createError');
//const { transporter } = require('../../utility/mailer');

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

    // Send birthday emails to each user
    for (const user of users) {
      try {
        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: req.body.email,
          subject: 'Happy Birthday!',
          html: `
            <p>Dear ${user.username},\n\nHappy birthday! Wishing you a fantastic day filled with joy and happiness.\n\nBest regards,\nYour Application</p>
          `,
        };

        // Send the email
        await mailer.sendMail(mailOptions);
        console.log(`Birthday email sent successfully to ${user.email}`);
      } catch (error) {
        console.error(`Error sending birthday email to ${user.email}:`, error);
      }
    }

    console.log('Birthday emails sent successfully.');
  } catch (error) {
    console.error('Error sending birthday emails:', error);
  }
 
};

// Schedule the task to run every day at a specific time (e.g., 8:00 AM)
cron.schedule('28 22 * * *', sendBirthdayEmails);
console.log('h')


/*
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

   

    // Send birthday emails to each user
    users.forEach(async (user) => {
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: user.email,
        subject: 'Happy Birthday!',
        html: `
        <p>Dear ${user.username},\n\nHappy birthday! Wishing you a fantastic day filled with joy and happiness.\n\nBest regards,\nYour Application</p>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    console.log('Birthday emails sent successfully.');
  } catch (error) {
    console.error('Error sending birthday emails:', error);
  }
};

// Schedule the task to run every day at a specific time (e.g., 8:00 AM)
cron.schedule('37 21 * * *', sendBirthdayEmails);

*/


module.exports = { updateBirthday, sendBirthdayEmails };














//module.exports = default