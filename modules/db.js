var settings = require('../setting.js');
var Db = require('mongodb').Db;
var Connection = require('mongdb').Connection;
var Server = require('mongdb').Server;

module.exports = new Db(settings.db, new Server(settings.host, 
	Connection.DEFAULT_PORT, {}));
