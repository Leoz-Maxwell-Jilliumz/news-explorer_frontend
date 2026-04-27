class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(400, message);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Authorization required') {
    super(401, message);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Access denied') {
    super(403, message);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}

class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(500, message);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
