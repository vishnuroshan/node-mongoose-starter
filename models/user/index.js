/* eslint-disable linebreak-style */
const User = require('./userModel');
exports.createUser = async (newUser) => User.create(newUser);
exports.getUser = async (email) => User.findOne({ email }).lean();