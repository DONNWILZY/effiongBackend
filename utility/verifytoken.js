const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user/User.js')
const createError = require('./createError.js');
const cookieParser = require ('cookie-parser');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const app = express();
app.use(cookieParser());

// Generate a cookie value
const cookieOptions = {
  httpOnly: true, // The cookie is accessible only through the HTTP protocol
  secure: false, // The cookie is sent only over HTTPS
  maxAge: 3600, // The maximum age of the cookie in seconds (1 hour in this example)
  sameSite: 'strict', // The cookie is sent only for requests to the same site
};

const accessToken =  process.env.accessToken// Replace with your actual access token
const cookieValue = cookie.serialize('access_token', accessToken, cookieOptions);
//console.log(cookieValue);


const verifyToken = (req, res, next) => {
  const token = cookieValue;

  if (!token) {
    return next(createError(401, 'This user is not authenticated'));
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return next(createError(403, 'Token is not valid or expired'));
    }

    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (req.user.id === req.params.id || req.user.isAdmin || req.user.isVendor) {
      next();
    } else {
      return next(createError(401, 'You are not authorized'));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    isAdmin = req.body.isAdmin
    console.log(isAdmin)
    if (isAdmin = true) {
      next();
    } else {
      return next(createError(401, 'You are not an admin'));
    }
  });
};

const verifyVendor = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (req.user.isVendor) {
      next();
    } else {
      return next(createError(401, 'You are not a verified vendor'));
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
  verifyVendor,
};


