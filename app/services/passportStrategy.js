'use strict';

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('./../models/user');
const config = require('./../config');

// Hooks the JWT Strategy
function hookJWTStrategy(passport) {
	var options = {};

	options.secretOrKey = config.keys.secret;
	options.jwtFromRequest = ExtractJWT.fromAuthHeader();
	options.ignoreExpiration = true;

	passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
		User.findOne({
				where: {
					email: JWTPayload.email
				}
			})
			.then(function(user) {
				if (!user) {
					callback(null, false);
					return;
				}

				callback(null, user);
			})
	}));
}

module.exports = hookJWTStrategy;