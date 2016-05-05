var settings = require('./config/settings');

(function () {
    'use strict';
    var express = require('express'),
        app = express();
    require('./config/app')(app);
    require('./config/routes')(app);

    console.log('Starting the server');
    console.log('-------------------------');
    console.log('URL:' + settings.config.server);
    console.log('Port:' + settings.config.port);
    app.listen(settings.config.port);
    console.log('Started the server');
    process.on('uncaughtException', function (error) {
        console.log(error.stack);
        console.log(error);
    });
})();
