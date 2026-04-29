const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = async (req, res, next) => {
	const { name, email, password } = req.body;

	try {
		const hash = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			email,
			password: hash,
		});

		return res.status(201).send({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} catch (err) {
		if (err.code === 11000) {
			return res.status(409).send({ message: 'Email already exists' });
		}

		if (err.name === 'ValidationError') {
			return res.status(400).send({ message: 'Invalid user data' });
		}

		return next(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return res.status(401).send({ message: 'Invalid email or password' });
		}

		const matched = await bcrypt.compare(password, user.password);

		if (!matched) {
			return res.status(401).send({ message: 'Invalid email or password' });
		}

		const token = jwt.sign(
			{ _id: user._id },
			NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
			{ expiresIn: '7d' }
		);

		return res.status(200).send({ token });
	} catch (err) {
		return next(err);
	}
};

const updateProfile = async (req, res, next) => {
	const { name, email } = req.body;
	const updateData = {};

	if (name !== undefined) {
		updateData.name = name;
	}

	if (email !== undefined) {
		updateData.email = email;
	}

	try {
		const user = await User.findByIdAndUpdate(
			req.user._id,
			updateData,
			{ new: true, runValidators: true }
		);

		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		return res.status(200).send(user);
	} catch (err) {
		if (err.code === 11000) {
			return res.status(409).send({ message: 'Email already exists' });
		}

		return next(err);
	}
};

const getCurrentUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		return res.status(200).send(user);
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	createUser,
	login,
	getCurrentUser,
	updateProfile,
};
