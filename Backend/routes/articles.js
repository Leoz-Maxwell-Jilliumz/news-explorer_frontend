const router = require('express').Router();

const auth = require('../middlewares/auth');
const {
	getSavedArticles,
	createArticle,
	deleteArticle,
} = require('../controllers/articles');

router.use(auth);

router.get('/', getSavedArticles);
router.post('/', createArticle);
router.delete('/:id', deleteArticle);

module.exports = router;