const { AppError } = require('../errors');

// Map Mongoose/JWT error names to HTTP status codes and messages
const MONGOOSE_ERROR_MAP = {
  CastError: { status: 400, message: 'Invalid ID format' },
  ValidationError: { status: 400, message: 'Validation failed' },
  DocumentNotFoundError: { status: 404, message: 'Resource not found' },
};

const JWT_ERROR_MAP = {
  JsonWebTokenError: { status: 401, message: 'Invalid token' },
  TokenExpiredError: { status: 401, message: 'Token has expired' },
  NotBeforeError: { status: 401, message: 'Token not yet active' },
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Log unexpected errors for observability
  if (!(err instanceof AppError) && !MONGOOSE_ERROR_MAP[err.name] && !JWT_ERROR_MAP[err.name]) {
    console.error(`[${new Date().toISOString()}] Unhandled error:`, err);
  }

  // Custom application errors (thrown explicitly with new XxxError())
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      message: `Duplicate value for ${field}`,
    });
  }

  // Mongoose validation / cast errors
  if (MONGOOSE_ERROR_MAP[err.name]) {
    const { status, message } = MONGOOSE_ERROR_MAP[err.name];
    const detail =
      err.name === 'ValidationError'
        ? Object.values(err.errors)
            .map((e) => e.message)
            .join('; ')
        : null;

    return res.status(status).json({ message: detail || message });
  }

  // JWT errors
  if (JWT_ERROR_MAP[err.name]) {
    const { status, message } = JWT_ERROR_MAP[err.name];
    return res.status(status).json({ message });
  }

  // Fallback — never expose internal details in production
  const isDev = process.env.NODE_ENV !== 'production';
  return res.status(500).json({
    message: 'Internal server error',
    ...(isDev && { error: err.message, stack: err.stack }),
  });
};

module.exports = errorHandler;
