const router = require('express').Router();
const authController = require('../controllers/auth');
const { celebrate, errors, Joi } = require('celebrate');

router.post('/create-account', celebrate({
	body: Joi.object().keys({
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		email: Joi.string().email().required(),
		// password rules
		password: Joi.string().required()
			.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { name: 'passwordRule' })
	})
}), errors(), (request, response) => {
	authController.createUser(request.body).then(result => {
		console.log(result);
		response.status(result.status).json(result);
	}, err => {
		console.log(err);
		response.status(err.status).json(err);
	});
});


router.post('/login', celebrate({
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
}), errors(), (request, response) => {
	authController.login(request.body).then((result) => {
		response.status(result.status).json(result);
	}, err => {
		response.status(err.status).json(err);
	});
});

module.exports = router;