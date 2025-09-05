
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

 
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate Value Error',
      details: err.keyValue
    });
  }

  res.status(statusCode).json({
    message: err.message || 'Server Error',
    details: process.env.NODE_ENV === 'development' ? {
      stack: err.stack,
      name: err.name,
      code: err.code
    } : undefined
  });
};


export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
