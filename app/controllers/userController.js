'use strict';

const db = require('../services/db');
const Ad = require('../models/ad');
const User = require('../models/user');
const fs = require('fs');

/*------------User controller-----------*/
var UserController = {}

// Get user data
UserController.getUserData = function(req, res) {
	res.status(200).json({
		userData: req.user
	});
};

// Update user data
UserController.updateUserData = function(req, res) {
	if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.address || !req.body.phoneNumber) {
		res.json({
			message: 'Please fill all the required fields.'
		});
	} else {
		db.sync().then(function() {
			var userData = {
				id: req.body.id,
				email: req.body.email,
				password: req.body.password,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				address: req.body.address,
				phoneNumber: req.body.phoneNumber,
				experience: req.body.experience || "",
				firstAid: req.body.firstAid || false,
				monitor: req.body.monitor || false,
				eduTitle: req.body.eduTitle || false,
				smoker: req.body.smoker || false,
				driveLicense: req.body.driveLicense || false,
			};

			return User.update(userData, {
				where: {
					id: userData.id
				}
			}).then(function() {
				res.status(201).json({
					message: 'User updated'
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

// Delete user account
UserController.deleteUser = function(req, res) {
	if (!req.body.userId) {
		res.json({
			message: 'A ID is needed to delete your user'
		});
	} else {
		db.sync().then(function() {
			var userId = req.body.userId;

			return User.destroy({
				where: {
					id: userId
				}
			}).then(function(response) {
				res.status(201).json({
					message: 'User deleted!'
				});
			});
		}).catch(function(error) {
			//console.log(error);
			res.status(403).json({
				message: error
			});
		});
	}
};

// Upload a profile pic to the server (doesn't work)
UserController.uploadProfilePic = function(req, res) {

};

module.exports = UserController;