var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var watchify = require('watchify');
var exorcist = require('exorcist');
var UglifyJS = require('uglify-js');
var logger = require('../src/server/modules/util/logger');
var livereload = { refresh: function() {} };

var input = path.join(__dirname, '../src/client/app.js');
var output = path.join(__dirname, '../public/application.js');
var mapfile = path.join(__dirname, '../public/application.js.map');

module.exports = function buildTask(development) {

  if (development) {
    livereload = require('./livereload');
  }

  var browserifyOptions = {
    debug: development,
    entries: [input],
    cache: {},
    packageCache: {},
    plugin: []
  };

  if (development) {
    browserifyOptions.plugin.push(watchify);
  }

  // browserify instance
  var b = browserify(browserifyOptions)
    .transform('babelify', { sourceMaps: development });



  if (development) {
    b.on('update', bundle);
    b.on('log', function(message) {
      livereload.refresh('index.html');
      logger.info('[browserify] ' + message + ' ✓');
    });
  }

  function bundle() {
    logger.info('[browserify] creating bundle...');

    // do not uglify code and output sourcemaps
    if (development) {

      b.bundle()
        .on('error', logger.info)
        .pipe(exorcist(mapfile))
        .pipe(fs.createWriteStream(output));

    // apply uglifyify transform and suppress sourcemaps
    } else {

      b.bundle()
        .on('error', logger.error)
        .pipe(fs.createWriteStream(output))
        .on('finish', function() {
          logger.info('[browserify] bundle created ✓');
          logger.info('[uglify-js] compressing bundle...');

          var minified = UglifyJS.minify(output, { mangle: false });
          fs.writeFileSync(output, minified.code);

          logger.info('[uglify-js] bundle compressed ✓');
        });
    }

  }

  bundle();

};
