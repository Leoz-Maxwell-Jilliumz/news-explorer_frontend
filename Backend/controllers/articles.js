const Article = require('../models/article');

const getSavedArticles = async (req, res, next) => {
	try {
		const articles = await Article.find({ owner: req.user._id });
		return res.status(200).send(articles);
	} catch (err) {
		return next(err);
	}
};

const createArticle = async (req, res, next) => {
	const {
		keyword,
		title,
		text,
		date,
		source,
		link,
		image,
	} = req.body;

	try {
		const article = await Article.create({
			keyword,
			title,
			text,
			date,
			source,
			link,
			image,
			owner: req.user._id,
		});

		return res.status(201).send(article);
	} catch (err) {
		if (err.code === 11000) {
			return res.status(409).send({ message: 'Article already saved' });
		}

		if (err.name === 'ValidationError') {
			return res.status(400).send({ message: 'Invalid article data' });
		}

		return next(err);
	}
};

const deleteArticle = async (req, res, next) => {
	try {
		const article = await Article.findById(req.params.id);

		if (!article) {
			return res.status(404).send({ message: 'Article not found' });
		}

		if (article.owner.toString() !== req.user._id) {
			return res.status(403).send({ message: 'Forbidden' });
		}

		await article.deleteOne();
		return res.status(200).send(article);
	} catch (err) {
		if (err.name === 'CastError') {
			return res.status(400).send({ message: 'Invalid article id' });
		}

		return next(err);
	}
};

module.exports = {
	getSavedArticles,
	createArticle,
	deleteArticle,
};
