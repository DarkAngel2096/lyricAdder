(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TwitchJS", [], factory);
	else if(typeof exports === 'object')
		exports["TwitchJS"] = factory();
	else
		root["TwitchJS"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(31)('wks');
var uid = __webpack_require__(19);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(17);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(3);
var IE8_DOM_DEFINE = __webpack_require__(46);
var toPrimitive = __webpack_require__(29);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(2);
var ctx = __webpack_require__(15);
var hide = __webpack_require__(4);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50);
var defined = __webpack_require__(27);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(16);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(49);
var enumBugKeys = __webpack_require__(32);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(8);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(63);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(125);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(131);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof2 = __webpack_require__(65);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var self = {
  // Return the second value if the first value is undefined..
  get: function get(obj1, obj2) {
    return typeof obj1 === 'undefined' ? obj2 : obj1;
  },

  // Value is a boolean..
  isBoolean: function isBoolean(obj) {
    return typeof obj === 'boolean';
  },

  // Value is a finite number..
  isFinite: function isFinite(int) {
    return Number.isFinite(int) && !Number.isNaN(parseFloat(int));
  },

  // Value is an integer..
  isInteger: function isInteger(int) {
    return !Number.isNaN(self.toNumber(int, 0));
  },

  // Username is a justinfan username..
  isJustinfan: function isJustinfan(username) {
    return RegExp('^(justinfan)(\\d+$)', 'g').test(username);
  },

  // Value is null..
  isNull: function isNull(obj) {
    return obj === null;
  },

  // Value is a regex..
  isRegex: function isRegex(str) {
    return (/[\|\\\^\$\*\+\?\:\#]/.test(str)
    );
  },

  // Value is a string..
  isString: function isString(str) {
    return typeof str === 'string';
  },

  // Value is a valid url..
  isURL: function isURL(str) {
    return RegExp('^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$', 'i').test(str);
  },

  // Return a random justinfan username..
  justinfan: function justinfan() {
    return 'justinfan' + Math.floor(Math.random() * 80000 + 1000);
  },

  // Return a valid password..
  password: function password(str) {
    if (str === 'SCHMOOPIIE' || str === '' || str === null) {
      return 'SCHMOOPIIE';
    }
    return 'oauth:' + str.toLowerCase().replace('oauth:', '');
  },

  // Race a promise against a delay..
  promiseDelay: function promiseDelay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  },

  // Replace all occurences of a string using an object..
  replaceAll: function replaceAll(str, obj) {
    if (str === null || typeof str === 'undefined') {
      return null;
    }
    Object.keys(obj).forEach(function (x) {
      str = str.replace(new RegExp(x, 'g'), obj[x]);
    });
    return str;
  },

  unescapeHtml: function unescapeHtml(safe) {
    return safe.replace(/\\&amp\\;/g, '&').replace(/\\&lt\\;/g, '<').replace(/\\&gt\\;/g, '>').replace(/\\&quot\\;/g, '"').replace(/\\&#039\\;/g, "'");
  },

  // Add word to a string..
  addWord: function addWord(line, word) {
    if (line.length !== 0) {
      return line + ' ' + word;
    }
    return word;
  },

  // Return a valid channel name..
  channel: function channel(str) {
    var channel = typeof str === 'undefined' || str === null ? '' : str;
    return channel.charAt(0) === '#' ? channel.toLowerCase() : '#' + channel.toLowerCase();
  },

  // Extract a number from a string..
  extractNumber: function extractNumber(str) {
    var parts = str.split(' ');
    for (var i = 0; i < parts.length; i++) {
      if (self.isInteger(parts[i])) {
        return ~~parts[i];
      }
    }
    return 0;
  },

  // Format the date..
  formatDate: function formatDate(date) {
    var hours = date.getHours();
    var mins = date.getMinutes();

    hours = (hours < 10 ? '0' : '') + hours;
    mins = (mins < 10 ? '0' : '') + mins;

    return hours + ':' + mins;
  },

  // Inherit the prototype methods from one constructor into another..
  inherits: function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function TempCtor() {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  },

  // Return whether inside a Node application or not..
  isNode: function isNode() {
    try {
      if ((typeof process === 'undefined' ? 'undefined' : (0, _typeof3.default)(process)) === 'object' && Object.prototype.toString.call(process) === '[object process]') {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  },

  isExtension: function isExtension() {
    try {
      if (window.chrome && window.chrome.runtime && window.chrome.runtime.id) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  },

  // Merge two or more objects.
  merge: Object.assign,

  // Split a line but don't cut a word in half..
  splitLine: function splitLine(input, length) {
    var lastSpace = input.substring(0, length).lastIndexOf(' ');
    return [input.substring(0, lastSpace), input.substring(lastSpace + 1)];
  },

  // Parse string to number. Returns NaN if string can't be parsed to number..
  toNumber: function toNumber(num, precision) {
    if (num === null) return 0;
    var factor = Math.pow(10, self.isFinite(precision) ? precision : 0);
    return Math.round(num * factor) / factor;
  },

  // Merge two arrays..
  union: function union(arr1, arr2) {
    var hash = {};
    var ret = [];

    arr1.forEach(function (value) {
      if (!hash[value]) {
        hash[value] = true;
        ret.push(value);
      }
    });

    arr2.forEach(function (value) {
      if (!hash[value]) {
        hash[value] = true;
        ret.push(value);
      }
    });

    return ret;
  },

  // Return a valid username..
  username: function username(str) {
    var username = typeof str === 'undefined' || str === null ? '' : str;
    return username.charAt(0) === '#' ? username.substring(1).toLowerCase() : username.toLowerCase();
  }
};

module.exports = self;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(152)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(31)('keys');
var uid = __webpack_require__(19);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(16);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(35);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(98);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(61),
    isObjectLike = __webpack_require__(105);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(14);
var wksExt = __webpack_require__(40);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 43 */
/***/ (function(module, exports) {



/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(76)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(45)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(14);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(47);
var hide = __webpack_require__(4);
var has = __webpack_require__(8);
var Iterators = __webpack_require__(12);
var $iterCreate = __webpack_require__(77);
var setToStringTag = __webpack_require__(20);
var getPrototypeOf = __webpack_require__(81);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(28)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(3);
var dPs = __webpack_require__(78);
var enumBugKeys = __webpack_require__(32);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(28)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(52).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIObject = __webpack_require__(10);
var arrayIndexOf = __webpack_require__(79)(false);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(13);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(27);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
var global = __webpack_require__(0);
var hide = __webpack_require__(4);
var Iterators = __webpack_require__(12);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(13);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(3);
var aFunction = __webpack_require__(16);
var SPECIES = __webpack_require__(1)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var invoke = __webpack_require__(91);
var html = __webpack_require__(52);
var cel = __webpack_require__(28);
var global = __webpack_require__(0);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(13)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(3);
var isObject = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(33);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(61),
    isObject = __webpack_require__(62);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(34),
    getRawTag = __webpack_require__(99),
    objectToString = __webpack_require__(100);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(113),
    getValue = __webpack_require__(117);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(153);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(155);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(49);
var hiddenKeys = __webpack_require__(32).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _arguments = arguments;
/* eslint-disable no-extend-native */

var client = __webpack_require__(68);

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

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var api = __webpack_require__(69);
var commands = __webpack_require__(151);
var eventEmitter = __webpack_require__(165).EventEmitter;
var logger = __webpack_require__(166);
var parse = __webpack_require__(167);
var timer = __webpack_require__(168);
var ws = global.WebSocket || global.MozWebSocket || __webpack_require__(169);
var _ = __webpack_require__(25);

// Client instance..
var client = function client(opts) {
  if (this instanceof client === false) {
    return new client(opts);
  }
  this.setMaxListeners(0);

  this.opts = _.get(opts, {});
  this.opts.channels = this.opts.channels || [];
  this.opts.connection = this.opts.connection || {};
  this.opts.identity = this.opts.identity || {};
  this.opts.options = this.opts.options || {};

  this.clientId = _.get(this.opts.options.clientId, null);

  this.maxReconnectAttempts = _.get(this.opts.connection.maxReconnectAttempts, Infinity);
  this.maxReconnectInterval = _.get(this.opts.connection.maxReconnectInterval, 30000);
  this.reconnect = _.get(this.opts.connection.reconnect, false);
  this.reconnectDecay = _.get(this.opts.connection.reconnectDecay, 1.5);
  this.reconnectInterval = _.get(this.opts.connection.reconnectInterval, 1000);

  this.reconnecting = false;
  this.reconnections = 0;
  this.reconnectTimer = this.reconnectInterval;

  this.secure = _.get(this.opts.connection.secure, false);

  // Raw data and object for emote-sets..
  this.emotes = '';
  this.emotesets = {};

  this.channels = [];
  this.currentLatency = 0;
  this.globaluserstate = {};
  this.lastJoined = '';
  this.latency = new Date();
  this.moderators = {};
  this.pingLoop = null;
  this.pingTimeout = null;
  this.reason = '';
  this.username = '';
  this.userstate = {};
  this.wasCloseCalled = false;
  this.ws = null;

  // Create the logger..
  var level = 'error';
  if (this.opts.options.debug) {
    level = 'info';
  }
  this.log = this.opts.logger || logger;

  try {
    logger.setLevel(level);
  } catch (e) {}
  // swallow error


  // Format the channel names..
  this.opts.channels.forEach(function (part, index, theArray) {
    theArray[index] = _.channel(part);
  });

  eventEmitter.call(this);
};

_.inherits(client, eventEmitter);

client.prototype.api = api;

// Put all commands in prototype..
Object.keys(commands).forEach(function (methodName) {
  client.prototype[methodName] = commands[methodName];
});

// Handle parsed chat server message..
client.prototype.handleMessage = function handleMessage(message) {
  var _this = this;

  if (!_.isNull(message)) {
    var channel = _.channel(_.get(message.params[0], null));
    var msg = _.get(message.params[1], null);
    var msgid = _.get(message.tags['msg-id'], null);

    // Parse badges and emotes..
    message.tags = parse.badges(parse.emotes(message.tags));

    // Transform IRCv3 tags..
    if (message.tags) {
      Object.keys(message.tags).forEach(function (key) {
        if (key !== 'emote-sets' && key !== 'ban-duration' && key !== 'bits') {
          if (_.isBoolean(message.tags[key])) {
            message.tags[key] = null;
          } else if (message.tags[key] === '1') {
            message.tags[key] = true;
          } else if (message.tags[key] === '0') {
            message.tags[key] = false;
          }
        }
      });
    }

    // Messages with no prefix..
    if (_.isNull(message.prefix)) {
      switch (message.command) {
        // Received PING from server..
        case 'PING':
          this.emit('ping');
          if (!_.isNull(this.ws) && this.ws.readyState !== 2 && this.ws.readyState !== 3) {
            this.ws.send('PONG');
          }
          break;

        // Received PONG from server, return current latency..
        case 'PONG':
          {
            var currDate = new Date();
            this.currentLatency = currDate.getTime() - this.latency.getTime();
            this.emits(['pong', '_promisePing'], [[this.currentLatency], [this.currentLatency]]);

            clearTimeout(this.pingTimeout);
            break;
          }

        default:
          this.log.warn('Could not parse message with no prefix:\n' + JSON.stringify(message, null, 4));
          break;
      }
    } else if (message.prefix === 'tmi.twitch.tv') {
      // Messages with "tmi.twitch.tv" as a prefix..
      switch (message.command) {
        case '002':
        case '003':
        case '004':
        case '375':
        case '376':
        case 'CAP':
          break;

        // Retrieve username from server..
        case '001':
          this.username = message.params[0];
          break;

        // Connected to server..
        case '372':
          {
            var _ret = function () {
              _this.log.info('Connected to server.');
              _this.userstate['#tmijs'] = {};
              _this.emits(['connected', '_promiseConnect'], [[_this.server, _this.port], [null]]);
              _this.reconnections = 0;
              _this.reconnectTimer = _this.reconnectInterval;

              // Set an internal ping timeout check interval..
              _this.pingLoop = setInterval(function () {
                // Make sure the connection is opened before sending the message..
                if (!_.isNull(_this.ws) && _this.ws.readyState !== 2 && _this.ws.readyState !== 3) {
                  _this.ws.send('PING');
                }
                _this.latency = new Date();
                _this.pingTimeout = setTimeout(function () {
                  if (!_.isNull(_this.ws)) {
                    _this.wasCloseCalled = false;
                    _this.log.error('Ping timeout.');
                    _this.ws.close();

                    clearInterval(_this.pingLoop);
                    clearTimeout(_this.pingTimeout);
                  }
                }, _.get(_this.opts.connection.timeout, 9999));
              }, 60000);

              // Join all the channels from configuration with a 2 seconds interval..
              var joinQueue = new timer.queue(2000);
              var joinChannels = _.union(_this.opts.channels, _this.channels);
              _this.channels = [];

              var _loop = function _loop(i) {
                var self = _this;
                joinQueue.add(function (chan) {
                  if (!_.isNull(self.ws) && self.ws.readyState !== 2 && self.ws.readyState !== 3) {
                    self.ws.send('JOIN ' + _.channel(joinChannels[chan]));
                  }
                }.bind(_this, i));
              };

              for (var i = 0; i < joinChannels.length; i++) {
                _loop(i);
              }

              joinQueue.run();
              return 'break';
            }();

            if (_ret === 'break') break;
          }

        // https://github.com/justintv/Twitch-API/blob/master/chat/capabilities.md#notice
        case 'NOTICE':
          switch (msgid) {
            // This room is now in subscribers-only mode.
            case 'subs_on':
              this.log.info('[' + channel + '] This room is now in subscribers-only mode.');
              this.emits(['subscriber', 'subscribers', '_promiseSubscribers'], [[channel, true], [channel, true], [null]]);
              break;

            // This room is no longer in subscribers-only mode.
            case 'subs_off':
              this.log.info('[' + channel + '] This room is no longer in subscribers-only mode.');
              this.emits(['subscriber', 'subscribers', '_promiseSubscribersoff'], [[channel, false], [channel, false], [null]]);
              break;

            // This room is now in emote-only mode.
            case 'emote_only_on':
              this.log.info('[' + channel + '] This room is now in emote-only mode.');
              this.emits(['emoteonly', '_promiseEmoteonly'], [[channel, true], [null]]);
              break;

            // This room is no longer in emote-only mode.
            case 'emote_only_off':
              this.log.info('[' + channel + '] This room is no longer in emote-only mode.');
              this.emits(['emoteonly', '_promiseEmoteonlyoff'], [[channel, false], [null]]);
              break;

            // Do not handle slow_on/off here, listen to the ROOMSTATE notice
            // instead as it returns the delay.
            case 'slow_on':
            case 'slow_off':
              break;

            // Do not handle followers_on/off here, listen to the ROOMSTATE
            // notice instead as it returns the delay.
            case 'followers_on_zero':
            case 'followers_on':
            case 'followers_off':
              break;

            // This room is now in r9k mode.
            case 'r9k_on':
              this.log.info('[' + channel + '] This room is now in r9k mode.');
              this.emits(['r9kmode', 'r9kbeta', '_promiseR9kbeta'], [[channel, true], [channel, true], [null]]);
              break;

            // This room is no longer in r9k mode.
            case 'r9k_off':
              this.log.info('[' + channel + '] This room is no longer in r9k mode.');
              this.emits(['r9kmode', 'r9kbeta', '_promiseR9kbetaoff'], [[channel, false], [channel, false], [null]]);
              break;

            // The moderators of this room are [...]
            case 'room_mods':
              {
                var splitted = msg.split(':');
                var mods = splitted[1].replace(/,/g, '').split(':').toString().toLowerCase().split(' ');

                for (var i = mods.length - 1; i >= 0; i--) {
                  if (mods[i] === '') {
                    mods.splice(i, 1);
                  }
                }

                this.emits(['_promiseMods', 'mods'], [[null, mods], [channel, mods]]);
                break;
              }

            // There are no moderators for this room.
            case 'no_mods':
              this.emit('_promiseMods', null, []);
              break;

            // Channel is suspended..
            case 'msg_channel_suspended':
              this.emits(['notice', '_promiseJoin'], [[channel, msgid, msg], [msgid]]);
              break;

            // Ban command failed..
            case 'already_banned':
            case 'bad_ban_admin':
            case 'bad_ban_broadcaster':
            case 'bad_ban_global_mod':
            case 'bad_ban_self':
            case 'bad_ban_staff':
            case 'usage_ban':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseBan'], [[channel, msgid, msg], [msgid]]);
              break;

            // Ban command success..
            case 'ban_success':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseBan'], [[channel, msgid, msg], [null]]);
              break;

            // Clear command failed..
            case 'usage_clear':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseClear'], [[channel, msgid, msg], [msgid]]);
              break;

            // Mods command failed..
            case 'usage_mods':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseMods'], [[channel, msgid, msg], [msgid, []]]);
              break;

            // Mod command success..
            case 'mod_success':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseMod'], [[channel, msgid, msg], [null]]);
              break;

            // Mod command failed..
            case 'usage_mod':
            case 'bad_mod_banned':
            case 'bad_mod_mod':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseMod'], [[channel, msgid, msg], [msgid]]);
              break;

            // Unmod command success..
            case 'unmod_success':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseUnmod'], [[channel, msgid, msg], [null]]);
              break;

            // Unmod command failed..
            case 'usage_unmod':
            case 'bad_unmod_mod':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseUnmod'], [[channel, msgid, msg], [msgid]]);
              break;

            // Color command success..
            case 'color_changed':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseColor'], [[channel, msgid, msg], [null]]);
              break;

            // Color command failed..
            case 'usage_color':
            case 'turbo_only_color':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseColor'], [[channel, msgid, msg], [msgid]]);
              break;

            // Commercial command success..
            case 'commercial_success':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseCommercial'], [[channel, msgid, msg], [null]]);
              break;

            // Commercial command failed..
            case 'usage_commercial':
            case 'bad_commercial_error':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseCommercial'], [[channel, msgid, msg], [msgid]]);
              break;

            // Host command success..
            case 'hosts_remaining':
              {
                this.log.info('[' + channel + '] ' + msg);
                var remainingHost = !Number.isNaN(msg.charAt(0)) ? msg.charAt(0) : 0;
                this.emits(['notice', '_promiseHost'], [[channel, msgid, msg], [null, ~~remainingHost]]);
                break;
              }

            // Host command failed..
            case 'bad_host_hosting':
            case 'bad_host_rate_exceeded':
            case 'bad_host_error':
            case 'usage_host':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseHost'], [[channel, msgid, msg], [msgid, null]]);
              break;

            // r9kbeta command failed..
            case 'already_r9k_on':
            case 'usage_r9k_on':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseR9kbeta'], [[channel, msgid, msg], [msgid]]);
              break;

            // r9kbetaoff command failed..
            case 'already_r9k_off':
            case 'usage_r9k_off':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseR9kbetaoff'], [[channel, msgid, msg], [msgid]]);
              break;

            // Timeout command success..
            case 'timeout_success':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseTimeout'], [[channel, msgid, msg], [null]]);
              break;

            // Subscribersoff command failed..
            case 'already_subs_off':
            case 'usage_subs_off':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseSubscribersoff'], [[channel, msgid, msg], [msgid]]);
              break;

            // Subscribers command failed..
            case 'already_subs_on':
            case 'usage_subs_on':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseSubscribers'], [[channel, msgid, msg], [msgid]]);
              break;

            // Emoteonlyoff command failed..
            case 'already_emote_only_off':
            case 'usage_emote_only_off':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseEmoteonlyoff'], [[channel, msgid, msg], [msgid]]);
              break;

            // Emoteonly command failed..
            case 'already_emote_only_on':
            case 'usage_emote_only_on':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseEmoteonly'], [[channel, msgid, msg], [msgid]]);
              break;

            // Slow command failed..
            case 'usage_slow_on':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseSlow'], [[channel, msgid, msg], [msgid]]);
              break;

            // Slowoff command failed..
            case 'usage_slow_off':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseSlowoff'], [[channel, msgid, msg], [msgid]]);
              break;

            // Timeout command failed..
            case 'usage_timeout':
            case 'bad_timeout_admin':
            case 'bad_timeout_broadcaster':
            case 'bad_timeout_duration':
            case 'bad_timeout_global_mod':
            case 'bad_timeout_self':
            case 'bad_timeout_staff':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseTimeout'], [[channel, msgid, msg], [msgid]]);
              break;

            // Unban command success..
            // Unban can also be used to cancel an active timeout.
            case 'untimeout_success':
            case 'unban_success':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseUnban'], [[channel, msgid, msg], [null]]);
              break;

            // Unban command failed..
            case 'usage_unban':
            case 'bad_unban_no_ban':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseUnban'], [[channel, msgid, msg], [msgid]]);
              break;

            // Unhost command failed..
            case 'usage_unhost':
            case 'not_hosting':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseUnhost'], [[channel, msgid, msg], [msgid]]);
              break;

            // Whisper command failed..
            case 'whisper_invalid_login':
            case 'whisper_invalid_self':
            case 'whisper_limit_per_min':
            case 'whisper_limit_per_sec':
            case 'whisper_restricted_recipient':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseWhisper'], [[channel, msgid, msg], [msgid]]);
              break;

            // Permission error..
            case 'no_permission':
            case 'msg_banned':
              this.log.info('[' + channel + '] ' + msg);
              this.emits(['notice', '_promiseBan', '_promiseClear', '_promiseUnban', '_promiseTimeout', '_promiseMods', '_promiseMod', '_promiseUnmod', '_promiseCommercial', '_promiseHost', '_promiseUnhost', '_promiseR9kbeta', '_promiseR9kbetaoff', '_promiseSlow', '_promiseSlowoff', '_promiseFollowers', '_promiseFollowersoff', '_promiseSubscribers', '_promiseSubscribersoff', '_promiseEmoteonly', '_promiseEmoteonlyoff'], [[channel, msgid, msg], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid], [msgid]]);
              break;

            // Unrecognized command..
            case 'unrecognized_cmd':
              this.log.info('[' + channel + '] ' + msg);
              this.emit('notice', channel, msgid, msg);

              if (msg.split(' ').splice(-1)[0] === '/w') {
                this.log.warn('You must be connected to a group server to send or receive whispers.');
              }
              break;

            // Send the following msg-ids to the notice event listener..
            case 'cmds_available':
            case 'host_target_went_offline':
            case 'msg_censored_broadcaster':
            case 'msg_duplicate':
            case 'msg_emoteonly':
            case 'msg_followersonly':
            case 'msg_verified_email':
            case 'msg_ratelimit':
            case 'msg_subsonly':
            case 'msg_timedout':
            case 'no_help':
            case 'raid_notice_restricted_chat':
            case 'unraid_error_no_active_raid':
            case 'usage_disconnect':
            case 'usage_help':
            case 'usage_me':
              this.log.info('[' + channel + '] ' + msg);
              this.emit('notice', channel, msgid, msg);
              break;

            // Ignore this because we are already listening to HOSTTARGET..
            case 'host_on':
            case 'host_off':
              //
              break;

            case 'msg_rejected':
              this.log.info('[' + channel + '] ' + msg);
              this.emit('automodinreview', { channel: channel });
              break;
            case 'msg_rejected_mandatory':
              this.log.info('[' + channel + '] ' + msg);
              this.emit('automodrejected', { channel: channel });
              break;

            default:
              if (msg.includes('Login unsuccessful') || msg.includes('Login authentication failed')) {
                this.wasCloseCalled = false;
                this.reconnect = false;
                this.reason = msg;
                this.log.error(this.reason);
                this.ws.close();
              } else if (msg.includes('Error logging in') || msg.includes('Improperly formatted auth')) {
                this.wasCloseCalled = false;
                this.reconnect = false;
                this.reason = msg;
                this.log.error(this.reason);
                this.ws.close();
              } else if (msg.includes('Invalid NICK')) {
                this.wasCloseCalled = false;
                this.reconnect = false;
                this.reason = 'Invalid NICK.';
                this.log.error(this.reason);
                this.ws.close();
              } else {
                this.log.warn('Could not parse NOTICE from tmi.twitch.tv:\n' + JSON.stringify(message, null, 4));
              }
              break;
          }
          break;

        // Handle subanniversary / resub..
        case 'USERNOTICE':
          {
            if (msgid === 'resub') {
              var username = message.tags['display-name'] || message.tags.login;
              var plan = message.tags['msg-param-sub-plan'];
              var planName = _.replaceAll(_.get(message.tags['msg-param-sub-plan-name'], null), {
                '\\\\s': ' ',
                '\\\\:': ';',
                '\\\\\\\\': '\\',
                '\\r': '\r',
                '\\n': '\n'
              });
              var months = _.get(~~message.tags['msg-param-months'], null);
              var prime = plan.includes('Prime');
              var userstate = message.tags;

              if (userstate) {
                userstate['message-type'] = 'resub';
              }

              this.emits(['resub', 'subanniversary'], [[channel, username, months, msg, userstate, { prime: prime, plan: plan, planName: planName }], [channel, username, months, msg, userstate, { prime: prime, plan: plan, planName: planName }]]);
            } else if (msgid === 'sub') {
              // Handle sub
              var _username = message.tags['display-name'] || message.tags.login;
              var _plan = message.tags['msg-param-sub-plan'];
              var _planName = _.replaceAll(_.get(message.tags['msg-param-sub-plan-name'], null), {
                '\\\\s': ' ',
                '\\\\:': ';',
                '\\\\\\\\': '\\',
                '\\r': '\r',
                '\\n': '\n'
              });
              var _prime = _plan.includes('Prime');
              var _userstate = message.tags;

              if (_userstate) {
                _userstate['message-type'] = 'sub';
              }

              this.emit('subscription', channel, _username, { prime: _prime, plan: _plan, planName: _planName }, msg, _userstate);
            } else if (msgid === 'subgift') {
              var _username2 = message.tags['display-name'] || message.tags.login;
              var recipient = message.tags['msg-param-recipient-display-name'] || message.tags['msg-param-recipient-user-name'];
              var _plan2 = message.tags['msg-param-sub-plan'];
              var _planName2 = _.replaceAll(_.get(message.tags['msg-param-sub-plan-name'], null), {
                '\\\\s': ' ',
                '\\\\:': ';',
                '\\\\\\\\': '\\',
                '\\r': '\r',
                '\\n': '\n'
              });
              var _userstate2 = message.tags;

              if (_userstate2) {
                _userstate2['message-type'] = 'subgift';
              }

              this.emit('subgift', channel, _username2, recipient, { plan: _plan2, planName: _planName2 }, _userstate2);
            } else if (msgid === 'raid') {
              var raider = message.tags['msg-param-displayName'] || message.tags['msg-param-login'];
              var viewers = parseInt(message.tags['msg-param-viewerCount'], 10);
              var _userstate3 = message.tags;

              if (_userstate3) {
                _userstate3['message-type'] = 'raid';
              }

              this.emit('raid', { channel: channel, raider: raider, viewers: viewers, userstate: _userstate3 });
            } else if (msgid === 'ritual') {
              var _username3 = message.tags['display-name'] || message.tags.login;
              var type = message.tags['msg-param-ritual-name'];
              var _userstate4 = message.tags;

              if (_userstate4) {
                _userstate4['message-type'] = 'ritual';
              }

              this.emit('ritual', { channel: channel, username: _username3, type: type, userstate: _userstate4 });
            }
            break;
          }

        // Channel is now hosting another channel or exited host mode..
        case 'HOSTTARGET':
          // Stopped hosting..
          if (msg.split(' ')[0] === '-') {
            this.log.info('[' + channel + '] Exited host mode.');
            this.emits(['unhost', '_promiseUnhost'], [[channel, ~~msg.split(' ')[1] || 0], [null]]);
          } else {
            // Now hosting..
            var _viewers = ~~msg.split(' ')[1] || 0;

            this.log.info('[' + channel + '] Now hosting ' + msg.split(' ')[0] + ' for ' + _viewers + ' viewer(s).');
            this.emit('hosting', channel, msg.split(' ')[0], _viewers);
          }
          break;

        // Someone has been timed out or chat has been cleared by a moderator..
        case 'CLEARCHAT':
          // User has been banned / timed out by a moderator..
          if (message.params.length > 1) {
            // Duration returns null if it's a ban, otherwise it's a timeout..
            var duration = _.get(message.tags['ban-duration'], null);

            // Escaping values: http://ircv3.net/specs/core/message-tags-3.2.html#escaping-values
            var reason = _.replaceAll(_.get(message.tags['ban-reason'], null), {
              '\\\\s': ' ',
              '\\\\:': ';',
              '\\\\\\\\': '\\',
              '\\r': '\r',
              '\\n': '\n'
            });

            if (_.isNull(duration)) {
              this.log.info('[' + channel + '] ' + msg + ' has been banned. Reason: ' + (reason || 'n/a'));
              this.emit('ban', channel, msg, reason);
            } else {
              this.log.info('[' + channel + '] ' + msg + ' has been timed out for ' + duration + ' seconds. Reason: ' + (reason || 'n/a'));
              this.emit('timeout', channel, msg, reason, ~~duration);
            }
          } else {
            // Chat was cleared by a moderator..
            this.log.info('[' + channel + '] Chat was cleared by a moderator.');
            this.emits(['clearchat', '_promiseClear'], [[channel], [null]]);
          }
          break;

        // Received a reconnection request from the server..
        case 'RECONNECT':
          this.log.info('Received RECONNECT request from Twitch..');
          this.log.info('Disconnecting and reconnecting in ' + Math.round(this.reconnectTimer / 1000) + ' seconds..');
          this.disconnect();
          setTimeout(function () {
            _this.connect();
          }, this.reconnectTimer);
          break;

        // Wrong cluster..
        case 'SERVERCHANGE':
          //
          break;

        // Received when joining a channel and every time you send a PRIVMSG to a channel.
        case 'USERSTATE':
          message.tags.username = this.username;

          // Add the client to the moderators of this room..
          if (message.tags['user-type'] === 'mod') {
            if (!this.moderators[this.lastJoined]) {
              this.moderators[this.lastJoined] = [];
            }
            if (this.moderators[this.lastJoined].indexOf(this.username) < 0) {
              this.moderators[this.lastJoined].push(this.username);
            }
          }

          // Logged in and username doesn't start with justinfan..
          if (!_.isJustinfan(this.getUsername()) && !this.userstate[channel]) {
            this.userstate[channel] = message.tags;
            this.lastJoined = channel;
            this.channels.push(channel);
            this.log.info('Joined ' + channel);
            this.emit('join', channel, _.username(this.getUsername()), true);
          }

          // Emote-sets has changed, update it..
          if (message.tags['emote-sets'] !== this.emotes) {
            this._updateEmoteset(message.tags['emote-sets']);
          }

          this.userstate[channel] = message.tags;
          break;

        // Describe non-channel-specific state informations..
        case 'GLOBALUSERSTATE':
          this.globaluserstate = message.tags;

          // Received emote-sets..
          if (typeof message.tags['emote-sets'] !== 'undefined') {
            this._updateEmoteset(message.tags['emote-sets']);
          }
          break;

        // Received when joining a channel and every time one of the chat
        // room settings, like slow mode, change.
        // The message on join contains all room settings.
        case 'ROOMSTATE':
          // We use this notice to know if we successfully joined a channel..
          if (_.channel(this.lastJoined) === _.channel(message.params[0])) {
            this.emit('_promiseJoin', null);
          }

          // Provide the channel name in the tags before emitting it..
          message.tags.channel = _.channel(message.params[0]);
          this.emit('roomstate', _.channel(message.params[0]), message.tags);

          // Handle slow mode here instead of the slow_on/off notice..
          // This room is now in slow mode. You may send messages every slow_duration seconds.
          if (message.tags.hasOwnProperty('slow') && !message.tags.hasOwnProperty('subs-only')) {
            if (typeof message.tags.slow === 'boolean') {
              this.log.info('[' + channel + '] This room is no longer in slow mode.');
              this.emits(['slow', 'slowmode', '_promiseSlowoff'], [[channel, false, 0], [channel, false, 0], [null]]);
            } else {
              this.log.info('[' + channel + '] This room is now in slow mode.');
              this.emits(['slow', 'slowmode', '_promiseSlow'], [[channel, true, ~~message.tags.slow], [channel, true, ~~message.tags.slow], [null]]);
            }
          }

          // Handle followers only mode here instead of the followers_on/off notice..
          // This room is now in follower-only mode.
          // This room is now in <duration> followers-only mode.
          // This room is no longer in followers-only mode.
          // duration is in minutes (string)
          // -1 when /followersoff (string)
          // false when /followers with no duration (boolean)
          if (message.tags.hasOwnProperty('followers-only') && !message.tags.hasOwnProperty('subs-only')) {
            if (message.tags['followers-only'] === '-1') {
              this.log.info('[' + channel + '] This room is no longer in followers-only mode.');
              this.emits(['followersonly', 'followersmode', '_promiseFollowersoff'], [[channel, false, 0], [channel, false, 0], [null]]);
            } else {
              var minutes = ~~message.tags['followers-only'];
              this.log.info('[' + channel + '] This room is now in follower-only mode.');
              this.emits(['followersonly', 'followersmode', '_promiseFollowers'], [[channel, true, minutes], [channel, true, minutes], [null]]);
            }
          }
          break;

        default:
          this.log.warn('Could not parse message from tmi.twitch.tv:\n' + JSON.stringify(message, null, 4));
          break;
      }
    } else if (message.prefix === 'jtv') {
      // Messages from jtv..
      switch (message.command) {
        case 'MODE':
          if (msg === '+o') {
            // Add username to the moderators..
            if (!this.moderators[channel]) {
              this.moderators[channel] = [];
            }
            if (this.moderators[channel].indexOf(message.params[2]) < 0) {
              this.moderators[channel].push(message.params[2]);
            }

            this.emit('mod', channel, message.params[2]);
          } else if (msg === '-o') {
            // Remove username from the moderators..
            if (!this.moderators[channel]) {
              this.moderators[channel] = [];
            }
            this.moderators[channel].filter(function (value) {
              return value !== message.params[2];
            });

            this.emit('unmod', channel, message.params[2]);
          }
          break;

        default:
          this.log.warn('Could not parse message from jtv:\n' + JSON.stringify(message, null, 4));
          break;
      }
    } else {
      // Anything else..
      switch (message.command) {
        case '353':
          this.emit('names', message.params[2], message.params[3].split(' '));
          break;

        case '366':
          break;

        // Someone has joined the channel..
        case 'JOIN':
          // Joined a channel as a justinfan (anonymous) user..
          if (_.isJustinfan(this.getUsername()) && this.username === message.prefix.split('!')[0]) {
            this.lastJoined = channel;
            this.channels.push(channel);
            this.log.info('Joined ' + channel);
            this.emit('join', channel, message.prefix.split('!')[0], true);
          }

          // Someone else joined the channel, just emit the join event..
          if (this.username !== message.prefix.split('!')[0]) {
            this.emit('join', channel, message.prefix.split('!')[0], false);
          }
          break;

        // Someone has left the channel..
        case 'PART':
          {
            var isSelf = false;
            var index = void 0;
            // Client a channel..
            if (this.username === message.prefix.split('!')[0]) {
              isSelf = true;
              if (this.userstate[channel]) {
                delete this.userstate[channel];
              }

              index = this.channels.indexOf(channel);
              if (index !== -1) {
                this.channels.splice(index, 1);
              }

              index = this.opts.channels.indexOf(channel);
              if (index !== -1) {
                this.opts.channels.splice(index, 1);
              }

              this.log.info('Left ' + channel);
              this.emit('_promisePart', null);
            }

            // Client or someone else left the channel, emit the part event..
            this.emit('part', channel, message.prefix.split('!')[0], isSelf);
            break;
          }

        // Received a whisper..
        case 'WHISPER':
          {
            this.log.info('[WHISPER] <' + message.prefix.split('!')[0] + '>: ' + msg);

            // Update the tags to provide the username..
            if (!message.tags.hasOwnProperty('username')) {
              message.tags.username = message.prefix.split('!')[0];
            }
            message.tags['message-type'] = 'whisper';

            var from = _.channel(message.tags.username);
            // Emit for both, whisper and message..
            this.emits(['whisper', 'message'], [[from, message.tags, msg, false], [from, message.tags, msg, false]]);
            break;
          }

        case 'PRIVMSG':
          // Add username (lowercase) to the tags..
          message.tags.username = message.prefix.split('!')[0];

          // Message from JTV..
          if (message.tags.username === 'jtv') {
            // Someone is hosting the channel and the message contains how many viewers..
            if (msg.includes('hosting you for')) {
              var count = _.extractNumber(msg);

              this.emit('hosted', channel, _.username(msg.split(' ')[0]), count, msg.includes('auto'));
            } else if (msg.includes('hosting you')) {
              // Some is hosting the channel, but no viewer(s) count provided in
              // the message..
              this.emit('hosted', channel, _.username(msg.split(' ')[0]), 0, msg.includes('auto'));
            }
          } else {
            // Message is an action (/me <message>)..
            if (msg.match(/^\u0001ACTION ([^\u0001]+)\u0001$/)) {
              message.tags['message-type'] = 'action';
              this.log.info('[' + channel + '] *<' + message.tags.username + '>: ' + msg.match(/^\u0001ACTION ([^\u0001]+)\u0001$/)[1]);
              this.emits(['action', 'message'], [[channel, message.tags, msg.match(/^\u0001ACTION ([^\u0001]+)\u0001$/)[1], false], [channel, message.tags, msg.match(/^\u0001ACTION ([^\u0001]+)\u0001$/)[1], false]]);
            } else if (message.tags.hasOwnProperty('bits')) {
              this.emit('cheer', channel, message.tags, msg);
            } else {
              // Message is a regular chat message..
              message.tags['message-type'] = 'chat';
              this.log.info('[' + channel + '] <' + message.tags.username + '>: ' + msg);

              this.emits(['chat', 'message'], [[channel, message.tags, msg, false], [channel, message.tags, msg, false]]);
            }
          }
          break;

        default:
          this.log.warn('Could not parse message:\n' + JSON.stringify(message, null, 4));
          break;
      }
    }
  }
};

// Connect to server..
client.prototype.connect = function connect() {
  var _this2 = this;

  return new Promise(function (resolve, reject) {
    _this2.server = _.get(_this2.opts.connection.server, 'irc-ws.chat.twitch.tv');
    _this2.port = _.get(_this2.opts.connection.port, 80);

    // Override port if using a secure connection..
    if (_this2.secure) {
      _this2.port = 443;
    }
    if (_this2.port === 443) {
      _this2.secure = true;
    }

    _this2.reconnectTimer = _this2.reconnectTimer * _this2.reconnectDecay;
    if (_this2.reconnectTimer >= _this2.maxReconnectInterval) {
      _this2.reconnectTimer = _this2.maxReconnectInterval;
    }

    // Connect to server from configuration..
    _this2._openConnection();
    _this2.once('_promiseConnect', function (err) {
      if (!err) {
        resolve([_this2.server, ~~_this2.port]);
      } else {
        reject(err);
      }
    });
  });
};

// Open a connection..
client.prototype._openConnection = function _openConnection() {
  this.ws = new ws((this.secure ? 'wss' : 'ws') + '://' + this.server + ':' + this.port + '/', 'irc');

  this.ws.onmessage = this._onMessage.bind(this);
  this.ws.onerror = this._onError.bind(this);
  this.ws.onclose = this._onClose.bind(this);
  this.ws.onopen = this._onOpen.bind(this);
};

// Called when the WebSocket connection's readyState changes to OPEN.
// Indicates that the connection is ready to send and receive data..
client.prototype._onOpen = function _onOpen() {
  if (!_.isNull(this.ws) && this.ws.readyState === 1) {
    // Emitting "connecting" event..
    this.log.info('Connecting to ' + this.server + ' on port ' + this.port + '..');
    this.emit('connecting', this.server, ~~this.port);

    this.username = _.get(this.opts.identity.username, _.justinfan());
    this.password = _.password(_.get(this.opts.identity.password, 'SCHMOOPIIE'));

    // Emitting "logon" event..
    this.log.info('Sending authentication to server..');
    this.emit('logon');

    // Authentication..
    this.ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
    this.ws.send('PASS ' + this.password);
    this.ws.send('NICK ' + this.username);
    this.ws.send('USER ' + this.username + ' 8 * :' + this.username);
  }
};

// Called when a message is received from the server..
client.prototype._onMessage = function _onMessage(event) {
  var _this3 = this;

  var parts = event.data.split('\r\n');

  parts.forEach(function (str) {
    if (!_.isNull(str)) {
      _this3.handleMessage(parse.msg(str));
    }
  });
};

// Called when an error occurs..
client.prototype._onError = function _onError() {
  var _this4 = this;

  this.moderators = {};
  this.userstate = {};
  this.globaluserstate = {};

  // Stop the internal ping timeout check interval..
  clearInterval(this.pingLoop);
  clearTimeout(this.pingTimeout);

  this.reason = !_.isNull(this.ws) ? 'Unable to connect.' : 'Connection closed.';

  this.emits(['_promiseConnect', 'disconnected'], [[this.reason], [this.reason]]);

  // Reconnect to server..
  if (this.reconnect && this.reconnections === this.maxReconnectAttempts) {
    this.emit('maxreconnect');
    this.log.error('Maximum reconnection attempts reached.');
  }
  if (this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1) {
    this.reconnecting = true;
    this.reconnections = this.reconnections + 1;
    this.log.error('Reconnecting in ' + Math.round(this.reconnectTimer / 1000) + ' seconds..');
    this.emit('reconnect');
    setTimeout(function () {
      _this4.reconnecting = false;
      _this4.connect();
    }, this.reconnectTimer);
  }

  this.ws = null;
};

// Called when the WebSocket connection's readyState changes to CLOSED..
client.prototype._onClose = function _onClose() {
  var _this5 = this;

  this.moderators = {};
  this.userstate = {};
  this.globaluserstate = {};

  // Stop the internal ping timeout check interval..
  clearInterval(this.pingLoop);
  clearTimeout(this.pingTimeout);

  // User called .disconnect(), don't try to reconnect.
  if (this.wasCloseCalled) {
    this.wasCloseCalled = false;
    this.reason = 'Connection closed.';
    this.log.info(this.reason);
    this.emits(['_promiseConnect', '_promiseDisconnect', 'disconnected'], [[this.reason], [null], [this.reason]]);
  } else {
    // Got disconnected from server..
    this.emits(['_promiseConnect', 'disconnected'], [[this.reason], [this.reason]]);

    // Reconnect to server..
    if (this.reconnect && this.reconnections === this.maxReconnectAttempts) {
      this.emit('maxreconnect');
      this.log.error('Maximum reconnection attempts reached.');
    }
    if (this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1) {
      this.reconnecting = true;
      this.reconnections = this.reconnections + 1;
      this.log.error('Could not connect to server. Reconnecting in ' + Math.round(this.reconnectTimer / 1000) + ' seconds..');
      this.emit('reconnect');
      setTimeout(function () {
        _this5.reconnecting = false;
        _this5.connect();
      }, this.reconnectTimer);
    }
  }

  this.ws = null;
};

// Promise delay for commands will fluctuate with the current server latency to
// make sure it doesn't time out prematurely
client.prototype._getPromiseDelay = function _getPromiseDelay() {
  return this.currentLatency + _.get(this.opts.options.commandTimeout, 600);
};

// Send command to server or channel..
client.prototype._sendCommand = function _sendCommand(delay, channel, command, fn) {
  var _this6 = this;

  // Race promise against delay..
  return new Promise(function (resolve, reject) {
    _.promiseDelay(delay).then(function () {
      reject('No response from Twitch.');
    });

    // Make sure the socket is opened..
    if (!_.isNull(_this6.ws) && _this6.ws.readyState !== 2 && _this6.ws.readyState !== 3) {
      // Executing a command on a channel..
      if (!_.isNull(channel)) {
        _this6.log.info('[' + _.channel(channel) + '] Executing command: ' + command);
        _this6.ws.send('PRIVMSG ' + _.channel(channel) + ' :' + command);
      } else {
        // Executing a raw command..
        _this6.log.info('Executing command: ' + command);
        _this6.ws.send(command);
      }
      fn(resolve, reject);
    } else {
      // Disconnected from server..
      reject('Not connected to server.');
    }
  });
};

// Send a message to channel..
client.prototype._sendMessage = function _sendMessage(delay, channel, message, fn) {
  var _this7 = this;

  // Promise a result..
  return new Promise(function (resolve, reject) {
    // Make sure the socket is opened and not logged in as a justinfan user..
    if (!_.isNull(_this7.ws) && _this7.ws.readyState !== 2 && _this7.ws.readyState !== 3 && !_.isJustinfan(_this7.getUsername())) {
      if (!_this7.userstate[_.channel(channel)]) {
        _this7.userstate[_.channel(channel)] = {};
      }

      // Split long lines otherwise they will be eaten by the server..
      if (message.length >= 500) {
        var msg = _.splitLine(message, 500);
        message = msg[0];

        setTimeout(function () {
          _this7._sendMessage(delay, channel, msg[1], function () {});
        }, 350);
      }

      _this7.ws.send('PRIVMSG ' + _.channel(channel) + ' :' + message);

      var emotes = {};

      // Parse regex and string emotes..
      Object.keys(_this7.emotesets).forEach(function (id) {
        _this7.emotesets[id].forEach(function (emote) {
          if (_.isRegex(emote.code)) {
            return parse.emoteRegex(message, emote.code, emote.id, emotes);
          }
          parse.emoteString(message, emote.code, emote.id, emotes);
        });
      });

      // Merge userstate with parsed emotes..
      var userstate = _.merge(_this7.userstate[_.channel(channel)], parse.emotes({ emotes: parse.transformEmotes(emotes) || null }));

      // Message is an action (/me <message>)..
      if (message.match(/^\u0001ACTION ([^\u0001]+)\u0001$/)) {
        userstate['message-type'] = 'action';
        _this7.log.info('[' + _.channel(channel) + '] *<' + _this7.getUsername() + '>: ' + message.match(/^\u0001ACTION ([^\u0001]+)\u0001$/)[1]);
        _this7.emits(['action', 'message'], [[_.channel(channel), userstate, message.match(/^\u0001ACTION ([^\u0001]+)\u0001$/)[1], true], [_.channel(channel), userstate, message.match(/^\u0001ACTION ([^\u0001]+)\u0001$/)[1], true]]);
      } else {
        // Message is a regular chat message..
        userstate['message-type'] = 'chat';
        _this7.log.info('[' + _.channel(channel) + '] <' + _this7.getUsername() + '>: ' + message);
        _this7.emits(['chat', 'message'], [[_.channel(channel), userstate, message, true], [_.channel(channel), userstate, message, true]]);
      }
      fn(resolve, reject);
    } else {
      reject('Not connected to server.');
    }
  });
};

// Grab the emote-sets object from the API..
client.prototype._updateEmoteset = function _updateEmoteset(sets) {
  var _this8 = this;

  this.emotes = sets;

  this.api({
    url: '/chat/emoticon_images?emotesets=' + sets,
    headers: {
      Authorization: 'OAuth ' + _.password(_.get(this.opts.identity.password, '')).replace('oauth:', ''),
      'Client-ID': this.clientId
    }
  }, function (err, res, body) {
    if (!err) {
      _this8.emotesets = body.emoticon_sets || {};
      return _this8.emit('emotesets', sets, _this8.emotesets);
    }
    setTimeout(function () {
      _this8._updateEmoteset(sets);
    }, 60000);
  });
};

// Get current username..
client.prototype.getUsername = function getUsername() {
  return this.username;
};

// Get current options..
client.prototype.getOptions = function getOptions() {
  return this.opts;
};

// Get current channels..
client.prototype.getChannels = function getChannels() {
  return this.channels;
};

// Check if username is a moderator on a channel..
client.prototype.isMod = function isMod(channel, username) {
  if (!this.moderators[_.channel(channel)]) {
    this.moderators[_.channel(channel)] = [];
  }
  if (this.moderators[_.channel(channel)].indexOf(_.username(username)) >= 0) {
    return true;
  }
  return false;
};

// Get readyState..
client.prototype.readyState = function readyState() {
  if (_.isNull(this.ws)) {
    return 'CLOSED';
  }
  return ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][this.ws.readyState];
};

// Disconnect from server..
client.prototype.disconnect = function disconnect() {
  var _this9 = this;

  return new Promise(function (resolve, reject) {
    if (!_.isNull(_this9.ws) && _this9.ws.readyState !== 3) {
      _this9.wasCloseCalled = true;
      _this9.log.info('Disconnecting from server..');
      _this9.ws.close();
      _this9.once('_promiseDisconnect', function () {
        resolve([_this9.server, ~~_this9.port]);
      });
    } else {
      _this9.log.error('Cannot disconnect from server. Socket is not opened or connection is already closing.');
      reject('Cannot disconnect from server. Socket is not opened or connection is already closing.');
    }
  });
};

client.prototype.utils = {
  levenshtein: function levenshtein(s1, s2, caseSensitive) {
    var cost_ins = 1;
    var cost_rep = 1;
    var cost_del = 1;
    caseSensitive = _.get(caseSensitive, false);

    if (!caseSensitive) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();
    }

    if (s1 === s2) {
      return 0;
    }

    var l1 = s1.length;
    var l2 = s2.length;

    if (l1 === 0) {
      return l2 * cost_ins;
    }
    if (l2 === 0) {
      return l1 * cost_del;
    }

    var split = false;
    try {
      split = !'0'[0];
    } catch (e) {
      split = true;
    }
    if (split) {
      s1 = s1.split('');
      s2 = s2.split('');
    }

    var p1 = new Array(l2 + 1);
    var p2 = new Array(l2 + 1);

    var i1 = void 0;
    var i2 = void 0;
    var c0 = void 0;
    var c1 = void 0;
    var c2 = void 0;
    var tmp = void 0;

    for (i2 = 0; i2 <= l2; i2++) {
      p1[i2] = i2 * cost_ins;
    }

    for (i1 = 0; i1 < l1; i1++) {
      p2[0] = p1[0] + cost_del;

      for (i2 = 0; i2 < l2; i2++) {
        c0 = p1[i2] + (s1[i1] === s2[i2] ? 0 : cost_rep);
        c1 = p1[i2 + 1] + cost_del;

        if (c1 < c0) {
          c0 = c1;
        }

        c2 = p2[i2] + cost_ins;

        if (c2 < c0) {
          c0 = c2;
        }

        p2[i2 + 1] = c0;
      }

      tmp = p1;
      p1 = p2;
      p2 = tmp;
    }

    c0 = p1[l2];

    return c0;
  },
  raffle: {
    init: function init(channel) {
      if (!this.raffleChannels) {
        this.raffleChannels = {};
      }
      if (!this.raffleChannels[_.channel(channel)]) {
        this.raffleChannels[_.channel(channel)] = [];
      }
    },
    enter: function enter(channel, username) {
      this.init(channel);
      this.raffleChannels[_.channel(channel)].push(username.toLowerCase());
    },
    leave: function leave(channel, username) {
      this.init(channel);
      var index = this.raffleChannels[_.channel(channel)].indexOf(_.username(username));
      if (index >= 0) {
        this.raffleChannels[_.channel(channel)].splice(index, 1);
        return true;
      }
      return false;
    },
    pick: function pick(channel) {
      this.init(channel);
      var count = this.raffleChannels[_.channel(channel)].length;
      if (count >= 1) {
        return this.raffleChannels[_.channel(channel)][Math.floor(Math.random() * count)];
      }
      return null;
    },
    reset: function reset(channel) {
      this.init(channel);
      this.raffleChannels[_.channel(channel)] = [];
    },
    count: function count(channel) {
      this.init(channel);
      if (this.raffleChannels[_.channel(channel)]) {
        return this.raffleChannels[_.channel(channel)].length;
      }
      return 0;
    },
    isParticipating: function isParticipating(channel, username) {
      this.init(channel);
      if (this.raffleChannels[_.channel(channel)].indexOf(_.username(username)) >= 0) {
        return true;
      }
      return false;
    }
  },
  symbols: function symbols(line) {
    var count = 0;
    for (var i = 0; i < line.length; i++) {
      var charCode = line.substring(i, i + 1).charCodeAt(0);
      if (charCode <= 30 || charCode >= 127 || charCode === 65533) {
        count++;
      }
    }
    return Math.ceil(count / line.length * 100) / 100;
  },
  uppercase: function uppercase(line) {
    var chars = line.length;
    var u_let = line.match(/[A-Z]/g);
    if (!_.isNull(u_let)) {
      return u_let.length / chars;
    }
    return 0;
  }
};

// Expose everything, for browser and Node..
if (typeof module !== 'undefined' && module.exports) {
  module.exports = client;
}
if (typeof window !== 'undefined') {
  window.tmi = {};
  window.tmi.client = client;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(70);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(73);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isFunction2 = __webpack_require__(60);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _get2 = __webpack_require__(101);

var _get3 = _interopRequireDefault(_get2);

var _isURL = __webpack_require__(139);

var _isURL2 = _interopRequireDefault(_isURL);

var _fetchHelper = __webpack_require__(142);

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

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(71);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(72);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 72 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(74);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
__webpack_require__(44);
__webpack_require__(54);
__webpack_require__(85);
__webpack_require__(96);
__webpack_require__(97);
module.exports = __webpack_require__(2).Promise;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(48);
var descriptor = __webpack_require__(17);
var setToStringTag = __webpack_require__(20);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(4)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(3);
var getKeys = __webpack_require__(18);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10);
var toLength = __webpack_require__(51);
var toAbsoluteIndex = __webpack_require__(80);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(8);
var toObject = __webpack_require__(53);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(83);
var step = __webpack_require__(84);
var Iterators = __webpack_require__(12);
var toIObject = __webpack_require__(10);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(45)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(14);
var global = __webpack_require__(0);
var ctx = __webpack_require__(15);
var classof = __webpack_require__(55);
var $export = __webpack_require__(9);
var isObject = __webpack_require__(6);
var aFunction = __webpack_require__(16);
var anInstance = __webpack_require__(86);
var forOf = __webpack_require__(87);
var speciesConstructor = __webpack_require__(56);
var task = __webpack_require__(57).set;
var microtask = __webpack_require__(92)();
var newPromiseCapabilityModule = __webpack_require__(33);
var perform = __webpack_require__(58);
var promiseResolve = __webpack_require__(59);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(93)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(20)($Promise, PROMISE);
__webpack_require__(94)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(95)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var call = __webpack_require__(88);
var isArrayIter = __webpack_require__(89);
var anObject = __webpack_require__(3);
var toLength = __webpack_require__(51);
var getIterFn = __webpack_require__(90);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(3);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(12);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(55);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(12);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var macrotask = __webpack_require__(57).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(13)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(4);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var core = __webpack_require__(2);
var dP = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(9);
var core = __webpack_require__(2);
var global = __webpack_require__(0);
var speciesConstructor = __webpack_require__(56);
var promiseResolve = __webpack_require__(59);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(9);
var newPromiseCapability = __webpack_require__(33);
var perform = __webpack_require__(58);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(34);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(102);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(103),
    toKey = __webpack_require__(138);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(36),
    isKey = __webpack_require__(104),
    stringToPath = __webpack_require__(106),
    toString = __webpack_require__(135);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(36),
    isSymbol = __webpack_require__(37);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 105 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(107);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(108);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(109);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(110),
    mapCacheDelete = __webpack_require__(130),
    mapCacheGet = __webpack_require__(132),
    mapCacheHas = __webpack_require__(133),
    mapCacheSet = __webpack_require__(134);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(111),
    ListCache = __webpack_require__(122),
    Map = __webpack_require__(129);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(112),
    hashDelete = __webpack_require__(118),
    hashGet = __webpack_require__(119),
    hashHas = __webpack_require__(120),
    hashSet = __webpack_require__(121);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(21);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(60),
    isMasked = __webpack_require__(114),
    isObject = __webpack_require__(62),
    toSource = __webpack_require__(116);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(115);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(35);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 116 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 117 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 118 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(21);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(21);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(21);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(123),
    listCacheDelete = __webpack_require__(124),
    listCacheGet = __webpack_require__(126),
    listCacheHas = __webpack_require__(127),
    listCacheSet = __webpack_require__(128);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 123 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(22);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 125 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(22);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(22);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(22);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(63),
    root = __webpack_require__(35);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(23);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 131 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(23);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(23);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(23);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(136);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(34),
    arrayMap = __webpack_require__(137),
    isArray = __webpack_require__(36),
    isSymbol = __webpack_require__(37);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 137 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(37);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isURL;

var _assertString = __webpack_require__(38);

var _assertString2 = _interopRequireDefault(_assertString);

var _isFQDN = __webpack_require__(140);

var _isFQDN2 = _interopRequireDefault(_isFQDN);

var _isIP = __webpack_require__(141);

var _isIP2 = _interopRequireDefault(_isIP);

var _merge = __webpack_require__(64);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false
};

var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];
    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }
  return false;
}

function isURL(url, options) {
  (0, _assertString2.default)(url);
  if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
    return false;
  }
  if (url.indexOf('mailto:') === 0) {
    return false;
  }
  options = (0, _merge2.default)(options, default_url_options);
  var protocol = void 0,
      auth = void 0,
      host = void 0,
      hostname = void 0,
      port = void 0,
      port_str = void 0,
      split = void 0,
      ipv6 = void 0;

  split = url.split('#');
  url = split.shift();

  split = url.split('?');
  url = split.shift();

  split = url.split('://');
  if (split.length > 1) {
    protocol = split.shift();
    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
    split[0] = url.substr(2);
  }
  url = split.join('://');

  if (url === '') {
    return false;
  }

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');
  if (split.length > 1) {
    auth = split.shift();
    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
  }
  hostname = split.join('@');

  port_str = null;
  ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);
  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();
    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null) {
    port = parseInt(port_str, 10);
    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  }

  if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && (!ipv6 || !(0, _isIP2.default)(ipv6, 6))) {
    return false;
  }

  host = host || ipv6;

  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
    return false;
  }
  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}
module.exports = exports['default'];

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFQDN;

var _assertString = __webpack_require__(38);

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__(64);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFQDN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    // disallow spaces
    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;

var _assertString = __webpack_require__(38);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _assertString2.default)(str);
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }
    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  } else if (version === '6') {
    var blocks = str.split(':');
    var foundOmissionBlock = false; // marker to indicate ::

    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.
    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    }
    // initial or final ::
    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (var i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }
        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
        // it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }
    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }
    return blocks.length === expectedNumberOfBlocks;
  }
  return false;
}
module.exports = exports['default'];

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseResponse = undefined;

var _extends2 = __webpack_require__(143);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(148);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _nodeFetch = __webpack_require__(149);

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

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(144);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(146);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(9);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(147) });


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(18);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(24);
var toObject = __webpack_require__(53);
var IObject = __webpack_require__(50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(150);

exports.default = fetch;

/***/ }),
/* 150 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(25);

// Enable followers-only mode on a channel..
function followersonly(channel, minutes) {
  var _this = this;

  channel = _.channel(channel);
  minutes = _.get(minutes, 30);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/followers ' + minutes, function (resolve, reject) {
    // Received _promiseFollowers event, resolve or reject..
    _this.once('_promiseFollowers', function (err) {
      if (!err) {
        resolve([channel, ~~minutes]);
      } else {
        reject(err);
      }
    });
  });
}

// Disable followers-only mode on a channel..
function followersonlyoff(channel) {
  var _this2 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/followersoff', function (resolve, reject) {
    // Received _promiseFollowersoff event, resolve or reject..
    _this2.once('_promiseFollowersoff', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

// Leave a channel..
function part(channel) {
  var _this3 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), null, 'PART ' + channel, function (resolve, reject) {
    // Received _promisePart event, resolve or reject..
    _this3.once('_promisePart', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

// Enable R9KBeta mode on a channel..
function r9kbeta(channel) {
  var _this4 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/r9kbeta', function (resolve, reject) {
    // Received _promiseR9kbeta event, resolve or reject..
    _this4.once('_promiseR9kbeta', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

// Disable R9KBeta mode on a channel..
function r9kbetaoff(channel) {
  var _this5 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/r9kbetaoff', function (resolve, reject) {
    // Received _promiseR9kbetaoff event, resolve or reject..
    _this5.once('_promiseR9kbetaoff', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

// Enable slow mode on a channel..
function slow(channel, seconds) {
  var _this6 = this;

  channel = _.channel(channel);
  seconds = _.get(seconds, 300);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/slow ' + seconds, function (resolve, reject) {
    // Received _promiseSlow event, resolve or reject..
    _this6.once('_promiseSlow', function (err) {
      if (!err) {
        resolve([channel, ~~seconds]);
      } else {
        reject(err);
      }
    });
  });
}

// Disable slow mode on a channel..
function slowoff(channel) {
  var _this7 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/slowoff', function (resolve, reject) {
    // Received _promiseSlowoff event, resolve or reject..
    _this7.once('_promiseSlowoff', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = {
  // Send action message (/me <message>) on a channel..
  action: function action(channel, message) {
    channel = _.channel(channel);
    message = '\x01ACTION ' + message + '\x01';

    // Send the command to the server and race the Promise against a delay..
    return this._sendMessage(this._getPromiseDelay(), channel, message, function (resolve) {
      // At this time, there is no possible way to detect
      // if a message has been sent has been eaten
      // by the server, so we can only resolve the Promise.
      resolve([channel, message]);
    });
  },

  // Ban username on channel..
  ban: function ban(channel, username, reason) {
    var _this8 = this;

    channel = _.channel(channel);
    username = _.username(username);
    reason = _.get(reason, '');

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/ban ' + username + ' ' + reason, function (resolve, reject) {
      // Received _promiseBan event, resolve or reject..
      _this8.once('_promiseBan', function (err) {
        if (!err) {
          resolve([channel, username, reason]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Clear all messages on a channel..
  clear: function clear(channel) {
    var _this9 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/clear', function (resolve, reject) {
      // Received _promiseClear event, resolve or reject..
      _this9.once('_promiseClear', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Change the color of your username..
  color: function color(channel, newColor) {
    var _this10 = this;

    newColor = _.get(newColor, channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), '#tmijs', '/color ' + newColor, function (resolve, reject) {
      // Received _promiseColor event, resolve or reject..
      _this10.once('_promiseColor', function (err) {
        if (!err) {
          resolve([newColor]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Run commercial on a channel for X seconds..
  commercial: function commercial(channel, seconds) {
    var _this11 = this;

    channel = _.channel(channel);
    seconds = _.get(seconds, 30);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/commercial ' + seconds, function (resolve, reject) {
      // Received _promiseCommercial event, resolve or reject..
      _this11.once('_promiseCommercial', function (err) {
        if (!err) {
          resolve([channel, ~~seconds]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Enable emote-only mode on a channel..
  emoteonly: function emoteonly(channel) {
    var _this12 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/emoteonly', function (resolve, reject) {
      // Received _promiseEmoteonly event, resolve or reject..
      _this12.once('_promiseEmoteonly', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Disable emote-only mode on a channel..
  emoteonlyoff: function emoteonlyoff(channel) {
    var _this13 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/emoteonlyoff', function (resolve, reject) {
      // Received _promiseEmoteonlyoff event, resolve or reject..
      _this13.once('_promiseEmoteonlyoff', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Enable followers-only mode on a channel..
  followersonly: followersonly,

  // Alias for followersonly()..
  followersmode: followersonly,

  // Disable followers-only mode on a channel..
  followersonlyoff: followersonlyoff,

  // Alias for followersonlyoff()..
  followersmodeoff: followersonlyoff,

  // Host a channel..
  host: function host(channel, target) {
    var _this14 = this;

    channel = _.channel(channel);
    target = _.username(target);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(2000, channel, '/host ' + target, function (resolve, reject) {
      // Received _promiseHost event, resolve or reject..
      _this14.once('_promiseHost', function (err, remaining) {
        if (!err) {
          resolve([channel, target, ~~remaining]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Join a channel..
  join: function join(channel) {
    var _this15 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), null, 'JOIN ' + channel, function (resolve, reject) {
      // Received _promiseJoin event, resolve or reject..
      _this15.once('_promiseJoin', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Mod username on channel..
  mod: function mod(channel, username) {
    var _this16 = this;

    channel = _.channel(channel);
    username = _.username(username);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/mod ' + username, function (resolve, reject) {
      // Received _promiseMod event, resolve or reject..
      _this16.once('_promiseMod', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Get list of mods on a channel..
  mods: function mods(channel) {
    var _this17 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/mods', function (resolve, reject) {
      // Received _promiseMods event, resolve or reject..
      _this17.once('_promiseMods', function (err, mods) {
        if (!err) {
          // Update the internal list of moderators..
          mods.forEach(function (username) {
            if (!_this17.moderators[channel]) {
              _this17.moderators[channel] = [];
            }
            if (_this17.moderators[channel].indexOf(username) < 0) {
              _this17.moderators[channel].push(username);
            }
          });
          resolve(mods);
        } else {
          reject(err);
        }
      });
    });
  },


  // Leave a channel..
  part: part,

  // Alias for part()..
  leave: part,

  // Send a ping to the server..
  ping: function ping() {
    var _this18 = this;

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), null, 'PING', function (resolve) {
      // Update the internal ping timeout check interval..
      _this18.latency = new Date();
      _this18.pingTimeout = setTimeout(function () {
        if (_this18.ws !== null) {
          _this18.wasCloseCalled = false;
          _this18.log.error('Ping timeout.');
          _this18.ws.close();

          clearInterval(_this18.pingLoop);
          clearTimeout(_this18.pingTimeout);
        }
      }, _.get(_this18.opts.connection.timeout, 9999));

      // Received _promisePing event, resolve or reject..
      _this18.once('_promisePing', function (latency) {
        resolve([parseFloat(latency)]);
      });
    });
  },

  // Enable R9KBeta mode on a channel..
  r9kbeta: r9kbeta,

  // Alias for r9kbeta()..
  r9kmode: r9kbeta,

  // Disable R9KBeta mode on a channel..
  r9kbetaoff: r9kbetaoff,

  // Alias for r9kbetaoff()..
  r9kmodeoff: r9kbetaoff,

  // Send a raw message to the server..
  raw: function raw(message) {
    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), null, message, function (resolve) {
      resolve([message]);
    });
  },

  // Send a message on a channel..
  say: function say(channel, message) {
    channel = _.channel(channel);

    if (message.startsWith('.') && !message.startsWith('..') || message.startsWith('/') || message.startsWith('\\')) {
      // Check if the message is an action message..
      if (message.substr(1, 3) === 'me ') {
        return this.action(channel, message.substr(4));
      }

      // Send the command to the server and race the Promise against a delay..
      return this._sendCommand(this._getPromiseDelay(), channel, message, function (resolve) {
        // At this time, there is no possible way to detect if a message has
        // been sent has been eaten by the server, so we can only resolve the
        // Promise.
        resolve([channel, message]);
      });
    }

    // Send the command to the server and race the Promise against a delay..
    return this._sendMessage(this._getPromiseDelay(), channel, message, function (resolve) {
      // At this time, there is no possible way to detect
      // if a message has been sent has been eaten
      // by the server, so we can only resolve the Promise.
      resolve([channel, message]);
    });
  },

  // Enable slow mode on a channel..
  slow: slow,

  // Alias for slow()..
  slowmode: slow,

  // Disable slow mode on a channel..
  slowoff: slowoff,

  // Alias for slowoff()..
  slowmodeoff: slowoff,

  // Enable subscribers mode on a channel..
  subscribers: function subscribers(channel) {
    var _this19 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/subscribers', function (resolve, reject) {
      // Received _promiseSubscribers event, resolve or reject..
      _this19.once('_promiseSubscribers', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Disable subscribers mode on a channel..
  subscribersoff: function subscribersoff(channel) {
    var _this20 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/subscribersoff', function (resolve, reject) {
      // Received _promiseSubscribersoff event, resolve or reject..
      _this20.once('_promiseSubscribersoff', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Timeout username on channel for X seconds..
  timeout: function timeout(channel, username, seconds, reason) {
    var _this21 = this;

    channel = _.channel(channel);
    username = _.username(username);

    if (!_.isNull(seconds) && !_.isInteger(seconds)) {
      reason = seconds;
      seconds = 300;
    }

    seconds = _.get(seconds, 300);
    reason = _.get(reason, '');

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/timeout ' + username + ' ' + seconds + ' ' + reason, function (resolve, reject) {
      // Received _promiseTimeout event, resolve or reject..
      _this21.once('_promiseTimeout', function (err) {
        if (!err) {
          resolve([channel, username, ~~seconds, reason]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Unban username on channel..
  unban: function unban(channel, username) {
    var _this22 = this;

    channel = _.channel(channel);
    username = _.username(username);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/unban ' + username, function (resolve, reject) {
      // Received _promiseUnban event, resolve or reject..
      _this22.once('_promiseUnban', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },

  // End the current hosting..
  unhost: function unhost(channel) {
    var _this23 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(2000, channel, '/unhost', function (resolve, reject) {
      // Received _promiseUnhost event, resolve or reject..
      _this23.once('_promiseUnhost', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Unmod username on channel..
  unmod: function unmod(channel, username) {
    var _this24 = this;

    channel = _.channel(channel);
    username = _.username(username);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/unmod ' + username, function (resolve, reject) {
      // Received _promiseUnmod event, resolve or reject..
      _this24.once('_promiseUnmod', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Send an whisper message to a user..
  whisper: function whisper(username, message) {
    var _this25 = this;

    username = _.username(username);

    // The server will not send a whisper to the account that sent it.
    if (username === this.getUsername()) {
      return Promise.reject('Cannot send a whisper to the same account.');
    }

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), '#tmijs', '/w ' + username + ' ' + message, function (resolve) {
      var from = _.channel(username);
      var userstate = _.merge({
        'message-type': 'whisper',
        'message-id': null,
        'thread-id': null,
        username: _this25.getUsername()
      }, _this25.globaluserstate);

      // Emit for both, whisper and message..
      _this25.emits(['whisper', 'message'], [[from, userstate, message, true], [from, userstate, message, true]]);

      // At this time, there is no possible way to detect
      // if a message has been sent has been eaten
      // by the server, so we can only resolve the Promise.
      resolve([username, message]);
    });
  }
};

/***/ }),
/* 152 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(154), __esModule: true };

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(54);
module.exports = __webpack_require__(40).f('iterator');


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(156), __esModule: true };

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(157);
__webpack_require__(43);
__webpack_require__(163);
__webpack_require__(164);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(47);
var META = __webpack_require__(158).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(31);
var setToStringTag = __webpack_require__(20);
var uid = __webpack_require__(19);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(40);
var wksDefine = __webpack_require__(41);
var enumKeys = __webpack_require__(159);
var isArray = __webpack_require__(160);
var anObject = __webpack_require__(3);
var isObject = __webpack_require__(6);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(29);
var createDesc = __webpack_require__(17);
var _create = __webpack_require__(48);
var gOPNExt = __webpack_require__(161);
var $GOPD = __webpack_require__(162);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(18);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(66).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(24).f = $propertyIsEnumerable;
  __webpack_require__(39).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(14)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(4)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(19)('meta');
var isObject = __webpack_require__(6);
var has = __webpack_require__(8);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(18);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(24);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(13);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(10);
var gOPN = __webpack_require__(66).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(24);
var createDesc = __webpack_require__(17);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(29);
var has = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(46);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41)('asyncIterator');


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41)('observable');


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(65);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */

/*
 * Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}

module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) {
    throw TypeError('n must be a positive number');
  }

  this._maxListeners = n;

  return this;
};

// Emit multiple events..
EventEmitter.prototype.emits = function (types, values) {
  for (var i = 0; i < types.length; i++) {
    values[i].unshift(types[i]);
    this.emit.apply(this, values[i]);
  }
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) {
    this._events = {};
  }

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er;
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) {
    return false;
  }

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) {
    throw TypeError('listener must be a function');
  }

  if (!this._events) {
    this._events = {};
  }

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener) {
    this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
  }

  // Optimize the case of one listener. Don't need the extra array object.
  if (!this._events[type]) {
    this._events[type] = listener;
  } else if (isObject(this._events[type])) {
    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      // Not supported in IE 10
      if (typeof console.trace === 'function') {
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

// Modified to support multiple calls..
EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) {
    throw TypeError('listener must be a function');
  }

  var fired = false;

  if (this._events.hasOwnProperty(type) && type.charAt(0) === '_') {
    var count = 1;
    var searchFor = type;

    for (var k in this._events) {
      if (this._events.hasOwnProperty(k) && k.startsWith(searchFor)) {
        count++;
      }
    }
    type = type + count;
  }

  function g() {
    if (type.charAt(0) === '_' && !isNaN(type.substr(type.length - 1))) {
      type = type.substring(0, type.length - 1);
    }
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// Emits a "removeListener" event if the listener was removed..
// Modified to support multiple calls from .once()..
EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) {
    throw TypeError('listener must be a function');
  }

  if (!this._events || !this._events[type]) {
    return this;
  }

  list = this._events[type];
  length = list.length;
  position = -1;
  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];

    if (this._events.hasOwnProperty(type + '2') && type.charAt(0) === '_') {
      var searchFor = type;
      for (var k in this._events) {
        if (this._events.hasOwnProperty(k) && k.startsWith(searchFor)) {
          if (!isNaN(parseInt(k.substr(k.length - 1)))) {
            this._events[type + parseInt(k.substr(k.length - 1) - 1)] = this._events[k];
            delete this._events[k];
          }
        }
      }

      this._events[type] = this._events[type + '1'];
      delete this._events[type + '1'];
    }
    if (this._events.removeListener) {
      this.emit('removeListener', type, listener);
    }
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) {
      return this;
    }

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) {
      this.emit('removeListener', type, listener);
    }
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) {
    return this;
  }

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0) {
      this._events = {};
    } else if (this._events[type]) {
      delete this._events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') {
        continue;
      }
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) {
    ret = [];
  } else if (isFunction(this._events[type])) {
    ret = [this._events[type]];
  } else {
    ret = this._events[type].slice();
  }
  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }
  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-console */

var _ = __webpack_require__(25);

var currentLevel = 'info';
var levels = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
};

// Logger implementation..
function log(level) {
  // Return a console message depending on the logging level..
  return function (message) {
    if (levels[level] >= levels[currentLevel]) {
      console.log('[' + _.formatDate(new Date()) + '] ' + level + ': ' + message);
    }
  };
}

module.exports = {
  // Change the current logging level..
  setLevel: function setLevel(level) {
    currentLevel = level;
  },

  trace: log('trace'),
  debug: log('debug'),
  info: log('info'),
  warn: log('warn'),
  error: log('error'),
  fatal: log('fatal')
};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable max-len */
/*
    Copyright (c) 2013-2015, Fionn Kelleher All rights reserved.

    Redistribution and use in source and binary forms, with or without modification,
    are permitted provided that the following conditions are met:

        Redistributions of source code must retain the above copyright notice,
        this list of conditions and the following disclaimer.

        Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation and/or other materials
        provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
    IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
    OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
    WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
    ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
    OF SUCH DAMAGE.
*/
var _ = __webpack_require__(25);

module.exports = {
  // Parse Twitch badges..
  badges: function badges(tags) {
    if (_.isString(tags.badges)) {
      var badgesParsed = {};
      var explode = tags.badges.split(',');

      for (var i = 0; i < explode.length; i++) {
        var parts = explode[i].split('/');
        if (!parts[1]) return;
        badgesParsed[parts[0]] = parts[1];
      }

      tags['badges-raw'] = tags.badges;
      tags.badges = badgesParsed;
    }
    if (_.isBoolean(tags.badges)) {
      tags['badges-raw'] = null;
    }

    return tags;
  },

  // Parse Twitch emotes..
  emotes: function emotes(tags) {
    if (_.isString(tags.emotes)) {
      var emoticons = tags.emotes.split('/');
      var emotesParsed = {};

      for (var i = 0; i < emoticons.length; i++) {
        var parts = emoticons[i].split(':');
        if (!parts[1]) return;
        emotesParsed[parts[0]] = parts[1].split(',');
      }

      tags['emotes-raw'] = tags.emotes;
      tags.emotes = emotesParsed;
    }
    if (_.isBoolean(tags.emotes)) {
      tags['emotes-raw'] = null;
    }

    return tags;
  },

  // Parse regex emotes..
  emoteRegex: function emoteRegex(msg, code, id, obj) {
    var space = /\S+/g;
    var regex = new RegExp('(\\b|^|s)' + _.unescapeHtml(code) + '(\\b|$|s)\'');
    var match = void 0;

    // Check if emote code matches using RegExp and push it to the object..
    while ((match = space.exec(msg)) !== null) {
      if (regex.test(match[0]) && obj[id]) {
        obj[id].push([match.index, space.lastIndex - 1]);
      }
    }
  },

  // Parse string emotes..
  emoteString: function emoteString(msg, code, id, obj) {
    var space = /\S+/g;
    var match = void 0;

    // Check if emote code matches and push it to the object..
    while ((match = space.exec(msg)) !== null) {
      if (match[0] === _.unescapeHtml(code)) {
        obj[id] = obj[id] || [];
        obj[id].push([match.index, space.lastIndex - 1]);
      }
    }
  },

  // Transform the emotes object to a string with the following format..
  // emote_id:first_index-last_index,another_first-another_last/another_emote_id:first_index-last_index
  transformEmotes: function transformEmotes(emotes) {
    var transformed = '';

    Object.keys(emotes).forEach(function (id) {
      transformed = transformed + id + ':';
      emotes[id].forEach(function (index) {
        transformed = transformed + index.join('-') + ',';
      });
      transformed = transformed.slice(0, -1) + '/';
    });

    return transformed.slice(0, -1);
  },

  // Parse Twitch messages..
  msg: function msg(data) {
    var message = {
      raw: data,
      tags: {},
      prefix: null,
      command: null,
      params: []
    };

    // Position and nextspace are used by the parser as a reference..
    var position = 0;
    var nextspace = 0;

    // The first thing we check for is IRCv3.2 message tags.
    // http://ircv3.atheme.org/specification/message-tags-3.2
    if (data.charCodeAt(0) === 64) {
      nextspace = data.indexOf(' ');

      // Malformed IRC message..
      if (nextspace === -1) {
        return null;
      }

      // Tags are split by a semi colon..
      var rawTags = data.slice(1, nextspace).split(';');

      for (var i = 0; i < rawTags.length; i++) {
        // Tags delimited by an equals sign are key=value tags.
        // If there's no equals, we assign the tag a value of true.
        var tag = rawTags[i];
        var pair = tag.split('=');
        message.tags[pair[0]] = tag.substring(tag.indexOf('=') + 1) || true;
      }

      position = nextspace + 1;
    }

    // Skip any trailing whitespace..
    while (data.charCodeAt(position) === 32) {
      position++;
    }

    // Extract the message's prefix if present. Prefixes are prepended with a colon..
    if (data.charCodeAt(position) === 58) {
      nextspace = data.indexOf(' ', position);

      // If there's nothing after the prefix, deem this message to be malformed.
      if (nextspace === -1) {
        return null;
      }

      message.prefix = data.slice(position + 1, nextspace);
      position = nextspace + 1;

      // Skip any trailing whitespace..
      while (data.charCodeAt(position) === 32) {
        position++;
      }
    }

    nextspace = data.indexOf(' ', position);

    // If there's no more whitespace left, extract everything from the
    // current position to the end of the string as the command..
    if (nextspace === -1) {
      if (data.length > position) {
        message.command = data.slice(position);
        return message;
      }

      return null;
    }

    // Else, the command is the current position up to the next space. After
    // that, we expect some parameters.
    message.command = data.slice(position, nextspace);

    position = nextspace + 1;

    // Skip any trailing whitespace..
    while (data.charCodeAt(position) === 32) {
      position++;
    }

    while (position < data.length) {
      nextspace = data.indexOf(' ', position);

      // If the character is a colon, we've got a trailing parameter.
      // At this point, there are no extra params, so we push everything
      // from after the colon to the end of the string, to the params array
      // and break out of the loop.
      if (data.charCodeAt(position) === 58) {
        message.params.push(data.slice(position + 1));
        break;
      }

      // If we still have some whitespace...
      if (nextspace !== -1) {
        // Push whatever's between the current position and the next
        // space to the params array.
        message.params.push(data.slice(position, nextspace));
        position = nextspace + 1;

        // Skip any trailing whitespace and continue looping.
        while (data.charCodeAt(position) === 32) {
          position++;
        }
      }

      // If we don't have any more whitespace and the param isn't trailing,
      // push everything remaining to the params array.
      if (nextspace === -1) {
        message.params.push(data.slice(position));
        break;
      }
    }

    return message;
  }
};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Initialize the queue with a specific delay..
function queue(defaultDelay) {
  this.queue = [];
  this.index = 0;
  this.defaultDelay = defaultDelay || 3000;
}

// Add a new function to the queue..
queue.prototype.add = function add(fn, delay) {
  this.queue.push({
    fn: fn,
    delay: delay
  });
};

// Run the current queue..
queue.prototype.run = function run(index) {
  if (index || index === 0) {
    this.index = index;
  }
  this.next();
};

// Go to the next in queue..
queue.prototype.next = function next() {
  var _this = this;

  var i = this.index++;
  var at = this.queue[i];
  var nextInQueue = this.queue[this.index];

  if (!at) {
    return;
  }

  at.fn();
  if (nextInQueue) {
    setTimeout(function () {
      _this.next();
    }, nextInQueue.delay || this.defaultDelay);
  }
};

// Reset the queue..
queue.prototype.reset = function reset() {
  this.index = 0;
};

// Clear the queue..
queue.prototype.clear = function clear() {
  this.index = 0;
  this.queue = [];
};

exports.queue = queue;

/***/ }),
/* 169 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=twitch-js.js.map