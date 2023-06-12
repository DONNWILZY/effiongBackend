const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const bcrypt = require('bcrypt');

// Import routes
const authRoute = require('./routes/auth');


// Call dotenv function
dotenv.config();

// Middleware
app.use(cors());
app.use(morgan('dev'));
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded form bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send(`ACTIVELY ACTIVE ON PORT ${PORT}`);
  console.log(`ACTIVELY ACTIVE ON PORT ${PORT}`);
});

// Routes middlewares
app.use('/api/auth', authRoute);
//app.use('/api/users', require('./routes/users'));
//app.use('/api/posts', require('./routes/posts'));

/*
git remote remove origin
git remote add origin https://github.com/DONNWILZY/effiongBackend
*/

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
