'use strict';
var monk = require('monk'),
	wrap = require('co-monk');

var config = {
  "db": "myDb",  
  "host": "localhost",  
  "user": "",
  "pw": "",
  "port": 27017
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
var uristring =  "mongodb://" + login + config.host + port + "/" + config.db;

var db = monk(uristring);

// validate the connection. No easy way :(
var Post = wrap(db.get('post'));
Post.find({}, function (err, post) {
	if(err){
		 console.log('ERROR connecting to: ' + uristring + '. ' + err);
	}else{
		console.log('Successfully connected to: ' + uristring);
	}
});

module.exports = db;