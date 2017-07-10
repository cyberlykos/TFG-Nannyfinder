'use strict';

const db = require('../services/db');
const User = require('./user');
const Ad = require('./ad');

/*------------Define the relations between tables on db------------*/

User.hasMany(Ad);
Ad.belongsTo(User);
db.sync();