/**
 * development task
 *
 * @description
 * - Runs an autorestart node server using nodemon
 * - Runs watchify on clientside javascript with sourcemaps
 * - Runs automatic less compiling with sourcemaps
 * - Auto updates css/js on browser
 */

var fs = require('fs');
var path = require('path');
var nodemon = require('nodemon');
var logger = require('../src/server/modules/util/logger');
var less = require('./less');
var bundle = require('./bundle');

// ensure that public folder exists
try {
  fs.mkdirSync(path.join(__dirname, '../public'));
} catch (e) {
  if (e.code !== 'EEXIST') logger.error(e);
}

/**
 * Clientside Bundling
 */
var development = true;
bundle(development);


/**
 * Autorestart Node
 */

nodemon({
  script: path.join(__dirname, '../bin/start'),
  ext: 'js json hbs',
  ignore: ['public/*', 'src/client/*', 'tasks/*'],
  env: {
    NODE_ENV: 'development'
  }
});

nodemon.on('quit', function() {
  logger.info('[nodemon] process quit');
});

nodemon.on('restart', function() {
  logger.info('[nodemon] process restarted');
});

/**
 * Automatic .less compiling
 */

less(development);
