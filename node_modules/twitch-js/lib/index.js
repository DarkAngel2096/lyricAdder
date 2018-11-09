'use strict';

var _arguments = arguments;
/* eslint-disable no-extend-native */

var client = require('./client');

// Provide support for < Chrome 41 mainly due to CLR Browser..
if (typeof String.prototype.includes !== 'function') {
  String.prototype.includes = function () {
    return String.prototype.indexOf.apply(undefined, _arguments) !== -1;
  };
}

if (typeof String.prototype.startsWith !== 'function') {
  String.prototype.startsWith = function (a, b) {
    return String.prototype.indexOf(a, b || 0) === b;
  };
}

if (typeof Object.setPrototypeOf !== 'function') {
  Object.setPrototypeOf = function (obj, proto) {
    // eslint-disable-next-line no-proto
    obj.__proto__ = proto;
    return obj;
  };
}

module.exports = {
  client: client,
  Client: client
};
//# sourceMappingURL=index.js.map