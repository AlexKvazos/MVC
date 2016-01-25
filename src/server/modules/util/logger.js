var winston = require('winston');
var moment = require('moment');

module.exports = new winston.Logger({

  transports: [
    new winston.transports.Console({
      timestamp: function() { return moment().format('HH:mm:ss'); },
      colorize: true
    })
  ]

});
