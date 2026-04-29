const router = require('express').Router();

const auth = require('../middlewares/auth');
const {
	validateCreateArticle,
	validateUpdateArticle,
	validateArticleQuery,
	validateObjectIdParam,
} = require('../middlewares/validateRequest');
const {
	getSavedArticles,
	createArticle,
	deleteArticle,
	updateArticle,
} = require('../controllers/articles');

router.use(auth);

router.get('/', validateArticleQuery, getSavedArticles);
router.post('/', validateCreateArticle, createArticle);
router.delete('/:id', validateObjectIdParam('id'), deleteArticle);
router.patch('/:id', validateObjectIdParam('id'), validateUpdateArticle, updateArticle);

module.exports = router;