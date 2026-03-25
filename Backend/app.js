const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/news-explorer');

app.use('/', usersRouter);
app.use('/articles', articlesRouter);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});