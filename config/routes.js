'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

app.use(bodyParser.urlencoded());

var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

module.exports = function(app){
	(function clearbit_route (){
		var ClearbitCtrl = require('../controllers/clearbit');
		app.get('/api/clearbit/typeahead', cors(corsOptions), ClearbitCtrl.typeahead);
		app.get('/api/clearbit/resolver', cors(corsOptions), ClearbitCtrl.resolver);
	})();
}