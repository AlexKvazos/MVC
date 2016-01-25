/**
 * build task
 *
 * @description
 * - Compiles less with compression
 * - Browserifies and transpiles js with compression and uglification
 */

var fs = require('fs');
var path = require('path');
var less = require('./less');
var bundle = require('./bundle');
var logger = require('../src/server/modules/Logger');

// ensure that public folder exists
try {
  fs.mkdirSync(path.join(__dirname, '../public'));
} catch (e) {
  if (e.code !== 'EEXIST') logger.error(e);
}

less(false); // compression, no watching
bundle(false); // no sourcemaps, compression
