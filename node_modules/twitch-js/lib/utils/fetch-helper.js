'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseResponse = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseResponse = exports.parseResponse = function parseResponse(response) {
  return response.json().then(function (json) {
    if (!response.ok) {
      var error = new Error(response.url + ' ' + response.statusText);
      error.response = json;
      throw error;
    }

    return json;
  });
};

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var endpoint = _ref.endpoint,
      _ref$method = _ref.method,
      method = _ref$method === undefined ? 'GET' : _ref$method,
      clientId = _ref.clientId,
      token = _ref.token,
      otherProps = (0, _objectWithoutProperties3.default)(_ref, ['endpoint', 'method', 'clientId', 'token']);

  if (!endpoint) {
    return Promise.reject(new Error('An endpoint is required.'));
  }

  if (!clientId && !token) {
    return Promise.reject(new Error('A client ID or token is required.'));
  }

  // Construct headers object.
  var headers = token ? { Authorization: 'OAuth ' + token } : { 'Client-ID': clientId };

  // Construct options object.
  var options = (0, _extends3.default)({}, otherProps, {
    method: method,
    headers: (0, _extends3.default)({}, headers, {
      Accept: 'application/vnd.twitchtv.v5+json'
    })
  });

  return (0, _nodeFetch2.default)(endpoint, options).then(parseResponse);
};
//# sourceMappingURL=fetch-helper.js.map