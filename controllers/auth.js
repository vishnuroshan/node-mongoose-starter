const authController = {};
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

authController.createUser = async (newUser) => new Promise((resolve, reject) => {
	User.createUser(newUser).then((user) => {
		user = user.toJSON();
		return resolve({ status: 200, user });
	}, error => {
		console.log(error);
		return reject({ status: 500, error });
	});
});

authController.login = async ({ email, password }) => new Promise((resolve, reject) => {
	User.getUser(email).then(async (user) => {
		if (user) {
			const isAuth = await bcrypt.compare(password, user.password);
			if (isAuth) {
				const { token, err } = jwt.generateJWT({ userId: user.userId, email });
				if (err) {
					return resolve({ status: 400, message: 'token issue', ...err });
				}
				return resolve({ status: 200, token });
			} else {
				return resolve({ status: 400, message: 'invalid credentials' });
			}
		} else {
			// no user found
			return resolve({ status: 400, message: 'user not found' });
		}
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

module.exports = authController;