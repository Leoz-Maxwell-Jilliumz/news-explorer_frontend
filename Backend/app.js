const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const errorHandler = require('./middlewares/errorHandler');
const { apiLimiter } = require('./middlewares/rateLimit');

const { MONGO_URI = 'mongodb://127.0.0.1:27017/news-explorer', PORT = 3001 } = process.env;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(apiLimiter);

app.use('/', usersRouter);
app.use('/articles', articlesRouter);

// Catch-all for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  });