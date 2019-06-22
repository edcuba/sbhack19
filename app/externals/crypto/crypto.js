global.process = require("process");
global.Buffer = require("buffer").Buffer;
global.btoa = function(str) {
  return Buffer(str).toString('base64');
};

module.exports = require("react-native-crypto");
