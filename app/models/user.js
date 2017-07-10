'use strict';

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const config = require('../config');
const db = require('../services/db');

/*------------User model Schema------------*/

// Model schema
var modelDefinition = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	email: {
		type: Sequelize.STRING(320),
		unique: true,
		allowNull: false
	},

	password: {
		type: Sequelize.STRING,
		allowNull: false
	},

	lastName: {
		type: Sequelize.STRING(256),
		allowNull: false
	},

	firstName: {
		type: Sequelize.STRING(85),
		allowNull: false
	},

	address: {
		type: Sequelize.STRING,
		allowNull: false
	},

	phoneNumber: {
		type: Sequelize.STRING(32),
		allowNull: false
	},

	experience: {
		type: Sequelize.STRING,
		defaultValue: 'No Experience'
	},

	firstAid: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},

	monitor: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},

	eduTitle: {
		type: Sequelize.BOOLEAN,
		defualtValue: false
	},

	smoker: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},

	driveLicense: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},

	photo: {
		type: Sequelize.STRING,
		defaultValue: 'default.svg'
	},

	role: {
		type: Sequelize.INTEGER,
		defaultValue: config.userRoles.user
	}
};

// Model options
var modelOptions = {
	instanceMethods: {
		comparePasswords: comparePasswords
	},

	hooks: {
		beforeValidate: hashPassword
	},

	freezeTableName: true
};

// Define the user model
var UserModel = db.define('User', modelDefinition, modelOptions);


// Compare two passwords
function comparePasswords(password, callback) {
	bcrypt.compare(password, this.password, function(error, isMatch) {
		if (error) {
			return callback(error);
		}

		return callback(null, isMatch);
	});
}
// Hashes the password for a user object.
function hashPassword(user) {
	if (user.changed('password')) {
		return bcrypt.hash(user.password, 10).then(function(password) {
			user.password = password;
		});
	}
}

module.exports = UserModel;