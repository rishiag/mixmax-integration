'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
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
    app.use(methodOverride());
    app.use(favicon(__dirname + '/../favicon.ico'));

    app.all("/api/*", function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, Accept");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, HEAD, DELETE, OPTIONS");
        return next();
    });

    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));
};