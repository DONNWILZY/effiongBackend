const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv =  require("dotenv");


const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

/*
// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts')); 
git remote remove origin
git remote add origin https://github.com/DONNWILZY/effiongBackend


*/

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
