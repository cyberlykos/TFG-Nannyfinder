'use strict';


/*------------NPM dependencies------------*/
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const sequelize = require('sequelize');
const passport = require('passport');
const path = require('path');
const jwt = require('jsonwebtoken');


/*------------App related modules------------*/
var hookJWTStrategy = require('./services/passportStrategy');

/*------------Initialize------------*/
var app = express();

// Favicon
app.use(favicon(__dirname + './../public/app/assets/img/favicon.ico'));

/*------------Parse as urlencoded and json------------*/
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

/*------------Morgan HTTP logger------------*/
app.use(morgan('dev'));

/*------------Passport------------*/
app.use(passport.initialize());
// Hook the passport JWT strategy
hookJWTStrategy(passport);

// Set the static files location
app.use(express.static(__dirname + './../public'));

// Bundle API routes
app.use('/api', require('./routes/api')(passport));

// Catch all route
app.get('/*', function(req, res) {
	var url = path.resolve(__dirname + './../public/app/views/index.html');
	res.sendFile(url, null, function(err) {
		if (err) res.status(500).send(err);
		else res.status(200).end();
	});
});

/*------------Start------------*/
app.listen('8080', function() {
	console.log('Server started at http://localhost:8080/');
});