'use strict';

const db = require('../services/db');
const Ad = require('../models/ad');
const User = require('../models/user');
const relations = require('../models/relations');

/*------------Ad controller-----------*/
var AdController = {};

// Create an Ad
AdController.createAd = function(req, res) {
	if (!req.body.title || !req.body.description) {
		res.json({
			message: 'Title and description are required fields'
		});
	} else {
		db.sync().then(function() {
			var newAd = {
				serviceType: req.body.serviceType,
				title: req.body.title,
				description: req.body.description,
				tariffs: req.body.tariffs || "",
				cooking: req.body.cooking,
				housework: req.body.housework,
				schoolwork: req.body.schoolwork,
				music: req.body.music,
				UserId: req.body.UserId
			};

			return Ad.create(newAd).then(function() {
				res.status(201).json({
					message: 'Ad created'
				})
			});
		}).catch(function(error) {
			console.log(error);
			res.status(403).json({
				message: 'There was an error creating the ad'
			});
		});
	}
};

// Update an Ad
AdController.updateAd = function(req, res) {
	if (!req.body.title || !req.body.description) {
		res.json({
			message: 'Title and description are required fields'
		});
	} else {
		db.sync().then(function() {
			var updatedAd = {
				title: req.body.title,
				description: req.body.description,
				tariffs: req.body.tariffs || "",
				cooking: req.body.cooking,
				housework: req.body.housework,
				schoolwork: req.body.schoolwork,
				music: req.body.music,
				id: req.body.adId
			};

			return Ad.update(updatedAd, {
				where: {
					id: updatedAd.id
				}
			}).then(function() {
				res.status(201).json({
					message: 'Ad updated'
				})
			});
		}).catch(function(error) {
			console.log(error);
			res.status(403).json({
				message: 'There was an error updating the ad'
			});
		});
	}
};

// Delete an Ad
AdController.deleteAd = function(req, res) {
	if (!req.body.adId) {
		res.json({
			message: 'A ID is needed to delete an ad'
		});
	} else {
		db.sync().then(function() {
			var adId = req.body.adId;

			return Ad.destroy({
				where: {
					id: adId
				}
			}).then(function(response) {
				res.status(201).json({
					message: 'Ad deleted!'
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

// Get an Ad by their Id
AdController.getAd = function(req, res) {
	if (!req.body.adId) {
		res.json({
			message: 'A valid ID is needed to find your ad'
		});
	} else {
		db.sync().then(function() {
			var adId = req.body.adId;

			return Ad.findOne({
				where: {
					id: adId
				}
			}).then(function(adData) {
				res.status(201).json({
					adData
				});
			});
		}).catch(function(error) {
			console.log(error);
			res.status(403).json({
				message: 'There was an error retrieving the ad'
			});
		});
	}
};

// Get all Ads related to an User
AdController.getUserAds = function(req, res) {
	if (!req.body.id) {
		res.json({
			message: 'A user ID is needed to find your ads'
		});
	} else {
		db.sync().then(function() {
			var userId = req.body.id;

			return Ad.findAll({
				where: {
					UserId: userId
				}
			}).then(function(adList) {
				res.status(201).json({
					adList
				});
			});
		}).catch(function(error) {
			console.log(error);
			res.status(403).json({
				message: 'There was an error retrieving your ads'
			});
		});
	}
};

// Get all Ads by one type
AdController.getCareseekerAds = function(req, res) {
	db.sync().then(function() {
		Ad.findAll({
			where: {
				serviceType: 2
			},
			include: [User]
		}).then(function(adsData) {
			res.status(201).json({
				adsData: adsData
			});
		});

	}).catch(function(error) {
		console.log(error);
		res.status(403).json({
			message: 'There was an error while searching for the ads'
		});
	});
};

// Get all Ads by other type
AdController.getCaregiverAds = function(req, res) {
	db.sync().then(function() {
		Ad.findAll({
			where: {
				serviceType: 1
			},
			include: [User]
		}).then(function(adsData) {
			res.status(201).json({
				adsData: adsData
			});
		});

	}).catch(function(error) {
		console.log(error);
		res.status(403).json({
			message: 'There was an error while searching for the ads'
		});
	});
};

// Get all Ads
AdController.getAllAds = function(req, res) {
	db.sync().then(function() {
		Ad.findAll({
			include: [User]
		}).then(function(adsData) {
			res.status(201).json({
				adsData: adsData
			});
		});

	}).catch(function(error) {
		console.log(error);
		res.status(403).json({
			message: 'There was an error searching for user ads'
		});
	});
};


module.exports = AdController;