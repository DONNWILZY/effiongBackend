class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode || 500;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  const createError = (message, statusCode) => {
    return new CustomError(message, statusCode);
  };
  
  module.exports = createError;
  