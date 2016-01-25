var fs = require('fs');
var path = require('path');
var less = require('less');
var logger = require('../src/server/modules/Logger');

var lessfile = path.join(__dirname, '../src/client/less/index.less');
var lessfolder = path.join(__dirname, '../src/client/less');
var cssfile = path.join(__dirname, '../public/style.css');

module.exports = function lessTask(development) {

  logger.info('[less] compiling to css...');
  var start = Date.now();

  fs.readFile(lessfile, function(err, file) {
    if (err) return logger.error(err);

    less.render(file.toString(), {
      paths: [lessfolder],
      filename: 'index.less',
      compress: !development
    }, function(err, output) {
      if (err) return logger.error(err);

      // write compiled css
      fs.writeFile(cssfile, output.css, function(err) {
        if (err) return logger.error(err);
        done();
      });

    });
  });

  function done() {
    var end = Date.now();
    var duration = ((end - start)/1000).toFixed(2);
    logger.info('[less] done (' + duration + ' seconds) ✓');
  }

  if (development) {
    // enable watching and recompiling if enabled
    fs.watch(lessfolder, function(event, filename) {
      lessTask(true, false);
    });
  }

};
