const mongoose = require('../../db/connection');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	firstname: {
		type: String,
		set: (val) => val.trim()
	},
	lastname: {
		type: String,
		set: (val) => val.trim()
	},
	email: {
		type: String,
		unique: true,
		set: (email) => email.toLowerCase().trim()
	},
	password: {
		type: String,
		set: (pass) => bcrypt.hashSync(pass, 10),
		get: () => '*********',
	},
	displayname: {
		type: String,
		set: (val) => val.trim()
	},
	aboutme: {
		type: String,
	},
	status: {
		type: String,
		enum: ['active', 'away', 'offline'],
		default: 'offline',
	},
}, { toJSON: { getters: true } });

const User = mongoose.model('user', UserSchema);

User.prototype.asJson = function () {
	console.log(this);
};

module.exports = User;
