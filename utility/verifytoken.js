const jwt = require('jsonwebtoken');
const createError = require('./createError.js');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

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
    if (req.user.isAdmin) {
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
      return next(createError(401, 'You are not a hotel owner'));
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
  verifyVendor,
};


