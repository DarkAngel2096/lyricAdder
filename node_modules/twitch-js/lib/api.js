'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isURL = require('validator/lib/isURL');

var _isURL2 = _interopRequireDefault(_isURL);

var _fetchHelper = require('./utils/fetch-helper');

var _fetchHelper2 = _interopRequireDefault(_fetchHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var cb = arguments[1];
    var urlFromOptions, endpoint, clientId, tokenWithOauth, body;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Set the url to options.uri or options.url.
            urlFromOptions = options.url || options.uri;
            endpoint = (0, _isURL2.default)(urlFromOptions) ? urlFromOptions : 'https://api.twitch.tv/kraken/' + urlFromOptions.replace(/^\//, '');
            clientId = (0, _get3.default)(options, 'headers.Client-ID');
            tokenWithOauth = (0, _get3.default)(options, 'headers.Authorization');
            _context.next = 6;
            return (0, _fetchHelper2.default)({
              endpoint: endpoint,
              clientId: clientId,
              token: tokenWithOauth ? tokenWithOauth.replace(/^Oauth /i, '') : undefined
            });

          case 6:
            body = _context.sent;

            if (!(0, _isFunction3.default)(cb)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', cb(false, null, body));

          case 9:
            return _context.abrupt('return', body);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function api() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = api;
//# sourceMappingURL=api.js.map