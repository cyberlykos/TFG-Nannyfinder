'use strict';

const config = module.exports;

/*------------Database configuration------------*/
config.db = {
	user: 'admin',
	password: 'despliegueTFG',
	name: 'nannyfinder'
};

config.db.details = {
	host: 'localhost',
	port: 5432,
	dialect: 'postgres'
};

// Secret keys
config.keys = {
	secret: '/58ec6f4a9911238e32f91f67648eeab87ed1c8b552c4b18e'
};

// Expiration Time for tokens
// config.expirationTime = "30m";

/*------------User roles------------*/
const userRoles = config.userRoles = {
	guest: 1, // 001
	user: 2, // 010
	admin: 4 // 100 
};

config.accessLevels = {
	guest: userRoles.guest | userRoles.user | userRoles.admin, // 111
	user: userRoles.user | userRoles.admin, // 110
	admin: userRoles.admin // 100
}