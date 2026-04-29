const Article = require('../models/article');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSavedArticles = async (req, res, next) => {
	const {
		page = 1,
		limit = 10,
		sortBy = 'createdAt',
		order = 'desc',
		keyword,
	} = req.query;

	const pageNumber = Number(page);
	const limitNumber = Number(limit);
	const sortOrder = order === 'asc' ? 1 : -1;
	const sort = { [sortBy]: sortOrder };

	const filter = { owner: req.user._id };

	if (keyword) {
		const searchRegex = new RegExp(escapeRegex(keyword), 'i');
		filter.$or = [
			{ keyword: searchRegex },
			{ title: searchRegex },
		];
	}

	try {
		const total = await Article.countDocuments(filter);
		const totalPages = Math.max(1, Math.ceil(total / limitNumber));

		const articles = await Article.find(filter)
			.sort(sort)
			.skip((pageNumber - 1) * limitNumber)
			.limit(limitNumber);

		return res.status(200).send({
			page: pageNumber,
			limit: limitNumber,
			total,
			totalPages,
			hasNext: pageNumber < totalPages,
			hasPrev: pageNumber > 1,
			items: articles,
		});
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

const updateArticle = async (req, res, next) => {
	const updates = req.body;

	try {
		const article = await Article.findById(req.params.id);

		if (!article) {
			return res.status(404).send({ message: 'Article not found' });
		}

		if (article.owner.toString() !== req.user._id) {
			return res.status(403).send({ message: 'Forbidden' });
		}

		Object.assign(article, updates);
		await article.save();

		return res.status(200).send(article);
	} catch (err) {
		if (err.name === 'CastError') {
			return res.status(400).send({ message: 'Invalid article id' });
		}

		if (err.name === 'ValidationError') {
			return res.status(400).send({ message: 'Invalid article data' });
		}

		return next(err);
	}
};

module.exports = {
	getSavedArticles,
	createArticle,
	deleteArticle,
	updateArticle,
};
