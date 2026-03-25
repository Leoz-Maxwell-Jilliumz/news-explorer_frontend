const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Authorization required' });
	}

	const token = authorization.replace('Bearer ', '');

	try {
		const payload = jwt.verify(
			token,
			NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
		);

		req.user = payload;
		return next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};
