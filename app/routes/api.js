'use strict';

const router = require('express').Router();
const config = require('../config');
const AuthController = require('../controllers/auth/authController');
const allowOnly = require('../services/routesHelper').allowOnly;
const UserController = require('../controllers/userController');
const AdminController = require('../controllers/auth/adminController');
const AdController = require('../controllers/adController')

/*------------Routes handle-----------*/
var APIRoutes = function(passport) {
	// Sign in requests.
	router.post('/signIn', AuthController.signIn);
	// Sign up requests.
	router.post('/signUp', AuthController.signUp);
	router.post('/signUpExtra', AuthController.signUpExtra);

	// Profile requests.
	router.post('/getUserData', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, UserController.getUserData));
	router.post('/updateUserData', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, UserController.updateUserData));
	router.post('/deleteUser', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, UserController.deleteUser));
	router.post('/uploadProfilePic', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, UserController.uploadProfilePic));

	// Ads manager requests.
	router.post('/getUserAds', passport.authenticate('jwt', {
		session: false
	}), AdController.getUserAds);
	router.post('/getAd', passport.authenticate('jwt', {
		session: false
	}), AdController.getAd);
	router.post('/createAd', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, AdController.createAd));
	router.post('/updateAd', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, AdController.updateAd));
	router.post('/deleteAd', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, AdController.deleteAd));

	// Search requests
	router.post('/getAllAds', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, AdController.getAllAds));
	router.post('/getCaregiverAds', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, AdController.getCaregiverAds));
	router.post('/getCareseekerAds', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.user, AdController.getCareseekerAds));

	// User and admin routes.
	router.get('/admin', passport.authenticate('jwt', {
		session: false
	}), allowOnly(config.accessLevels.admin, AdminController.index));

	return router;
};

module.exports = APIRoutes;