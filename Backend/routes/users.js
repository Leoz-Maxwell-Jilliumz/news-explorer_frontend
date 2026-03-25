const router = require('express').Router();

const auth = require('../middlewares/auth');
const {
	createUser,
	login,
	getCurrentUser,
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/users/me', auth, getCurrentUser);

module.exports = router;