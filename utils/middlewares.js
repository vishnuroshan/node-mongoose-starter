const jwt = require('./jwt');
const User = require('../models/user');

exports.checkToken = (request, response, next) => {
	let token = request.headers.authorization;
	if (token) {
		if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
		const { payload, err } = jwt.validateJWT(token);
		if (err) {
			User.findUser(payload.email).then((user) => {
				request.user = user;
				next();
			});
		} else {
			console.log(err);
			return response.status(401).json({ status: 401, ...err });
		}
	} else {
		// token not sent
		return response.status(401).json({ status: 401, message: 'unAuthorized' });
	}
};
