const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/news-explorer');

app.use('/signup', require('./routes/users').signup);
app.use('/signin', require('./routes/users').signin);
app.use('/users', require('./routes/users').users);
app.use('/articles', require('./routes/articles'));

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});