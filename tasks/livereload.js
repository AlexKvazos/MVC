var path = require('path');
var livereload = require('livereload');

var server = livereload.createServer();

server.watch(path.join(__dirname, '../public'));
server.watch(path.join(__dirname, '../src/client/templates'));
server.watch(path.join(__dirname, '../src/client/img'));

module.exports = server;
