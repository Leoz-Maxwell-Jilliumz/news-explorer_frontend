const mongoose = require('mongoose');
const validator = require('validator');

const { BadRequestError } = require('../errors');

const ensureNonEmptyString = (value, fieldName, { min, max } = {}) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new BadRequestError(`${fieldName} is required`);
  }

  const normalizedValue = value.trim();

  if (min && normalizedValue.length < min) {
    throw new BadRequestError(`${fieldName} must be at least ${min} characters`);
  }

  if (max && normalizedValue.length > max) {
    throw new BadRequestError(`${fieldName} must be at most ${max} characters`);
  }

  return normalizedValue;
};

const ensureEmail = (value) => {
  const email = ensureNonEmptyString(value, 'Email');

  if (!validator.isEmail(email)) {
    throw new BadRequestError('Email must be valid');
  }

  return email;
};

const ensureUrl = (value, fieldName) => {
  const url = ensureNonEmptyString(value, fieldName);

  if (!validator.isURL(url, { require_protocol: true })) {
    throw new BadRequestError(`${fieldName} must be a valid URL`);
  }

  return url;
};

const validateSignup = (req, res, next) => {
  try {
    req.body.name = ensureNonEmptyString(req.body.name, 'Name', { min: 2, max: 30 });
    req.body.email = ensureEmail(req.body.email);
    req.body.password = ensureNonEmptyString(req.body.password, 'Password', { min: 8, max: 128 });
    return next();
  } catch (error) {
    return next(error);
  }
};

const validateSignin = (req, res, next) => {
  try {
    req.body.email = ensureEmail(req.body.email);
    req.body.password = ensureNonEmptyString(req.body.password, 'Password', { min: 8, max: 128 });
    return next();
  } catch (error) {
    return next(error);
  }
};

const validateProfileUpdate = (req, res, next) => {
  try {
    const hasName = req.body.name !== undefined;
    const hasEmail = req.body.email !== undefined;

    if (!hasName && !hasEmail) {
      throw new BadRequestError('Provide at least one field: name or email');
    }

    if (hasName) {
      req.body.name = ensureNonEmptyString(req.body.name, 'Name', { min: 2, max: 30 });
    }

    if (hasEmail) {
      req.body.email = ensureEmail(req.body.email);
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const validateCreateArticle = (req, res, next) => {
  try {
    req.body.keyword = ensureNonEmptyString(req.body.keyword, 'Keyword', { max: 100 });
    req.body.title = ensureNonEmptyString(req.body.title, 'Title', { max: 200 });
    req.body.text = ensureNonEmptyString(req.body.text, 'Text', { max: 5000 });
    req.body.date = ensureNonEmptyString(req.body.date, 'Date', { max: 100 });
    req.body.source = ensureNonEmptyString(req.body.source, 'Source', { max: 100 });
    req.body.link = ensureUrl(req.body.link, 'Link');
    req.body.image = ensureUrl(req.body.image, 'Image');
    return next();
  } catch (error) {
    return next(error);
  }
};

const validateUpdateArticle = (req, res, next) => {
  try {
    const allowedFields = ['keyword', 'title', 'text', 'date', 'source', 'link', 'image'];
    const incomingFields = Object.keys(req.body || {});

    if (incomingFields.length === 0) {
      throw new BadRequestError('Provide at least one field to update');
    }

    const hasInvalidField = incomingFields.some((field) => !allowedFields.includes(field));
    if (hasInvalidField) {
      throw new BadRequestError('Request contains unsupported fields');
    }

    if (req.body.keyword !== undefined) {
      req.body.keyword = ensureNonEmptyString(req.body.keyword, 'Keyword', { max: 100 });
    }
    if (req.body.title !== undefined) {
      req.body.title = ensureNonEmptyString(req.body.title, 'Title', { max: 200 });
    }
    if (req.body.text !== undefined) {
      req.body.text = ensureNonEmptyString(req.body.text, 'Text', { max: 5000 });
    }
    if (req.body.date !== undefined) {
      req.body.date = ensureNonEmptyString(req.body.date, 'Date', { max: 100 });
    }
    if (req.body.source !== undefined) {
      req.body.source = ensureNonEmptyString(req.body.source, 'Source', { max: 100 });
    }
    if (req.body.link !== undefined) {
      req.body.link = ensureUrl(req.body.link, 'Link');
    }
    if (req.body.image !== undefined) {
      req.body.image = ensureUrl(req.body.image, 'Image');
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const validateArticleQuery = (req, res, next) => {
  try {
    const {
      page,
      limit,
      sortBy,
      order,
      keyword,
    } = req.query;

    const allowedSortBy = ['createdAt', 'date', 'title'];
    const allowedOrder = ['asc', 'desc'];

    if (page !== undefined) {
      const parsedPage = Number(page);

      if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        throw new BadRequestError('page must be a positive integer');
      }

      req.query.page = parsedPage;
    }

    if (limit !== undefined) {
      const parsedLimit = Number(limit);

      if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 50) {
        throw new BadRequestError('limit must be an integer between 1 and 50');
      }

      req.query.limit = parsedLimit;
    }

    if (sortBy !== undefined && !allowedSortBy.includes(sortBy)) {
      throw new BadRequestError('sortBy must be one of: createdAt, date, title');
    }

    if (order !== undefined && !allowedOrder.includes(order)) {
      throw new BadRequestError('order must be asc or desc');
    }

    if (keyword !== undefined) {
      req.query.keyword = ensureNonEmptyString(keyword, 'Keyword', { max: 100 });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const validateObjectIdParam = (paramName = 'id') => (req, res, next) => {
  try {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestError(`Invalid ${paramName}`);
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  validateSignup,
  validateSignin,
  validateProfileUpdate,
  validateCreateArticle,
  validateUpdateArticle,
  validateArticleQuery,
  validateObjectIdParam,
};