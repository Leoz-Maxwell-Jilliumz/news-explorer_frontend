const router = require('express').Router();

const auth = require('../middlewares/auth');
const { authLimiter } = require('../middlewares/rateLimit');
const {
	createUser,
	login,
	getCurrentUser,
} = require('../controllers/users');

router.post('/signup', authLimiter, createUser);
router.post('/signin', authLimiter, login);
router.get('/users/me', auth, getCurrentUser);

module.exports = router;