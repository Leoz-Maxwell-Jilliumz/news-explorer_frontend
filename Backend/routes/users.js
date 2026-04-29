const router = require('express').Router();

const auth = require('../middlewares/auth');
const { authLimiter } = require('../middlewares/rateLimit');
const {
	validateSignup,
	validateSignin,
	validateProfileUpdate,
} = require('../middlewares/validateRequest');
const {
	createUser,
	login,
	getCurrentUser,
	updateProfile,
} = require('../controllers/users');

router.post('/signup', authLimiter, validateSignup, createUser);
router.post('/signin', authLimiter, validateSignin, login);
router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, validateProfileUpdate, updateProfile);

module.exports = router;