'use strict';

const Sequelize = require('sequelize');
const db = require('../services/db');

/*------------Ad model Schema------------*/

// Model schema
var modelDefinition = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	serviceType: {
		type: Sequelize.INTEGER,
		allowNull: false
	},

	title: {
		type: Sequelize.STRING(350),
		allowNull: false
	},

	description: {
		type: Sequelize.STRING(1200),
		allowNull: false
	},

	tariffs: {
		type: Sequelize.STRING(850),
	},

	cooking: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},

	housework: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},

	schoolwork: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},

	music: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},

	UserId: {
		type: Sequelize.INTEGER,
		references: {
			model: 'User',
			key: 'id'
		}
	}
};

// Model options
var modelOptions = {
	freezeTableName: true
};

// Define the ad model
var AdModel = db.define('Ad', modelDefinition, modelOptions);

module.exports = AdModel;