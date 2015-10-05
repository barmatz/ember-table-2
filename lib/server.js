'use strict';

var path = require('path')
  , express = require('express')
  , morgan = require('morgan')
  , chalk = require('chalk')
  , app = express()
  , NODE_ENV = process.env.NODE_ENV || 'development'
  , isDevEnv = NODE_ENV === 'development'
  , server;

console.log('Running in %s mode', chalk.cyan(NODE_ENV));

app
  .use(morgan(isDevEnv ? 'dev' : 'common'))
  .use('/', express.static(path.resolve(__dirname, '..', 'public')))
  .use('/vendor', express.static(path.resolve(__dirname, '..', 'bower_components')))
  .use('/vendor/socket.io', express.static(path.resolve(__dirname, '..', 'node_modules', 'socket.io-client')))
  .use('/scripts', express.static(path.resolve(__dirname, '..', 'bin', 'scripts')))
  .use('/styles', express.static(path.resolve(__dirname, '..', 'bin', 'stylesheets')));

server = app.listen(process.env.PORT || 3000, function () {
  var address = server.address();

  console.log('Listening on port %s', chalk.cyan(address.port));
});

module.exports = app;
