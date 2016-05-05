'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    compression = require('compression'),
    errorhandler = require('errorhandler'),
    favicon = require('serve-favicon');

var Settings = require('./settings');

module.exports = function(app) {

    app.use(compression());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(favicon(__dirname + '/../favicon.ico'));
    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));
};