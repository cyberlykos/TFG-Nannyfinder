'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config');
const db = require('../../services/db');
const User = require('../../models/user');

/*------------Authentication controller-----------*/
var AuthController = {};

// Register a user
AuthController.signUp = function(req, res) {
	if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.address || !req.body.phoneNumber) {
		res.json({
			message: 'Please fill all the required fields.'
		});
	} else {
		db.sync().then(function() {
			var newUser = {
				email: req.body.email,
				password: req.body.password,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				address: req.body.address,
				phoneNumber: req.body.phoneNumber,
				role: 2
			};

			return User.create(newUser, {
				fields: ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'role']
			}).then(function() {
				res.status(201).json({
					message: 'Account created!'
				});
			});
		}).catch(function(error) {
			console.log(error);
			res.status(403).json({
				message: 'Email already in use!'
			});
		});
	}
};
// Update user with extra data (for caregiver)
AuthController.signUpExtra = function(req, res) {
	db.sync().then(function() {
		var extraUserData = {
			experience: req.body.experience,
			firstAid: req.body.firstAid,
			monitor: req.body.monitor,
			eduTitle: req.body.eduTitle,
			smoker: req.body.smoker,
			driveLicense: req.body.driveLicense,
			email: req.body.email
		};

		return User.update(extraUserData, {
			where: {
				email: extraUserData.email
			}
		}).then(function() {
			res.status(201).json({
				message: 'User updated'
			});
		});
	}).catch(function(error) {
		console.log(error);
		res.status(403).json({
			message: 'Error at updating data'
		});
	});
};

// Authenticate a user
AuthController.signIn = function(req, res) {
	if (!req.body.email || !req.body.password) {
		res.status(404).json({
			message: 'Email and password are needed'
		});
	} else {
		var email = req.body.email,
			password = req.body.password,
			potentialUser = {
				where: {
					email: email
				}
			};

		User.findOne(potentialUser).then(function(user) {
			if (!user) {
				res.status(404).json({
					message: 'Authentication failed'
				});
			} else {
				user.comparePasswords(password, function(error, isMatch) {
					if (isMatch && !error) {
						var token = jwt.sign({
								email: user.email
							},
							config.keys.secret, {
								expiresIn: '30m'
							}
						);

						res.json({
							success: true,
							token: 'JWT ' + token,
							role: user.role
						});

					} else {
						res.status(404).json({
							message: 'Login failed'
						});
					}
				});
			}
		}).catch(function(error) {
			res.status(500).json({
				message: 'There was an error'
			});
		});
	}
};

module.exports = AuthController;