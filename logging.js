
var morgan = require("morgan");
var fs = require("fs");
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
module.exports = (morgan("combined", {stream: accessLogStream}));

