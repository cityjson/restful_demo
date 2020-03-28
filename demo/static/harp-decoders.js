/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/DecoderBootstrap.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/@protobufjs/aspromise/index.js":
/*!***************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/@protobufjs/aspromise/index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),

/***/ "../../node_modules/@protobufjs/base64/index.js":
/*!************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/@protobufjs/base64/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),

/***/ "../../node_modules/@protobufjs/eventemitter/index.js":
/*!******************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/@protobufjs/eventemitter/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),

/***/ "../../node_modules/@protobufjs/float/index.js":
/*!***********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/@protobufjs/float/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),

/***/ "../../node_modules/@protobufjs/inquire/index.js":
/*!*************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/@protobufjs/inquire/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),

/***/ "../../node_modules/@protobufjs/pool/index.js":
/*!**********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/@protobufjs/pool/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),

/***/ "../../node_modules/@protobufjs/utf8/index.js":
/*!**********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/@protobufjs/utf8/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),

/***/ "../../node_modules/earcut/src/earcut.js":
/*!*****************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/earcut/src/earcut.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = earcut;
module.exports.default = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode || outerNode.next === outerNode.prev) return triangles;

    var minX, minY, maxX, maxY, x, y, invSize;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and invSize are later used to transform coords into integers for z-order calculation
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 1 / invSize : 0;
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) break;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertex leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, invSize),
        maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);

    var p = ear.prevZ,
        n = ear.nextZ;

    // look for points inside the triangle in both directions
    while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;

        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    // look for remaining points in decreasing z-order
    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    // look for remaining points in increasing z-order
    while (n && n.z <= maxZ) {
        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return filterPoints(p);
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, invSize);
                earcutLinked(c, triangles, dim, minX, minY, invSize);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m; // hole touches outer segment; pick leftmost endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m;

    do {
        if (hx >= p.x && p.x >= mx && hx !== p.x &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if (locallyInside(p, hole) &&
                (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    } while (p !== stop);

    return m;
}

// whether sector in vertex m contains sector in vertex p in the same coordinates
function sectorContainsSector(m, p) {
    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, invSize) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and inverse of the longer side of data bbox
function zOrder(x, y, minX, minY, invSize) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) * invSize;
    y = 32767 * (y - minY) * invSize;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
           (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
            (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
            equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    var o1 = sign(area(p1, q1, p2));
    var o2 = sign(area(p1, q1, q2));
    var o3 = sign(area(p2, q2, p1));
    var o4 = sign(area(p2, q2, q1));

    if (o1 !== o2 && o3 !== o4) return true; // general case

    if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
    if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
    if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
    if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

    return false;
}

// for collinear points p, q, r, check if point q lies on segment pr
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

function sign(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertex index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertex nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};


/***/ }),

/***/ "../../node_modules/geojson-vt/src/clip.js":
/*!*******************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/geojson-vt/src/clip.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return clip; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature */ "../../node_modules/geojson-vt/src/feature.js");



/* clip features between two axis-parallel lines:
 *     |        |
 *  ___|___     |     /
 * /   |   \____|____/
 *     |        |
 */

function clip(features, scale, k1, k2, axis, minAll, maxAll, options) {

    k1 /= scale;
    k2 /= scale;

    if (minAll >= k1 && maxAll < k2) return features; // trivial accept
    else if (maxAll < k1 || minAll >= k2) return null; // trivial reject

    var clipped = [];

    for (var i = 0; i < features.length; i++) {

        var feature = features[i];
        var geometry = feature.geometry;
        var type = feature.type;

        var min = axis === 0 ? feature.minX : feature.minY;
        var max = axis === 0 ? feature.maxX : feature.maxY;

        if (min >= k1 && max < k2) { // trivial accept
            clipped.push(feature);
            continue;
        } else if (max < k1 || min >= k2) { // trivial reject
            continue;
        }

        var newGeometry = [];

        if (type === 'Point' || type === 'MultiPoint') {
            clipPoints(geometry, newGeometry, k1, k2, axis);

        } else if (type === 'LineString') {
            clipLine(geometry, newGeometry, k1, k2, axis, false, options.lineMetrics);

        } else if (type === 'MultiLineString') {
            clipLines(geometry, newGeometry, k1, k2, axis, false);

        } else if (type === 'Polygon') {
            clipLines(geometry, newGeometry, k1, k2, axis, true);

        } else if (type === 'MultiPolygon') {
            for (var j = 0; j < geometry.length; j++) {
                var polygon = [];
                clipLines(geometry[j], polygon, k1, k2, axis, true);
                if (polygon.length) {
                    newGeometry.push(polygon);
                }
            }
        }

        if (newGeometry.length) {
            if (options.lineMetrics && type === 'LineString') {
                for (j = 0; j < newGeometry.length; j++) {
                    clipped.push(Object(_feature__WEBPACK_IMPORTED_MODULE_0__["default"])(feature.id, type, newGeometry[j], feature.tags));
                }
                continue;
            }

            if (type === 'LineString' || type === 'MultiLineString') {
                if (newGeometry.length === 1) {
                    type = 'LineString';
                    newGeometry = newGeometry[0];
                } else {
                    type = 'MultiLineString';
                }
            }
            if (type === 'Point' || type === 'MultiPoint') {
                type = newGeometry.length === 3 ? 'Point' : 'MultiPoint';
            }

            clipped.push(Object(_feature__WEBPACK_IMPORTED_MODULE_0__["default"])(feature.id, type, newGeometry, feature.tags));
        }
    }

    return clipped.length ? clipped : null;
}

function clipPoints(geom, newGeom, k1, k2, axis) {
    for (var i = 0; i < geom.length; i += 3) {
        var a = geom[i + axis];

        if (a >= k1 && a <= k2) {
            newGeom.push(geom[i]);
            newGeom.push(geom[i + 1]);
            newGeom.push(geom[i + 2]);
        }
    }
}

function clipLine(geom, newGeom, k1, k2, axis, isPolygon, trackMetrics) {

    var slice = newSlice(geom);
    var intersect = axis === 0 ? intersectX : intersectY;
    var len = geom.start;
    var segLen, t;

    for (var i = 0; i < geom.length - 3; i += 3) {
        var ax = geom[i];
        var ay = geom[i + 1];
        var az = geom[i + 2];
        var bx = geom[i + 3];
        var by = geom[i + 4];
        var a = axis === 0 ? ax : ay;
        var b = axis === 0 ? bx : by;
        var exited = false;

        if (trackMetrics) segLen = Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));

        if (a < k1) {
            // ---|-->  | (line enters the clip region from the left)
            if (b > k1) {
                t = intersect(slice, ax, ay, bx, by, k1);
                if (trackMetrics) slice.start = len + segLen * t;
            }
        } else if (a > k2) {
            // |  <--|--- (line enters the clip region from the right)
            if (b < k2) {
                t = intersect(slice, ax, ay, bx, by, k2);
                if (trackMetrics) slice.start = len + segLen * t;
            }
        } else {
            addPoint(slice, ax, ay, az);
        }
        if (b < k1 && a >= k1) {
            // <--|---  | or <--|-----|--- (line exits the clip region on the left)
            t = intersect(slice, ax, ay, bx, by, k1);
            exited = true;
        }
        if (b > k2 && a <= k2) {
            // |  ---|--> or ---|-----|--> (line exits the clip region on the right)
            t = intersect(slice, ax, ay, bx, by, k2);
            exited = true;
        }

        if (!isPolygon && exited) {
            if (trackMetrics) slice.end = len + segLen * t;
            newGeom.push(slice);
            slice = newSlice(geom);
        }

        if (trackMetrics) len += segLen;
    }

    // add the last point
    var last = geom.length - 3;
    ax = geom[last];
    ay = geom[last + 1];
    az = geom[last + 2];
    a = axis === 0 ? ax : ay;
    if (a >= k1 && a <= k2) addPoint(slice, ax, ay, az);

    // close the polygon if its endpoints are not the same after clipping
    last = slice.length - 3;
    if (isPolygon && last >= 3 && (slice[last] !== slice[0] || slice[last + 1] !== slice[1])) {
        addPoint(slice, slice[0], slice[1], slice[2]);
    }

    // add the final slice
    if (slice.length) {
        newGeom.push(slice);
    }
}

function newSlice(line) {
    var slice = [];
    slice.size = line.size;
    slice.start = line.start;
    slice.end = line.end;
    return slice;
}

function clipLines(geom, newGeom, k1, k2, axis, isPolygon) {
    for (var i = 0; i < geom.length; i++) {
        clipLine(geom[i], newGeom, k1, k2, axis, isPolygon, false);
    }
}

function addPoint(out, x, y, z) {
    out.push(x);
    out.push(y);
    out.push(z);
}

function intersectX(out, ax, ay, bx, by, x) {
    var t = (x - ax) / (bx - ax);
    out.push(x);
    out.push(ay + (by - ay) * t);
    out.push(1);
    return t;
}

function intersectY(out, ax, ay, bx, by, y) {
    var t = (y - ay) / (by - ay);
    out.push(ax + (bx - ax) * t);
    out.push(y);
    out.push(1);
    return t;
}


/***/ }),

/***/ "../../node_modules/geojson-vt/src/convert.js":
/*!**********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/geojson-vt/src/convert.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return convert; });
/* harmony import */ var _simplify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simplify */ "../../node_modules/geojson-vt/src/simplify.js");
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature */ "../../node_modules/geojson-vt/src/feature.js");




// converts GeoJSON feature into an intermediate projected JSON vector format with simplification data

function convert(data, options) {
    var features = [];
    if (data.type === 'FeatureCollection') {
        for (var i = 0; i < data.features.length; i++) {
            convertFeature(features, data.features[i], options, i);
        }

    } else if (data.type === 'Feature') {
        convertFeature(features, data, options);

    } else {
        // single geometry or a geometry collection
        convertFeature(features, {geometry: data}, options);
    }

    return features;
}

function convertFeature(features, geojson, options, index) {
    if (!geojson.geometry) return;

    var coords = geojson.geometry.coordinates;
    var type = geojson.geometry.type;
    var tolerance = Math.pow(options.tolerance / ((1 << options.maxZoom) * options.extent), 2);
    var geometry = [];
    var id = geojson.id;
    if (options.promoteId) {
        id = geojson.properties[options.promoteId];
    } else if (options.generateId) {
        id = index || 0;
    }
    if (type === 'Point') {
        convertPoint(coords, geometry);

    } else if (type === 'MultiPoint') {
        for (var i = 0; i < coords.length; i++) {
            convertPoint(coords[i], geometry);
        }

    } else if (type === 'LineString') {
        convertLine(coords, geometry, tolerance, false);

    } else if (type === 'MultiLineString') {
        if (options.lineMetrics) {
            // explode into linestrings to be able to track metrics
            for (i = 0; i < coords.length; i++) {
                geometry = [];
                convertLine(coords[i], geometry, tolerance, false);
                features.push(Object(_feature__WEBPACK_IMPORTED_MODULE_1__["default"])(id, 'LineString', geometry, geojson.properties));
            }
            return;
        } else {
            convertLines(coords, geometry, tolerance, false);
        }

    } else if (type === 'Polygon') {
        convertLines(coords, geometry, tolerance, true);

    } else if (type === 'MultiPolygon') {
        for (i = 0; i < coords.length; i++) {
            var polygon = [];
            convertLines(coords[i], polygon, tolerance, true);
            geometry.push(polygon);
        }
    } else if (type === 'GeometryCollection') {
        for (i = 0; i < geojson.geometry.geometries.length; i++) {
            convertFeature(features, {
                id: id,
                geometry: geojson.geometry.geometries[i],
                properties: geojson.properties
            }, options, index);
        }
        return;
    } else {
        throw new Error('Input data is not a valid GeoJSON object.');
    }

    features.push(Object(_feature__WEBPACK_IMPORTED_MODULE_1__["default"])(id, type, geometry, geojson.properties));
}

function convertPoint(coords, out) {
    out.push(projectX(coords[0]));
    out.push(projectY(coords[1]));
    out.push(0);
}

function convertLine(ring, out, tolerance, isPolygon) {
    var x0, y0;
    var size = 0;

    for (var j = 0; j < ring.length; j++) {
        var x = projectX(ring[j][0]);
        var y = projectY(ring[j][1]);

        out.push(x);
        out.push(y);
        out.push(0);

        if (j > 0) {
            if (isPolygon) {
                size += (x0 * y - x * y0) / 2; // area
            } else {
                size += Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)); // length
            }
        }
        x0 = x;
        y0 = y;
    }

    var last = out.length - 3;
    out[2] = 1;
    Object(_simplify__WEBPACK_IMPORTED_MODULE_0__["default"])(out, 0, last, tolerance);
    out[last + 2] = 1;

    out.size = Math.abs(size);
    out.start = 0;
    out.end = out.size;
}

function convertLines(rings, out, tolerance, isPolygon) {
    for (var i = 0; i < rings.length; i++) {
        var geom = [];
        convertLine(rings[i], geom, tolerance, isPolygon);
        out.push(geom);
    }
}

function projectX(x) {
    return x / 360 + 0.5;
}

function projectY(y) {
    var sin = Math.sin(y * Math.PI / 180);
    var y2 = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
    return y2 < 0 ? 0 : y2 > 1 ? 1 : y2;
}


/***/ }),

/***/ "../../node_modules/geojson-vt/src/feature.js":
/*!**********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/geojson-vt/src/feature.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createFeature; });

function createFeature(id, type, geom, tags) {
    var feature = {
        id: typeof id === 'undefined' ? null : id,
        type: type,
        geometry: geom,
        tags: tags,
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    };
    calcBBox(feature);
    return feature;
}

function calcBBox(feature) {
    var geom = feature.geometry;
    var type = feature.type;

    if (type === 'Point' || type === 'MultiPoint' || type === 'LineString') {
        calcLineBBox(feature, geom);

    } else if (type === 'Polygon' || type === 'MultiLineString') {
        for (var i = 0; i < geom.length; i++) {
            calcLineBBox(feature, geom[i]);
        }

    } else if (type === 'MultiPolygon') {
        for (i = 0; i < geom.length; i++) {
            for (var j = 0; j < geom[i].length; j++) {
                calcLineBBox(feature, geom[i][j]);
            }
        }
    }
}

function calcLineBBox(feature, geom) {
    for (var i = 0; i < geom.length; i += 3) {
        feature.minX = Math.min(feature.minX, geom[i]);
        feature.minY = Math.min(feature.minY, geom[i + 1]);
        feature.maxX = Math.max(feature.maxX, geom[i]);
        feature.maxY = Math.max(feature.maxY, geom[i + 1]);
    }
}


/***/ }),

/***/ "../../node_modules/geojson-vt/src/index.js":
/*!********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/geojson-vt/src/index.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return geojsonvt; });
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert */ "../../node_modules/geojson-vt/src/convert.js");
/* harmony import */ var _clip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clip */ "../../node_modules/geojson-vt/src/clip.js");
/* harmony import */ var _wrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wrap */ "../../node_modules/geojson-vt/src/wrap.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transform */ "../../node_modules/geojson-vt/src/transform.js");
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tile */ "../../node_modules/geojson-vt/src/tile.js");

     // GeoJSON conversion and preprocessing
           // stripe clipping algorithm
           // date line processing
 // coordinate transformation
     // final simplified tile generation

function geojsonvt(data, options) {
    return new GeoJSONVT(data, options);
}

function GeoJSONVT(data, options) {
    options = this.options = extend(Object.create(this.options), options);

    var debug = options.debug;

    if (debug) console.time('preprocess data');

    if (options.maxZoom < 0 || options.maxZoom > 24) throw new Error('maxZoom should be in the 0-24 range');
    if (options.promoteId && options.generateId) throw new Error('promoteId and generateId cannot be used together.');

    var features = Object(_convert__WEBPACK_IMPORTED_MODULE_0__["default"])(data, options);

    this.tiles = {};
    this.tileCoords = [];

    if (debug) {
        console.timeEnd('preprocess data');
        console.log('index: maxZoom: %d, maxPoints: %d', options.indexMaxZoom, options.indexMaxPoints);
        console.time('generate tiles');
        this.stats = {};
        this.total = 0;
    }

    features = Object(_wrap__WEBPACK_IMPORTED_MODULE_2__["default"])(features, options);

    // start slicing from the top tile down
    if (features.length) this.splitTile(features, 0, 0, 0);

    if (debug) {
        if (features.length) console.log('features: %d, points: %d', this.tiles[0].numFeatures, this.tiles[0].numPoints);
        console.timeEnd('generate tiles');
        console.log('tiles generated:', this.total, JSON.stringify(this.stats));
    }
}

GeoJSONVT.prototype.options = {
    maxZoom: 14,            // max zoom to preserve detail on
    indexMaxZoom: 5,        // max zoom in the tile index
    indexMaxPoints: 100000, // max number of points per tile in the tile index
    tolerance: 3,           // simplification tolerance (higher means simpler)
    extent: 4096,           // tile extent
    buffer: 64,             // tile buffer on each side
    lineMetrics: false,     // whether to calculate line metrics
    promoteId: null,        // name of a feature property to be promoted to feature.id
    generateId: false,      // whether to generate feature ids. Cannot be used with promoteId
    debug: 0                // logging level (0, 1 or 2)
};

GeoJSONVT.prototype.splitTile = function (features, z, x, y, cz, cx, cy) {

    var stack = [features, z, x, y],
        options = this.options,
        debug = options.debug;

    // avoid recursion by using a processing queue
    while (stack.length) {
        y = stack.pop();
        x = stack.pop();
        z = stack.pop();
        features = stack.pop();

        var z2 = 1 << z,
            id = toID(z, x, y),
            tile = this.tiles[id];

        if (!tile) {
            if (debug > 1) console.time('creation');

            tile = this.tiles[id] = Object(_tile__WEBPACK_IMPORTED_MODULE_4__["default"])(features, z, x, y, options);
            this.tileCoords.push({z: z, x: x, y: y});

            if (debug) {
                if (debug > 1) {
                    console.log('tile z%d-%d-%d (features: %d, points: %d, simplified: %d)',
                        z, x, y, tile.numFeatures, tile.numPoints, tile.numSimplified);
                    console.timeEnd('creation');
                }
                var key = 'z' + z;
                this.stats[key] = (this.stats[key] || 0) + 1;
                this.total++;
            }
        }

        // save reference to original geometry in tile so that we can drill down later if we stop now
        tile.source = features;

        // if it's the first-pass tiling
        if (!cz) {
            // stop tiling if we reached max zoom, or if the tile is too simple
            if (z === options.indexMaxZoom || tile.numPoints <= options.indexMaxPoints) continue;

        // if a drilldown to a specific tile
        } else {
            // stop tiling if we reached base zoom or our target tile zoom
            if (z === options.maxZoom || z === cz) continue;

            // stop tiling if it's not an ancestor of the target tile
            var m = 1 << (cz - z);
            if (x !== Math.floor(cx / m) || y !== Math.floor(cy / m)) continue;
        }

        // if we slice further down, no need to keep source geometry
        tile.source = null;

        if (features.length === 0) continue;

        if (debug > 1) console.time('clipping');

        // values we'll use for clipping
        var k1 = 0.5 * options.buffer / options.extent,
            k2 = 0.5 - k1,
            k3 = 0.5 + k1,
            k4 = 1 + k1,
            tl, bl, tr, br, left, right;

        tl = bl = tr = br = null;

        left  = Object(_clip__WEBPACK_IMPORTED_MODULE_1__["default"])(features, z2, x - k1, x + k3, 0, tile.minX, tile.maxX, options);
        right = Object(_clip__WEBPACK_IMPORTED_MODULE_1__["default"])(features, z2, x + k2, x + k4, 0, tile.minX, tile.maxX, options);
        features = null;

        if (left) {
            tl = Object(_clip__WEBPACK_IMPORTED_MODULE_1__["default"])(left, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, options);
            bl = Object(_clip__WEBPACK_IMPORTED_MODULE_1__["default"])(left, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, options);
            left = null;
        }

        if (right) {
            tr = Object(_clip__WEBPACK_IMPORTED_MODULE_1__["default"])(right, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, options);
            br = Object(_clip__WEBPACK_IMPORTED_MODULE_1__["default"])(right, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, options);
            right = null;
        }

        if (debug > 1) console.timeEnd('clipping');

        stack.push(tl || [], z + 1, x * 2,     y * 2);
        stack.push(bl || [], z + 1, x * 2,     y * 2 + 1);
        stack.push(tr || [], z + 1, x * 2 + 1, y * 2);
        stack.push(br || [], z + 1, x * 2 + 1, y * 2 + 1);
    }
};

GeoJSONVT.prototype.getTile = function (z, x, y) {
    var options = this.options,
        extent = options.extent,
        debug = options.debug;

    if (z < 0 || z > 24) return null;

    var z2 = 1 << z;
    x = ((x % z2) + z2) % z2; // wrap tile x coordinate

    var id = toID(z, x, y);
    if (this.tiles[id]) return Object(_transform__WEBPACK_IMPORTED_MODULE_3__["default"])(this.tiles[id], extent);

    if (debug > 1) console.log('drilling down to z%d-%d-%d', z, x, y);

    var z0 = z,
        x0 = x,
        y0 = y,
        parent;

    while (!parent && z0 > 0) {
        z0--;
        x0 = Math.floor(x0 / 2);
        y0 = Math.floor(y0 / 2);
        parent = this.tiles[toID(z0, x0, y0)];
    }

    if (!parent || !parent.source) return null;

    // if we found a parent tile containing the original geometry, we can drill down from it
    if (debug > 1) console.log('found parent tile z%d-%d-%d', z0, x0, y0);

    if (debug > 1) console.time('drilling down');
    this.splitTile(parent.source, z0, x0, y0, z, x, y);
    if (debug > 1) console.timeEnd('drilling down');

    return this.tiles[id] ? Object(_transform__WEBPACK_IMPORTED_MODULE_3__["default"])(this.tiles[id], extent) : null;
};

function toID(z, x, y) {
    return (((1 << z) * y + x) * 32) + z;
}

function extend(dest, src) {
    for (var i in src) dest[i] = src[i];
    return dest;
}


/***/ }),

/***/ "../../node_modules/geojson-vt/src/simplify.js":
/*!***********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/geojson-vt/src/simplify.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return simplify; });

// calculate simplification data using optimized Douglas-Peucker algorithm

function simplify(coords, first, last, sqTolerance) {
    var maxSqDist = sqTolerance;
    var mid = (last - first) >> 1;
    var minPosToMid = last - first;
    var index;

    var ax = coords[first];
    var ay = coords[first + 1];
    var bx = coords[last];
    var by = coords[last + 1];

    for (var i = first + 3; i < last; i += 3) {
        var d = getSqSegDist(coords[i], coords[i + 1], ax, ay, bx, by);

        if (d > maxSqDist) {
            index = i;
            maxSqDist = d;

        } else if (d === maxSqDist) {
            // a workaround to ensure we choose a pivot close to the middle of the list,
            // reducing recursion depth, for certain degenerate inputs
            // https://github.com/mapbox/geojson-vt/issues/104
            var posToMid = Math.abs(i - mid);
            if (posToMid < minPosToMid) {
                index = i;
                minPosToMid = posToMid;
            }
        }
    }

    if (maxSqDist > sqTolerance) {
        if (index - first > 3) simplify(coords, first, index, sqTolerance);
        coords[index + 2] = maxSqDist;
        if (last - index > 3) simplify(coords, index, last, sqTolerance);
    }
}

// square distance from a point to a segment
function getSqSegDist(px, py, x, y, bx, by) {

    var dx = bx - x;
    var dy = by - y;

    if (dx !== 0 || dy !== 0) {

        var t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = bx;
            y = by;

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    dx = px - x;
    dy = py - y;

    return dx * dx + dy * dy;
}


/***/ }),

/***/ "../../node_modules/geojson-vt/src/tile.js":
/*!*******************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/geojson-vt/src/tile.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createTile; });

function createTile(features, z, tx, ty, options) {
    var tolerance = z === options.maxZoom ? 0 : options.tolerance / ((1 << z) * options.extent);
    var tile = {
        features: [],
        numPoints: 0,
        numSimplified: 0,
        numFeatures: 0,
        source: null,
        x: tx,
        y: ty,
        z: z,
        transformed: false,
        minX: 2,
        minY: 1,
        maxX: -1,
        maxY: 0
    };
    for (var i = 0; i < features.length; i++) {
        tile.numFeatures++;
        addFeature(tile, features[i], tolerance, options);

        var minX = features[i].minX;
        var minY = features[i].minY;
        var maxX = features[i].maxX;
        var maxY = features[i].maxY;

        if (minX < tile.minX) tile.minX = minX;
        if (minY < tile.minY) tile.minY = minY;
        if (maxX > tile.maxX) tile.maxX = maxX;
        if (maxY > tile.maxY) tile.maxY = maxY;
    }
    return tile;
}

function addFeature(tile, feature, tolerance, options) {

    var geom = feature.geometry,
        type = feature.type,
        simplified = [];

    if (type === 'Point' || type === 'MultiPoint') {
        for (var i = 0; i < geom.length; i += 3) {
            simplified.push(geom[i]);
            simplified.push(geom[i + 1]);
            tile.numPoints++;
            tile.numSimplified++;
        }

    } else if (type === 'LineString') {
        addLine(simplified, geom, tile, tolerance, false, false);

    } else if (type === 'MultiLineString' || type === 'Polygon') {
        for (i = 0; i < geom.length; i++) {
            addLine(simplified, geom[i], tile, tolerance, type === 'Polygon', i === 0);
        }

    } else if (type === 'MultiPolygon') {

        for (var k = 0; k < geom.length; k++) {
            var polygon = geom[k];
            for (i = 0; i < polygon.length; i++) {
                addLine(simplified, polygon[i], tile, tolerance, true, i === 0);
            }
        }
    }

    if (simplified.length) {
        var tags = feature.tags || null;
        if (type === 'LineString' && options.lineMetrics) {
            tags = {};
            for (var key in feature.tags) tags[key] = feature.tags[key];
            tags['mapbox_clip_start'] = geom.start / geom.size;
            tags['mapbox_clip_end'] = geom.end / geom.size;
        }
        var tileFeature = {
            geometry: simplified,
            type: type === 'Polygon' || type === 'MultiPolygon' ? 3 :
                type === 'LineString' || type === 'MultiLineString' ? 2 : 1,
            tags: tags
        };
        if (feature.id !== null) {
            tileFeature.id = feature.id;
        }
        tile.features.push(tileFeature);
    }
}

function addLine(result, geom, tile, tolerance, isPolygon, isOuter) {
    var sqTolerance = tolerance * tolerance;

    if (tolerance > 0 && (geom.size < (isPolygon ? sqTolerance : tolerance))) {
        tile.numPoints += geom.length / 3;
        return;
    }

    var ring = [];

    for (var i = 0; i < geom.length; i += 3) {
        if (tolerance === 0 || geom[i + 2] > sqTolerance) {
            tile.numSimplified++;
            ring.push(geom[i]);
            ring.push(geom[i + 1]);
        }
        tile.numPoints++;
    }

    if (isPolygon) rewind(ring, isOuter);

    result.push(ring);
}

function rewind(ring, clockwise) {
    var area = 0;
    for (var i = 0, len = ring.length, j = len - 2; i < len; j = i, i += 2) {
        area += (ring[i] - ring[j]) * (ring[i + 1] + ring[j + 1]);
    }
    if (area > 0 === clockwise) {
        for (i = 0, len = ring.length; i < len / 2; i += 2) {
            var x = ring[i];
            var y = ring[i + 1];
            ring[i] = ring[len - 2 - i];
            ring[i + 1] = ring[len - 1 - i];
            ring[len - 2 - i] = x;
            ring[len - 1 - i] = y;
        }
    }
}


/***/ }),

/***/ "../../node_modules/geojson-vt/src/transform.js":
/*!************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/geojson-vt/src/transform.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return transformTile; });

// Transforms the coordinates of each feature in the given tile from
// mercator-projected space into (extent x extent) tile space.
function transformTile(tile, extent) {
    if (tile.transformed) return tile;

    var z2 = 1 << tile.z,
        tx = tile.x,
        ty = tile.y,
        i, j, k;

    for (i = 0; i < tile.features.length; i++) {
        var feature = tile.features[i],
            geom = feature.geometry,
            type = feature.type;

        feature.geometry = [];

        if (type === 1) {
            for (j = 0; j < geom.length; j += 2) {
                feature.geometry.push(transformPoint(geom[j], geom[j + 1], extent, z2, tx, ty));
            }
        } else {
            for (j = 0; j < geom.length; j++) {
                var ring = [];
                for (k = 0; k < geom[j].length; k += 2) {
                    ring.push(transformPoint(geom[j][k], geom[j][k + 1], extent, z2, tx, ty));
                }
                feature.geometry.push(ring);
            }
        }
    }

    tile.transformed = true;

    return tile;
}

function transformPoint(x, y, extent, z2, tx, ty) {
    return [
        Math.round(extent * (x * z2 - tx)),
        Math.round(extent * (y * z2 - ty))];
}


/***/ }),

/***/ "../../node_modules/geojson-vt/src/wrap.js":
/*!*******************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/geojson-vt/src/wrap.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return wrap; });
/* harmony import */ var _clip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clip */ "../../node_modules/geojson-vt/src/clip.js");
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature */ "../../node_modules/geojson-vt/src/feature.js");




function wrap(features, options) {
    var buffer = options.buffer / options.extent;
    var merged = features;
    var left  = Object(_clip__WEBPACK_IMPORTED_MODULE_0__["default"])(features, 1, -1 - buffer, buffer,     0, -1, 2, options); // left world copy
    var right = Object(_clip__WEBPACK_IMPORTED_MODULE_0__["default"])(features, 1,  1 - buffer, 2 + buffer, 0, -1, 2, options); // right world copy

    if (left || right) {
        merged = Object(_clip__WEBPACK_IMPORTED_MODULE_0__["default"])(features, 1, -buffer, 1 + buffer, 0, -1, 2, options) || []; // center world copy

        if (left) merged = shiftFeatureCoords(left, 1).concat(merged); // merge left into center
        if (right) merged = merged.concat(shiftFeatureCoords(right, -1)); // merge right into center
    }

    return merged;
}

function shiftFeatureCoords(features, offset) {
    var newFeatures = [];

    for (var i = 0; i < features.length; i++) {
        var feature = features[i],
            type = feature.type;

        var newGeometry;

        if (type === 'Point' || type === 'MultiPoint' || type === 'LineString') {
            newGeometry = shiftCoords(feature.geometry, offset);

        } else if (type === 'MultiLineString' || type === 'Polygon') {
            newGeometry = [];
            for (var j = 0; j < feature.geometry.length; j++) {
                newGeometry.push(shiftCoords(feature.geometry[j], offset));
            }
        } else if (type === 'MultiPolygon') {
            newGeometry = [];
            for (j = 0; j < feature.geometry.length; j++) {
                var newPolygon = [];
                for (var k = 0; k < feature.geometry[j].length; k++) {
                    newPolygon.push(shiftCoords(feature.geometry[j][k], offset));
                }
                newGeometry.push(newPolygon);
            }
        }

        newFeatures.push(Object(_feature__WEBPACK_IMPORTED_MODULE_1__["default"])(feature.id, type, newGeometry, feature.tags));
    }

    return newFeatures;
}

function shiftCoords(points, offset) {
    var newPoints = [];
    newPoints.size = points.size;

    if (points.start !== undefined) {
        newPoints.start = points.start;
        newPoints.end = points.end;
    }

    for (var i = 0; i < points.length; i += 3) {
        newPoints.push(points[i] + offset, points[i + 1], points[i + 2]);
    }
    return newPoints;
}


/***/ }),

/***/ "../../node_modules/long/src/long.js":
/*!*************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/long/src/long.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),

/***/ "../../node_modules/protobufjs/minimal.js":
/*!******************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/minimal.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// minimal library entry point.


module.exports = __webpack_require__(/*! ./src/index-minimal */ "../../node_modules/protobufjs/src/index-minimal.js");


/***/ }),

/***/ "../../node_modules/protobufjs/src/index-minimal.js":
/*!****************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/index-minimal.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(/*! ./writer */ "../../node_modules/protobufjs/src/writer.js");
protobuf.BufferWriter = __webpack_require__(/*! ./writer_buffer */ "../../node_modules/protobufjs/src/writer_buffer.js");
protobuf.Reader       = __webpack_require__(/*! ./reader */ "../../node_modules/protobufjs/src/reader.js");
protobuf.BufferReader = __webpack_require__(/*! ./reader_buffer */ "../../node_modules/protobufjs/src/reader_buffer.js");

// Utility
protobuf.util         = __webpack_require__(/*! ./util/minimal */ "../../node_modules/protobufjs/src/util/minimal.js");
protobuf.rpc          = __webpack_require__(/*! ./rpc */ "../../node_modules/protobufjs/src/rpc.js");
protobuf.roots        = __webpack_require__(/*! ./roots */ "../../node_modules/protobufjs/src/roots.js");
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
}

// Set up buffer utility according to the environment
protobuf.Writer._configure(protobuf.BufferWriter);
configure();


/***/ }),

/***/ "../../node_modules/protobufjs/src/reader.js":
/*!*********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/reader.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(/*! ./util/minimal */ "../../node_modules/protobufjs/src/util/minimal.js");

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = util.Buffer
    ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
            return util.Buffer.isBuffer(buffer)
                ? new BufferReader(buffer)
                /* istanbul ignore next */
                : create_array(buffer);
        })(buffer);
    }
    /* istanbul ignore next */
    : create_array;

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),

/***/ "../../node_modules/protobufjs/src/reader_buffer.js":
/*!****************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/reader_buffer.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(/*! ./reader */ "../../node_modules/protobufjs/src/reader.js");
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(/*! ./util/minimal */ "../../node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

/* istanbul ignore else */
if (util.Buffer)
    BufferReader.prototype._slice = util.Buffer.prototype.slice;

/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */


/***/ }),

/***/ "../../node_modules/protobufjs/src/roots.js":
/*!********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/roots.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),

/***/ "../../node_modules/protobufjs/src/rpc.js":
/*!******************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/rpc.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(/*! ./rpc/service */ "../../node_modules/protobufjs/src/rpc/service.js");


/***/ }),

/***/ "../../node_modules/protobufjs/src/rpc/service.js":
/*!**************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/rpc/service.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

var util = __webpack_require__(/*! ../util/minimal */ "../../node_modules/protobufjs/src/util/minimal.js");

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),

/***/ "../../node_modules/protobufjs/src/util/longbits.js":
/*!****************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/util/longbits.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(/*! ../util/minimal */ "../../node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),

/***/ "../../node_modules/protobufjs/src/util/minimal.js":
/*!***************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/util/minimal.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(/*! @protobufjs/aspromise */ "../../node_modules/@protobufjs/aspromise/index.js");

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(/*! @protobufjs/base64 */ "../../node_modules/@protobufjs/base64/index.js");

// base class of rpc.Service
util.EventEmitter = __webpack_require__(/*! @protobufjs/eventemitter */ "../../node_modules/@protobufjs/eventemitter/index.js");

// float handling accross browsers
util.float = __webpack_require__(/*! @protobufjs/float */ "../../node_modules/@protobufjs/float/index.js");

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(/*! @protobufjs/inquire */ "../../node_modules/@protobufjs/inquire/index.js");

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(/*! @protobufjs/utf8 */ "../../node_modules/@protobufjs/utf8/index.js");

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(/*! @protobufjs/pool */ "../../node_modules/@protobufjs/pool/index.js");

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(/*! ./longbits */ "../../node_modules/protobufjs/src/util/longbits.js");

// global object reference
util.global = typeof window !== "undefined" && window
           || typeof global !== "undefined" && global
           || typeof self   !== "undefined" && self
           || this; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 * @const
 */
util.isNode = Boolean(util.global.process && util.global.process.versions && util.global.process.versions.node);

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: (new Error()).stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/protobufjs/src/writer.js":
/*!*********************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/writer.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(/*! ./util/minimal */ "../../node_modules/protobufjs/src/util/minimal.js");

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = util.Buffer
    ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
            return new BufferWriter();
        })();
    }
    /* istanbul ignore next */
    : function create_array() {
        return new Writer();
    };

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
};


/***/ }),

/***/ "../../node_modules/protobufjs/src/writer_buffer.js":
/*!****************************************************************************************!*\
  !*** /home/travis/build/heremaps/harp.gl/node_modules/protobufjs/src/writer_buffer.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(/*! ./writer */ "../../node_modules/protobufjs/src/writer.js");
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(/*! ./util/minimal */ "../../node_modules/protobufjs/src/util/minimal.js");

var Buffer = util.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
};

var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set"
    ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                           // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
    };

/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else
        buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */


/***/ }),

/***/ "../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../harp-datasource-protocol/index-decoder.ts":
/*!****************************************************!*\
  !*** ../harp-datasource-protocol/index-decoder.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./lib/StyleSetEvaluator */ "../harp-datasource-protocol/lib/StyleSetEvaluator.ts"));
__export(__webpack_require__(/*! ./lib/Extruder */ "../harp-datasource-protocol/lib/Extruder.ts"));
__export(__webpack_require__(/*! ./lib/Outliner */ "../harp-datasource-protocol/lib/Outliner.ts"));
__export(__webpack_require__(/*! ./lib/Expr */ "../harp-datasource-protocol/lib/Expr.ts"));
__export(__webpack_require__(/*! ./lib/ThreeBufferUtils */ "../harp-datasource-protocol/lib/ThreeBufferUtils.ts"));


/***/ }),

/***/ "../harp-datasource-protocol/index.ts":
/*!********************************************!*\
  !*** ../harp-datasource-protocol/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./lib/ColorUtils */ "../harp-datasource-protocol/lib/ColorUtils.ts"));
__export(__webpack_require__(/*! ./lib/Expr */ "../harp-datasource-protocol/lib/Expr.ts"));
__export(__webpack_require__(/*! ./lib/Techniques */ "../harp-datasource-protocol/lib/Techniques.ts"));
__export(__webpack_require__(/*! ./lib/TechniqueParams */ "../harp-datasource-protocol/lib/TechniqueParams.ts"));
__export(__webpack_require__(/*! ./lib/Theme */ "../harp-datasource-protocol/lib/Theme.ts"));
__export(__webpack_require__(/*! ./lib/InterpolatedProperty */ "../harp-datasource-protocol/lib/InterpolatedProperty.ts"));
__export(__webpack_require__(/*! ./lib/InterpolatedPropertyDefs */ "../harp-datasource-protocol/lib/InterpolatedPropertyDefs.ts"));
__export(__webpack_require__(/*! ./lib/WorkerServiceProtocol */ "../harp-datasource-protocol/lib/WorkerServiceProtocol.ts"));
__export(__webpack_require__(/*! ./lib/WorkerTilerProtocol */ "../harp-datasource-protocol/lib/WorkerTilerProtocol.ts"));
__export(__webpack_require__(/*! ./lib/WorkerDecoderProtocol */ "../harp-datasource-protocol/lib/WorkerDecoderProtocol.ts"));
__export(__webpack_require__(/*! ./lib/DecodedTile */ "../harp-datasource-protocol/lib/DecodedTile.ts"));
__export(__webpack_require__(/*! ./lib/TileInfo */ "../harp-datasource-protocol/lib/TileInfo.ts"));
__export(__webpack_require__(/*! ./lib/ThemeVisitor */ "../harp-datasource-protocol/lib/ThemeVisitor.ts"));
__export(__webpack_require__(/*! ./lib/StringEncodedNumeral */ "../harp-datasource-protocol/lib/StringEncodedNumeral.ts"));


/***/ }),

/***/ "../harp-datasource-protocol/lib/ColorUtils.ts":
/*!*****************************************************!*\
  !*** ../harp-datasource-protocol/lib/ColorUtils.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const THREE = __webpack_require__(/*! three */ "three");
const SHIFT_TRANSPARENCY = 24;
const SHIFT_RED = 16;
const SHIFT_GREEN = 8;
const SHIFT_BLUE = 0;
// tslint:disable: no-bitwise
//    Allow bitwise operations for colors decoding
// tslint:disable-next-line: no-bitwise
const HEX_FULL_CHANNEL = 0xff;
const HEX_RGB_MASK = 0xffffff;
const HEX_TRGB_MASK = 0xffffffff;
const tmpColor = new THREE.Color();
/**
 * Utilities to convert RGBA colors encoded in custom number (hex) format to THREE.Color objects.
 *
 * The functions provided allows for conversion from and to our custom number based color format,
 * which contains transparency, red, green and blue color channels in a way that each channel
 * occupies 8 bits of resulting number (color format 0xTTRRGGBB).
 * In order to preserve compatibility with THREE.Color class and its hexadecimal color
 * representation, we do not store __alpha__ channel in encoded color's number, but replace it
 * with __transparency__ channel, which is simply opposite to alpha:
 * ```transparency = 0xFF - alpha```
 * Such channel value is stored on the oldest bits (octet) in the integral color (numeric) value,
 * so it is fully compatible with THREE.Color numerical representation (@see [[THREE.Color.getHex]],
 * [[THREE.Color.setHex]]).
 * See also [[getHexFromRgba]] and [[getRgbaFromHex]] for more info about conversion.
 */
var ColorUtils;
(function (ColorUtils) {
    /**
     * Encodes RGBA channels in custom number coded format (represented in hex as 0xTTRRGGBB).
     *
     * We do not use direct alpha channel mapping to hex in order to preserve compatibility
     * with THREE.js color format (0xRRGGBB). This is done by encoding transparency
     * (255 - alpha) instead of alpha on the oldest bits, shifted by [[SHIFT_TRANSPARENCY]].
     * This way simple 0xRRGGBB color is equal to 0x00RRGGBB without transparency and
     * color defining transparency (alpha < 255) is always recognizable by the oldest
     * bit set:
     * ```typescript
     * (color >> SHIFT_TRANSPARENCY) !== 0.
     * ```
     * @note All input components are floating points in <0, 1> range (inclusively).
     * @note Although method encodes transparency channel in single number value, it is still
     * compatible with THREE.js number based color coding (0xRRGGBB), so you may pass this value to
     * [[THREE.Color]] c-tor, but keep in mind that transparency will be silently ignored.
     */
    function getHexFromRgba(r, g, b, a) {
        harp_utils_1.assert(a >= 0 && a <= 1);
        const t = HEX_FULL_CHANNEL - Math.floor(a * HEX_FULL_CHANNEL);
        return ((t << SHIFT_TRANSPARENCY) ^
            ((r * HEX_FULL_CHANNEL) << SHIFT_RED) ^
            ((g * HEX_FULL_CHANNEL) << SHIFT_GREEN) ^
            ((b * HEX_FULL_CHANNEL) << SHIFT_BLUE));
    }
    ColorUtils.getHexFromRgba = getHexFromRgba;
    /**
     * Encodes RGB all color channels in single number with format 0xRRGGBB.
     *
     * All input channels should be in <0, 1> range (inclusively).
     * See also [[getHexFromRgba]] for more information about [[THREE.Color]] compatibility.
     *
     * @note This method is fully compatible with THREE.js color encoding, so
     * you may pass this value directly to THREE.Color c-tor.
     */
    function getHexFromRgb(r, g, b) {
        harp_utils_1.assert(r >= 0 && r <= 1);
        harp_utils_1.assert(g >= 0 && g <= 1);
        harp_utils_1.assert(b >= 0 && b <= 1);
        return (((r * HEX_FULL_CHANNEL) << SHIFT_RED) ^
            ((g * HEX_FULL_CHANNEL) << SHIFT_GREEN) ^
            ((b * HEX_FULL_CHANNEL) << SHIFT_BLUE));
    }
    ColorUtils.getHexFromRgb = getHexFromRgb;
    /**
     * Encode and convert HSL value to number coded color format (0xRRGGBB).
     *
     * @see getHexFromRgb.
     * @param h Hue component value between 0 and 1.
     * @param s Saturation value between 0 and 1.
     * @param l Lightness channel between 0 and 1.
     */
    function getHexFromHsl(h, s, l) {
        harp_utils_1.assert(h >= 0 && h <= 1);
        harp_utils_1.assert(s >= 0 && s <= 1);
        harp_utils_1.assert(l >= 0 && l <= 1);
        return tmpColor.setHSL(h, s, l).getHex();
    }
    ColorUtils.getHexFromHsl = getHexFromHsl;
    /**
     * Retrieve RGBA channels separately from number encoded custom color format.
     *
     * Provides an easy way for channels extraction (r, g, b, a) from custom number coded color
     * format.
     *
     * @see getHexFromRgba.
     * @param hex The number encoded color value (0xRRGGBB or 0xTTRRGGBB in hex).
     * @returns r, g, b, a channels in simple object, where each channel value is saved as floating
     * point from 0 to 1 inclusively.
     */
    function getRgbaFromHex(hex) {
        harp_utils_1.assert((hex & ~HEX_TRGB_MASK) === 0, "Wrong hex format");
        return {
            r: ((hex >> SHIFT_RED) & HEX_FULL_CHANNEL) / HEX_FULL_CHANNEL,
            g: ((hex >> SHIFT_GREEN) & HEX_FULL_CHANNEL) / HEX_FULL_CHANNEL,
            b: ((hex >> SHIFT_BLUE) & HEX_FULL_CHANNEL) / HEX_FULL_CHANNEL,
            a: (HEX_FULL_CHANNEL - ((hex >> SHIFT_TRANSPARENCY) & HEX_FULL_CHANNEL)) /
                HEX_FULL_CHANNEL
        };
    }
    ColorUtils.getRgbaFromHex = getRgbaFromHex;
    /**
     * Determines if number encoded color contains alpha (opacity) defined and different then 255.
     *
     * @param hex The number encoded color (0xRRGGBB or 0xTTRRGGBB in hex).
     * @returns True if color has transparency defined.
     */
    function hasAlphaInHex(hex) {
        harp_utils_1.assert((hex & ~HEX_TRGB_MASK) === 0, "Wrong hex format");
        return hex >> SHIFT_TRANSPARENCY !== 0;
    }
    ColorUtils.hasAlphaInHex = hasAlphaInHex;
    /**
     * Retrieves alpha color channel from hex encoded color value.
     *
     * @see getHexFromRgba.
     * @param hex The number encoded color value (representable as 0xRRGGBB or 0xTTRRGGBB in hex).
     * @returns The floating point alpha component in <0, 1> range.
     */
    function getAlphaFromHex(hex) {
        harp_utils_1.assert((hex & ~HEX_TRGB_MASK) === 0, "Wrong hex format");
        return (((HEX_FULL_CHANNEL - (hex >> SHIFT_TRANSPARENCY)) & HEX_FULL_CHANNEL) / HEX_FULL_CHANNEL);
    }
    ColorUtils.getAlphaFromHex = getAlphaFromHex;
    /**
     * Remove transparency info from the number coded color, makes it compatible with external libs.
     *
     * @see getAlphaFromHex.
     * @param hex The number encoded color value (representable as 0xRRGGBB or 0xTTRRGGBB in hex).
     * @returns number coded color value representable as 0xRRGGBB in hex.
     */
    function removeAlphaFromHex(hex) {
        harp_utils_1.assert((hex & ~HEX_TRGB_MASK) === 0, "Wrong hex format");
        return hex & HEX_RGB_MASK;
    }
    ColorUtils.removeAlphaFromHex = removeAlphaFromHex;
})(ColorUtils = exports.ColorUtils || (exports.ColorUtils = {}));


/***/ }),

/***/ "../harp-datasource-protocol/lib/DecodedTile.ts":
/*!******************************************************!*\
  !*** ../harp-datasource-protocol/lib/DecodedTile.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
/**
 * Returns an array with the data type specified as parameter.
 *
 * @param attr specifies which type of data is being stored in the array
 */
function getArrayConstructor(attr) {
    switch (attr) {
        case "float":
            return Float32Array;
        case "uint8":
            return Uint8Array;
        case "uint16":
            return Uint16Array;
        case "uint32":
            return Uint32Array;
        case "int8":
            return Int8Array;
        case "int16":
            return Int16Array;
        case "int32":
            return Int32Array;
    }
}
exports.getArrayConstructor = getArrayConstructor;
/**
 * Geometry types supported by [[Geometry]] objects.
 */
var GeometryType;
(function (GeometryType) {
    GeometryType[GeometryType["Unspecified"] = 0] = "Unspecified";
    GeometryType[GeometryType["Point"] = 1] = "Point";
    GeometryType[GeometryType["Line"] = 2] = "Line";
    GeometryType[GeometryType["SolidLine"] = 3] = "SolidLine";
    GeometryType[GeometryType["Text"] = 4] = "Text";
    GeometryType[GeometryType["TextPath"] = 5] = "TextPath";
    GeometryType[GeometryType["ExtrudedLine"] = 6] = "ExtrudedLine";
    GeometryType[GeometryType["Polygon"] = 7] = "Polygon";
    GeometryType[GeometryType["ExtrudedPolygon"] = 8] = "ExtrudedPolygon";
    GeometryType[GeometryType["Object3D"] = 9] = "Object3D";
    GeometryType[GeometryType["Other"] = 1000] = "Other";
})(GeometryType = exports.GeometryType || (exports.GeometryType = {}));
/**
 * Returns the projection object specified in the parameter.
 *
 * @param projectionName string describing projection to be used
 */
function getProjection(projectionName) {
    switch (projectionName) {
        case "mercator":
            return harp_geoutils_1.mercatorProjection;
        case "webMercator":
            return harp_geoutils_1.webMercatorProjection;
        case "sphere":
            return harp_geoutils_1.sphereProjection;
        case "normalizedEquirectangular":
            return harp_geoutils_1.normalizedEquirectangularProjection;
        case "equirectangular":
            return harp_geoutils_1.equirectangularProjection;
        default:
            throw new Error(`Unknown projection ${projectionName}`);
    } // switch
}
exports.getProjection = getProjection;
/**
 * String with the projection's name.
 *
 * @param projection `Projection` object containing the name of the projection to retrieve
 */
function getProjectionName(projection) {
    if (projection === harp_geoutils_1.mercatorProjection) {
        return "mercator";
    }
    else if (projection === harp_geoutils_1.webMercatorProjection) {
        return "webMercator";
    }
    else if (projection === harp_geoutils_1.sphereProjection) {
        return "sphere";
    }
    else if (projection === harp_geoutils_1.normalizedEquirectangularProjection) {
        return "normalizedEquirectangular";
    }
    else if (projection === harp_geoutils_1.equirectangularProjection) {
        return "equirectangular";
    }
    throw new Error("Unknown projection");
}
exports.getProjectionName = getProjectionName;
/**
 * @returns Feature id from the provided attribute map.
 */
function getFeatureId(attributeMap) {
    if (attributeMap === undefined) {
        return 0;
    }
    if (typeof attributeMap === "number") {
        return attributeMap;
    }
    if (attributeMap.hasOwnProperty("$id")) {
        return attributeMap.$id;
    }
    return 0;
}
exports.getFeatureId = getFeatureId;


/***/ }),

/***/ "../harp-datasource-protocol/lib/Env.ts":
/*!**********************************************!*\
  !*** ../harp-datasource-protocol/lib/Env.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
class Env {
    /**
     * Returns property in [[Env]] by name.
     *
     * @param name Name of property.
     */
    lookup(_name) {
        return undefined;
    }
    /**
     * Return an object containing all properties of this environment. (Here: empty object).
     */
    unmap() {
        return {};
    }
}
exports.Env = Env;
/**
 * Adds access to map specific environment properties.
 */
class MapEnv extends Env {
    constructor(entries, parent) {
        super();
        this.entries = entries;
        this.parent = parent;
    }
    /**
     * Returns property in [[Env]] by name.
     *
     * @param name Name of property.
     * @override
     */
    lookup(name) {
        if (this.entries.hasOwnProperty(name)) {
            const value = this.entries[name];
            if (value !== undefined) {
                return value;
            }
        }
        return this.parent ? this.parent.lookup(name) : undefined;
    }
    /**
     * Return an object containing all properties of this environment, takes care of the parent
     * object.
     * @override
     */
    unmap() {
        const obj = this.parent ? this.parent.unmap() : {};
        for (const key in this.entries) {
            if (this.entries.hasOwnProperty(key)) {
                obj[key] = this.entries[key];
            }
        }
        return obj;
    }
}
exports.MapEnv = MapEnv;


/***/ }),

/***/ "../harp-datasource-protocol/lib/ExponentialInterpolant.ts":
/*!*****************************************************************!*\
  !*** ../harp-datasource-protocol/lib/ExponentialInterpolant.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = __webpack_require__(/*! three */ "three");
class ExponentialInterpolant extends three_1.Interpolant {
    constructor() {
        super(...arguments);
        /**
         * Exponent value. Defaults to `2.0`.
         */
        this.exponent = 2.0;
    }
    // Note: We need to disable linting here as tslint thinks this function is never used, though it
    // indeed is called by ``Interpolant.evaluate(level)``.
    // tslint:disable-next-line
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer;
        // TODO: Remove when Interpolant types are fixed.
        const values = this.sampleValues;
        const stride = this.valueSize;
        const offset1 = i1 * stride;
        const offset0 = offset1 - stride;
        const weight1 = Math.pow((t - t0) / (t1 - t0), this.exponent);
        const weight0 = 1 - weight1;
        for (let i = 0; i !== stride; ++i) {
            result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
        }
        return result;
    }
}
exports.ExponentialInterpolant = ExponentialInterpolant;


/***/ }),

/***/ "../harp-datasource-protocol/lib/Expr.ts":
/*!***********************************************!*\
  !*** ../harp-datasource-protocol/lib/Expr.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const ExprEvaluator_1 = __webpack_require__(/*! ./ExprEvaluator */ "../harp-datasource-protocol/lib/ExprEvaluator.ts");
const ExprInstantiator_1 = __webpack_require__(/*! ./ExprInstantiator */ "../harp-datasource-protocol/lib/ExprInstantiator.ts");
const ExprParser_1 = __webpack_require__(/*! ./ExprParser */ "../harp-datasource-protocol/lib/ExprParser.ts");
const InterpolatedProperty_1 = __webpack_require__(/*! ./InterpolatedProperty */ "../harp-datasource-protocol/lib/InterpolatedProperty.ts");
const InterpolatedPropertyDefs_1 = __webpack_require__(/*! ./InterpolatedPropertyDefs */ "../harp-datasource-protocol/lib/InterpolatedPropertyDefs.ts");
const Theme_1 = __webpack_require__(/*! ./Theme */ "../harp-datasource-protocol/lib/Theme.ts");
__export(__webpack_require__(/*! ./Env */ "../harp-datasource-protocol/lib/Env.ts"));
const exprEvaluator = new ExprEvaluator_1.ExprEvaluator();
const exprInstantiator = new ExprInstantiator_1.ExprInstantiator();
/**
 * The dependencies of an [[Expr]].
 */
class ExprDependencies {
    constructor() {
        /**
         * The properties needed to evaluate the [[Expr]].
         */
        this.properties = new Set();
    }
}
exports.ExprDependencies = ExprDependencies;
class ComputeExprDependencies {
    /**
     * Gets the dependencies of an [[Expr]].
     *
     * @param expr The [[Expr]] to process.
     * @param scope The evaluation scope. Defaults to [[ExprScope.Value]].
     * @param dependencies The output [[Set]] of dependency names.
     */
    static of(expr) {
        const dependencies = new ExprDependencies();
        expr.accept(this.instance, dependencies);
        return dependencies;
    }
    visitNullLiteralExpr(expr, context) {
        // nothing to do
    }
    visitBooleanLiteralExpr(expr, context) {
        // nothing to do
    }
    visitNumberLiteralExpr(expr, context) {
        // nothing to do
    }
    visitStringLiteralExpr(expr, context) {
        // nothing to do
    }
    visitObjectLiteralExpr(expr, context) {
        // nothing to do
    }
    visitVarExpr(expr, context) {
        context.properties.add(expr.name);
    }
    visitHasAttributeExpr(expr, context) {
        context.properties.add(expr.name);
    }
    visitContainsExpr(expr, context) {
        expr.value.accept(this, context);
    }
    visitCallExpr(expr, context) {
        if (expr.op === "zoom" && expr.args.length === 0) {
            context.zoom = true;
        }
        else {
            expr.args.forEach(childExpr => childExpr.accept(this, context));
        }
    }
    visitMatchExpr(expr, context) {
        expr.value.accept(this, context);
        expr.branches.forEach(([_, branch]) => branch.accept(this, context));
        expr.fallback.accept(this, context);
    }
    visitCaseExpr(expr, context) {
        expr.branches.forEach(([condition, branch]) => {
            condition.accept(this, context);
            branch.accept(this, context);
        });
        expr.fallback.accept(this, context);
    }
}
ComputeExprDependencies.instance = new ComputeExprDependencies();
function isJsonExpr(v) {
    return Array.isArray(v) && v.length > 0 && typeof v[0] === "string";
}
exports.isJsonExpr = isJsonExpr;
/**
 * The evaluation scope of an [[Expr]].
 */
var ExprScope;
(function (ExprScope) {
    /**
     * The scope of an [[Expr]] used as value of an attribute.
     */
    ExprScope[ExprScope["Value"] = 0] = "Value";
    /**
     * The scope of an [[Expr]] used in a [[Technique]] `when` condition.
     */
    ExprScope[ExprScope["Condition"] = 1] = "Condition";
    /**
     * The scope of an [[Expr]] used as dynamic property attribute value.
     */
    ExprScope[ExprScope["Dynamic"] = 2] = "Dynamic";
})(ExprScope = exports.ExprScope || (exports.ExprScope = {}));
/**
 * Abstract class defining a shape of a [[Theme]]'s expression
 */
class Expr {
    /**
     * Tests of given value is an [[Expr]].
     *
     * @param value The object to test.
     */
    static isExpr(value) {
        return value instanceof Expr;
    }
    /**
     * Creates an expression from the given `code`.
     *
     * @param code The code to parse.
     * @returns The parsed [[Expr]].
     * @deprecated
     */
    static parse(code) {
        const parser = new ExprParser_1.ExprParser(code);
        const expr = parser.parse();
        return expr;
    }
    /**
     * Parse expression in JSON form.
     *
     * If `definitions` are defined, then references (`['ref', name]`) are resolved.
     *
     * Pass `definitionExprCache` to reuse `Expr` instances created from definitions across
     * many `fromJSON` calls.
     *
     * @param node expression in JSON format to parse
     * @param definitions optional set of definitions needed definition resolved by `ref` operator
     * @param definitionExprCache optional cache of `Expr` instances derived from `definitions`
     */
    static fromJSON(node, definitions, definitionExprCache) {
        const referenceResolverState = definitions !== undefined
            ? {
                definitions,
                lockedNames: new Set(),
                cache: definitionExprCache || new Map()
            }
            : undefined;
        return parseNode(node, referenceResolverState);
    }
    /**
     * Evaluate an expression returning a [[Value]] object.
     *
     * @param env The [[Env]] used to lookup symbols.
     * @param scope The evaluation scope. Defaults to [[ExprScope.Value]].
     * @param cache A cache of previously computed results.
     */
    evaluate(env, scope = ExprScope.Value, cache) {
        return this.accept(exprEvaluator, new ExprEvaluator_1.ExprEvaluatorContext(exprEvaluator, env, scope, cache));
    }
    /**
     * Instantiates this [[Expr]] by resolving references to the `get` and
     * `has` operator using the given instantiation context.
     *
     * @param context The [[InstantationContext]] used to resolve names.
     */
    instantiate(context) {
        return this.accept(exprInstantiator, context);
    }
    /**
     * Gets the dependencies of this [[Expr]].
     */
    dependencies() {
        if (!this.m_dependencies) {
            this.m_dependencies = ComputeExprDependencies.of(this);
        }
        return this.m_dependencies;
    }
    /**
     * Create a unique object that is structurally equivalent to this [[Expr]].
     *
     * @param pool The [[ExprPool]] used to create a unique
     * equivalent object of this [[Expr]].
     */
    intern(pool) {
        return pool.add(this);
    }
    toJSON() {
        return new ExprSerializer().serialize(this);
    }
    /**
     * Returns `true` if a dynamic execution context is required to evaluate this [[Expr]].
     */
    isDynamic() {
        if (this.m_isDynamic === undefined) {
            this.m_isDynamic = this.exprIsDynamic();
        }
        return this.m_isDynamic;
    }
}
exports.Expr = Expr;
/**
 * Var expression.
 * @hidden
 */
class VarExpr extends Expr {
    constructor(name) {
        super();
        this.name = name;
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitVarExpr(this, context);
    }
    /** @override */
    exprIsDynamic() {
        return false;
    }
}
exports.VarExpr = VarExpr;
class LiteralExpr extends Expr {
    /**
     * Create a [[LiteralExpr]] from the given value.
     *
     * @param value A constant value.
     */
    static fromValue(value) {
        switch (typeof value) {
            case "boolean":
                return new BooleanLiteralExpr(value);
            case "number":
                return new NumberLiteralExpr(value);
            case "string":
                return new StringLiteralExpr(value);
            case "object":
                return value === null ? NullLiteralExpr.instance : new ObjectLiteralExpr(value);
            default:
                throw new Error(`failed to create a literal from '${value}'`);
        } // switch
    }
    /** @override */
    exprIsDynamic() {
        return false;
    }
}
exports.LiteralExpr = LiteralExpr;
/**
 * Null literal expression.
 * @hidden
 */
class NullLiteralExpr extends LiteralExpr {
    constructor() {
        super();
        /** @override */
        this.value = null;
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitNullLiteralExpr(this, context);
    }
    /** @override */
    exprIsDynamic() {
        return false;
    }
}
exports.NullLiteralExpr = NullLiteralExpr;
NullLiteralExpr.instance = new NullLiteralExpr();
/**
 * Boolean literal expression.
 * @hidden
 */
class BooleanLiteralExpr extends LiteralExpr {
    constructor(value) {
        super();
        this.value = value;
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitBooleanLiteralExpr(this, context);
    }
}
exports.BooleanLiteralExpr = BooleanLiteralExpr;
/**
 * Number literal expression.
 * @hidden
 */
class NumberLiteralExpr extends LiteralExpr {
    constructor(value) {
        super();
        this.value = value;
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitNumberLiteralExpr(this, context);
    }
}
exports.NumberLiteralExpr = NumberLiteralExpr;
/**
 * String literal expression.
 * @hidden
 */
class StringLiteralExpr extends LiteralExpr {
    constructor(value) {
        super();
        this.value = value;
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitStringLiteralExpr(this, context);
    }
}
exports.StringLiteralExpr = StringLiteralExpr;
/**
 * Object literal expression.
 * @hidden
 */
class ObjectLiteralExpr extends LiteralExpr {
    constructor(value) {
        super();
        this.value = value;
    }
    get isArrayLiteral() {
        return Array.isArray(this.value);
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitObjectLiteralExpr(this, context);
    }
}
exports.ObjectLiteralExpr = ObjectLiteralExpr;
/**
 * A has expression with an attribute, for example `has(ref)`.
 * @hidden
 */
class HasAttributeExpr extends Expr {
    constructor(name) {
        super();
        this.name = name;
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitHasAttributeExpr(this, context);
    }
    /** @override */
    exprIsDynamic() {
        return false;
    }
}
exports.HasAttributeExpr = HasAttributeExpr;
/**
 * A contains expression.
 * @hidden
 */
class ContainsExpr extends Expr {
    constructor(value, elements) {
        super();
        this.value = value;
        this.elements = elements;
    }
    static isValidElementsArray(elements) {
        if (!Array.isArray(elements) || elements.length === 0) {
            return false;
        }
        const elementTy = typeof elements[0];
        if (elementTy === "number" || elementTy === "string") {
            return elements.every(element => typeof element === elementTy);
        }
        return false;
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitContainsExpr(this, context);
    }
    /** @override */
    exprIsDynamic() {
        return this.value.isDynamic();
    }
}
exports.ContainsExpr = ContainsExpr;
/**
 * @hidden
 */
class CallExpr extends Expr {
    constructor(op, args) {
        super();
        this.op = op;
        this.args = args;
    }
    /**
     * Returns the child nodes of this [[Expr]].
     * @deprecated
     */
    get children() {
        return this.args;
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitCallExpr(this, context);
    }
    /** @override */
    exprIsDynamic() {
        const descriptor = this.descriptor || ExprEvaluator_1.ExprEvaluator.getOperator(this.op);
        if (descriptor && descriptor.isDynamicOperator && descriptor.isDynamicOperator(this)) {
            return true;
        }
        return this.args.some(e => e.isDynamic());
    }
}
exports.CallExpr = CallExpr;
/**
 * @hidden
 */
class MatchExpr extends Expr {
    constructor(value, branches, fallback) {
        super();
        this.value = value;
        this.branches = branches;
        this.fallback = fallback;
    }
    /**
     * Tests if the given JSON node is a valid label for the `"match"` operator.
     *
     * @param node A JSON value.
     */
    static isValidMatchLabel(node) {
        switch (typeof node) {
            case "number":
            case "string":
                return true;
            case "object":
                if (!Array.isArray(node) || node.length === 0) {
                    return false;
                }
                const elementTy = typeof node[0];
                if (elementTy === "number" || elementTy === "string") {
                    return node.every(t => typeof t === elementTy);
                }
                return false;
            default:
                return false;
        } // switch
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitMatchExpr(this, context);
    }
    /** @override */
    exprIsDynamic() {
        return (this.value.isDynamic() ||
            this.branches.some(([_, branch]) => branch.isDynamic()) ||
            this.fallback.isDynamic());
    }
}
exports.MatchExpr = MatchExpr;
/**
 * @hidden
 */
class CaseExpr extends Expr {
    constructor(branches, fallback) {
        super();
        this.branches = branches;
        this.fallback = fallback;
    }
    /** @override */
    accept(visitor, context) {
        return visitor.visitCaseExpr(this, context);
    }
    /** @override */
    exprIsDynamic() {
        return (this.branches.some(([cond, branch]) => cond.isDynamic() || branch.isDynamic()) ||
            this.fallback.isDynamic());
    }
}
exports.CaseExpr = CaseExpr;
/**
 * @hidden
 */
class ExprSerializer {
    serialize(expr) {
        return expr.accept(this, undefined);
    }
    visitNullLiteralExpr(expr, context) {
        return null;
    }
    visitBooleanLiteralExpr(expr, context) {
        return expr.value;
    }
    visitNumberLiteralExpr(expr, context) {
        return expr.value;
    }
    visitStringLiteralExpr(expr, context) {
        return expr.value;
    }
    visitObjectLiteralExpr(expr, context) {
        return ["literal", expr.value];
    }
    visitVarExpr(expr, context) {
        return ["get", expr.name];
    }
    visitHasAttributeExpr(expr, context) {
        return ["has", expr.name];
    }
    visitContainsExpr(expr, context) {
        return ["in", this.serialize(expr.value), expr.elements];
    }
    visitCallExpr(expr, context) {
        return [expr.op, ...expr.args.map(childExpr => this.serialize(childExpr))];
    }
    visitMatchExpr(expr, context) {
        const branches = [];
        for (const [label, body] of expr.branches) {
            branches.push(label, this.serialize(body));
        }
        return ["match", this.serialize(expr.value), ...branches, this.serialize(expr.fallback)];
    }
    visitCaseExpr(expr, context) {
        const branches = [];
        for (const [condition, body] of expr.branches) {
            branches.push(this.serialize(condition), this.serialize(body));
        }
        return ["case", ...branches, this.serialize(expr.fallback)];
    }
}
function parseNode(node, referenceResolverState) {
    if (Array.isArray(node)) {
        return parseCall(node, referenceResolverState);
    }
    else if (node === null) {
        return NullLiteralExpr.instance;
    }
    else if (typeof node === "boolean") {
        return new BooleanLiteralExpr(node);
    }
    else if (typeof node === "number") {
        return new NumberLiteralExpr(node);
    }
    else if (typeof node === "string") {
        return new StringLiteralExpr(node);
    }
    throw new Error(`failed to create expression from: ${JSON.stringify(node)}`);
}
function parseCall(node, referenceResolverState) {
    const op = node[0];
    if (typeof op !== "string") {
        throw new Error("expected a builtin function name");
    }
    switch (op) {
        case "!has":
        case "!in":
            return new CallExpr("!", [parseCall([op.slice(1), ...node.slice(1)])]);
        case "ref":
            return resolveReference(node, referenceResolverState);
        case "get":
            return parseGetExpr(node, referenceResolverState);
        case "has":
            return parseHasExpr(node, referenceResolverState);
        case "in":
            return parseInExpr(node, referenceResolverState);
        case "literal":
            return parseLiteralExpr(node);
        case "match":
            return parseMatchExpr(node, referenceResolverState);
        case "case":
            return parseCaseExpr(node, referenceResolverState);
        default:
            return makeCallExpr(op, node, referenceResolverState);
    } // switch
}
function parseGetExpr(node, referenceResolverState) {
    if (node[2] !== undefined) {
        return makeCallExpr("get", node, referenceResolverState);
    }
    const name = node[1];
    if (typeof name !== "string") {
        throw new Error(`expected the name of an attribute`);
    }
    return new VarExpr(name);
}
function parseHasExpr(node, referenceResolverState) {
    if (node[2] !== undefined) {
        return makeCallExpr("has", node, referenceResolverState);
    }
    const name = node[1];
    if (typeof name !== "string") {
        throw new Error(`expected the name of an attribute`);
    }
    return new HasAttributeExpr(name);
}
function parseInExpr(node, referenceResolverState) {
    const elements = node[2];
    if (!ContainsExpr.isValidElementsArray(elements)) {
        // tslint:disable-next-line: max-line-length
        throw new Error(`'in' expects an array of number or string literals`);
    }
    return new ContainsExpr(parseNode(node[1], referenceResolverState), elements);
}
function parseLiteralExpr(node) {
    const obj = node[1];
    if (obj === null || typeof obj !== "object") {
        throw new Error("expected an object or array literal");
    }
    return new ObjectLiteralExpr(obj);
}
function parseMatchExpr(node, referenceResolverState) {
    if (node.length < 4) {
        throw new Error("not enough arguments");
    }
    if (!(node.length % 2)) {
        throw new Error("fallback is missing in 'match' expression");
    }
    const value = parseNode(node[1], referenceResolverState);
    const conditions = [];
    for (let i = 2; i < node.length - 1; i += 2) {
        const label = node[i];
        if (!MatchExpr.isValidMatchLabel(label)) {
            throw new Error(`'${JSON.stringify(label)}' is not a valid label for 'match'`);
        }
        const expr = parseNode(node[i + 1], referenceResolverState);
        conditions.push([label, expr]);
    }
    const fallback = parseNode(node[node.length - 1], referenceResolverState);
    return new MatchExpr(value, conditions, fallback);
}
function parseCaseExpr(node, referenceResolverState) {
    if (node.length < 3) {
        throw new Error("not enough arguments");
    }
    if (node.length % 2) {
        throw new Error("fallback is missing in 'case' expression");
    }
    const branches = [];
    for (let i = 1; i < node.length - 1; i += 2) {
        const condition = parseNode(node[i], referenceResolverState);
        const expr = parseNode(node[i + 1], referenceResolverState);
        branches.push([condition, expr]);
    }
    const caseFallback = parseNode(node[node.length - 1], referenceResolverState);
    return new CaseExpr(branches, caseFallback);
}
function makeCallExpr(op, node, referenceResolverState) {
    return new CallExpr(op, node.slice(1).map(childExpr => parseNode(childExpr, referenceResolverState)));
}
function resolveReference(node, referenceResolverState) {
    if (typeof node[1] !== "string") {
        throw new Error(`expected the name of an attribute`);
    }
    if (referenceResolverState === undefined) {
        throw new Error(`ref used with no definitions`);
    }
    const name = node[1];
    if (referenceResolverState.lockedNames.has(name)) {
        throw new Error(`circular referene to '${name}'`);
    }
    if (!(name in referenceResolverState.definitions)) {
        throw new Error(`definition '${name}' not found`);
    }
    const cachedEntry = referenceResolverState.cache.get(name);
    if (cachedEntry !== undefined) {
        return cachedEntry;
    }
    let definitionEntry = referenceResolverState.definitions[name];
    let result;
    if (Theme_1.isLiteralDefinition(definitionEntry)) {
        return Expr.fromJSON(definitionEntry);
    }
    else if (Theme_1.isBoxedDefinition(definitionEntry)) {
        if (InterpolatedProperty_1.isInterpolatedPropertyDefinition(definitionEntry.value)) {
            // found a reference to an interpolation using
            // the deprecated object-like syntax.
            return Expr.fromJSON(InterpolatedPropertyDefs_1.interpolatedPropertyDefinitionToJsonExpr(definitionEntry.value));
        }
        else if (isJsonExpr(definitionEntry.value)) {
            definitionEntry = definitionEntry.value;
        }
        else {
            return Expr.fromJSON(definitionEntry.value);
        }
    }
    if (isJsonExpr(definitionEntry)) {
        referenceResolverState.lockedNames.add(name);
        try {
            result = parseNode(definitionEntry, referenceResolverState);
        }
        finally {
            referenceResolverState.lockedNames.delete(name);
        }
    }
    else {
        throw new Error(`unsupported definition ${name}`);
    }
    referenceResolverState.cache.set(name, result);
    return result;
}


/***/ }),

/***/ "../harp-datasource-protocol/lib/ExprEvaluator.ts":
/*!********************************************************!*\
  !*** ../harp-datasource-protocol/lib/ExprEvaluator.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
const ArrayOperators_1 = __webpack_require__(/*! ./operators/ArrayOperators */ "../harp-datasource-protocol/lib/operators/ArrayOperators.ts");
const CastOperators_1 = __webpack_require__(/*! ./operators/CastOperators */ "../harp-datasource-protocol/lib/operators/CastOperators.ts");
const ColorOperators_1 = __webpack_require__(/*! ./operators/ColorOperators */ "../harp-datasource-protocol/lib/operators/ColorOperators.ts");
const ComparisonOperators_1 = __webpack_require__(/*! ./operators/ComparisonOperators */ "../harp-datasource-protocol/lib/operators/ComparisonOperators.ts");
const FeatureOperators_1 = __webpack_require__(/*! ./operators/FeatureOperators */ "../harp-datasource-protocol/lib/operators/FeatureOperators.ts");
const FlowOperators_1 = __webpack_require__(/*! ./operators/FlowOperators */ "../harp-datasource-protocol/lib/operators/FlowOperators.ts");
const InterpolationOperators_1 = __webpack_require__(/*! ./operators/InterpolationOperators */ "../harp-datasource-protocol/lib/operators/InterpolationOperators.ts");
const MapOperators_1 = __webpack_require__(/*! ./operators/MapOperators */ "../harp-datasource-protocol/lib/operators/MapOperators.ts");
const MathOperators_1 = __webpack_require__(/*! ./operators/MathOperators */ "../harp-datasource-protocol/lib/operators/MathOperators.ts");
const MiscOperators_1 = __webpack_require__(/*! ./operators/MiscOperators */ "../harp-datasource-protocol/lib/operators/MiscOperators.ts");
const ObjectOperators_1 = __webpack_require__(/*! ./operators/ObjectOperators */ "../harp-datasource-protocol/lib/operators/ObjectOperators.ts");
const StringOperators_1 = __webpack_require__(/*! ./operators/StringOperators */ "../harp-datasource-protocol/lib/operators/StringOperators.ts");
const TypeOperators_1 = __webpack_require__(/*! ./operators/TypeOperators */ "../harp-datasource-protocol/lib/operators/TypeOperators.ts");
const operatorDescriptors = new Map();
/*
 * @hidden
 */
class ExprEvaluatorContext {
    constructor(evaluator, env, scope, cache) {
        this.evaluator = evaluator;
        this.env = env;
        this.scope = scope;
        this.cache = cache;
        this.m_partialEvaluation = false;
    }
    /**
     * `true` if the this context is used to partially evaluate expressions.
     */
    get partialEvaluation() {
        return this.m_partialEvaluation;
    }
    /**
     * Evaluate the given expression.
     *
     * @param expr The [[Expr]] to evaluate.
     */
    evaluate(expr) {
        if (expr !== undefined) {
            return expr.accept(this.evaluator, this);
        }
        throw new Error("Failed to evaluate expression");
    }
    /**
     * Partially evaluate the given expression.
     *
     * @param expr The [[Expr]] to evaluate.
     */
    partiallyEvaluate(expr) {
        if (expr === undefined) {
            throw new Error("Failed to evaluate expression");
        }
        const previousEvaluationMode = this.m_partialEvaluation;
        this.m_partialEvaluation = true;
        try {
            const value = expr.accept(this.evaluator, this);
            this.m_partialEvaluation = previousEvaluationMode;
            if (value instanceof Expr_1.Expr) {
                return value;
            }
            return Expr_1.LiteralExpr.fromValue(value);
        }
        catch (error) {
            // rethrow the exception
            throw error;
        }
        finally {
            // reset the evaluation mode.
            this.m_partialEvaluation = previousEvaluationMode;
        }
    }
}
exports.ExprEvaluatorContext = ExprEvaluatorContext;
/**
 * [[ExprEvaluator]] is used to evaluate [[Expr]] in a given environment.
 *
 * @hidden
 */
class ExprEvaluator {
    static defineOperator(op, builtin) {
        operatorDescriptors.set(op, builtin);
    }
    static defineOperators(builtins) {
        Object.getOwnPropertyNames(builtins).forEach(p => {
            this.defineOperator(p, builtins[p]);
        });
    }
    /**
     * Returns the [[OperatorDescriptor]] for the given operator name.
     * @hidden
     */
    static getOperator(op) {
        return operatorDescriptors.get(op);
    }
    visitVarExpr(expr, context) {
        const value = context.env.lookup(expr.name);
        return value !== undefined ? value : null;
    }
    visitNullLiteralExpr(expr, context) {
        return null;
    }
    visitBooleanLiteralExpr(expr, context) {
        return expr.value;
    }
    visitNumberLiteralExpr(expr, context) {
        return expr.value;
    }
    visitStringLiteralExpr(expr, context) {
        return expr.value;
    }
    visitObjectLiteralExpr(expr, context) {
        return expr.value;
    }
    visitHasAttributeExpr(expr, context) {
        return context.env.lookup(expr.name) !== undefined;
    }
    visitContainsExpr(expr, context) {
        const value = expr.value.accept(this, context);
        const result = expr.elements.includes(value);
        if (context.cache !== undefined) {
            context.cache.set(expr, result);
        }
        return result;
    }
    visitMatchExpr(match, context) {
        const r = context.evaluate(match.value);
        for (const [label, body] of match.branches) {
            if (Array.isArray(label) && label.includes(r)) {
                return context.evaluate(body);
            }
            else if (label === r) {
                return context.evaluate(body);
            }
        }
        return context.evaluate(match.fallback);
    }
    visitCaseExpr(match, context) {
        for (const [condition, body] of match.branches) {
            if (context.evaluate(condition)) {
                return context.evaluate(body);
            }
        }
        return context.evaluate(match.fallback);
    }
    visitCallExpr(expr, context) {
        if (context.cache !== undefined) {
            const v = context.cache.get(expr);
            if (v !== undefined) {
                return v;
            }
        }
        const descriptor = expr.descriptor || operatorDescriptors.get(expr.op);
        if (descriptor) {
            expr.descriptor = descriptor;
            const result = descriptor.call(context, expr);
            if (context.cache) {
                context.cache.set(expr, result);
            }
            return result;
        }
        throw new Error(`undefined operator '${expr.op}`);
    }
}
exports.ExprEvaluator = ExprEvaluator;
ExprEvaluator.defineOperators(CastOperators_1.CastOperators);
ExprEvaluator.defineOperators(ComparisonOperators_1.ComparisonOperators);
ExprEvaluator.defineOperators(MathOperators_1.MathOperators);
ExprEvaluator.defineOperators(StringOperators_1.StringOperators);
ExprEvaluator.defineOperators(ColorOperators_1.ColorOperators);
ExprEvaluator.defineOperators(TypeOperators_1.TypeOperators);
ExprEvaluator.defineOperators(MiscOperators_1.MiscOperators);
ExprEvaluator.defineOperators(FlowOperators_1.FlowOperators);
ExprEvaluator.defineOperators(ArrayOperators_1.ArrayOperators);
ExprEvaluator.defineOperators(InterpolationOperators_1.InterpolationOperators);
ExprEvaluator.defineOperators(ObjectOperators_1.ObjectOperators);
ExprEvaluator.defineOperators(FeatureOperators_1.FeatureOperators);
ExprEvaluator.defineOperators(MapOperators_1.MapOperators);


/***/ }),

/***/ "../harp-datasource-protocol/lib/ExprInstantiator.ts":
/*!***********************************************************!*\
  !*** ../harp-datasource-protocol/lib/ExprInstantiator.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
const Env_1 = __webpack_require__(/*! ./Env */ "../harp-datasource-protocol/lib/Env.ts");
const emptyEnv = new Env_1.Env();
/**
 * @hidden
 */
class ExprInstantiator {
    visitNullLiteralExpr(expr, _context) {
        return expr;
    }
    visitBooleanLiteralExpr(expr, _context) {
        return expr;
    }
    visitNumberLiteralExpr(expr, _context) {
        return expr;
    }
    visitStringLiteralExpr(expr, _context) {
        return expr;
    }
    visitObjectLiteralExpr(expr, _context) {
        return expr;
    }
    visitVarExpr(expr, context) {
        if (context.preserve && context.preserve.has(expr.name)) {
            return expr;
        }
        const value = context.env.lookup(expr.name);
        return Expr_1.LiteralExpr.fromValue(value !== undefined ? value : null);
    }
    visitHasAttributeExpr(expr, context) {
        if (context.preserve && context.preserve.has(expr.name)) {
            return expr;
        }
        const value = context.env.lookup(expr.name) !== undefined;
        return Expr_1.LiteralExpr.fromValue(value);
    }
    visitContainsExpr(expr, context) {
        const value = expr.value.accept(this, context);
        if (value instanceof Expr_1.LiteralExpr) {
            const result = expr.elements.includes(value.value);
            return Expr_1.LiteralExpr.fromValue(result);
        }
        return value === expr.value ? expr : new Expr_1.ContainsExpr(value, expr.elements);
    }
    visitCallExpr(expr, context) {
        const args = expr.args.map(arg => arg.accept(this, context));
        if (args.some((a, i) => a !== expr.args[i])) {
            return new Expr_1.CallExpr(expr.op, args);
        }
        return expr;
    }
    visitMatchExpr(match, context) {
        const value = match.value.accept(this, context);
        if (value instanceof Expr_1.LiteralExpr) {
            const r = value.value;
            for (const [label, body] of match.branches) {
                if (Array.isArray(label) && label.includes(r)) {
                    return body.accept(this, context);
                }
                else if (label === r) {
                    return body.accept(this, context);
                }
            }
            return match.fallback.accept(this, context);
        }
        let changed = match.value !== value;
        const branches = match.branches.map(([label, branch]) => {
            const newBranch = branch.accept(this, context);
            if (newBranch !== branch) {
                changed = true;
            }
            return [label, newBranch];
        });
        const fallback = match.fallback.accept(this, context);
        if (fallback !== match.fallback) {
            changed = true;
        }
        return changed ? new Expr_1.MatchExpr(value, branches, fallback) : match;
    }
    visitCaseExpr(expr, context) {
        const branches = [];
        let changed = false;
        for (const [condition, branch] of expr.branches) {
            const newCondition = condition.accept(this, context);
            const deps = newCondition.dependencies();
            if (!deps.zoom && deps.properties.size === 0) {
                if (Boolean(newCondition.evaluate(emptyEnv, Expr_1.ExprScope.Condition))) {
                    return branch.accept(this, context);
                }
            }
            else {
                if (newCondition !== condition) {
                    changed = true;
                }
                branches.push([newCondition, branch]);
            }
        }
        if (branches.length === 0) {
            // all the conditions of this CaseExpr evaluated
            // to false, so the resulting of instantiating this CaseExpr
            // is the same as instantiating its fallback expression.
            return expr.fallback.accept(this, context);
        }
        if (branches.length !== expr.branches.length) {
            // the number of branches changed, this means that
            // some of the branches had constant expressions that
            // evaluate to false. In this case the resulting
            // `CaseExpr` has less branches.
            changed = true;
        }
        // Instantiate the body of all the branches of this CaseExpr
        // that have dynamic conditions.
        branches.forEach(branch => {
            const instantiatedBranch = branch[1].accept(this, context);
            if (instantiatedBranch !== branch[1]) {
                changed = true;
            }
            branch[1] = instantiatedBranch;
        });
        const fallback = expr.fallback.accept(this, context);
        if (fallback !== expr.fallback) {
            changed = true;
        }
        if (!changed) {
            // nothing changed, return the old expression.
            return expr;
        }
        return new Expr_1.CaseExpr(branches, fallback);
    }
}
exports.ExprInstantiator = ExprInstantiator;


/***/ }),

/***/ "../harp-datasource-protocol/lib/ExprParser.ts":
/*!*****************************************************!*\
  !*** ../harp-datasource-protocol/lib/ExprParser.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
/**
 * Character value
 */
var Character;
(function (Character) {
    Character[Character["Tab"] = 9] = "Tab";
    Character[Character["Lf"] = 10] = "Lf";
    Character[Character["Cr"] = 13] = "Cr";
    Character[Character["Space"] = 32] = "Space";
    Character[Character["LParen"] = 40] = "LParen";
    Character[Character["RParen"] = 41] = "RParen";
    Character[Character["Comma"] = 44] = "Comma";
    Character[Character["Dot"] = 46] = "Dot";
    Character[Character["LBracket"] = 91] = "LBracket";
    Character[Character["Backslash"] = 92] = "Backslash";
    Character[Character["RBracket"] = 93] = "RBracket";
    Character[Character["_0"] = 48] = "_0";
    Character[Character["_9"] = 57] = "_9";
    Character[Character["_"] = 95] = "_";
    Character[Character["A"] = 64] = "A";
    Character[Character["Z"] = 90] = "Z";
    Character[Character["a"] = 97] = "a";
    Character[Character["z"] = 122] = "z";
    Character[Character["DoubleQuote"] = 34] = "DoubleQuote";
    Character[Character["SingleQuote"] = 39] = "SingleQuote";
    Character[Character["Exclaim"] = 33] = "Exclaim";
    Character[Character["Equal"] = 61] = "Equal";
    Character[Character["Caret"] = 94] = "Caret";
    Character[Character["Tilde"] = 126] = "Tilde";
    Character[Character["Dollar"] = 36] = "Dollar";
    Character[Character["Less"] = 60] = "Less";
    Character[Character["Greater"] = 62] = "Greater";
    Character[Character["Bar"] = 124] = "Bar";
    Character[Character["Amp"] = 38] = "Amp";
})(Character || (Character = {}));
/**
 * Check if a codepoint is a whitespace character.
 */
function isSpace(codepoint) {
    switch (codepoint) {
        case Character.Tab:
        case Character.Lf:
        case Character.Cr:
        case Character.Space:
            return true;
        default:
            return false;
    } // switch
}
/**
 * Check if codepoint is a digit character.
 */
function isNumber(codepoint) {
    return codepoint >= Character._0 && codepoint <= Character._9;
}
/**
 * Check if codepoint is a letter character.
 */
function isLetter(codepoint) {
    return ((codepoint >= Character.a && codepoint <= Character.z) ||
        (codepoint >= Character.A && codepoint <= Character.Z));
}
/**
 * Check if codepoint is either a digit or a letter character.
 */
function isLetterOrNumber(codepoint) {
    return isLetter(codepoint) || isNumber(codepoint);
}
/**
 * Check if codepoint is an identification character: underscore, dollar sign, dot or bracket.
 */
function isIdentChar(codepoint) {
    return (isLetterOrNumber(codepoint) ||
        codepoint === Character._ ||
        codepoint === Character.Dollar ||
        codepoint === Character.Dot ||
        codepoint === Character.LBracket ||
        codepoint === Character.RBracket);
}
/**
 * Tokens used in theme grammar.
 */
var Token;
(function (Token) {
    Token[Token["Eof"] = 0] = "Eof";
    Token[Token["Error"] = 1] = "Error";
    Token[Token["Identifier"] = 2] = "Identifier";
    Token[Token["Number"] = 3] = "Number";
    Token[Token["String"] = 4] = "String";
    Token[Token["Comma"] = 5] = "Comma";
    Token[Token["LParen"] = 6] = "LParen";
    Token[Token["RParen"] = 7] = "RParen";
    Token[Token["LBracket"] = 8] = "LBracket";
    Token[Token["RBracket"] = 9] = "RBracket";
    Token[Token["Exclaim"] = 10] = "Exclaim";
    Token[Token["TildeEqual"] = 11] = "TildeEqual";
    Token[Token["CaretEqual"] = 12] = "CaretEqual";
    Token[Token["DollarEqual"] = 13] = "DollarEqual";
    Token[Token["EqualEqual"] = 14] = "EqualEqual";
    Token[Token["ExclaimEqual"] = 15] = "ExclaimEqual";
    Token[Token["Less"] = 16] = "Less";
    Token[Token["Greater"] = 17] = "Greater";
    Token[Token["LessEqual"] = 18] = "LessEqual";
    Token[Token["GreaterEqual"] = 19] = "GreaterEqual";
    Token[Token["BarBar"] = 20] = "BarBar";
    Token[Token["AmpAmp"] = 21] = "AmpAmp";
})(Token || (Token = {}));
/**
 * Maps a token to its string name.
 */
function tokenSpell(token) {
    switch (token) {
        case Token.Eof:
            return "eof";
        case Token.Error:
            return "error";
        case Token.Identifier:
            return "identifier";
        case Token.Number:
            return "number";
        case Token.String:
            return "string";
        case Token.Comma:
            return ",";
        case Token.LParen:
            return "(";
        case Token.RParen:
            return ")";
        case Token.LBracket:
            return "[";
        case Token.RBracket:
            return "]";
        case Token.Exclaim:
            return "!";
        case Token.TildeEqual:
            return "~=";
        case Token.CaretEqual:
            return "^=";
        case Token.DollarEqual:
            return "$=";
        case Token.EqualEqual:
            return "==";
        case Token.ExclaimEqual:
            return "!=";
        case Token.Less:
            return "<";
        case Token.Greater:
            return ">";
        case Token.LessEqual:
            return "<=";
        case Token.GreaterEqual:
            return ">=";
        case Token.BarBar:
            return "||";
        case Token.AmpAmp:
            return "&&";
        default:
            throw new Error(`invalid token ${token}`);
    }
}
/**
 * Lexer class implementation.
 */
class Lexer {
    constructor(code) {
        this.code = code;
        this.m_token = Token.Error;
        this.m_index = 0;
        this.m_char = Character.Lf;
    }
    /**
     * Single lexer token.
     */
    token() {
        return this.m_token;
    }
    /**
     * Parsed text.
     */
    text() {
        return this.m_text || "";
    }
    /**
     * Go to the next token.
     */
    next() {
        this.m_token = this.yylex();
        if (this.m_token === Token.Error) {
            throw new Error(`unexpected character ${this.m_char}`);
        }
        return this.m_token;
    }
    yyinp() {
        this.m_char = this.code.codePointAt(this.m_index++) || 0;
    }
    yylex() {
        this.m_text = undefined;
        while (isSpace(this.m_char)) {
            this.yyinp();
        }
        if (this.m_char === 0) {
            return Token.Eof;
        }
        const ch = this.m_char;
        this.yyinp();
        switch (ch) {
            case Character.LParen:
                return Token.LParen;
            case Character.RParen:
                return Token.RParen;
            case Character.LBracket:
                return Token.LBracket;
            case Character.RBracket:
                return Token.RBracket;
            case Character.Comma:
                return Token.Comma;
            case Character.SingleQuote:
            case Character.DoubleQuote: {
                const start = this.m_index - 1;
                while (this.m_char && this.m_char !== ch) {
                    // ### TODO handle escape sequences
                    this.yyinp();
                }
                if (this.m_char !== ch) {
                    throw new Error("Unfinished string literal");
                }
                this.yyinp();
                this.m_text = this.code.substring(start, this.m_index - 2);
                return Token.String;
            }
            case Character.Exclaim:
                if (this.m_char === Character.Equal) {
                    this.yyinp();
                    return Token.ExclaimEqual;
                }
                return Token.Exclaim;
            case Character.Caret:
                if (this.m_char === Character.Equal) {
                    this.yyinp();
                    return Token.CaretEqual;
                }
                return Token.Error;
            case Character.Tilde:
                if (this.m_char === Character.Equal) {
                    this.yyinp();
                    return Token.TildeEqual;
                }
                return Token.Error;
            case Character.Equal:
                if (this.m_char === Character.Equal) {
                    this.yyinp();
                    return Token.EqualEqual;
                }
                return Token.Error;
            case Character.Less:
                if (this.m_char === Character.Equal) {
                    this.yyinp();
                    return Token.LessEqual;
                }
                return Token.Less;
            case Character.Greater:
                if (this.m_char === Character.Equal) {
                    this.yyinp();
                    return Token.GreaterEqual;
                }
                return Token.Greater;
            case Character.Bar:
                if (this.m_char === Character.Bar) {
                    this.yyinp();
                    return Token.BarBar;
                }
                return Token.Error;
            case Character.Amp:
                if (this.m_char === Character.Amp) {
                    this.yyinp();
                    return Token.AmpAmp;
                }
                return Token.Error;
            default: {
                const start = this.m_index - 2;
                if (isLetter(ch) ||
                    ch === Character._ ||
                    (ch === Character.Dollar && isIdentChar(this.m_char))) {
                    while (isIdentChar(this.m_char)) {
                        this.yyinp();
                    }
                    this.m_text = this.code.substring(start, this.m_index - 1);
                    return Token.Identifier;
                }
                else if (isNumber(ch)) {
                    while (isNumber(this.m_char)) {
                        this.yyinp();
                    }
                    if (this.m_char === Character.Dot) {
                        this.yyinp();
                        while (isNumber(this.m_char)) {
                            this.yyinp();
                        }
                    }
                    this.m_text = this.code.substring(start, this.m_index - 1);
                    return Token.Number;
                }
                else if (ch === Character.Dollar) {
                    if (this.m_char === Character.Equal) {
                        this.yyinp();
                        return Token.DollarEqual;
                    }
                    return Token.Error;
                }
            }
        }
        return Token.Error;
    }
}
function getEqualityOp(token) {
    switch (token) {
        case Token.TildeEqual:
            return "~=";
        case Token.CaretEqual:
            return "^=";
        case Token.DollarEqual:
            return "$=";
        case Token.EqualEqual:
            return "==";
        case Token.ExclaimEqual:
            return "!=";
        default:
            return undefined;
    } // switch
}
function getRelationalOp(token) {
    switch (token) {
        case Token.Less:
            return "<";
        case Token.Greater:
            return ">";
        case Token.LessEqual:
            return "<=";
        case Token.GreaterEqual:
            return ">=";
        default:
            return undefined;
    } // switch
}
class ExprParser {
    constructor(code) {
        this.lex = new Lexer(code);
        this.lex.next();
    }
    parse() {
        return this.parseLogicalOr();
    }
    yyexpect(token) {
        if (this.lex.token() !== token) {
            throw new Error(`Syntax error: Expected token '${tokenSpell(token)}' but ` +
                `found '${tokenSpell(this.lex.token())}'`);
        }
        this.lex.next();
    }
    parsePrimary() {
        switch (this.lex.token()) {
            case Token.Identifier: {
                const text = this.lex.text();
                switch (text) {
                    case "has":
                        this.lex.next(); // skip has keyword
                        this.yyexpect(Token.LParen);
                        const hasAttribute = this.lex.text();
                        this.yyexpect(Token.Identifier);
                        this.yyexpect(Token.RParen);
                        return new Expr_1.HasAttributeExpr(hasAttribute);
                    case "length":
                        this.lex.next(); // skip length keyword
                        this.yyexpect(Token.LParen);
                        const value = this.parseLogicalOr();
                        this.yyexpect(Token.RParen);
                        return new Expr_1.CallExpr("length", [value]);
                    default:
                        const expr = new Expr_1.VarExpr(text);
                        this.lex.next();
                        return expr;
                }
            }
            case Token.LParen: {
                this.lex.next();
                const expr = this.parseLogicalOr();
                this.yyexpect(Token.RParen);
                return expr;
            }
            default:
                return this.parseLiteral();
        } // switch
    }
    parseLiteral() {
        switch (this.lex.token()) {
            case Token.Number: {
                const expr = new Expr_1.NumberLiteralExpr(parseFloat(this.lex.text()));
                this.lex.next();
                return expr;
            }
            case Token.String: {
                const expr = new Expr_1.StringLiteralExpr(this.lex.text());
                this.lex.next();
                return expr;
            }
            default:
                throw new Error("Syntax error");
        } // switch
    }
    parseUnary() {
        if (this.lex.token() === Token.Exclaim) {
            this.lex.next();
            return new Expr_1.CallExpr("!", [this.parseUnary()]);
        }
        return this.parsePrimary();
    }
    parseRelational() {
        let expr = this.parseUnary();
        while (true) {
            if (this.lex.token() === Token.Identifier && this.lex.text() === "in") {
                this.lex.next();
                this.yyexpect(Token.LBracket);
                const elements = [this.parseLiteral()];
                while (this.lex.token() === Token.Comma) {
                    this.lex.next();
                    elements.push(this.parseLiteral());
                }
                this.yyexpect(Token.RBracket);
                expr = new Expr_1.ContainsExpr(expr, elements.map(literal => literal.value));
            }
            else {
                const op = getRelationalOp(this.lex.token());
                if (op === undefined) {
                    break;
                }
                this.lex.next();
                const right = this.parseUnary();
                expr = new Expr_1.CallExpr(op, [expr, right]);
            }
        }
        return expr;
    }
    parseEquality() {
        let expr = this.parseRelational();
        while (true) {
            const op = getEqualityOp(this.lex.token());
            if (op === undefined) {
                break;
            }
            this.lex.next();
            const right = this.parseRelational();
            expr = new Expr_1.CallExpr(op, [expr, right]);
        }
        return expr;
    }
    parseLogicalAnd() {
        const expr = this.parseEquality();
        if (this.lex.token() !== Token.AmpAmp) {
            return expr;
        }
        const expressions = [expr];
        do {
            this.lex.next();
            expressions.push(this.parseEquality());
        } while (this.lex.token() === Token.AmpAmp);
        return new Expr_1.CallExpr("all", expressions);
    }
    parseLogicalOr() {
        const expr = this.parseLogicalAnd();
        if (this.lex.token() !== Token.BarBar) {
            return expr;
        }
        const expressions = [expr];
        do {
            this.lex.next();
            expressions.push(this.parseLogicalAnd());
        } while (this.lex.token() === Token.BarBar);
        return new Expr_1.CallExpr("any", expressions);
    }
}
exports.ExprParser = ExprParser;


/***/ }),

/***/ "../harp-datasource-protocol/lib/ExprPool.ts":
/*!***************************************************!*\
  !*** ../harp-datasource-protocol/lib/ExprPool.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
/**
 * [[ExprPool]] maintains a set of unique interned [[Expr]] objects.
 *
 * @hidden
 */
class ExprPool {
    constructor() {
        this.m_booleanLiterals = new Map();
        this.m_numberLiterals = new Map();
        this.m_stringLiterals = new Map();
        this.m_objectLiterals = new Map();
        this.m_varExprs = new Map();
        this.m_hasAttributeExprs = new Map();
        this.m_inExprs = new Map();
        this.m_matchExprs = [];
        this.m_caseExprs = [];
        this.m_callExprs = new Map();
    }
    /**
     * Add `expr` to this [[ExprPool]] and return a unique [[Expr]]
     * object that is structurally equivalent to `expr`.
     *
     * @param expr The [[Expr]] to add to this [[ExprPool]].
     * @returns A unique [[Expr]] that is structurally equivalent to `expr`.
     */
    add(expr) {
        return expr.accept(this, undefined);
    }
    visitNullLiteralExpr(expr, context) {
        return Expr_1.NullLiteralExpr.instance;
    }
    visitBooleanLiteralExpr(expr, context) {
        const e = this.m_booleanLiterals.get(expr.value);
        if (e) {
            return e;
        }
        this.m_booleanLiterals.set(expr.value, expr);
        return expr;
    }
    visitNumberLiteralExpr(expr, context) {
        const e = this.m_numberLiterals.get(expr.value);
        if (e) {
            return e;
        }
        this.m_numberLiterals.set(expr.value, expr);
        return expr;
    }
    visitStringLiteralExpr(expr, context) {
        const e = this.m_stringLiterals.get(expr.value);
        if (e) {
            return e;
        }
        this.m_stringLiterals.set(expr.value, expr);
        return expr;
    }
    visitObjectLiteralExpr(expr, context) {
        const e = this.m_objectLiterals.get(expr.value);
        if (e) {
            return e;
        }
        this.m_objectLiterals.set(expr.value, expr);
        return expr;
    }
    visitVarExpr(expr, context) {
        const e = this.m_varExprs.get(expr.name);
        if (e) {
            return e;
        }
        this.m_varExprs.set(expr.name, expr);
        return expr;
    }
    visitHasAttributeExpr(expr, context) {
        const e = this.m_hasAttributeExprs.get(expr.name);
        if (e) {
            return e;
        }
        this.m_hasAttributeExprs.set(expr.name, expr);
        return expr;
    }
    visitContainsExpr(expr, context) {
        const value = expr.value.accept(this, context);
        if (!this.m_inExprs.has(value)) {
            this.m_inExprs.set(value, []);
        }
        const inExprs = this.m_inExprs.get(value);
        for (const inExpr of inExprs) {
            if (inExpr.elements.length !== expr.elements.length) {
                continue;
            }
            // find the index of the first element in the cached 'in' expr
            // that is not contained in 'expr.elements'.
            const i = inExpr.elements.findIndex(x => !expr.elements.includes(x));
            if (i === -1) {
                return inExpr;
            }
        }
        const e = new Expr_1.ContainsExpr(value, expr.elements);
        this.m_inExprs.set(value, [e]);
        return e;
    }
    visitMatchExpr(expr, context) {
        const value = expr.value.accept(this, context);
        const branches = expr.branches.map(([label, body]) => [
            label,
            body.accept(this, context)
        ]);
        const fallback = expr.fallback.accept(this, context);
        for (const candidate of this.m_matchExprs) {
            if (candidate.value !== value) {
                continue;
            }
            if (candidate.fallback !== fallback) {
                continue;
            }
            if (candidate.branches.length !== branches.length) {
                continue;
            }
            let branchesMatching = true;
            for (let i = 0; i < branches.length; i++) {
                if (branches[i][0] !== candidate.branches[i][0] ||
                    branches[i][1] !== candidate.branches[i][1]) {
                    branchesMatching = false;
                    break;
                }
            }
            if (branchesMatching) {
                return candidate;
            }
        }
        const r = new Expr_1.MatchExpr(value, branches, fallback);
        this.m_matchExprs.push(r);
        return r;
    }
    visitCaseExpr(expr, context) {
        const branches = expr.branches.map(([condition, body]) => [
            condition.accept(this, context),
            body.accept(this, context)
        ]);
        const fallback = expr.fallback.accept(this, context);
        for (const candidate of this.m_caseExprs) {
            if (candidate.fallback !== fallback) {
                continue;
            }
            if (candidate.branches.length !== branches.length) {
                continue;
            }
            let branchesMatching = true;
            for (let i = 0; i < branches.length; i++) {
                if (branches[i][0] !== candidate.branches[i][0] ||
                    branches[i][1] !== candidate.branches[i][1]) {
                    branchesMatching = false;
                    break;
                }
            }
            if (branchesMatching) {
                return candidate;
            }
        }
        const r = new Expr_1.CaseExpr(branches, fallback);
        this.m_caseExprs.push(r);
        return r;
    }
    visitCallExpr(expr, context) {
        // rewrite the actual arguments
        const expressions = expr.args.map(childExpr => childExpr.accept(this, context));
        // ensure we have a valid set of interned expressions for the calls
        if (!this.m_callExprs.has(expr.op)) {
            this.m_callExprs.set(expr.op, []);
        }
        // get the calls for the given operator.
        const calls = this.m_callExprs.get(expr.op);
        for (const call of calls) {
            // check the number of arguments
            if (call.args.length !== expressions.length) {
                continue;
            }
            // find the index of the first mismatch.
            let index = 0;
            for (; index < call.args.length; ++index) {
                if (call.args[index] !== expressions[index]) {
                    break;
                }
            }
            if (index === call.args.length) {
                // no mismatch found, return the 'interned' call.
                return call;
            }
        }
        const e = new Expr_1.CallExpr(expr.op, expressions);
        calls.push(e);
        return e;
    }
}
exports.ExprPool = ExprPool;


/***/ }),

/***/ "../harp-datasource-protocol/lib/Extruder.ts":
/*!***************************************************!*\
  !*** ../harp-datasource-protocol/lib/Extruder.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Fills an index buffer with the indices for the extruded walls for a polygon contour.
 *
 * @param indexBuffer Index buffer to be filled.
 * @param vertexOffset Starting offset of the vertices composing the contour.
 * @param vertexStride Number of elements per contour vertex.
 * @param contour Vertices that compose the contour.
 * @param contourEdges Collection of booleans indicating if contour edges should be added.
 * @param boundaryWalls If `false`, walls in tile boundaries will not be created.
 *
 */
function addExtrudedWalls(indexBuffer, vertexOffset, vertexStride, contour, contourEdges, boundaryWalls) {
    // Infer the index buffer's position of the vertices that form the extruded-polygons' walls
    // by stepping through the contour segment by segment.
    const nSegments = contour.length / vertexStride;
    for (let i = 0; i < nSegments; ++i) {
        const vFootprint0 = vertexOffset + i * 2;
        const vRoof0 = vFootprint0 + 1;
        const vFootprint1 = vertexOffset + ((i + 1) % nSegments) * 2;
        const vRoof1 = vFootprint1 + 1;
        if (boundaryWalls !== false || contourEdges === undefined) {
            indexBuffer.push(vFootprint0, vRoof0, vRoof1, vRoof1, vFootprint1, vFootprint0);
        }
        else if (contourEdges[i]) {
            indexBuffer.push(vFootprint0, vRoof0, vRoof1, vRoof1, vFootprint1, vFootprint0);
        }
    }
}
exports.addExtrudedWalls = addExtrudedWalls;


/***/ }),

/***/ "../harp-datasource-protocol/lib/InterpolatedProperty.ts":
/*!***************************************************************!*\
  !*** ../harp-datasource-protocol/lib/InterpolatedProperty.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __webpack_require__(/*! three */ "three");
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const ColorUtils_1 = __webpack_require__(/*! ./ColorUtils */ "../harp-datasource-protocol/lib/ColorUtils.ts");
const ExponentialInterpolant_1 = __webpack_require__(/*! ./ExponentialInterpolant */ "../harp-datasource-protocol/lib/ExponentialInterpolant.ts");
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
const InterpolatedPropertyDefs_1 = __webpack_require__(/*! ./InterpolatedPropertyDefs */ "../harp-datasource-protocol/lib/InterpolatedPropertyDefs.ts");
const StringEncodedNumeral_1 = __webpack_require__(/*! ./StringEncodedNumeral */ "../harp-datasource-protocol/lib/StringEncodedNumeral.ts");
const logger = harp_utils_1.LoggerManager.instance.create("InterpolatedProperty");
const interpolants = [
    THREE.DiscreteInterpolant,
    THREE.LinearInterpolant,
    THREE.CubicInterpolant,
    ExponentialInterpolant_1.ExponentialInterpolant
];
const tmpBuffer = new Array(StringEncodedNumeral_1.StringEncodedNumeralFormatMaxSize);
/**
 * Checks if a property is interpolated.
 * @param p property to be checked
 */
function isInterpolatedPropertyDefinition(p) {
    if (p &&
        p.interpolationMode === undefined &&
        Array.isArray(p.values) &&
        p.values.length > 0 &&
        p.values[0] !== undefined &&
        Array.isArray(p.zoomLevels) &&
        p.zoomLevels.length > 0 &&
        p.zoomLevels[0] !== undefined &&
        p.values.length === p.zoomLevels.length) {
        return true;
    }
    return false;
}
exports.isInterpolatedPropertyDefinition = isInterpolatedPropertyDefinition;
/**
 * Type guard to check if an object is an instance of `InterpolatedProperty`.
 */
function isInterpolatedProperty(p) {
    if (p &&
        p.interpolationMode !== undefined &&
        p.zoomLevels instanceof Float32Array &&
        p.values !== undefined &&
        p.values.length > 0 &&
        (p.zoomLevels.length === p.values.length / 4 ||
            p.zoomLevels.length === p.values.length / 3 ||
            p.zoomLevels.length === p.values.length)) {
        return true;
    }
    return false;
}
exports.isInterpolatedProperty = isInterpolatedProperty;
/**
* Get the value of the specified property in given `env`.

* @param property Property of a technique.
* @param env The [[Env]] used to evaluate the property
*/
function getPropertyValue(property, env) {
    if (Expr_1.Expr.isExpr(property)) {
        return property.evaluate(env, Expr_1.ExprScope.Dynamic);
    }
    if (isInterpolatedProperty(property)) {
        return evaluateInterpolatedProperty(property, env);
    }
    if (typeof property !== "string") {
        // Property in numeric or array, etc. format
        return property;
    }
    else {
        // Non-interpolated string encoded numeral parsing
        const pixelToMeters = env.lookup("$pixelToMeters") || 1;
        const value = StringEncodedNumeral_1.parseStringEncodedNumeral(property, pixelToMeters);
        return value !== undefined ? value : property;
    }
}
exports.getPropertyValue = getPropertyValue;
function evaluateInterpolatedProperty(property, env) {
    const level = env.lookup("$zoom");
    const pixelToMeters = env.lookup("$pixelToMeters");
    if (property._stringEncodedNumeralType !== undefined) {
        switch (property._stringEncodedNumeralType) {
            case StringEncodedNumeral_1.StringEncodedNumeralType.Meters:
            case StringEncodedNumeral_1.StringEncodedNumeralType.Pixels:
                return getInterpolatedMetric(property, level, pixelToMeters);
            case StringEncodedNumeral_1.StringEncodedNumeralType.Hex:
            case StringEncodedNumeral_1.StringEncodedNumeralType.RGB:
            case StringEncodedNumeral_1.StringEncodedNumeralType.RGBA:
            case StringEncodedNumeral_1.StringEncodedNumeralType.HSL:
                return getInterpolatedColor(property, level);
        }
    }
    return getInterpolatedMetric(property, level, pixelToMeters);
}
exports.evaluateInterpolatedProperty = evaluateInterpolatedProperty;
function getInterpolatedMetric(property, level, pixelToMeters) {
    const nChannels = property.values.length / property.zoomLevels.length;
    const interpolant = new interpolants[property.interpolationMode](property.zoomLevels, property.values, nChannels);
    if (property.interpolationMode === InterpolatedPropertyDefs_1.InterpolationMode.Exponential &&
        property.exponent !== undefined) {
        interpolant.exponent = property.exponent;
    }
    interpolant.evaluate(level);
    if (property._stringEncodedNumeralDynamicMask === undefined) {
        return interpolant.resultBuffer[0];
    }
    else {
        const maskInterpolant = new interpolants[property.interpolationMode](property.zoomLevels, property._stringEncodedNumeralDynamicMask, 1);
        if (property.interpolationMode === InterpolatedPropertyDefs_1.InterpolationMode.Exponential &&
            property.exponent !== undefined) {
            maskInterpolant.exponent = property.exponent;
        }
        maskInterpolant.evaluate(level);
        return (interpolant.resultBuffer[0] *
            (1 + maskInterpolant.resultBuffer[0] * (pixelToMeters - 1)));
    }
}
function getInterpolatedColor(property, level) {
    const nChannels = property.values.length / property.zoomLevels.length;
    const interpolant = new interpolants[property.interpolationMode](property.zoomLevels, property.values, nChannels);
    if (property.interpolationMode === InterpolatedPropertyDefs_1.InterpolationMode.Exponential &&
        property.exponent !== undefined) {
        interpolant.exponent = property.exponent;
    }
    interpolant.evaluate(level);
    harp_utils_1.assert(nChannels === 3 || nChannels === 4);
    // ColorUtils.getHexFromRgba() does not clamp the values which may be out of
    // color channels range (0 <= c <= 1) after interpolation.
    if (nChannels === 4) {
        return ColorUtils_1.ColorUtils.getHexFromRgba(THREE.Math.clamp(interpolant.resultBuffer[0], 0, 1), THREE.Math.clamp(interpolant.resultBuffer[1], 0, 1), THREE.Math.clamp(interpolant.resultBuffer[2], 0, 1), THREE.Math.clamp(interpolant.resultBuffer[3], 0, 1));
    }
    else {
        return ColorUtils_1.ColorUtils.getHexFromRgb(THREE.Math.clamp(interpolant.resultBuffer[0], 0, 1), THREE.Math.clamp(interpolant.resultBuffer[1], 0, 1), THREE.Math.clamp(interpolant.resultBuffer[2], 0, 1));
    }
}
/**
 * Convert JSON representation of interpolated property to internal, normalized version that
 * can be evaluated by [[getPropertyValue]].
 */
function createInterpolatedProperty(prop) {
    removeDuplicatePropertyValues(prop);
    const interpolationMode = prop.interpolation !== undefined
        ? InterpolatedPropertyDefs_1.InterpolationMode[prop.interpolation]
        : InterpolatedPropertyDefs_1.InterpolationMode.Discrete;
    const zoomLevels = new Float32Array(prop.zoomLevels);
    const firstValue = prop.values[0];
    switch (typeof firstValue) {
        default:
        case "number":
        case "boolean":
            return {
                interpolationMode,
                zoomLevels,
                values: new Float32Array(prop.values),
                exponent: prop.exponent
            };
        case "string":
            // TODO: Minimize effort for pre-matching the numeral format.
            const matchedFormat = StringEncodedNumeral_1.StringEncodedNumeralFormats.find(format => format.regExp.test(firstValue));
            if (matchedFormat === undefined) {
                if (interpolationMode === InterpolatedPropertyDefs_1.InterpolationMode.Discrete) {
                    return {
                        interpolationMode,
                        zoomLevels,
                        values: prop.values
                    };
                }
                logger.error(`No StringEncodedNumeralFormat matched ${firstValue}.`);
                return undefined;
            }
            let needsMask = false;
            const propValues = new Float32Array(prop.values.length * matchedFormat.size);
            const maskValues = new Float32Array(prop.values.length);
            needsMask = procesStringEnocodedNumeralInterpolatedProperty(matchedFormat, prop, propValues, maskValues);
            return {
                interpolationMode,
                zoomLevels,
                values: propValues,
                exponent: prop.exponent,
                _stringEncodedNumeralType: matchedFormat.type,
                _stringEncodedNumeralDynamicMask: needsMask ? maskValues : undefined
            };
    }
}
exports.createInterpolatedProperty = createInterpolatedProperty;
function removeDuplicatePropertyValues(p) {
    const eps = 0.001;
    // detect cubic interpolations and remove stops
    // closer than `eps`, this is needed to avoid
    // possible NaN generated by the cubic interpolator.
    const isCubic = p.interpolation === "Cubic";
    for (let i = 0; i < p.values.length; ++i) {
        const firstIdx = p.zoomLevels.findIndex(a => {
            return isCubic ? Math.abs(a - p.zoomLevels[i]) < eps : a === p.zoomLevels[i];
        });
        if (firstIdx !== i) {
            p.zoomLevels.splice(--i, 1);
            p.values.splice(--i, 1);
        }
    }
}
function procesStringEnocodedNumeralInterpolatedProperty(baseFormat, prop, propValues, maskValues) {
    let needsMask = false;
    const allowedValueFormats = baseFormat.type === StringEncodedNumeral_1.StringEncodedNumeralType.Meters ||
        baseFormat.type === StringEncodedNumeral_1.StringEncodedNumeralType.Pixels
        ? StringEncodedNumeral_1.StringEncodedMetricFormats
        : StringEncodedNumeral_1.StringEncodedColorFormats;
    for (let valueIdx = 0; valueIdx < prop.values.length; ++valueIdx) {
        let matched = false;
        for (const valueFormat of allowedValueFormats) {
            const value = prop.values[valueIdx];
            matched = valueFormat.decoder(value, tmpBuffer);
            if (!matched) {
                continue;
            }
            if (valueFormat.mask !== undefined) {
                maskValues[valueIdx] = valueFormat.mask;
                needsMask = true;
            }
            for (let i = 0; i < valueFormat.size; ++i) {
                propValues[valueIdx * valueFormat.size + i] = tmpBuffer[i];
            }
            break;
        }
        if (!matched) {
            throw Error(`Not all interpolation values match the same format: ${JSON.stringify(prop)}`);
        }
    }
    return needsMask;
}


/***/ }),

/***/ "../harp-datasource-protocol/lib/InterpolatedPropertyDefs.ts":
/*!*******************************************************************!*\
  !*** ../harp-datasource-protocol/lib/InterpolatedPropertyDefs.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Interpolation mode used when computing a [[InterpolatedProperty]] value for a given zoom level.
 */
var InterpolationMode;
(function (InterpolationMode) {
    InterpolationMode[InterpolationMode["Discrete"] = 0] = "Discrete";
    InterpolationMode[InterpolationMode["Linear"] = 1] = "Linear";
    InterpolationMode[InterpolationMode["Cubic"] = 2] = "Cubic";
    InterpolationMode[InterpolationMode["Exponential"] = 3] = "Exponential";
})(InterpolationMode = exports.InterpolationMode || (exports.InterpolationMode = {}));
/**
 * Converts an [[InterpolatedPropertyDefinition]] to a [[JsonExpr]].
 *
 * @param property A valid [[InterpolatedPropertyDefinition]]
 */
function interpolatedPropertyDefinitionToJsonExpr(property) {
    if (property.interpolation === undefined || property.interpolation === "Discrete") {
        const step = ["step", ["zoom"], property.values[0]];
        for (let i = 1; i < property.zoomLevels.length; ++i) {
            step.push(property.zoomLevels[i], property.values[i]);
        }
        return step;
    }
    const interpolation = ["interpolate"];
    switch (property.interpolation) {
        case "Linear":
            interpolation.push(["linear"]);
            break;
        case "Cubic":
            interpolation.push(["cubic"]);
            break;
        case "Exponential":
            interpolation.push([
                "exponential",
                property.exponent !== undefined ? property.exponent : 2
            ]);
            break;
        default:
            throw new Error(`interpolation mode '${property.interpolation}' is not supported`);
    } //switch
    interpolation.push(["zoom"]);
    for (let i = 0; i < property.zoomLevels.length; ++i) {
        interpolation.push(property.zoomLevels[i], property.values[i]);
    }
    return interpolation;
}
exports.interpolatedPropertyDefinitionToJsonExpr = interpolatedPropertyDefinitionToJsonExpr;


/***/ }),

/***/ "../harp-datasource-protocol/lib/Outliner.ts":
/*!***************************************************!*\
  !*** ../harp-datasource-protocol/lib/Outliner.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __webpack_require__(/*! three */ "three");
const currEdgeStart = new THREE.Vector2();
const currEdgeGoal = new THREE.Vector2();
const prevEdgeStart = new THREE.Vector2();
const prevEdgeGoal = new THREE.Vector2();
/**
 * Fills an index buffer with the indices for the edges of a polygon contour.
 *
 * @param indexBuffer Edge index buffer to be filled.
 * @param vertexOffset Starting offset of the vertices composing the contour.
 * @param vertexStride Number of elements per contour vertex.
 * @param polygonContour Vertices that compose the contour.
 * @param polygonContourEdges Collection of booleans indicating if contour edges should be added.
 */
function addPolygonEdges(indexBuffer, vertexOffset, vertexStride, polygonContour, polygonContourEdges, isExtruded, addFootprintEdges, wallEdgeSlope) {
    for (let i = 0; i < polygonContourEdges.length; ++i) {
        if (polygonContourEdges[i]) {
            if (isExtruded === true) {
                const vFootprint0 = vertexOffset + i * 2;
                const vRoof0 = vFootprint0 + 1;
                const vFootprint1 = vertexOffset + ((i + 1) % polygonContourEdges.length) * 2;
                const vRoof1 = vFootprint1 + 1;
                if (addFootprintEdges === true) {
                    indexBuffer.push(vFootprint0, vFootprint1);
                }
                indexBuffer.push(vRoof0, vRoof1);
                const prevEdgeIdx = (i === 0 ? polygonContourEdges.length : i) - 1;
                if (polygonContourEdges[prevEdgeIdx]) {
                    if (wallEdgeSlope !== undefined) {
                        const v0x = polygonContour[i * vertexStride];
                        const v0y = polygonContour[i * vertexStride + 1];
                        const v1x = polygonContour[((i + 1) % polygonContourEdges.length) * vertexStride];
                        const v1y = polygonContour[((i + 1) % polygonContourEdges.length) * vertexStride + 1];
                        currEdgeStart.set(v0x, v0y);
                        currEdgeGoal.set(v1x, v1y);
                        prevEdgeStart.set(polygonContour[prevEdgeIdx * vertexStride], polygonContour[prevEdgeIdx * vertexStride + 1]);
                        prevEdgeGoal.set(currEdgeStart.x, currEdgeStart.y);
                        if (prevEdgeGoal
                            .sub(prevEdgeStart)
                            .normalize()
                            .dot(currEdgeGoal.sub(currEdgeStart).normalize()) <= wallEdgeSlope) {
                            indexBuffer.push(vFootprint0, vRoof0);
                        }
                    }
                    else {
                        indexBuffer.push(vFootprint0, vRoof0);
                    }
                }
            }
            else {
                const vFoot0 = vertexOffset + i;
                const vRoof0 = vertexOffset + ((i + 1) % polygonContourEdges.length);
                indexBuffer.push(vFoot0, vRoof0);
            }
        }
    }
}
exports.addPolygonEdges = addPolygonEdges;


/***/ }),

/***/ "../harp-datasource-protocol/lib/StringEncodedNumeral.ts":
/*!***************************************************************!*\
  !*** ../harp-datasource-protocol/lib/StringEncodedNumeral.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const three_1 = __webpack_require__(/*! three */ "three");
const ColorUtils_1 = __webpack_require__(/*! ./ColorUtils */ "../harp-datasource-protocol/lib/ColorUtils.ts");
const tmpColor = new three_1.Color();
/**
 * Enumeration of supported string encoded numerals.
 */
var StringEncodedNumeralType;
(function (StringEncodedNumeralType) {
    StringEncodedNumeralType[StringEncodedNumeralType["Meters"] = 0] = "Meters";
    StringEncodedNumeralType[StringEncodedNumeralType["Pixels"] = 1] = "Pixels";
    StringEncodedNumeralType[StringEncodedNumeralType["Hex"] = 2] = "Hex";
    StringEncodedNumeralType[StringEncodedNumeralType["RGB"] = 3] = "RGB";
    StringEncodedNumeralType[StringEncodedNumeralType["RGBA"] = 4] = "RGBA";
    StringEncodedNumeralType[StringEncodedNumeralType["HSL"] = 5] = "HSL";
})(StringEncodedNumeralType = exports.StringEncodedNumeralType || (exports.StringEncodedNumeralType = {}));
const StringEncodedMeters = {
    type: StringEncodedNumeralType.Meters,
    size: 1,
    regExp: /^((?=\.\d|\d)(?:\d+)?(?:\.?\d*))m$/,
    decoder: (encodedValue, target) => {
        const match = StringEncodedMeters.regExp.exec(encodedValue);
        return match ? (target[0] = Number(match[1])) !== undefined : false;
    }
};
const StringEncodedPixels = {
    type: StringEncodedNumeralType.Pixels,
    size: 1,
    mask: 1.0,
    regExp: /^((?=\.\d|\d)(?:\d+)?(?:\.?\d*))px$/,
    decoder: (encodedValue, target) => {
        const match = StringEncodedPixels.regExp.exec(encodedValue);
        if (match === null) {
            return false;
        }
        target[0] = Number(match[1]);
        return true;
    }
};
const StringEncodedHex = {
    type: StringEncodedNumeralType.Hex,
    size: 4,
    regExp: /^\#((?:[0-9A-Fa-f][0-9A-Fa-f]){3,4}|[0-9A-Fa-f]{3,4})$/,
    decoder: (encodedValue, target) => {
        const match = StringEncodedHex.regExp.exec(encodedValue);
        if (match === null) {
            return false;
        }
        const hex = match[1];
        const size = hex.length;
        // Only few sizes are possible for given reg-exp.
        harp_utils_1.assert(size === 3 || size === 4 || size === 6 || size === 8, `Matched incorrect hex color format`);
        // Note that we simply ignore alpha channel value.
        // TODO: To be resolved with HARP-7517
        if (size === 3 || size === 4) {
            // #RGB or #RGBA
            target[0] = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
            target[1] = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
            target[2] = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
            target[3] = size === 4 ? parseInt(hex.charAt(3) + hex.charAt(3), 16) / 255 : 1;
        }
        else if (size === 6 || size === 8) {
            // #RRGGBB or #RRGGBBAA
            target[0] = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
            target[1] = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
            target[2] = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;
            target[3] = size === 8 ? parseInt(hex.charAt(6) + hex.charAt(7), 16) / 255 : 1;
        }
        return true;
    }
};
const StringEncodedRGB = {
    type: StringEncodedNumeralType.RGB,
    size: 3,
    // tslint:disable-next-line:max-line-length
    regExp: /^rgb\( ?(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])) ?\)$/,
    decoder: (encodedValue, target) => {
        const channels = StringEncodedRGB.regExp.exec(encodedValue);
        if (channels === null) {
            return false;
        }
        target[0] = parseInt(channels[1], 10) / 255;
        target[1] = parseInt(channels[2], 10) / 255;
        target[2] = parseInt(channels[3], 10) / 255;
        return true;
    }
};
const StringEncodedRGBA = {
    type: StringEncodedNumeralType.RGBA,
    size: 4,
    // tslint:disable-next-line:max-line-length
    regExp: /^rgba\( ?(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:(0(?:\.[0-9]+)?|1(?:\.0+)?)) ?\)$/,
    decoder: (encodedValue, target) => {
        const channels = StringEncodedRGBA.regExp.exec(encodedValue);
        if (channels === null) {
            return false;
        }
        target[0] = parseInt(channels[1], 10) / 255;
        target[1] = parseInt(channels[2], 10) / 255;
        target[2] = parseInt(channels[3], 10) / 255;
        target[3] = parseFloat(channels[4]);
        return true;
    }
};
const StringEncodedHSL = {
    type: StringEncodedNumeralType.HSL,
    size: 3,
    // tslint:disable-next-line:max-line-length
    regExp: /^hsl\( ?((?:[0-9]|[1-9][0-9]|1[0-9]{1,2}|2[0-9]{1,2}|3[0-5][0-9]|360)), ?(?:([0-9]|[1-9][0-9]|100)%), ?(?:([0-9]|[1-9][0-9]|100)%) ?\)$/,
    decoder: (encodedValue, target) => {
        const channels = StringEncodedHSL.regExp.exec(encodedValue);
        if (channels === null) {
            return false;
        }
        tmpColor.setHSL(parseInt(channels[1], 10) / 360, parseInt(channels[2], 10) / 100, parseInt(channels[3], 10) / 100);
        target[0] = tmpColor.r;
        target[1] = tmpColor.g;
        target[2] = tmpColor.b;
        return true;
    }
};
/**
 * Array of all supported [[StringEncodedNumeralFormat]]s describing sizes, lengths and distances.
 */
exports.StringEncodedMetricFormats = [
    StringEncodedMeters,
    StringEncodedPixels
];
const StringEncodedMetricFormatMaxSize = exports.StringEncodedMetricFormats.reduce((a, b) => Math.max(a, b.size), 0);
/**
 * Array of all supported [[StringEncodedNumeralFormat]]s describing color data.
 */
exports.StringEncodedColorFormats = [
    StringEncodedHex,
    StringEncodedRGB,
    StringEncodedRGBA,
    StringEncodedHSL
];
const StringEncodedColorFormatMaxSize = exports.StringEncodedColorFormats.reduce((a, b) => Math.max(a, b.size), 0);
/**
 * Array of supported [[StringEncodedNumeralFormat]]s (intended to be indexed with
 * [[StringEncodedNumeralType]] enum).
 */
exports.StringEncodedNumeralFormats = [
    ...exports.StringEncodedMetricFormats,
    ...exports.StringEncodedColorFormats
];
exports.StringEncodedNumeralFormatMaxSize = Math.max(StringEncodedColorFormatMaxSize, StringEncodedMetricFormatMaxSize);
const tmpBuffer = new Array(exports.StringEncodedNumeralFormatMaxSize);
/**
 * Parse string encoded numeral values using all known [[StringEncodedNumeralFormats]].
 *
 * @param numeral The string representing numeric value.
 * @param pixelToMeters The ratio used to convert from meters to pixels (default 1.0).
 * @returns Number parsed or __undefined__ if non of the numeral patterns matches the expression
 * provided in [[numeral]].
 */
function parseStringEncodedNumeral(numeral, pixelToMeters = 1.0) {
    let result;
    const formatMatch = (format) => {
        if (format.decoder(numeral, tmpBuffer)) {
            switch (format.type) {
                case StringEncodedNumeralType.Meters:
                    result = tmpBuffer[0];
                    break;
                case StringEncodedNumeralType.Pixels:
                    result = tmpBuffer[0] * pixelToMeters;
                    break;
                case StringEncodedNumeralType.Hex:
                case StringEncodedNumeralType.RGBA:
                    result = ColorUtils_1.ColorUtils.getHexFromRgba(tmpBuffer[0], tmpBuffer[1], tmpBuffer[2], tmpBuffer[3]);
                    break;
                case StringEncodedNumeralType.RGB:
                case StringEncodedNumeralType.HSL:
                    result = ColorUtils_1.ColorUtils.getHexFromRgb(tmpBuffer[0], tmpBuffer[1], tmpBuffer[2]);
                    break;
                default:
                    result = tmpBuffer[0];
                    break;
            }
            return true;
        }
        return false;
    };
    exports.StringEncodedNumeralFormats.some(formatMatch);
    return result;
}
exports.parseStringEncodedNumeral = parseStringEncodedNumeral;
/**
 * Parse string encoded color value using all known [[StringEncodedColorFormats]].
 *
 * @param color The string encoded color expression (i.e. '#FFF', 'rgb(255, 0, 0)', etc.).
 * @returns The color parsed or __undefined__ if non of the known representations matches
 * the expression provided in [[color]].
 */
function parseStringEncodedColor(color) {
    const matchedFormat = matchFormat(exports.StringEncodedColorFormats, color, tmpBuffer);
    if (matchedFormat === undefined) {
        return undefined;
    }
    switch (matchedFormat.type) {
        case StringEncodedNumeralType.Hex:
        case StringEncodedNumeralType.RGBA:
            return ColorUtils_1.ColorUtils.getHexFromRgba(tmpBuffer[0], tmpBuffer[1], tmpBuffer[2], tmpBuffer[3]);
        case StringEncodedNumeralType.RGB:
        case StringEncodedNumeralType.HSL:
            return ColorUtils_1.ColorUtils.getHexFromRgb(tmpBuffer[0], tmpBuffer[1], tmpBuffer[2]);
        default:
            return tmpBuffer[0];
    }
}
exports.parseStringEncodedColor = parseStringEncodedColor;
function matchFormat(formats, numeral, result) {
    return formats.find(format => {
        return format.decoder(numeral, result) ? true : false;
    });
}


/***/ }),

/***/ "../harp-datasource-protocol/lib/StyleSetEvaluator.ts":
/*!************************************************************!*\
  !*** ../harp-datasource-protocol/lib/StyleSetEvaluator.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
const ExprPool_1 = __webpack_require__(/*! ./ExprPool */ "../harp-datasource-protocol/lib/ExprPool.ts");
const InterpolatedProperty_1 = __webpack_require__(/*! ./InterpolatedProperty */ "../harp-datasource-protocol/lib/InterpolatedProperty.ts");
const InterpolatedPropertyDefs_1 = __webpack_require__(/*! ./InterpolatedPropertyDefs */ "../harp-datasource-protocol/lib/InterpolatedPropertyDefs.ts");
const TechniqueDescriptor_1 = __webpack_require__(/*! ./TechniqueDescriptor */ "../harp-datasource-protocol/lib/TechniqueDescriptor.ts");
const Techniques_1 = __webpack_require__(/*! ./Techniques */ "../harp-datasource-protocol/lib/Techniques.ts");
const Theme_1 = __webpack_require__(/*! ./Theme */ "../harp-datasource-protocol/lib/Theme.ts");
const logger = harp_utils_1.LoggerManager.instance.create("StyleSetEvaluator");
const emptyTechniqueDescriptor = TechniqueDescriptor_1.mergeTechniqueDescriptor({});
/**
 * [[StyleConditionClassifier]] searches for usages of `$layer` in `when` conditions
 * associated with styling rules.
 *
 * @hidden
 */
class StyleConditionClassifier {
    classify(style) {
        if (style._whenExpr) {
            const savedStyle = this.switchStyle(style);
            style._whenExpr = style._whenExpr.accept(this, undefined);
            this._style = savedStyle;
        }
    }
    visitNullLiteralExpr(expr, enclosingExpr) {
        return expr;
    }
    visitBooleanLiteralExpr(expr, enclosingExpr) {
        return expr;
    }
    visitNumberLiteralExpr(expr, enclosingExpr) {
        return expr;
    }
    visitStringLiteralExpr(expr, enclosingExpr) {
        return expr;
    }
    visitObjectLiteralExpr(expr, enclosingExpr) {
        return expr;
    }
    visitVarExpr(expr, enclosingExpr) {
        return expr;
    }
    visitHasAttributeExpr(expr, enclosingExpr) {
        return expr;
    }
    visitContainsExpr(expr, enclosingExpr) {
        return expr;
    }
    visitMatchExpr(expr, enclosingExpr) {
        return expr;
    }
    visitCaseExpr(expr, enclosingExpr) {
        return expr;
    }
    visitCallExpr(call, enclosingExpr) {
        if (call.op === "all") {
            // processing of an `["all", e1, e2, ... eN]` expression. In this case
            // search for expressions matching comparison of `$layer` and string literals
            // in the sub expressions.
            const children = call.args
                .map(childExpr => childExpr.accept(this, call))
                .filter(childExpr => childExpr !== undefined);
            return new Expr_1.CallExpr(call.op, children);
        }
        else if (enclosingExpr) {
            // `call` is a direct child expression of an `"all"` operator.
            const matched = this.matchVarStringComparison(call);
            if (matched) {
                if (this._style.layer === undefined && matched.name === "$layer") {
                    // found a subexpression `["==", ["get", "$layer"], "some layer name"]`
                    // enclosed in an `["all", e1...eN]` expression. Remove it from
                    // its parent expression and store the value of the expected $layer in
                    // [[StyleInternalParams]].
                    this._style.layer = matched.value;
                    // return `undefined` to remove this sub expression from its parent.
                    return undefined;
                }
                else if (this._style._geometryType === undefined &&
                    matched.name === "$geometryType") {
                    // found a subexpression `["==", ["get", "$geometryType"], "geometry"]`
                    // enclosed in an `["all", e1...eN]` expression. Remove it from
                    // its parent expression and store the value of the expected $geometryType in
                    // [[StyleInternalParams]].
                    this._style._geometryType = matched.value;
                    // return `undefined` to remove this sub expression from its parent.
                    return undefined;
                }
            }
        }
        return call;
    }
    /**
     * Tests if the given `call` matches the structure ["==", ["get", name], value].
     * If a match is found returns an object containing the `name` and the `value`;
     *
     * @param call The expression to match.
     */
    matchVarStringComparison(call) {
        if (call.op === "==") {
            const left = call.args[0];
            const right = call.args[1];
            if (left instanceof Expr_1.VarExpr && right instanceof Expr_1.StringLiteralExpr) {
                return { name: left.name, value: right.value };
            }
            if (right instanceof Expr_1.VarExpr && left instanceof Expr_1.StringLiteralExpr) {
                return { name: right.name, value: left.value };
            }
        }
        return undefined;
    }
    /**
     * Sets the given `style` as current.
     *
     * @returns The previous `style`.
     */
    switchStyle(style) {
        const saved = this._style;
        this._style = style;
        return saved;
    }
}
class OptimizedSubSetKey {
    constructor(layer, geometryType) {
        this.key = "";
        this.set(layer, geometryType);
    }
    set(layer, geometryType, env) {
        let keyUpdateNeeded = false;
        if (layer === undefined) {
            const envLayer = env !== undefined ? env.lookup("$layer") : undefined;
            layer = typeof envLayer === "string" ? envLayer : undefined;
        }
        if (this.layer !== layer) {
            this.layer = layer;
            keyUpdateNeeded = true;
        }
        if (geometryType === undefined) {
            const envGeometryType = env !== undefined ? env.lookup("$geometryType") : undefined;
            geometryType = typeof envGeometryType === "string" ? envGeometryType : undefined;
        }
        if (this.geometryType !== geometryType) {
            this.geometryType = geometryType;
            keyUpdateNeeded = true;
        }
        if (keyUpdateNeeded) {
            this.updateKey();
        }
        return this;
    }
    updateKey() {
        if (this.layer !== undefined) {
            // tslint:disable-next-line:prefer-conditional-expression
            if (this.geometryType !== undefined) {
                this.key = `${this.layer}:${this.geometryType}`;
            }
            else {
                this.key = `${this.layer}:`;
            }
        }
        else {
            if (this.geometryType !== undefined) {
                this.key = `:${this.geometryType}`;
            }
            else {
                this.key = "all";
            }
        }
        this.cachedStyleSet = undefined;
    }
}
/**
 * Combine data from datasource and apply the rules from a specified theme to show it on the map.
 */
class StyleSetEvaluator {
    constructor(styleSet, definitions) {
        this.m_techniques = [];
        this.m_exprPool = new ExprPool_1.ExprPool();
        this.m_cachedResults = new Map();
        this.m_styleConditionClassifier = new StyleConditionClassifier();
        this.m_subStyleSetCache = new Map();
        this.m_definitionExprCache = new Map();
        this.m_tmpOptimizedSubSetKey = new OptimizedSubSetKey();
        this.m_emptyEnv = new Expr_1.Env();
        this.m_definitions = definitions;
        this.styleSet = resolveReferences(styleSet, definitions);
        computeDefaultRenderOrder(this.styleSet);
        this.compileStyleSet();
    }
    /**
     * Find all techniques that fit the current objects' environment.
     * *The techniques in the resulting array may not be modified* since they are being reused for
     * identical objects.
     *
     * @param env The objects environment, i.e. the attributes that are relevant for its
     * representation.
     * @param layer The optional layer name used to filter techniques.
     * @param geometryType The optional geometryType used to filter techniques.
     */
    getMatchingTechniques(env, layer, geometryType) {
        const result = [];
        this.m_cachedResults.clear();
        const optimizedSubSetKey = this.m_tmpOptimizedSubSetKey;
        optimizedSubSetKey.set(layer, geometryType, env);
        // get the requested $layer and $geometryType, if any.
        this.m_layer = optimizedSubSetKey.layer;
        this.m_geometryType = optimizedSubSetKey.geometryType;
        this.m_zoomLevel = env.lookup("$zoom");
        const searchedStyleSet = this.getOptimizedStyleSet(optimizedSubSetKey);
        for (const currStyle of searchedStyleSet) {
            if (this.processStyle(env, currStyle, result)) {
                break;
            }
        }
        return result;
    }
    /**
     * Check if `styleSet` contains any rule related to `layer`.
     *
     * @param layer name of layer
     */
    wantsLayer(layer) {
        return (this.getOptimizedStyleSet(this.m_tmpOptimizedSubSetKey.set(layer, undefined)).length > 0);
    }
    /**
     * Check if `styleSet` contains any rule related to particular `[layer, geometryType]` pair.
     *
     * @param layer name of layer
     * @param geometryType type of layer - `point`, `line` or `polygon`
     */
    wantsFeature(layer, geometryType) {
        return (this.getOptimizedStyleSet(this.m_tmpOptimizedSubSetKey.set(layer, geometryType))
            .length > 0);
    }
    /**
     * Get the expression evaluation cache, for further feature processing.
     *
     * This object is valid until next `getMatchingTechniques` call.
     */
    get expressionEvaluatorCache() {
        return this.m_cachedResults;
    }
    /**
     * Reset array of techniques.
     *
     * Cleans technique array and indices, so it doesn't accumulate accross several decoding runs.
     */
    resetTechniques() {
        for (const techinque of this.m_techniques) {
            techinque._index = undefined;
        }
        this.m_techniques.length = 0;
    }
    /**
     * Get the (current) array of techniques that have been created during decoding.
     */
    get techniques() {
        return this.m_techniques;
    }
    /**
     * Get the (current) array of techniques that have been created during decoding.
     */
    get decodedTechniques() {
        return this.m_techniques.map(makeDecodedTechnique);
    }
    getOptimizedStyleSet(subSetKey) {
        if (subSetKey.cachedStyleSet !== undefined) {
            return subSetKey.cachedStyleSet;
        }
        let optimizedStyleSet = this.m_subStyleSetCache.get(subSetKey.key);
        if (optimizedStyleSet !== undefined) {
            subSetKey.cachedStyleSet = optimizedStyleSet;
            return optimizedStyleSet;
        }
        optimizedStyleSet = this.createPreFilteredStyleSet(subSetKey);
        this.m_subStyleSetCache.set(subSetKey.key, optimizedStyleSet);
        subSetKey.cachedStyleSet = optimizedStyleSet;
        return optimizedStyleSet;
    }
    createPreFilteredStyleSet(subSetKey) {
        const { layer, geometryType } = subSetKey;
        return this.styleSet.filter(style => {
            if (layer !== undefined && style.layer !== undefined && style.layer !== layer) {
                return false;
            }
            if (geometryType !== undefined &&
                style._geometryType !== undefined &&
                style._geometryType !== geometryType) {
                return false;
            }
            return true;
        });
    }
    /**
     * Compile the `when` conditions found when traversting the styling rules.
     */
    compileStyleSet() {
        this.styleSet.forEach(style => this.compileStyle(style));
        // Create optimized styleSets for each `layer` & `geometryType` tuple.
        this.styleSet.forEach(style => {
            this.getOptimizedStyleSet(this.m_tmpOptimizedSubSetKey.set(style.layer, style._geometryType));
        });
    }
    /**
     * Compile the `when` conditions reachable from the given `style`.
     *
     * @param style The current style.
     */
    compileStyle(style) {
        if (style.when !== undefined) {
            try {
                style._whenExpr = Array.isArray(style.when)
                    ? Expr_1.Expr.fromJSON(style.when, this.m_definitions, this.m_definitionExprCache)
                    : Expr_1.Expr.parse(style.when);
                // search for usages of '$layer' and any other
                // special symbol that can be used to speed up the evaluation
                // of the `when` conditions associated to this `style`.
                this.m_styleConditionClassifier.classify(style);
                if (style._whenExpr !== undefined) {
                    style._whenExpr = style._whenExpr.intern(this.m_exprPool);
                }
                if (Expr_1.isJsonExpr(style.minZoomLevel)) {
                    style._minZoomLevelExpr = Expr_1.Expr.fromJSON(style.minZoomLevel).intern(this.m_exprPool);
                }
                if (Expr_1.isJsonExpr(style.maxZoomLevel)) {
                    style._maxZoomLevelExpr = Expr_1.Expr.fromJSON(style.maxZoomLevel).intern(this.m_exprPool);
                }
            }
            catch (err) {
                logger.log("failed to evaluate expression", JSON.stringify(style.when), "error", String(err));
            }
        }
    }
    /**
     * Process a style (and its sub-styles) hierarchically to look for the technique that fits the
     * current objects' environment. The attributes of the styles are assembled to create a unique
     * technique for every object.
     *
     * @param env The objects environment, i.e. the attributes that are relevant for its
     *            representation.
     * @param style Current style (could also be top of stack).
     * @param result The array of resulting techniques. There may be more than one technique per
     *               object, resulting in multiple graphical objects for representation.
     * @returns `true` if style has been found and processing is finished. `false` if not found, or
     *          more than one technique should be applied.
     */
    processStyle(env, style, result) {
        if (!this.checkZoomLevel(env, style)) {
            return false;
        }
        if (this.m_layer !== undefined &&
            style.layer !== undefined &&
            style.layer !== this.m_layer) {
            return false;
        }
        if (this.m_geometryType !== undefined &&
            style._geometryType !== undefined &&
            style._geometryType !== this.m_geometryType) {
            return false;
        }
        if (style._whenExpr) {
            try {
                if (!style._whenExpr.evaluate(env, Expr_1.ExprScope.Condition, this.m_cachedResults)) {
                    // Stop processing this styling rule. The `when` condition
                    // associated with the current `style` evaluates to false so
                    // no techinque defined by this style should be applied.
                    return false;
                }
            }
            catch (error) {
                logger.error(`failed to evaluate expression '${JSON.stringify(style.when)}': ${error}`);
                return false;
            }
        }
        if (style.technique === undefined) {
            return false;
        }
        // we found a technique!
        if (style.technique !== "none") {
            result.push(this.getTechniqueForStyleMatch(env, style));
        }
        // stop processing if "final" is set
        return style.final === true;
    }
    checkZoomLevel(env, style) {
        if (style.minZoomLevel === undefined && style.maxZoomLevel === undefined) {
            return true;
        }
        const zoomLevel = this.m_zoomLevel;
        if (zoomLevel === undefined) {
            return true;
        }
        if (style.minZoomLevel !== undefined) {
            let minZoomLevel = style.minZoomLevel;
            if (style._minZoomLevelExpr) {
                // the constraint is defined as expression, evaluate it and
                // use its value
                try {
                    minZoomLevel = style._minZoomLevelExpr.evaluate(env, Expr_1.ExprScope.Condition, this.m_cachedResults);
                }
                catch (error) {
                    logger.error(`failed to evaluate expression '${JSON.stringify(style._minZoomLevelExpr)}': ${error}`);
                }
            }
            if (typeof minZoomLevel === "number" && zoomLevel < minZoomLevel) {
                return false;
            }
        }
        if (style.maxZoomLevel !== undefined) {
            let maxZoomLevel = style.maxZoomLevel;
            if (style._maxZoomLevelExpr) {
                try {
                    maxZoomLevel = style._maxZoomLevelExpr.evaluate(env, Expr_1.ExprScope.Condition, this.m_cachedResults);
                }
                catch (error) {
                    logger.error(`failed to evaluate expression '${JSON.stringify(style._maxZoomLevelExpr)}': ${error}`);
                }
            }
            if (typeof maxZoomLevel === "number" && zoomLevel > maxZoomLevel) {
                return false;
            }
        }
        return true;
    }
    getTechniqueForStyleMatch(env, style) {
        this.checkStyleDynamicAttributes(style);
        let technique;
        if (style._dynamicTechniques !== undefined) {
            const dynamicAttributes = this.evaluateTechniqueProperties(style, env);
            const key = this.getDynamicTechniqueKey(style, dynamicAttributes);
            technique = style._dynamicTechniques.get(key);
            if (technique === undefined) {
                technique = this.createTechnique(style, key, dynamicAttributes);
                style._dynamicTechniques.set(key, technique);
            }
        }
        else {
            technique = style._staticTechnique;
            if (technique === undefined) {
                style._staticTechnique = technique = this.createTechnique(style, `${style._styleSetIndex}`, []);
            }
        }
        if (technique._index === undefined) {
            technique._index = this.m_techniques.length;
            this.m_techniques.push(technique);
        }
        return technique;
    }
    getDynamicTechniqueKey(style, dynamicAttributes) {
        const dynamicAttrKey = dynamicAttributes
            .map(([_attrName, attrValue]) => {
            if (attrValue === undefined) {
                return "U";
            }
            else {
                return JSON.stringify(attrValue);
            }
        })
            .join(":");
        return `${style._styleSetIndex}:${dynamicAttrKey}`;
    }
    checkStyleDynamicAttributes(style) {
        if (style._dynamicTechniqueAttributes !== undefined || style.technique === "none") {
            return;
        }
        style._dynamicTechniqueAttributes = [];
        style._dynamicFeatureAttributes = [];
        style._dynamicForwardedAttributes = [];
        style._staticAttributes = [];
        const dynamicFeatureAttributes = style._dynamicFeatureAttributes;
        const dynamicTechniqueAttributes = style._dynamicTechniqueAttributes;
        const dynamicForwardedAttributes = style._dynamicForwardedAttributes;
        const targetStaticAttributes = style._staticAttributes;
        const techniqueDescriptor = Techniques_1.techniqueDescriptors[style.technique] || emptyTechniqueDescriptor;
        const processAttribute = (attrName, attrValue) => {
            if (attrValue === undefined) {
                return;
            }
            if (Expr_1.isJsonExpr(attrValue)) {
                attrValue = Expr_1.Expr.fromJSON(attrValue, this.m_definitions, this.m_definitionExprCache).intern(this.m_exprPool);
            }
            else if (InterpolatedProperty_1.isInterpolatedPropertyDefinition(attrValue)) {
                // found a property using an object-like interpolation definition.
                attrValue = Expr_1.Expr.fromJSON(InterpolatedPropertyDefs_1.interpolatedPropertyDefinitionToJsonExpr(attrValue)).intern(this.m_exprPool);
            }
            if (Expr_1.Expr.isExpr(attrValue)) {
                const deps = attrValue.dependencies();
                if (!deps.zoom && deps.properties.size === 0) {
                    // no data-dependencies detected.
                    attrValue = attrValue.evaluate(this.m_emptyEnv);
                }
            }
            if (Expr_1.Expr.isExpr(attrValue)) {
                let attrScope = techniqueDescriptor.attrScopes[attrName];
                if (attrScope === undefined) {
                    // Use [[AttrScope.TechniqueGeometry]] as default scope for the attribute.
                    attrScope = TechniqueDescriptor_1.AttrScope.TechniqueGeometry;
                }
                const deps = attrValue.dependencies();
                switch (attrScope) {
                    case TechniqueDescriptor_1.AttrScope.FeatureGeometry:
                        dynamicFeatureAttributes.push([attrName, attrValue]);
                        break;
                    case TechniqueDescriptor_1.AttrScope.TechniqueGeometry:
                        dynamicTechniqueAttributes.push([attrName, attrValue]);
                        break;
                    case TechniqueDescriptor_1.AttrScope.TechniqueRendering:
                        if (deps.properties.size === 0) {
                            dynamicForwardedAttributes.push([attrName, attrValue]);
                        }
                        else {
                            dynamicTechniqueAttributes.push([attrName, attrValue]);
                        }
                        break;
                }
            }
            else if (attrValue !== undefined && attrValue !== null) {
                targetStaticAttributes.push([attrName, attrValue]);
            }
        };
        processAttribute("_category", style.category);
        processAttribute("_secondaryCategory", style.secondaryCategory);
        processAttribute("renderOrder", style.renderOrder);
        // TODO: What the heck is that !?
        processAttribute("label", style.labelProperty);
        // line & solid-line secondaryRenderOrder should be generic attr
        // TODO: maybe just warn and force move it to `attr` ?
        processAttribute("secondaryRenderOrder", style.secondaryRenderOrder);
        if (style.attr !== undefined) {
            for (const attrName in style.attr) {
                if (!style.attr.hasOwnProperty(attrName)) {
                    continue;
                }
                processAttribute(attrName, style.attr[attrName]);
            }
        }
        if (dynamicTechniqueAttributes.length > 0) {
            style._dynamicTechniques = new Map();
        }
    }
    evaluateTechniqueProperties(style, env) {
        if (style._dynamicTechniqueAttributes === undefined) {
            return [];
        }
        const instantiationContext = { env };
        return style._dynamicTechniqueAttributes.map(([attrName, attrExpr]) => {
            try {
                if (attrExpr.isDynamic()) {
                    const reducedExpr = attrExpr.instantiate(instantiationContext);
                    return [attrName, reducedExpr];
                }
                const evaluatedValue = attrExpr.evaluate(env, Expr_1.ExprScope.Value, this.m_cachedResults);
                return [attrName, evaluatedValue];
            }
            catch (error) {
                logger.error(`failed to evaluate expression '${attrExpr.toJSON()}': ${error}`);
                return [attrName, null];
            }
        });
    }
    createTechnique(style, key, dynamicAttrs) {
        const technique = {};
        technique.name = style.technique;
        if (style._staticAttributes !== undefined) {
            for (const [attrName, attrValue] of style._staticAttributes) {
                if (attrValue !== null) {
                    technique[attrName] = attrValue;
                }
            }
        }
        for (const [attrName, attrValue] of dynamicAttrs) {
            if (attrValue !== null) {
                technique[attrName] = attrValue;
            }
        }
        if (style._dynamicFeatureAttributes !== undefined) {
            for (const [attrName, attrValue] of style._dynamicFeatureAttributes) {
                technique[attrName] = attrValue;
            }
        }
        if (style._dynamicForwardedAttributes !== undefined) {
            for (const [attrName, attrValue] of style._dynamicForwardedAttributes) {
                // tslint:disable-next-line: prefer-conditional-expression
                if (Expr_1.Expr.isExpr(attrValue)) {
                    technique[attrName] = attrValue.toJSON();
                }
                else {
                    technique[attrName] = attrValue;
                }
            }
        }
        technique._index = this.m_techniques.length;
        technique._styleSetIndex = style._styleSetIndex;
        technique._key = key;
        if (style.styleSet !== undefined) {
            technique._styleSet = style.styleSet;
        }
        this.m_techniques.push(technique);
        return technique;
    }
}
exports.StyleSetEvaluator = StyleSetEvaluator;
function computeDefaultRenderOrder(styleSet) {
    let techniqueRenderOrder = 0;
    let styleSetIndex = 0;
    for (const style of styleSet) {
        style._styleSetIndex = styleSetIndex++;
        if (style.technique !== undefined && style.renderOrder === undefined) {
            style.renderOrder = techniqueRenderOrder++;
        }
    }
}
function resolveReferences(styleSet, definitions) {
    return styleSet.map(style => resolveStyleReferences(style, definitions));
}
function resolveStyleReferences(style, definitions) {
    if (Expr_1.isJsonExpr(style)) {
        if (!Theme_1.isJsonExprReference(style)) {
            throw new Error("invalid expression in this context, only 'ref's are supported");
        }
        // expand and instantiate references to style definitions.
        const definitionName = style[1];
        const def = definitions && definitions[definitionName];
        if (!def) {
            throw new Error(`invalid reference '${definitionName}' - not found`);
        }
        if (!Theme_1.isActualSelectorDefinition(def)) {
            throw new Error(`invalid reference '${definitionName}' - expected style definition`);
        }
        // instantiate the style
        return resolveStyleReferences(def, definitions);
    }
    return Object.assign({}, style);
}
/**
 * Create transferable representation of dynamic technique.
 *
 * As for now, we remove all `Expr` as they are not supported on other side.
 */
function makeDecodedTechnique(technique) {
    const result = {};
    for (const attrName in technique) {
        if (!technique.hasOwnProperty(attrName)) {
            continue;
        }
        let attrValue = technique[attrName];
        if (Expr_1.Expr.isExpr(attrValue)) {
            attrValue = attrValue.toJSON();
        }
        result[attrName] = attrValue;
    }
    return result;
}
exports.makeDecodedTechnique = makeDecodedTechnique;


/***/ }),

/***/ "../harp-datasource-protocol/lib/TechniqueAttr.ts":
/*!********************************************************!*\
  !*** ../harp-datasource-protocol/lib/TechniqueAttr.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
const InterpolatedProperty_1 = __webpack_require__(/*! ./InterpolatedProperty */ "../harp-datasource-protocol/lib/InterpolatedProperty.ts");
const logger = harp_utils_1.LoggerManager.instance.create("TechniqueAttr");
function evaluateTechniqueAttr(context, attrValue, defaultValue) {
    const env = context instanceof Expr_1.Env ? context : context.env;
    let evaluated;
    if (Expr_1.Expr.isExpr(attrValue)) {
        try {
            evaluated = attrValue.evaluate(env, Expr_1.ExprScope.Dynamic, !(context instanceof Expr_1.Env) ? context.cachedExprResults : undefined);
        }
        catch (error) {
            logger.error(`failed to evaluate expression '${JSON.stringify(attrValue)}': ${error}`);
            evaluated = undefined;
        }
    }
    else if (InterpolatedProperty_1.isInterpolatedProperty(attrValue)) {
        evaluated = InterpolatedProperty_1.getPropertyValue(attrValue, context instanceof Expr_1.Env ? context : context.env);
    }
    else {
        evaluated = attrValue;
    }
    if (evaluated === undefined || evaluated === null) {
        return defaultValue;
    }
    else {
        return evaluated;
    }
}
exports.evaluateTechniqueAttr = evaluateTechniqueAttr;


/***/ }),

/***/ "../harp-datasource-protocol/lib/TechniqueDescriptor.ts":
/*!**************************************************************!*\
  !*** ../harp-datasource-protocol/lib/TechniqueDescriptor.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AttrScope;
(function (AttrScope) {
    /**
     * Attributes that affect generation of feature geometry and thus must be resolved at decoding
     * time.
     *
     * They may have huge variancy as they are implemented as vertex attributes or embedded in
     * generated meshes.
     *
     * These attributes are available only in decoding scope.
     */
    AttrScope[AttrScope["FeatureGeometry"] = 0] = "FeatureGeometry";
    /**
     * Attributes that are common to whole group of features drawn with this technique.
     * These attributes affect generated geometry and  thus must be resolved at decoding time.
     *
     * They shouldn't have big variancy and evaluate to at least dozens of values as each
     * combination of these attributes consitute new technique and material.
     *
     * These attributes are available in decoding and rendering scope.
     */
    AttrScope[AttrScope["TechniqueGeometry"] = 1] = "TechniqueGeometry";
    /**
     * Attributes that are common to whole group of features drawn with this technique.
     * Attributes that can be changed in resulting object/material from frame to frame. They are
     * usually implemented as uniforms.
     *
     * These attributes may be available only at rendering scope.
     */
    AttrScope[AttrScope["TechniqueRendering"] = 2] = "TechniqueRendering";
})(AttrScope = exports.AttrScope || (exports.AttrScope = {}));
function mergeTechniqueDescriptor(...descriptors) {
    const result = {
        attrScopes: {}
    };
    for (const descriptor of descriptors) {
        if (descriptor.attrTransparencyColor !== undefined) {
            result.attrTransparencyColor = descriptor.attrTransparencyColor;
        }
        if (descriptor.attrScopes !== undefined) {
            result.attrScopes = Object.assign(Object.assign({}, result.attrScopes), descriptor.attrScopes);
        }
    }
    return result;
}
exports.mergeTechniqueDescriptor = mergeTechniqueDescriptor;


/***/ }),

/***/ "../harp-datasource-protocol/lib/TechniqueParams.ts":
/*!**********************************************************!*\
  !*** ../harp-datasource-protocol/lib/TechniqueParams.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The kind of geometry is used to
 *
 * a) Group objects together, allowing the group to be hidden or displayed.
 *
 * b) Assigning the objects a loading phase. If a [[PhasedTileGeometryManager]] is used, techniques
 *      without a `GeometryKind` may not be processed (at the desired phase).
 *
 * Any string can be used to specify the kind of the technique in a style in the theme file. Is is
 * suggested to specify multiple kinds for specific types of data. For a highway, the following list
 * of kinds is suggested:
 *
 *    ["line", "road", "road:highway"]
 *
 * If it is a tunnel for a highway:
 *
 *    ["line", "road", "road:highway", "tunnel", "road:tunnel", "road:highway:tunnel"]
 *
 * If specified in this way, specific types of data (here: highway roads) can be enabled and/or
 * disabled.
 */
var GeometryKind;
(function (GeometryKind) {
    /**
     * Used in the enabledKinds/disabledKinds filter to match any kind.
     */
    GeometryKind["All"] = "_all_";
    /**
     * Background geometry.
     */
    GeometryKind["Background"] = "background";
    /**
     * Terrain geometry.
     */
    GeometryKind["Terrain"] = "terrain";
    /**
     * Default value for the FillTechnique.
     */
    GeometryKind["Area"] = "area";
    /**
     * Default value for all line techniques.
     */
    GeometryKind["Line"] = "line";
    /**
     * Default value for the FillTechnique.
     */
    GeometryKind["Water"] = "water";
    /**
     * Political borders.
     */
    GeometryKind["Border"] = "border";
    /**
     * Basis for all roads.
     */
    GeometryKind["Road"] = "road";
    /**
     * Default value for the ExtrudedPolygonTechnique.
     */
    GeometryKind["Building"] = "building";
    /**
     * Default value for the TextTechnique, LineMarkerTechnique and the PoiTechnique.
     */
    GeometryKind["Label"] = "label";
    /**
     * Anything that may show up last.
     */
    GeometryKind["Detail"] = "detail";
})(GeometryKind = exports.GeometryKind || (exports.GeometryKind = {}));
/**
 * A set of [[GeometryKind]]s.
 */
class GeometryKindSet extends Set {
    /**
     * Return `true` if the Set is a superset of the set 'subset'.
     */
    isSuperset(subset) {
        for (const elem of subset) {
            if (!this.has(elem)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Return `true` if the Set intersects Set 'set'.
     */
    hasIntersection(set) {
        for (const elem of set) {
            if (this.has(elem)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Return `true` if the Set either intersects Set 'set' (if set is a Set), of has element 'set'
     * if set is not a Set.
     */
    hasOrIntersects(set) {
        if (set instanceof Set) {
            return this.hasIntersection(set);
        }
        return this.has(set);
    }
    /**
     * Return `true` if this set and the array of elements share at least a single element.
     */
    hasOrIntersectsArray(subset) {
        for (const elem of subset) {
            if (this.has(elem)) {
                return true;
            }
        }
        return false;
    }
}
exports.GeometryKindSet = GeometryKindSet;
var TextureCoordinateType;
(function (TextureCoordinateType) {
    /**
     * Texture coordinates are in tile space.
     * SW of the tile will have (0,0) and NE will have (1,1).
     */
    TextureCoordinateType["TileSpace"] = "tile-space";
    /**
     * Texture coordinates are in equirectangular space.
     * (u, v) = ( (longitude+180) / 360, (latitude+90) / 180).
     */
    TextureCoordinateType["EquirectangularSpace"] = "equirectangular-space";
})(TextureCoordinateType = exports.TextureCoordinateType || (exports.TextureCoordinateType = {}));
/**
 * Define the stacking option. Enum values for theme file are in "kebab-case".
 */
var PoiStackMode;
(function (PoiStackMode) {
    /**
     * Show in a stack.
     */
    PoiStackMode["Show"] = "show-in-stack";
    /**
     * Do not show in a stack.
     */
    PoiStackMode["Hide"] = "hide-in-stack";
    /**
     * Show category parent in the stack.
     */
    PoiStackMode["ShowParent"] = "show-parent";
})(PoiStackMode = exports.PoiStackMode || (exports.PoiStackMode = {}));
/**
 * Type guard to check if an object is an instance of `TextureBuffer`.
 */
function isTextureBuffer(object) {
    return object && object.buffer && typeof object.type === "string";
}
exports.isTextureBuffer = isTextureBuffer;


/***/ }),

/***/ "../harp-datasource-protocol/lib/Techniques.ts":
/*!*****************************************************!*\
  !*** ../harp-datasource-protocol/lib/Techniques.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const TechniqueParams_1 = __webpack_require__(/*! ./TechniqueParams */ "../harp-datasource-protocol/lib/TechniqueParams.ts");
const TechniqueDescriptor_1 = __webpack_require__(/*! ./TechniqueDescriptor */ "../harp-datasource-protocol/lib/TechniqueDescriptor.ts");
/**
 * Names of the supported texture properties.
 */
exports.TEXTURE_PROPERTY_KEYS = [
    "map",
    "normalMap",
    "displacementMap",
    "roughnessMap",
    "emissiveMap",
    "alphaMap",
    "metalnessMap",
    "bumpMap"
];
/**
 * Names of the properties controlling transparency.
 */
exports.TRANSPARENCY_PROPERTY_KEYS = ["opacity", "transparent"];
exports.techniqueDescriptors = {};
exports.baseTechniqueParamsDescriptor = {
    // TODO: Choose which techniques should support color with transparency.
    // For now we chosen all, but it maybe not suitable for text or line marker techniques.
    attrTransparencyColor: "color",
    attrScopes: {
        renderOrder: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        renderOrderOffset: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        enabled: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        kind: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        transient: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        fadeFar: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        fadeNear: TechniqueDescriptor_1.AttrScope.TechniqueRendering
    }
};
exports.pointTechniquePropTypes = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, {
    attrScopes: {
        texture: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        enablePicking: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        color: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        transparent: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        opacity: TechniqueDescriptor_1.AttrScope.TechniqueGeometry
    }
});
exports.squaresTechniquePropTypes = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, exports.pointTechniquePropTypes);
exports.techniqueDescriptors.squares = exports.squaresTechniquePropTypes;
exports.circlesTechniquePropTypes = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, exports.pointTechniquePropTypes);
exports.techniqueDescriptors.circles = exports.circlesTechniquePropTypes;
const lineMarkerTechniquePropTypes = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, {
    attrScopes: {
        text: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        label: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        useAbbreviation: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        useIsoCode: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        priority: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        textMinZoomLevel: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        textMaxZoomLevel: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        iconMinZoomLevel: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        iconMaxZoomLevel: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        distanceScale: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        textMayOverlap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        iconMayOverlap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        textReserveSpace: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        iconReserveSpace: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        renderTextDuringMovements: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        alwaysOnTop: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        textIsOptional: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        showOnMap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        stackMode: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        minDistance: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        iconIsOptional: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        iconFadeTime: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        textFadeTime: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        xOffset: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        yOffset: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        iconXOffset: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        iconYOffset: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        iconScale: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        screenHeight: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        screenWidth: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        poiTable: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        poiName: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        poiNameField: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        imageTexture: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        imageTextureField: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        imageTexturePrefix: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        imageTexturePostfix: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        style: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        fontName: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        fontStyle: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        fontVariant: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        rotation: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        tracking: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        leading: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        maxLines: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        lineWidth: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        canvasRotation: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        lineRotation: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        wrappingMode: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        hAlignment: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        vAlignment: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        backgroundColor: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        backgroundSize: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        backgroundOpacity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        color: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        opacity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        size: TechniqueDescriptor_1.AttrScope.TechniqueRendering
    }
});
exports.techniqueDescriptors["line-marker"] = lineMarkerTechniquePropTypes;
exports.techniqueDescriptors["labeled-icon"] = lineMarkerTechniquePropTypes;
const polygonalTechniqueDescriptor = {
    attrScopes: {
        polygonOffset: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        polygonOffsetFactor: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        polygonOffsetUnits: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineColor: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineFadeFar: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineFadeNear: TechniqueDescriptor_1.AttrScope.TechniqueRendering
    }
};
exports.solidLineTechniqueDescriptor = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, polygonalTechniqueDescriptor, {
    attrScopes: {
        clipping: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        secondaryRenderOrder: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        color: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        opacity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        transparent: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineWidth: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        secondaryWidth: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        secondaryColor: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        dashSize: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        gapSize: TechniqueDescriptor_1.AttrScope.TechniqueRendering
    }
});
exports.techniqueDescriptors["solid-line"] = exports.solidLineTechniqueDescriptor;
// TODO: Remove deprecated "dashed-line" support in future releases.
exports.techniqueDescriptors["dashed-line"] = exports.solidLineTechniqueDescriptor;
exports.lineTechniqueDescriptor = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, {
    attrScopes: {
        // TODO, check, which are really dynamic !
        color: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        opacity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        transparent: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineWidth: TechniqueDescriptor_1.AttrScope.FeatureGeometry
    }
});
exports.techniqueDescriptors.line = exports.lineTechniqueDescriptor;
const fillTechniqueDescriptor = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, polygonalTechniqueDescriptor, {
    attrScopes: {
        color: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        opacity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        transparent: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineWidth: TechniqueDescriptor_1.AttrScope.TechniqueRendering
    }
});
exports.techniqueDescriptors.fill = fillTechniqueDescriptor;
const standardTechniqueDescriptor = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, {
    attrScopes: {
        color: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        vertexColors: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        wireframe: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        roughness: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        metalness: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        alphaTest: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        depthTest: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        transparent: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        opacity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        emissive: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        emissiveIntensity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        refractionRatio: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        map: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        mapProperties: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        normalMap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        normalMapProperties: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        displacementMap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        displacementMapProperties: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        roughnessMap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        roughnessMapProperties: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        emissiveMap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        emissiveMapProperties: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        bumpMap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        bumpMapProperties: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        metalnessMap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        metalnessMapProperties: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        alphaMap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        alphaMapProperties: TechniqueDescriptor_1.AttrScope.TechniqueGeometry
    }
});
exports.techniqueDescriptors.standard = standardTechniqueDescriptor;
const extrudedPolygonTechniqueDescriptor = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, standardTechniqueDescriptor, {
    attrScopes: {
        height: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        floorHeight: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        color: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        defaultColor: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        defaultHeight: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        constantHeight: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        boundaryWalls: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        footprint: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        maxSlope: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        enableDepthPrePass: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        animateExtrusionDuration: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        animateExtrusion: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        opacity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        transparent: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineWidth: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineFadeNear: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineFadeFar: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        lineColorMix: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        lineColor: TechniqueDescriptor_1.AttrScope.TechniqueRendering
    }
});
exports.techniqueDescriptors["extruded-polygon"] = extrudedPolygonTechniqueDescriptor;
const textTechniqueDescriptor = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, {
    attrScopes: {
        text: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        label: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        useAbbreviation: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        useIsoCode: TechniqueDescriptor_1.AttrScope.FeatureGeometry,
        minZoomLevel: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        maxZoomLevel: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        distanceScale: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        mayOverlap: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        reserveSpace: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        textFadeTime: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        xOffset: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        yOffset: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        style: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        fontName: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        fontStyle: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        fontVariant: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        rotation: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        tracking: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        leading: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        maxLines: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        lineWidth: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        canvasRotation: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        lineRotation: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        wrappingMode: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        hAlignment: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        vAlignment: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        backgroundColor: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        backgroundSize: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        backgroundOpacity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        color: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        opacity: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        priority: TechniqueDescriptor_1.AttrScope.TechniqueRendering,
        size: TechniqueDescriptor_1.AttrScope.TechniqueRendering
    }
});
exports.techniqueDescriptors.text = textTechniqueDescriptor;
const shaderTechniqueDescriptor = TechniqueDescriptor_1.mergeTechniqueDescriptor(exports.baseTechniqueParamsDescriptor, {
    attrScopes: {
        primitive: TechniqueDescriptor_1.AttrScope.TechniqueGeometry,
        params: TechniqueDescriptor_1.AttrScope.TechniqueRendering
    }
});
exports.techniqueDescriptors.shader = shaderTechniqueDescriptor;
/**
 * Type guard to check if an object is an instance of [[CirclesTechnique]].
 */
function isCirclesTechnique(technique) {
    return technique.name === "circles";
}
exports.isCirclesTechnique = isCirclesTechnique;
/**
 * Type guard to check if an object is an instance of [[SquaresTechnique]].
 */
function isSquaresTechnique(technique) {
    return technique.name === "squares";
}
exports.isSquaresTechnique = isSquaresTechnique;
/**
 * Type guard to check if an object is an instance of [[PoiTechnique]].
 */
function isPoiTechnique(technique) {
    return technique.name === "labeled-icon";
}
exports.isPoiTechnique = isPoiTechnique;
/**
 * Type guard to check if an object is an instance of [[LineMarkerTechnique]].
 */
function isLineMarkerTechnique(technique) {
    return technique.name === "line-marker";
}
exports.isLineMarkerTechnique = isLineMarkerTechnique;
/**
 * Type guard to check if an object is an instance of [[LineTechnique]].
 */
function isLineTechnique(technique) {
    return technique.name === "line";
}
exports.isLineTechnique = isLineTechnique;
/**
 * Type guard to check if an object is an instance of [[SolidLineTechnique]].
 */
function isSolidLineTechnique(technique) {
    return technique.name === "solid-line" || technique.name === "dashed-line";
}
exports.isSolidLineTechnique = isSolidLineTechnique;
/**
 * Type guard to check if an object is an instance of [[SolidLineTechnique]] and is a kind that
 * has special dashes.
 * @note Lines with special dashes need line caps to render properly.
 */
function isSpecialDashesLineTechnique(technique) {
    return ((technique.name === "solid-line" || technique.name === "dashed-line") &&
        technique.dashes !== undefined &&
        technique.dashes !== "Square");
}
exports.isSpecialDashesLineTechnique = isSpecialDashesLineTechnique;
/**
 * Type guard to check if an object is an instance of [[SegmentsTechnique]].
 */
function isSegmentsTechnique(technique) {
    return technique.name === "segments";
}
exports.isSegmentsTechnique = isSegmentsTechnique;
/**
 * Type guard to check if an object is an instance of [[BasicExtrudedLineTechnique]]
 * or [[StandardExtrudedLineTechnique]].
 */
function isExtrudedLineTechnique(technique) {
    return technique.name === "extruded-line";
}
exports.isExtrudedLineTechnique = isExtrudedLineTechnique;
/**
 * Type guard to check if an object is an instance of [[BasicExtrudedLineTechnique]].
 */
function isBasicExtrudedLineTechnique(technique) {
    return isExtrudedLineTechnique(technique) && technique.shading === "basic";
}
exports.isBasicExtrudedLineTechnique = isBasicExtrudedLineTechnique;
/**
 * Type guard to check if an object is an instance of [[StandardExtrudedLineTechnique]].
 */
function isStandardExtrudedLineTechnique(technique) {
    return isExtrudedLineTechnique(technique) && technique.shading === "standard";
}
exports.isStandardExtrudedLineTechnique = isStandardExtrudedLineTechnique;
/**
 * Type guard to check if an object is an instance of [[FillTechnique]].
 */
function isFillTechnique(technique) {
    return technique.name === "fill";
}
exports.isFillTechnique = isFillTechnique;
/**
 * Type guard to check if an object is an instance of [[ExtrudedPolygonTechnique]].
 */
function isExtrudedPolygonTechnique(technique) {
    return technique.name === "extruded-polygon";
}
exports.isExtrudedPolygonTechnique = isExtrudedPolygonTechnique;
/**
 * Type guard to check if an object is an instance of [[StandardTechnique]].
 */
function isStandardTechnique(technique) {
    return technique.name === "standard";
}
exports.isStandardTechnique = isStandardTechnique;
/**
 * Type guard to check if an object is an instance of [[TerrainTechnique]].
 */
function isTerrainTechnique(technique) {
    return technique.name === "terrain";
}
exports.isTerrainTechnique = isTerrainTechnique;
/**
 * Type guard to check if an object is an instance of [[TextTechnique]].
 */
function isTextTechnique(technique) {
    return technique.name === "text";
}
exports.isTextTechnique = isTextTechnique;
/**
 * Type guard to check if an object is an instance of [[ShaderTechnique]].
 */
function isShaderTechnique(technique) {
    return technique.name === "shader";
}
exports.isShaderTechnique = isShaderTechnique;
function isLabelRejectionLineTechnique(technique) {
    return technique.name === "label-rejection-line";
}
exports.isLabelRejectionLineTechnique = isLabelRejectionLineTechnique;
/**
 * Check if vertex normals should be generated for this technique (if no normals are in the data).
 * @param technique Technique to check.
 */
function needsVertexNormals(technique) {
    return (isFillTechnique(technique) ||
        isStandardTechnique(technique) ||
        isTerrainTechnique(technique) ||
        isStandardExtrudedLineTechnique(technique));
}
exports.needsVertexNormals = needsVertexNormals;
/**
 * Get the texture coordinate type if the technique supports it.
 */
function textureCoordinateType(technique) {
    if (isStandardTechnique(technique)) {
        return technique.textureCoordinateType;
    }
    else if (isExtrudedPolygonTechnique(technique)) {
        return technique.textureCoordinateType;
    }
    else if (isTerrainTechnique(technique)) {
        return technique.textureCoordinateType;
    }
    else {
        return undefined;
    }
}
exports.textureCoordinateType = textureCoordinateType;
/**
 * Add all the buffers of the technique to the transfer list.
 */
function addBuffersToTransferList(technique, transferList) {
    if (isStandardTechnique(technique) ||
        isExtrudedPolygonTechnique(technique) ||
        isTerrainTechnique(technique)) {
        for (const texturePropertyKey of exports.TEXTURE_PROPERTY_KEYS) {
            const textureProperty = technique[texturePropertyKey];
            if (TechniqueParams_1.isTextureBuffer(textureProperty)) {
                if (textureProperty.buffer instanceof ArrayBuffer) {
                    transferList.push(textureProperty.buffer);
                }
            }
        }
    }
}
exports.addBuffersToTransferList = addBuffersToTransferList;
/**
 * Compose full texture name for given image name with technique specified.
 * Some techniques allows to add prefix/postfix to icons names specified, this
 * function uses technique information to create fully qualified texture name.
 * @param imageName base name of the marker icon.
 * @param technique the technique describing POI or line marker.
 * @returns fully qualified texture name for loading from atlas (without extension).
 */
function composeTechniqueTextureName(imageName, technique) {
    let textureName = imageName;
    if (typeof technique.imageTexturePrefix === "string") {
        textureName = technique.imageTexturePrefix + textureName;
    }
    if (typeof technique.imageTexturePostfix === "string") {
        textureName = textureName + technique.imageTexturePostfix;
    }
    return textureName;
}
exports.composeTechniqueTextureName = composeTechniqueTextureName;


/***/ }),

/***/ "../harp-datasource-protocol/lib/Theme.ts":
/*!************************************************!*\
  !*** ../harp-datasource-protocol/lib/Theme.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
const InterpolatedProperty_1 = __webpack_require__(/*! ./InterpolatedProperty */ "../harp-datasource-protocol/lib/InterpolatedProperty.ts");
/**
 * Checks if the given definition implements the [[BoxedDefinition]] interface.
 */
function isBoxedDefinition(def) {
    const bdef = def;
    return (typeof bdef === "object" &&
        bdef !== null &&
        (typeof bdef.type === "string" || typeof bdef.type === "undefined") &&
        (typeof bdef.value === "string" ||
            typeof bdef.value === "number" ||
            typeof bdef.value === "boolean" ||
            InterpolatedProperty_1.isInterpolatedPropertyDefinition(bdef.value) ||
            Expr_1.isJsonExpr(bdef.value)));
}
exports.isBoxedDefinition = isBoxedDefinition;
function isLiteralDefinition(def) {
    return typeof def === "string" || typeof def === "number" || typeof def === "boolean";
}
exports.isLiteralDefinition = isLiteralDefinition;
/**
 * Checks if the given value is a reference to a definition.
 *
 * @param value The value of a technique property.
 */
function isJsonExprReference(value) {
    return (Array.isArray(value) &&
        value.length === 2 &&
        value[0] === "ref" &&
        typeof value[1] === "string");
}
exports.isJsonExprReference = isJsonExprReference;
function isActualSelectorDefinition(def) {
    const styleDef = def;
    return (typeof styleDef === "object" &&
        styleDef !== null &&
        !Array.isArray(styleDef) &&
        typeof styleDef.technique === "string");
}
exports.isActualSelectorDefinition = isActualSelectorDefinition;


/***/ }),

/***/ "../harp-datasource-protocol/lib/ThemeVisitor.ts":
/*!*******************************************************!*\
  !*** ../harp-datasource-protocol/lib/ThemeVisitor.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
/**
 * The ThemeVisitor visits every style in the theme in a depth-first fashion.
 */
class ThemeVisitor {
    constructor(theme) {
        this.theme = theme;
    }
    /**
     * Applies a function to every style in the theme.
     *
     * @param visitFunc Function to be called with `style` as an argument. Function should return
     *                  `true` to cancel visitation.
     * @returns `true` if function has finished prematurely.
     */
    visitStyles(visitFunc) {
        const visit = (style) => {
            if (Expr_1.isJsonExpr(style)) {
                return false;
            }
            if (visitFunc(style)) {
                return true;
            }
            return false;
        };
        if (this.theme.styles !== undefined) {
            for (const styleSetName in this.theme.styles) {
                if (this.theme.styles[styleSetName] !== undefined) {
                    for (const style of this.theme.styles[styleSetName]) {
                        if (visit(style)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}
exports.ThemeVisitor = ThemeVisitor;


/***/ }),

/***/ "../harp-datasource-protocol/lib/ThreeBufferUtils.ts":
/*!***********************************************************!*\
  !*** ../harp-datasource-protocol/lib/ThreeBufferUtils.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const DecodedTile_1 = __webpack_require__(/*! ./DecodedTile */ "../harp-datasource-protocol/lib/DecodedTile.ts");
/**
 * Collection of helper methods to convert
 * {@link https://threejs.org/docs/index.html#api/en/core/BufferGeometry|three.js BufferGeometry}
 * to [[Geometry]] that allows creation and transfering of THREE BufferGeometry in webworkers.
 * See also [[CustomDatasourceExample]].
 */
var ThreeBufferUtils;
(function (ThreeBufferUtils) {
    function getBufferElementType(buffer) {
        if (buffer instanceof Int8Array) {
            return "int8";
        }
        else if (buffer instanceof Uint8Array) {
            return "uint8";
        }
        else if (buffer instanceof Int16Array) {
            return "int16";
        }
        else if (buffer instanceof Uint16Array) {
            return "uint16";
        }
        else if (buffer instanceof Int32Array) {
            return "int32";
        }
        else if (buffer instanceof Uint32Array) {
            return "uint32";
        }
        else if (buffer instanceof Float32Array) {
            return "float";
        }
        throw new Error(`Unsupported buffer type ${name}`);
    }
    ThreeBufferUtils.getBufferElementType = getBufferElementType;
    function fromThreeBufferAttribute(bufferAttribute) {
        const buffer = bufferAttribute.array;
        return {
            name: bufferAttribute.name,
            buffer: buffer.buffer,
            type: getBufferElementType(buffer),
            itemCount: bufferAttribute.itemSize,
            normalized: bufferAttribute.normalized
        };
    }
    ThreeBufferUtils.fromThreeBufferAttribute = fromThreeBufferAttribute;
    function fromThreeInterleavedBufferAttribute(bufferAttribute) {
        throw new Error("Not implemented yet");
    }
    ThreeBufferUtils.fromThreeInterleavedBufferAttribute = fromThreeInterleavedBufferAttribute;
    function fromThreeBufferGeometry(bufferGeometry, techniqueIndex) {
        const vertexAttributes = [];
        const attributeNames = Object.getOwnPropertyNames(bufferGeometry.attributes);
        for (const name of attributeNames) {
            const attribute = bufferGeometry.attributes[name];
            // FIXME: Also support InterleavedBufferAttribute
            const vertexAttribute = fromThreeBufferAttribute(attribute);
            vertexAttribute.name = name;
            vertexAttributes.push(vertexAttribute);
        }
        const index = bufferGeometry.index !== null
            ? fromThreeBufferAttribute(bufferGeometry.index)
            : undefined;
        let count = 0;
        if (index !== undefined) {
            count = bufferGeometry.index === null ? 0 : bufferGeometry.index.count;
        }
        else {
            // If there is no index buffer, try to deduce the count from the position attribute.
            const posAttr = bufferGeometry.attributes.position;
            if (posAttr === undefined) {
                throw new Error("Missing position attibute to deduce item count");
            }
            count = posAttr.count;
        }
        return {
            type: DecodedTile_1.GeometryType.Unspecified,
            vertexAttributes,
            index,
            groups: [{ start: 0, count, technique: techniqueIndex }]
        };
    }
    ThreeBufferUtils.fromThreeBufferGeometry = fromThreeBufferGeometry;
})(ThreeBufferUtils = exports.ThreeBufferUtils || (exports.ThreeBufferUtils = {}));


/***/ }),

/***/ "../harp-datasource-protocol/lib/TileInfo.ts":
/*!***************************************************!*\
  !*** ../harp-datasource-protocol/lib/TileInfo.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const Expr_1 = __webpack_require__(/*! ./Expr */ "../harp-datasource-protocol/lib/Expr.ts");
const StyleSetEvaluator_1 = __webpack_require__(/*! ./StyleSetEvaluator */ "../harp-datasource-protocol/lib/StyleSetEvaluator.ts");
const TechniqueAttr_1 = __webpack_require__(/*! ./TechniqueAttr */ "../harp-datasource-protocol/lib/TechniqueAttr.ts");
const Techniques_1 = __webpack_require__(/*! ./Techniques */ "../harp-datasource-protocol/lib/Techniques.ts");
/**
 * Represents a feature group type for tile info.
 */
var FeatureGroupType;
(function (FeatureGroupType) {
    FeatureGroupType[FeatureGroupType["Point"] = 0] = "Point";
    FeatureGroupType[FeatureGroupType["Line"] = 1] = "Line";
    FeatureGroupType[FeatureGroupType["Polygon"] = 2] = "Polygon";
})(FeatureGroupType = exports.FeatureGroupType || (exports.FeatureGroupType = {}));
/**
 * Minimum estimated size of a JS object.
 */
const MINIMUM_OBJECT_SIZE_ESTIMATION = 100;
/**
 * Structure of arrays containing data for all features of this group. No methods, since the object
 * is being passed as part of ExtendedTileInfo across "process boundaries" to the web worker.
 *
 * Supporting methods in namespace [[ExtendedTileInfo]].
 */
class FeatureGroup {
    /**
     * Construct featureGroup.
     *
     * @param storeExtendedTags Pass `true` to create fields for more OMV tags (`layer`, `class`
     * and `type`).
     */
    constructor(storeExtendedTags, startSize = 5000) {
        /** featureIds */
        this.featureIds = new Array();
        /** number of features */
        this.numFeatures = 0;
        /** number of positions of elements (2 per point) */
        this.numPositions = 0;
        this.featureIds = new Array(startSize);
        this.featureIds.length = startSize;
        this.techniqueIndex = new Array(startSize);
        this.techniqueIndex.length = startSize;
        this.textIndex = new Array(startSize);
        this.textIndex.length = startSize;
        this.positionIndex = new Array(startSize);
        this.positionIndex.length = startSize;
        this.positions = new Array(10 * startSize);
        this.positions.length = 10 * startSize;
        if (storeExtendedTags) {
            this.layerIndex = new Array(startSize);
            this.layerIndex.length = startSize;
            this.classIndex = new Array(startSize);
            this.classIndex.length = startSize;
            this.typeIndex = new Array(startSize);
            this.typeIndex.length = startSize;
        }
    }
    /**
     * Compute size in bytes.
     */
    getNumBytes() {
        return ((this.featureIds.length +
            this.techniqueIndex.length +
            this.textIndex.length +
            this.positionIndex.length +
            this.positions.length +
            (this.layerIndex !== undefined ? this.layerIndex.length : 0) +
            (this.classIndex !== undefined ? this.classIndex.length : 0) +
            (this.typeIndex !== undefined ? this.typeIndex.length : 0)) *
            8);
    }
}
exports.FeatureGroup = FeatureGroup;
/**
 * Structure of arrays containing data for roads. No methods, since the object is being passed as
 * part of [[ExtendedTileInfo]] across "process boundaries" to the web worker.
 */
class LineFeatureGroup extends FeatureGroup {
    constructor() {
        super(...arguments);
        /**
         * An array of object defined by the user. Certain elements may be `undefined` (if this line
         * feature is not a road, or if the object for that feature is undefined).
         */
        this.userData = [];
    }
    /** @override */
    getNumBytes() {
        return (super.getNumBytes() +
            ((this.segmentIds !== undefined ? this.segmentIds.length : 0) +
                (this.segmentStartOffsets !== undefined ? this.segmentStartOffsets.length : 0) +
                (this.segmentEndOffsets !== undefined ? this.segmentEndOffsets.length : 0)) *
                8);
    }
}
exports.LineFeatureGroup = LineFeatureGroup;
/**
 * Structure of arrays containing data for polygons. No methods, since the object is being passed as
 * part of ExtendedTileInfo across "process boundaries" to the web worker.
 *
 * Supporting methods in namespace [[ExtendedTileInfo]].
 *
 * Due to the complexity of the access, there are supporting classes to store and access data in
 * the feature groups. See [[ExtendedTileInfoWriter]] and [[ExtendedTileInfoPolygonAccessor]].
 */
class PolygonFeatureGroup extends FeatureGroup {
    constructor(storeExtendedTags, startSize = 5000) {
        super(storeExtendedTags, startSize);
        /**
         * Number of rings stored in all polygons in tis group. Used to keep size of the
         * arrays.
         */
        this.groupNumRings = 0;
        this.outerRingStartIndex = new Array(startSize);
        this.outerRingStartIndex.length = startSize;
        this.innerRingIsOuterContour = new Array(startSize);
        this.innerRingIsOuterContour.length = startSize;
        this.innerRingStartIndex = new Array(startSize);
        this.innerRingStartIndex.length = startSize;
    }
    /** @override */
    getNumBytes() {
        return (super.getNumBytes() +
            ((this.outerRingStartIndex !== undefined ? this.outerRingStartIndex.length : 0) +
                (this.innerRingIsOuterContour !== undefined
                    ? this.innerRingIsOuterContour.length
                    : 0) +
                (this.innerRingStartIndex !== undefined ? this.innerRingStartIndex.length : 0)) *
                8);
    }
}
exports.PolygonFeatureGroup = PolygonFeatureGroup;
/**
 * Class to hold infos from [[OmvTile]]s. Optimized for fast serialization when being passed from
 * webworker to main thread. No methods, since the object is being passed across "process
 * boundaries" to the web worker.
 *
 * Supporting methods in namespace [[ExtendedTileInfo]].
 *
 * Due to the complexity of the access, there are supporting classes to store and access data in
 * the feature groups. See [[ExtendedTileInfoWriter]] and [[ExtendedTileInfoPolygonAccessor]].
 */
class ExtendedTileInfo {
    constructor(tileKey, storeExtendedTags) {
        this.tileKey = tileKey;
        /**
         * Catalog of strings. Addressed by every features stringIndex.
         */
        this.textCatalog = new Array();
        /**
         * Catalog of techniques. Addressed by every features featureIndex.
         */
        this.techniqueCatalog = new Array();
        /**
         * Used for performance diagnostics.
         */
        this.setupTime = 0;
        /**
         * Size in bytes.
         */
        this.numBytes = 0;
        this.pointGroup = new FeatureGroup(storeExtendedTags);
        this.lineGroup = new LineFeatureGroup(storeExtendedTags);
        this.polygonGroup = new PolygonFeatureGroup(storeExtendedTags);
        if (storeExtendedTags) {
            this.layerCatalog = new Array();
            this.classCatalog = new Array();
            this.typeCatalog = new Array();
        }
    }
    /**
     * Compute the memory footprint caused by objects owned by the `ExtendedTileInfo`.
     */
    getNumBytes() {
        let numBytes = MINIMUM_OBJECT_SIZE_ESTIMATION;
        for (const str of this.textCatalog) {
            numBytes += 2 * str.length;
        }
        numBytes += this.techniqueCatalog.length * MINIMUM_OBJECT_SIZE_ESTIMATION;
        numBytes += this.pointGroup.getNumBytes();
        numBytes += this.lineGroup.getNumBytes();
        numBytes += this.polygonGroup.getNumBytes();
        if (this.layerCatalog !== undefined) {
            for (const str of this.layerCatalog) {
                numBytes += 2 * str.length;
            }
            for (const str of this.classCatalog) {
                numBytes += 2 * str.length;
            }
            for (const str of this.typeCatalog) {
                numBytes += 2 * str.length;
            }
        }
        return numBytes;
    }
}
exports.ExtendedTileInfo = ExtendedTileInfo;
(function (ExtendedTileInfo) {
    function finishFeatureGroup(featureGroup) {
        featureGroup.featureIds.length = featureGroup.numFeatures;
        featureGroup.techniqueIndex.length = featureGroup.numFeatures;
        featureGroup.textIndex.length = featureGroup.numFeatures;
        featureGroup.positionIndex.length = featureGroup.numFeatures;
        featureGroup.positions.length = featureGroup.numPositions;
        if (featureGroup.layerIndex !== undefined) {
            featureGroup.layerIndex.length = featureGroup.numFeatures;
        }
        if (featureGroup.classIndex !== undefined) {
            featureGroup.classIndex.length = featureGroup.numFeatures;
        }
        if (featureGroup.typeIndex !== undefined) {
            featureGroup.typeIndex.length = featureGroup.numFeatures;
        }
    }
    function finishPolygonFeatureGroup(polygonGroup) {
        finishFeatureGroup(polygonGroup);
        polygonGroup.outerRingStartIndex.length = polygonGroup.numFeatures;
        polygonGroup.innerRingIsOuterContour.length = polygonGroup.groupNumRings;
        polygonGroup.innerRingStartIndex.length = polygonGroup.groupNumRings;
    }
    function finishLineFeatureGroup(lineGroup) {
        finishFeatureGroup(lineGroup);
        if (lineGroup.segmentIds !== undefined) {
            lineGroup.segmentIds.length = lineGroup.numFeatures;
            lineGroup.segmentStartOffsets.length = lineGroup.numFeatures;
            lineGroup.segmentEndOffsets.length = lineGroup.numFeatures;
        }
    }
    /**
     * Finalize the tile's features groups.
     */
    function finish(tileInfo) {
        finishFeatureGroup(tileInfo.pointGroup);
        finishLineFeatureGroup(tileInfo.lineGroup);
        finishPolygonFeatureGroup(tileInfo.polygonGroup);
        tileInfo.numBytes = tileInfo.getNumBytes();
    }
    ExtendedTileInfo.finish = finish;
    /**
     * Returns the number of features in this feature group.
     */
    function featureGroupSize(featureGroup) {
        return featureGroup.numFeatures;
    }
    ExtendedTileInfo.featureGroupSize = featureGroupSize;
    /**
     * Check if the feature group is finalized.
     */
    function featureGroupFinished(featureGroup) {
        return featureGroup.numPositions === featureGroup.positions.length;
    }
    ExtendedTileInfo.featureGroupFinished = featureGroupFinished;
    /**
     * Check if the tileInfo is finalized.
     */
    function tileInfoFinished(tileInfo) {
        return (featureGroupFinished(tileInfo.pointGroup) &&
            featureGroupFinished(tileInfo.lineGroup) &&
            featureGroupFinished(tileInfo.polygonGroup));
    }
    ExtendedTileInfo.tileInfoFinished = tileInfoFinished;
    /**
     * Determine the name of (OMV) feature. It implements the special handling required
     * to determine the text content of a feature from its tags, which are passed in as the `env`.
     *
     * @param env Environment containing the tags from the (OMV) feature.
     * @param useAbbreviation `true` to use the abbreviation if available.
     * @param useIsoCode `true` to use the tag "iso_code".
     * @param languages List of languages to use, for example: Specify "en" to use the tag "name_en"
     *                  as the text of the string. Order reflects priority.
     */
    function getFeatureName(env, useAbbreviation, useIsoCode, languages) {
        let name;
        if (useAbbreviation) {
            const abbreviation = env.lookup(`name:short`);
            if (typeof abbreviation === "string" && abbreviation.length > 0) {
                return abbreviation;
            }
        }
        if (useIsoCode) {
            const isoCode = env.lookup(`iso_code`);
            if (typeof isoCode === "string" && isoCode.length > 0) {
                return isoCode;
            }
        }
        if (languages !== undefined) {
            for (const lang of languages) {
                name = env.lookup(`name:${lang}`) || env.lookup(`name_${lang}`);
                if (typeof name === "string" && name.length > 0) {
                    return name;
                }
            }
        }
        name = env.lookup("name");
        if (typeof name === "string") {
            return name;
        }
        return undefined;
    }
    ExtendedTileInfo.getFeatureName = getFeatureName;
    /**
     * Determine the text string of the map feature. It implements the special handling required
     * to determine the text content of a feature from its tags, which are passed in as the `env`.
     *
     * @param feature Feature, including properties from the (OMV) feature.
     * @param technique technique defining how text should be created from feature
     * @param languages List of languages to use, for example: Specify "en" to use the tag "name_en"
     *                  as the text of the string. Order reflects priority.
     */
    function getFeatureText(context, technique, languages) {
        let useAbbreviation;
        let useIsoCode;
        const env = context instanceof Expr_1.Env ? context : context.env;
        if (Techniques_1.isTextTechnique(technique) ||
            Techniques_1.isPoiTechnique(technique) ||
            Techniques_1.isLineMarkerTechnique(technique)) {
            if (technique.text !== undefined) {
                return TechniqueAttr_1.evaluateTechniqueAttr(context, technique.text);
            }
            if (technique.label !== undefined) {
                const name = env.lookup(technique.label);
                return typeof name === "string" ? name : undefined;
            }
            useAbbreviation = technique.useAbbreviation;
            useIsoCode = technique.useIsoCode;
        }
        return getFeatureName(env, useAbbreviation, useIsoCode, languages);
    }
    ExtendedTileInfo.getFeatureText = getFeatureText;
})(ExtendedTileInfo = exports.ExtendedTileInfo || (exports.ExtendedTileInfo = {}));
/**
 * Support class for [[ExtendedTileInfo]]. Assist in filling it with data.
 */
class ExtendedTileInfoWriter {
    /**
     * Create an [[ExtendedTileInfoWriter]] for an [[ExtendedTileInfo]]. Assist in filling the
     * [[ExtendedTileInfo]] with data.
     *
     * @param tileInfo [[ExtendedTileInfo]] to write data to.
     * @param storeExtendedTags Pass `true` if feature data like `layer`, `class`or `type` should
     *          be stored for every feature.
     */
    constructor(tileInfo, storeExtendedTags) {
        this.tileInfo = tileInfo;
        this.storeExtendedTags = storeExtendedTags;
        /** Map to identify which techniques already have been added to the [[ExtendedTileInfo]]. */
        this.techniqueIndexMap = new Map();
        /** Map to identify which strings already have been added to the [[ExtendedTileInfo]]. */
        this.stringMap = new Map();
        /** Map to identify which `layer` names already have been added to the [[ExtendedTileInfo]]. */
        this.layerMap = new Map();
        /** Map to identify which `class` names already have been added to the [[ExtendedTileInfo]]. */
        this.classMap = new Map();
        /** Map to identify which `type` names already have been added to the [[ExtendedTileInfo]]. */
        this.typeMap = new Map();
    }
    /**
     * Adds a [[Technique]] to the catalog of techniques. Individual techniques have a `_index` file
     * which has been created in the [[StyleSetEvaluator]]. This index is required to identify a
     * technique. The `Map` is used to map techniques to already added techniques, or store the
     * technique as new, and add it to the map.
     *
     * @param technique The [[Technique]] to add.
     */
    addTechnique(technique) {
        let infoTileTechniqueIndex = this.techniqueIndexMap.get(technique._index);
        if (infoTileTechniqueIndex !== undefined) {
            return infoTileTechniqueIndex;
        }
        const decodedTechnique = StyleSetEvaluator_1.makeDecodedTechnique(technique);
        infoTileTechniqueIndex = this.tileInfo.techniqueCatalog.length;
        this.techniqueIndexMap.set(decodedTechnique._index, infoTileTechniqueIndex);
        this.tileInfo.techniqueCatalog.push(decodedTechnique);
        return infoTileTechniqueIndex;
    }
    /**
     * Add a feature.
     *
     * @param featureGroup The feature group to add to.
     * @param technique The technique to add.
     * @param env The `env` which is a mix of original OMV feature tags and fields added by the
     *      [[StyleSetEvaluator]]
     * @param featureId The featureId, a number unique for many features (but not all).
     * @param infoTileTechniqueIndex The previously computed index of the technique. Must have been
     *      computed by `addTechnique(technique)`.
     * @param isPolygonGroup `true`for polygons.
     */
    addFeature(featureGroup, env, featureId, featureText, infoTileTechniqueIndex, featureGroupType) {
        // compute name/label of feature
        let stringIndex = -1;
        if (featureText !== undefined && featureText.length > 0) {
            stringIndex = this.addText(featureText);
        }
        // add indices into the arrays.
        featureGroup.featureIds[featureGroup.numFeatures] = featureId;
        featureGroup.techniqueIndex[featureGroup.numFeatures] = infoTileTechniqueIndex;
        featureGroup.textIndex[featureGroup.numFeatures] = stringIndex;
        featureGroup.positionIndex[featureGroup.numFeatures] = featureGroup.numPositions;
        switch (featureGroupType) {
            case FeatureGroupType.Polygon:
                // polygons need the extra fields for polygon rings
                const polygonGroup = featureGroup;
                harp_utils_1.assert(polygonGroup.outerRingStartIndex !== undefined);
                harp_utils_1.assert(polygonGroup.innerRingStartIndex !== undefined);
                harp_utils_1.assert(polygonGroup.innerRingIsOuterContour !== undefined);
                polygonGroup.outerRingStartIndex[featureGroup.numFeatures] =
                    polygonGroup.groupNumRings;
                break;
            case FeatureGroupType.Line:
                featureGroup.userData[featureGroup.numFeatures] = env.entries;
                break;
        }
        // store the extra feature fields
        if (this.storeExtendedTags) {
            featureGroup.layerIndex[featureGroup.numFeatures] = this.addLayer(env.lookup("$layer"));
            featureGroup.classIndex[featureGroup.numFeatures] = this.addClass(env.lookup("class"));
            featureGroup.typeIndex[featureGroup.numFeatures] = this.addType(env.lookup("type"));
        }
        featureGroup.numFeatures++;
    }
    /**
     * Add the X/Y coordinate of the point. Only for point feature groups.
     *
     * @param featureGroup The feature group to add it to.
     * @param x X Position of point.
     * @param y Y Position of point.
     */
    addFeaturePoint(featureGroup, x, y) {
        featureGroup.positions[featureGroup.numPositions++] = x;
        featureGroup.positions[featureGroup.numPositions++] = y;
    }
    /**
     * Add the line points as X/Y coordinates to the line feature.
     *
     * If a line feature has more than one line (rare for HERE data), it should define multiple
     * line features for it.
     *
     * @param featureGroup The feature group to add to. Must be line feature group.
     * @param points The X/Y coordinates of the points.
     */
    addFeaturePoints(featureGroup, points) {
        const n = featureGroup.numPositions;
        const l = points.length;
        const p = featureGroup.positions;
        for (let i = 0; i < l; i++) {
            p[n + i] = points[i];
        }
        featureGroup.numPositions += points.length;
    }
    /**
     * Add the information about road segments to the line feature. Performs lazy initialization of
     * `segmentIds`, `segmentStartOffsets`, and `segmentEndOffsets` members of a
     * [[LineFeatureGroup]] instance.
     *
     * @param featureGroup The line feature group to add information to.
     * @param segmentId Segment id of a feature.
     * @param startOffset Start offset of a feature.
     * @param endOffset End offset of a feature.
     */
    addRoadSegments(featureGroup, segmentId, startOffset, endOffset) {
        if (featureGroup.segmentIds === undefined) {
            featureGroup.segmentIds = new Array();
            featureGroup.segmentStartOffsets = new Array();
            featureGroup.segmentEndOffsets = new Array();
        }
        featureGroup.segmentIds[featureGroup.numFeatures - 1] = segmentId;
        featureGroup.segmentStartOffsets[featureGroup.numFeatures - 1] = startOffset;
        featureGroup.segmentEndOffsets[featureGroup.numFeatures - 1] = endOffset;
    }
    /**
     * Add a single ring to the polygon. Can be called multiple times to add multiple rings to the
     * polygon.
     *
     * @param featureGroup Polygon feature group to add polygon ring to.
     * @param contour The X/Y coordinates of the ring.
     * @param isOuterRing Pass `true`if it is a outer ring, otherwise `false`.
     */
    addRingPoints(featureGroup, contour, isOuterRing) {
        featureGroup.innerRingStartIndex[featureGroup.groupNumRings] = featureGroup.numPositions;
        featureGroup.innerRingIsOuterContour[featureGroup.groupNumRings] = isOuterRing ? 1 : 0;
        featureGroup.groupNumRings++;
        const n = featureGroup.numPositions;
        const l = contour.length;
        const p = featureGroup.positions;
        for (let i = 0; i < l; i++) {
            p[n + i] = contour[i];
        }
        featureGroup.numPositions += contour.length;
    }
    /**
     * Finalize the tile info's feature group.
     */
    finish() {
        ExtendedTileInfo.finish(this.tileInfo);
    }
    addText(name) {
        return this.addStringValue(name, this.tileInfo.textCatalog, this.stringMap);
    }
    addLayer(name) {
        return this.addStringValue(name, this.tileInfo.layerCatalog, this.layerMap);
    }
    addClass(name) {
        return this.addStringValue(name, this.tileInfo.classCatalog, this.classMap);
    }
    addType(name) {
        return this.addStringValue(name, this.tileInfo.typeCatalog, this.typeMap);
    }
    // Add a string to the strings catalog. Returns index into the catalog.
    addStringValue(str, catalog, map) {
        if (str === undefined || str === null) {
            return -1;
        }
        const name = str.toString();
        let i = map.get(name);
        if (i !== undefined) {
            return i;
        }
        i = catalog.length;
        catalog.push(name);
        map.set(name, i);
        return i;
    }
}
exports.ExtendedTileInfoWriter = ExtendedTileInfoWriter;
/**
 * Implementation of [[ExtendedTileInfoPolygonAccessor]].
 */
class ExtendedTileInfoPolygonAccessorImpl {
    constructor() {
        /**
         * Feature's index in the group.
         */
        this.featureIndex = 0;
        /**
         * Indicates where the ring starts.
         */
        this.ringStart = 0;
        /**
         * Number of rings.
         */
        this.numRings = 0;
    }
    /**
     * Setup the accessor for extended [[TileInfo]].
     *
     * @param polygons polygons feature group.
     * @param featureIndex feature's index in the group.
     * @param ringStart where the ring starts.
     * @param numRings number of rings.
     */
    setup(polygons, featureIndex, ringStart, numRings) {
        this.polygons = polygons;
        this.featureIndex = featureIndex;
        this.ringStart = ringStart;
        this.numRings = numRings;
    }
    /**
     * Shut down the accessor and free all references.
     */
    reset() {
        this.polygons = undefined;
        this.featureIndex = 0;
        this.ringStart = 0;
        this.numRings = 0;
    }
    isOuterRing(ringIndex) {
        harp_utils_1.assert(ringIndex >= 0);
        harp_utils_1.assert(ringIndex < this.numRings);
        harp_utils_1.assert(this.polygons !== undefined);
        if (ringIndex < 0 || ringIndex >= this.numRings || this.polygons === undefined) {
            throw new Error("ExtendedTileInfoPolygonAccessor: Invalid ring index");
        }
        return this.polygons.innerRingIsOuterContour[this.ringStart + ringIndex] !== 0;
    }
    getPoints(ringIndex) {
        harp_utils_1.assert(ringIndex >= 0);
        harp_utils_1.assert(ringIndex < this.numRings);
        harp_utils_1.assert(this.polygons !== undefined);
        if (ringIndex < 0 || ringIndex >= this.numRings || this.polygons === undefined) {
            throw new Error("ExtendedTileInfoPolygonAccessor: Invalid ring index");
        }
        // compute the start/size of the points in this ring. All `points` are actually just the
        // indices of a single X/Y coordinate.
        const pointsStart = this.polygons.innerRingStartIndex[this.ringStart + ringIndex];
        let numPointValues;
        if (ringIndex < this.numRings - 1) {
            numPointValues =
                this.polygons.innerRingStartIndex[this.ringStart + ringIndex + 1] - pointsStart;
        }
        else {
            if (this.ringStart + ringIndex < this.polygons.innerRingStartIndex.length - 1) {
                numPointValues =
                    this.polygons.innerRingStartIndex[this.ringStart + ringIndex + 1] - pointsStart;
            }
            else {
                numPointValues = this.polygons.positions.length - pointsStart;
            }
        }
        return {
            points: this.polygons.positions,
            pointsStart,
            numPointValues
        };
    }
}
/**
 * Supporting class for [[ExtendedTileInfo]]. Takes an [[ExtendedTileInfoHandler]] and calls an
 * `accept` for every feature of the [[ExtendedTileInfo]], or just all features of a specified
 * `featureId`.
 */
class ExtendedTileInfoVisitor {
    constructor(tileInfo) {
        this.tileInfo = tileInfo;
    }
    /**
     * Visit all feature in the [[ExtendedTileInfo]]
     *
     * @param handler Let the `handler` visit all features.
     */
    visitAll(handler) {
        this.visitAllPointFeatures(handler);
        this.visitAllLineFeatures(handler);
        this.visitAllPolygonFeatures(handler);
    }
    /**
     * Visit all features of a specified featureId.
     *
     * @param featureId The featureId to visit.
     * @param handler The `handler` to use.
     */
    visitFeature(featureId, handler) {
        let numFeaturesFound = 0;
        const numPointFeatures = this.tileInfo.pointGroup.numFeatures;
        const pointFeatures = this.tileInfo.pointGroup.featureIds;
        for (let i = 0; i < numPointFeatures; i++) {
            if (pointFeatures[i] === featureId) {
                numFeaturesFound++;
                this.visitPointFeature(i, handler);
            }
        }
        const numLineFeatures = this.tileInfo.lineGroup.numFeatures;
        const lineFeatures = this.tileInfo.lineGroup.featureIds;
        for (let i = 0; i < numLineFeatures; i++) {
            if (lineFeatures[i] === featureId) {
                numFeaturesFound++;
                this.visitLineFeature(i, handler);
            }
        }
        const numPolygonFeatures = this.tileInfo.polygonGroup.numFeatures;
        const polygonsFeatures = this.tileInfo.polygonGroup.featureIds;
        for (let i = 0; i < numPolygonFeatures; i++) {
            if (polygonsFeatures[i] === featureId) {
                numFeaturesFound++;
                this.visitPolygonFeature(i, handler);
            }
        }
        return numFeaturesFound;
    }
    /**
     * Visit all `POINT` features.
     *
     * @param handler The `handler` to use.
     */
    visitAllPointFeatures(handler) {
        const numFeatures = this.tileInfo.pointGroup.numFeatures;
        for (let i = 0; i < numFeatures; i++) {
            this.visitPointFeature(i, handler);
        }
    }
    /**
     * Visit all `LINESTRING` features.
     *
     * @param handler The handler to use.
     */
    visitAllLineFeatures(handler) {
        const numFeatures = this.tileInfo.lineGroup.numFeatures;
        for (let i = 0; i < numFeatures; i++) {
            this.visitLineFeature(i, handler);
        }
    }
    /**
     * Visit all `POLYGON` features.
     *
     * @param handler The `handler` to use.
     */
    visitAllPolygonFeatures(handler) {
        const numFeatures = this.tileInfo.polygonGroup.numFeatures;
        for (let i = 0; i < numFeatures; i++) {
            this.visitPolygonFeature(i, handler);
        }
    }
    getTag(featureIndex, index) {
        return index !== undefined && index[featureIndex] >= 0 ? index[featureIndex] : -1;
    }
    /**
     * Call the `handler` on a point feature.
     *
     * @param featureIndex The index of the feature into the feature table.
     * @param handler The `handler` to use.
     */
    visitPointFeature(featureIndex, handler) {
        const tileInfo = this.tileInfo;
        const points = tileInfo.pointGroup;
        const start = points.positionIndex[featureIndex];
        const x = points.positions[start];
        const y = points.positions[start + 1];
        if (!!handler.acceptPoint) {
            handler.acceptPoint(points.featureIds[featureIndex], points.techniqueIndex[featureIndex], x, y, points.textIndex[featureIndex], this.getTag(featureIndex, points.layerIndex), this.getTag(featureIndex, points.classIndex), this.getTag(featureIndex, points.typeIndex));
        }
    }
    /**
     * Call the `handler` on a line feature.
     *
     * @param featureIndex The index of the feature into the feature table.
     * @param handler The `handler` to use.
     */
    visitLineFeature(featureIndex, handler) {
        const tileInfo = this.tileInfo;
        const lines = tileInfo.lineGroup;
        const numFeatures = lines.numFeatures;
        const positionsStart = lines.positionIndex[featureIndex];
        const numPointValues = featureIndex === numFeatures - 1
            ? lines.positions.length - positionsStart
            : lines.positionIndex[featureIndex + 1] - positionsStart;
        let segmentId;
        let startOffset;
        let endOffset;
        if (lines.segmentIds !== undefined) {
            segmentId = lines.segmentIds[featureIndex];
            startOffset = lines.segmentStartOffsets[featureIndex];
            endOffset = lines.segmentEndOffsets[featureIndex];
        }
        if (!!handler.acceptLine) {
            handler.acceptLine(lines.featureIds[featureIndex], lines.techniqueIndex[featureIndex], lines.textIndex[featureIndex], this.getTag(featureIndex, lines.layerIndex), this.getTag(featureIndex, lines.classIndex), this.getTag(featureIndex, lines.typeIndex), tileInfo.lineGroup.positions, positionsStart, numPointValues, segmentId, startOffset, endOffset);
        }
    }
    /**
     * Call the `handler` on a polygon feature.
     *
     * @param featureIndex The index of the feature into the feature table.
     * @param handler The `handler` to use.
     */
    visitPolygonFeature(featureIndex, handler) {
        if (handler.acceptPolygon === undefined) {
            return;
        }
        const tileInfo = this.tileInfo;
        const polygons = tileInfo.polygonGroup;
        const numFeatures = polygons.numFeatures;
        const ringStart = polygons.outerRingStartIndex[featureIndex];
        const numRings = featureIndex === numFeatures - 1
            ? polygons.innerRingStartIndex.length - ringStart
            : polygons.outerRingStartIndex[featureIndex + 1] - ringStart;
        // Use a static instance, so we do not allocate anything here
        ExtendedTileInfoVisitor.polygonAccessor.setup(polygons, featureIndex, ringStart, numRings);
        handler.acceptPolygon(polygons.featureIds[featureIndex], polygons.techniqueIndex[featureIndex], polygons.textIndex[featureIndex], this.getTag(featureIndex, polygons.layerIndex), this.getTag(featureIndex, polygons.classIndex), this.getTag(featureIndex, polygons.typeIndex), ExtendedTileInfoVisitor.polygonAccessor);
        // Free all data references.
        ExtendedTileInfoVisitor.polygonAccessor.reset();
    }
}
exports.ExtendedTileInfoVisitor = ExtendedTileInfoVisitor;
// static instance to work without allocations.
ExtendedTileInfoVisitor.polygonAccessor = new ExtendedTileInfoPolygonAccessorImpl();


/***/ }),

/***/ "../harp-datasource-protocol/lib/WorkerDecoderProtocol.ts":
/*!****************************************************************!*\
  !*** ../harp-datasource-protocol/lib/WorkerDecoderProtocol.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Allows to cancel and prioritize requests inside the requestQueue. Useful to optimize the order of
 * decoding tiles during animations and camera movements.
 *
 * `RequestController` is not extending [[AbortController]], because this is not supported in ES5.
 */
class RequestController {
    /**
     * Creates an instance of `RequestController`.
     *
     * @param {number} priority
     * @param {AbortController} abortController Optional [[AbortController]] used internally, since
     *      [[AbortController]]s should not be subclassed.
     */
    constructor(priority = 0, abortController = new AbortController()) {
        this.priority = priority;
        this.abortController = abortController;
    }
    get signal() {
        return this.abortController.signal;
    }
    /**
     * Invoking this method will set this object's AbortSignal's aborted flag and
     * signal to any observers that the associated activity is to be aborted.
     */
    abort() {
        this.abortController.abort();
    }
}
exports.RequestController = RequestController;
/**
 * Communication protocol with [[ITileDecoder]].
 */
var WorkerDecoderProtocol;
(function (WorkerDecoderProtocol) {
    /**
     * Define possible names of messages exchanged with decoder services within `WebWorker`.
     */
    let DecoderMessageName;
    (function (DecoderMessageName) {
        DecoderMessageName["Configuration"] = "configuration";
    })(DecoderMessageName = WorkerDecoderProtocol.DecoderMessageName || (WorkerDecoderProtocol.DecoderMessageName = {}));
    /**
     * Type guard to check if an object is an instance of `ConfigurationMessage`.
     */
    function isConfigurationMessage(message) {
        return (message &&
            typeof message.service === "string" &&
            typeof message.type === "string" &&
            message.type === DecoderMessageName.Configuration);
    }
    WorkerDecoderProtocol.isConfigurationMessage = isConfigurationMessage;
    /**
     * Define possible names of requests called on decoder services within `WebWorker`.
     */
    let Requests;
    (function (Requests) {
        Requests["DecodeTileRequest"] = "decode-tile-request";
        Requests["TileInfoRequest"] = "tile-info-request";
    })(Requests = WorkerDecoderProtocol.Requests || (WorkerDecoderProtocol.Requests = {}));
    /**
     * Type guard to check if an object is a decoded tile object sent to a worker.
     */
    function isDecodeTileRequest(message) {
        return (message &&
            typeof message.type === "string" &&
            message.type === Requests.DecodeTileRequest);
    }
    WorkerDecoderProtocol.isDecodeTileRequest = isDecodeTileRequest;
    /**
     * Type guard to check if an object is an info tile object sent to a worker.
     */
    function isTileInfoRequest(message) {
        return (message && typeof message.type === "string" && message.type === Requests.TileInfoRequest);
    }
    WorkerDecoderProtocol.isTileInfoRequest = isTileInfoRequest;
})(WorkerDecoderProtocol = exports.WorkerDecoderProtocol || (exports.WorkerDecoderProtocol = {}));


/***/ }),

/***/ "../harp-datasource-protocol/lib/WorkerServiceProtocol.ts":
/*!****************************************************************!*\
  !*** ../harp-datasource-protocol/lib/WorkerServiceProtocol.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Common communication protocol for [[WorkerService]].
 */
var WorkerServiceProtocol;
(function (WorkerServiceProtocol) {
    /**
     * Service id of worker manager ([[WorkerServiceManager]]) used to create/destroy service
     * instances in workers.
     */
    WorkerServiceProtocol.WORKER_SERVICE_MANAGER_SERVICE_ID = "worker-service-manager";
    /**
     * Define possible names of messages exchanged with services within `WebWorker`.
     */
    let ServiceMessageName;
    (function (ServiceMessageName) {
        ServiceMessageName["Initialized"] = "initialized";
        ServiceMessageName["Request"] = "request";
        ServiceMessageName["Response"] = "response";
    })(ServiceMessageName = WorkerServiceProtocol.ServiceMessageName || (WorkerServiceProtocol.ServiceMessageName = {}));
    /**
     * Type guard to check if an object is a signal message from worker.
     */
    function isInitializedMessage(message) {
        return (message &&
            typeof message.service === "string" &&
            typeof message.type === "string" &&
            message.type === ServiceMessageName.Initialized);
    }
    WorkerServiceProtocol.isInitializedMessage = isInitializedMessage;
    /**
     * Define possible names of requests called on services within `WebWorker`.
     */
    let Requests;
    (function (Requests) {
        Requests["CreateService"] = "create-service";
        Requests["DestroyService"] = "destroy-service";
    })(Requests = WorkerServiceProtocol.Requests || (WorkerServiceProtocol.Requests = {}));
    /**
     * Test if `error` thrown by [[CreateServiceRequest]] was caused by unknown type of service.
     */
    function isUnknownServiceError(error) {
        return /unknown targetServiceType requested: /.test(error.message);
    }
    WorkerServiceProtocol.isUnknownServiceError = isUnknownServiceError;
    /**
     * Type guard to check if an object is a request message sent to a worker.
     */
    function isRequestMessage(message) {
        return (message &&
            typeof message.service === "string" &&
            typeof message.type === "string" &&
            message.type === ServiceMessageName.Request);
    }
    WorkerServiceProtocol.isRequestMessage = isRequestMessage;
    /**
     * Type guard to check if an object is a request message sent to a worker.
     */
    function isResponseMessage(message) {
        return (message &&
            typeof message.service === "string" &&
            typeof message.type === "string" &&
            message.type === ServiceMessageName.Response);
    }
    WorkerServiceProtocol.isResponseMessage = isResponseMessage;
})(WorkerServiceProtocol = exports.WorkerServiceProtocol || (exports.WorkerServiceProtocol = {}));


/***/ }),

/***/ "../harp-datasource-protocol/lib/WorkerTilerProtocol.ts":
/*!**************************************************************!*\
  !*** ../harp-datasource-protocol/lib/WorkerTilerProtocol.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Communication protocol with [[ITiler]].
 */
var WorkerTilerProtocol;
(function (WorkerTilerProtocol) {
    /**
     * Define possible names of requests called on tiler services within `WebWorker`.
     */
    let Requests;
    (function (Requests) {
        Requests["RegisterIndex"] = "register-index";
        Requests["UpdateIndex"] = "update-index";
        Requests["TileRequest"] = "tile-request";
    })(Requests = WorkerTilerProtocol.Requests || (WorkerTilerProtocol.Requests = {}));
    /**
     * Type guard to check if an object is an index registration request sent to a worker.
     */
    function isRegisterIndexRequest(message) {
        return (message && typeof message.type === "string" && message.type === Requests.RegisterIndex);
    }
    WorkerTilerProtocol.isRegisterIndexRequest = isRegisterIndexRequest;
    /**
     * Type guard to check if an object is an update request for the index registration.
     */
    function isUpdateIndexRequest(message) {
        return message && typeof message.type === "string" && message.type === Requests.UpdateIndex;
    }
    WorkerTilerProtocol.isUpdateIndexRequest = isUpdateIndexRequest;
    /**
     * Type guard to check if an object is a tile request sent to a worker.
     */
    function isTileRequest(message) {
        return message && typeof message.type === "string" && message.type === Requests.TileRequest;
    }
    WorkerTilerProtocol.isTileRequest = isTileRequest;
})(WorkerTilerProtocol = exports.WorkerTilerProtocol || (exports.WorkerTilerProtocol = {}));


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/ArrayOperators.ts":
/*!*******************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/ArrayOperators.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const operators = {
    at: {
        call: (context, call) => {
            const args = call.args;
            const index = context.evaluate(args[0]);
            if (typeof index !== "number") {
                throw new Error(`expected the index of the element to retrieve`);
            }
            const value = context.evaluate(args[1]);
            if (!Array.isArray(value)) {
                throw new Error(`expected an array`);
            }
            return index >= 0 && index < value.length ? value[index] : null;
        }
    }
};
exports.ArrayOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/CastOperators.ts":
/*!******************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/CastOperators.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const operators = {
    "to-boolean": {
        call: (context, call) => {
            return Boolean(context.evaluate(call.args[0]));
        }
    },
    "to-string": {
        call: (context, call) => {
            return String(context.evaluate(call.args[0]));
        }
    },
    "to-number": {
        call: (context, call) => {
            for (const arg of call.args) {
                const value = Number(context.evaluate(arg));
                if (!isNaN(value)) {
                    return value;
                }
            }
            throw new Error("cannot convert the value to a number");
        }
    }
};
exports.CastOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/ColorOperators.ts":
/*!*******************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/ColorOperators.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __webpack_require__(/*! three */ "three");
const ColorUtils_1 = __webpack_require__(/*! ../ColorUtils */ "../harp-datasource-protocol/lib/ColorUtils.ts");
const StringEncodedNumeral_1 = __webpack_require__(/*! ../StringEncodedNumeral */ "../harp-datasource-protocol/lib/StringEncodedNumeral.ts");
const operators = {
    alpha: {
        call: (context, call) => {
            let color = context.evaluate(call.args[0]);
            if (typeof color === "string") {
                color = StringEncodedNumeral_1.parseStringEncodedColor(color);
            }
            const alpha = typeof color === "number" ? ColorUtils_1.ColorUtils.getAlphaFromHex(color) : 1;
            return alpha;
        }
    },
    rgba: {
        call: (context, call) => {
            const r = context.evaluate(call.args[0]);
            const g = context.evaluate(call.args[1]);
            const b = context.evaluate(call.args[2]);
            const a = context.evaluate(call.args[3]);
            if (typeof r === "number" &&
                typeof g === "number" &&
                typeof b === "number" &&
                typeof a === "number" &&
                r >= 0 &&
                g >= 0 &&
                b >= 0 &&
                a >= 0 &&
                a <= 1) {
                return rgbaToHex(r, g, b, a);
            }
            throw new Error(`unknown color 'rgba(${r},${g},${b},${a})'`);
        }
    },
    rgb: {
        call: (context, call) => {
            const r = context.evaluate(call.args[0]);
            const g = context.evaluate(call.args[1]);
            const b = context.evaluate(call.args[2]);
            if (typeof r === "number" &&
                typeof g === "number" &&
                typeof b === "number" &&
                r >= 0 &&
                g >= 0 &&
                b >= 0) {
                return rgbToHex(r, g, b);
            }
            throw new Error(`unknown color 'rgb(${r},${g},${b})'`);
        }
    },
    // Hsl operator contains angle modulated to <0, 360> range, percent of
    // saturation and lightness in <0, 100> range, i.e. hsl(360, 100, 100)
    hsl: {
        call: (context, call) => {
            const h = context.evaluate(call.args[0]);
            const s = context.evaluate(call.args[1]);
            const l = context.evaluate(call.args[2]);
            if (typeof h === "number" &&
                typeof s === "number" &&
                typeof l === "number" &&
                h >= 0 &&
                s >= 0 &&
                l >= 0) {
                return hslToHex(h, s, l);
            }
            throw new Error(`unknown color 'hsl(${h},${s}%,${l}%)'`);
        }
    }
};
function rgbaToHex(r, g, b, a) {
    // We decode rgba color channels using custom hex format with transparency.
    return ColorUtils_1.ColorUtils.getHexFromRgba(THREE.Math.clamp(r, 0, 255) / 255, THREE.Math.clamp(g, 0, 255) / 255, THREE.Math.clamp(b, 0, 255) / 255, THREE.Math.clamp(a, 0, 1));
}
function rgbToHex(r, g, b) {
    return ColorUtils_1.ColorUtils.getHexFromRgb(THREE.Math.clamp(r, 0, 255) / 255, THREE.Math.clamp(g, 0, 255) / 255, THREE.Math.clamp(b, 0, 255) / 255);
}
function hslToHex(h, s, l) {
    return ColorUtils_1.ColorUtils.getHexFromHsl(THREE.Math.euclideanModulo(h, 360) / 360, THREE.Math.clamp(s, 0, 100) / 100, THREE.Math.clamp(l, 0, 100) / 100);
}
exports.ColorOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/ComparisonOperators.ts":
/*!************************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/ComparisonOperators.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
function compare(context, call, strict = false) {
    const left = context.evaluate(call.args[0]);
    const right = context.evaluate(call.args[1]);
    if (!((typeof left === "number" && typeof right === "number") ||
        (typeof left === "string" && typeof right === "string"))) {
        if (strict) {
            throw new Error(`invalid operands '${left}' and '${right}' for operator '${call.op}'`);
        }
    }
    switch (call.op) {
        case "<":
            return left < right;
        case ">":
            return left > right;
        case "<=":
            return left <= right;
        case ">=":
            return left >= right;
        default:
            throw new Error(`invalid comparison operator '${call.op}'`);
    }
}
const operators = {
    "!": {
        call: (context, call) => {
            return !context.evaluate(call.args[0]);
        }
    },
    "==": {
        call: (context, call) => {
            const left = context.evaluate(call.args[0]);
            const right = context.evaluate(call.args[1]);
            return left === right;
        }
    },
    "!=": {
        call: (context, call) => {
            const left = context.evaluate(call.args[0]);
            const right = context.evaluate(call.args[1]);
            return left !== right;
        }
    },
    "<": { call: (context, call) => compare(context, call) },
    ">": { call: (context, call) => compare(context, call) },
    "<=": { call: (context, call) => compare(context, call) },
    ">=": { call: (context, call) => compare(context, call) }
};
exports.ComparisonOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/FeatureOperators.ts":
/*!*********************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/FeatureOperators.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const operators = {
    "geometry-type": {
        call: (context, call) => {
            const geometryType = context.env.lookup("$geometryType");
            switch (geometryType) {
                case "point":
                    return "Point";
                case "line":
                    return "LineString";
                case "polygon":
                    return "Polygon";
                default:
                    return null;
            }
        }
    }
};
exports.FeatureOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/FlowOperators.ts":
/*!******************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/FlowOperators.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
function conditionalCast(context, type, args) {
    switch (type) {
        case "boolean":
        case "number":
        case "string":
            for (const childExpr of args) {
                const value = context.evaluate(childExpr);
                if (typeof value === type) {
                    return value;
                }
            }
            throw new Error(`expected a '${type}'`);
        default:
            throw new Error(`invalid type '${type}'`);
    } // switch
}
const operators = {
    all: {
        call: (context, call) => {
            for (const childExpr of call.args) {
                if (!context.evaluate(childExpr)) {
                    return false;
                }
            }
            return true;
        }
    },
    any: {
        call: (context, call) => {
            for (const childExpr of call.args) {
                if (context.evaluate(childExpr)) {
                    return true;
                }
            }
            return false;
        }
    },
    none: {
        call: (context, call) => {
            for (const childExpr of call.args) {
                if (context.evaluate(childExpr)) {
                    return false;
                }
            }
            return true;
        }
    },
    boolean: {
        call: (context, call) => {
            return conditionalCast(context, "boolean", call.args);
        }
    },
    number: {
        call: (context, call) => {
            return conditionalCast(context, "number", call.args);
        }
    },
    string: {
        call: (context, call) => {
            return conditionalCast(context, "string", call.args);
        }
    }
};
exports.FlowOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/InterpolationOperators.ts":
/*!***************************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/InterpolationOperators.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Expr_1 = __webpack_require__(/*! ../Expr */ "../harp-datasource-protocol/lib/Expr.ts");
const InterpolatedProperty_1 = __webpack_require__(/*! ../InterpolatedProperty */ "../harp-datasource-protocol/lib/InterpolatedProperty.ts");
/**
 * Evaluates the given piecewise function.
 */
function step(context, call) {
    const { args } = call;
    const value = context.evaluate(args[0]);
    if (value === null) {
        // returns the default value of step.
        return context.evaluate(args[1]);
    }
    if (typeof value !== "number") {
        throw new Error(`the input of a 'step' operator must have type 'number'`);
    }
    let first = 1;
    let last = args.length / 2 - 1;
    while (first < last) {
        // tslint:disable-next-line: no-bitwise
        const mid = (first + last) >>> 1;
        const stop = args[mid * 2].value;
        if (value < stop) {
            last = mid - 1;
        }
        else if (value > stop) {
            first = mid + 1;
        }
        else {
            last = mid;
        }
    }
    const result = args[first * 2];
    if (!(result instanceof Expr_1.NumberLiteralExpr)) {
        throw new Error("expected a numeric literal");
    }
    const index = result.value <= value ? first : first - 1;
    return context.evaluate(args[index * 2 + 1]);
}
/**
 * Prepare and validate the "interpolate" call.
 *
 * @param call An [[Expr]] representing an "interpolate" call.
 * @hidden
 */
function prepareInterpolateCallExpr(call) {
    if (call._interpolatedProperty || call._mode !== undefined) {
        return;
    }
    const interpolatorType = call.args[0];
    if (!(interpolatorType instanceof Expr_1.CallExpr)) {
        throw new Error("expected an interpolation type");
    }
    let mode;
    let exponent;
    if (interpolatorType.op === "linear") {
        mode = "Linear";
    }
    else if (interpolatorType.op === "discrete") {
        mode = "Discrete";
    }
    else if (interpolatorType.op === "cubic") {
        mode = "Cubic";
    }
    else if (interpolatorType.op === "exponential") {
        mode = "Exponential";
        const base = interpolatorType.args[0];
        if (!(base instanceof Expr_1.NumberLiteralExpr)) {
            throw new Error("expected the base of the exponential interpolation");
        }
        exponent = base.value;
    }
    else {
        throw new Error("unrecognized interpolation type");
    }
    const input = call.args[1];
    if (!(input instanceof Expr_1.CallExpr)) {
        throw new Error("expected the input of the interpolation");
    }
    if (input.op !== "zoom") {
        throw new Error("only 'zoom' is supported");
    }
    if (call.args.length === 2 || call.args.length % 2) {
        throw new Error("invalid number of samples");
    }
    const stops = [];
    const values = [];
    let isConstantInterpolation = true;
    for (let i = 2; i < call.args.length; i += 2) {
        const stop = call.args[i];
        if (!(stop instanceof Expr_1.NumberLiteralExpr)) {
            throw new Error("expected a numeric literal");
        }
        if (stops.length > 0 && stop.value === stops[stops.length - 1]) {
            stops[stops.length - 1] = stop.value - 0.0000001;
        }
        stops.push(stop.value);
        if (isConstantInterpolation) {
            const value = call.args[i + 1];
            if (value instanceof Expr_1.LiteralExpr) {
                values.push(value.value);
            }
            else {
                isConstantInterpolation = false;
            }
        }
    }
    if (isConstantInterpolation) {
        const result = InterpolatedProperty_1.createInterpolatedProperty({
            interpolation: mode,
            exponent,
            zoomLevels: stops,
            values
        });
        if (!result) {
            throw new Error("failed to create interpolation");
        }
        call._interpolatedProperty = result;
    }
    else {
        call._mode = mode;
        call._exponent = exponent;
        call._stops = stops;
    }
}
/**
 * Classify the given `step` call.
 *
 * This function checks the input of the `step` and ensures that the stops
 * are literals.
 *
 * @param call A call to `["step", ...]`.
 * @hidden
 */
function classifyStepCallExpr(call) {
    if (call._inputIsZoom !== undefined) {
        // nothing to do, the `call` was already classified.
        return;
    }
    if (call.args[0] === undefined) {
        throw new Error("expected the input of the 'step' operator");
    }
    if (call.args.length < 3 || call.args.length % 2) {
        throw new Error("not enough arguments");
    }
    const input = call.args[0];
    // tslint:disable-next-line: prefer-conditional-expression
    if (input instanceof Expr_1.CallExpr && input.op === "zoom") {
        call._inputIsZoom = true;
    }
    else {
        call._inputIsZoom = false;
    }
    // check that the stops are literals.
    for (let i = 2; i < call.args.length; i += 2) {
        const stop = call.args[i];
        if (!(stop instanceof Expr_1.NumberLiteralExpr)) {
            throw new Error("expected a numeric literal");
        }
    }
}
/**
 * Prepares the given call for the dynamic exception.
 * This method collects the stops and
 *
 * @param call A call to `["step", ...]`.
 * @hidden
 */
function prepareStepCallExpr(call) {
    if (call._stops || call._interpolatedProperty) {
        // nothing to do, the `call` was already prepared for execution.
        return;
    }
    // collect the stops of the step call.
    const stops = [Number.MIN_SAFE_INTEGER];
    for (let i = 2; i < call.args.length; i += 2) {
        const stop = call.args[i];
        stops.push(stop.value);
    }
    // collect the values of the step call.
    const values = [];
    let hasConstantValues = true;
    for (let i = 1; hasConstantValues && i < call.args.length; i += 2) {
        const literal = call.args[i];
        if (literal instanceof Expr_1.LiteralExpr) {
            values.push(literal.value);
        }
        else {
            hasConstantValues = false;
        }
    }
    if (hasConstantValues) {
        // all the values of this zoom-based `step` are constant,
        // create an interpolated property and store it together
        // with the call.
        const interpolatedProperty = InterpolatedProperty_1.createInterpolatedProperty({
            interpolation: "Discrete",
            zoomLevels: stops,
            values
        });
        if (interpolatedProperty === undefined) {
            throw new Error("failed to create interpolator");
        }
        call._interpolatedProperty = interpolatedProperty;
    }
    else {
        // the values the `["step"]` call are not constants,
        // cache the `zoomLevels` to avoid recreating input `Array`
        // when instantiating a new [[InterpolatedProperty]].
        call._stops = stops;
    }
}
const operators = {
    interpolate: {
        isDynamicOperator: (call) => {
            return call.args[1] && call.args[1].isDynamic();
        },
        call: (context, call) => {
            prepareInterpolateCallExpr(call);
            if (context.scope !== Expr_1.ExprScope.Dynamic) {
                return call;
            }
            let interpolatedProperty = call._interpolatedProperty;
            if (!interpolatedProperty) {
                const values = [];
                for (let i = 2; i < call.args.length; i += 2) {
                    const value = context.evaluate(call.args[i + 1]);
                    values.push(value);
                }
                interpolatedProperty = InterpolatedProperty_1.createInterpolatedProperty({
                    interpolation: call._mode,
                    exponent: call._exponent,
                    zoomLevels: call._stops,
                    values
                });
                if (interpolatedProperty === undefined) {
                    throw new Error("failed to create interpolator");
                }
            }
            return InterpolatedProperty_1.evaluateInterpolatedProperty(interpolatedProperty, context.env);
        }
    },
    step: {
        isDynamicOperator: (call) => {
            return call.args[0] && call.args[0].isDynamic();
        },
        call: (context, call) => {
            classifyStepCallExpr(call);
            if (context.scope === Expr_1.ExprScope.Value) {
                return call;
            }
            if (context.scope === Expr_1.ExprScope.Condition || call._inputIsZoom === false) {
                return step(context, call);
            }
            prepareStepCallExpr(call);
            let interpolatedProperty = call._interpolatedProperty;
            if (!interpolatedProperty) {
                // the values of the interpolation are not literals,
                // evaluate the sub expressions and combine them
                // with the constant stops computed when preparing this call.
                const values = [];
                for (let i = 1; i < call.args.length; i += 2) {
                    const value = context.evaluate(call.args[i]);
                    values.push(value);
                }
                interpolatedProperty = InterpolatedProperty_1.createInterpolatedProperty({
                    interpolation: "Discrete",
                    zoomLevels: call._stops,
                    values
                });
                if (interpolatedProperty === undefined) {
                    throw new Error("failed to create interpolator");
                }
            }
            return InterpolatedProperty_1.evaluateInterpolatedProperty(interpolatedProperty, context.env);
        }
    }
};
exports.InterpolationOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/MapOperators.ts":
/*!*****************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/MapOperators.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Expr_1 = __webpack_require__(/*! ../Expr */ "../harp-datasource-protocol/lib/Expr.ts");
const operators = {
    "ppi-scale": {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            const scaleFactor = call.args[1] ? context.evaluate(call.args[1]) : 1;
            return value * scaleFactor;
        }
    },
    "world-ppi-scale": {
        isDynamicOperator: () => {
            return true;
        },
        call: (context, call) => {
            const pixels = context.evaluate(call.args[0]);
            const scaleFactor = call.args[1] ? context.evaluate(call.args[1]) : 1;
            const zoom = context.env.lookup("$zoom");
            const zoomWidth = Math.pow(2, 17) / Math.pow(2, zoom);
            const v = pixels * zoomWidth * scaleFactor;
            return v;
        }
    },
    "world-discrete-ppi-scale": {
        isDynamicOperator: () => {
            return true;
        },
        call: (context, call) => {
            const pixels = context.evaluate(call.args[0]);
            const scaleFactor = call.args[1] ? context.evaluate(call.args[1]) : 1;
            const zoom = context.env.lookup("$zoom");
            const zoomWidthDiscrete = Math.pow(2, 17.8) / Math.pow(2, Math.floor(zoom));
            const v = pixels * zoomWidthDiscrete * scaleFactor;
            return v;
        }
    },
    ppi: {
        call: (context) => {
            const ppi = context.env.lookup("$ppi");
            if (typeof ppi === "number") {
                return ppi;
            }
            return 72;
        }
    },
    zoom: {
        isDynamicOperator: () => {
            return true;
        },
        call: (context) => {
            if (context.scope === Expr_1.ExprScope.Condition) {
                const zoom = context.env.lookup("$zoom");
                if (zoom !== undefined) {
                    return zoom;
                }
                throw new Error("failed to get the zoom level.");
            }
            // direct usages of 'zoom' outside technique filter conditions
            // and interpolations are not allowed.
            throw new Error("invalid usage of the 'zoom' operator.");
        }
    }
};
exports.MapOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/MathOperators.ts":
/*!******************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/MathOperators.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __webpack_require__(/*! three */ "three");
const operators = {
    "^": {
        call: (context, call) => {
            const a = context.evaluate(call.args[0]);
            const b = context.evaluate(call.args[1]);
            if (typeof a !== "number" || typeof b !== "number") {
                // tslint:disable-next-line: max-line-length
                throw new Error(`invalid operands '${typeof a}' and '${typeof b}' for operator '^'`);
            }
            return Math.pow(a, b);
        }
    },
    "-": {
        call: (context, call) => {
            if (call.args.length === 1) {
                const value = context.evaluate(call.args[0]);
                if (typeof value !== "number") {
                    throw new Error(`ìnvalid operand '${typeof value} for operator '-'`);
                }
                return -value;
            }
            const a = context.evaluate(call.args[0]);
            const b = context.evaluate(call.args[1]);
            if (typeof a !== "number" || typeof b !== "number") {
                throw new Error(`invalid operands '${typeof a}' and '${typeof b}' for operator '-'`);
            }
            return a - b;
        }
    },
    "/": {
        call: (context, call) => {
            const a = context.evaluate(call.args[0]);
            const b = context.evaluate(call.args[1]);
            if (typeof a !== "number" || typeof b !== "number") {
                // tslint:disable-next-line: max-line-length
                throw new Error(`invalid operands '${typeof a}' and '${typeof b}' for operator '/'`);
            }
            return a / b;
        }
    },
    "%": {
        call: (context, call) => {
            const a = context.evaluate(call.args[0]);
            const b = context.evaluate(call.args[1]);
            if (typeof a !== "number" || typeof b !== "number") {
                // tslint:disable-next-line: max-line-length
                throw new Error(`invalid operands '${typeof a}' and '${typeof b}' for operator '%'`);
            }
            return a % b;
        }
    },
    "+": {
        call: (context, call) => {
            return call.args.reduce((a, b) => Number(a) + Number(context.evaluate(b)), 0);
        }
    },
    "*": {
        call: (context, call) => {
            return call.args.reduce((a, b) => Number(a) * Number(context.evaluate(b)), 1);
        }
    },
    abs: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'abs'`);
            }
            return Math.abs(value);
        }
    },
    acos: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'acos'`);
            }
            return Math.acos(value);
        }
    },
    asin: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'asin'`);
            }
            return Math.asin(value);
        }
    },
    atan: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'atan'`);
            }
            return Math.atan(value);
        }
    },
    ceil: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'ceil'`);
            }
            return Math.ceil(value);
        }
    },
    cos: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'cos'`);
            }
            return Math.cos(value);
        }
    },
    e: {
        call: () => {
            return Math.E;
        }
    },
    floor: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'floor'`);
            }
            return Math.floor(value);
        }
    },
    ln: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'ln'`);
            }
            return Math.log(value);
        }
    },
    ln2: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'ln2'`);
            }
            return Math.log2(value);
        }
    },
    log10: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'log10'`);
            }
            return Math.log10(value);
        }
    },
    max: {
        call: (context, call) => {
            return Math.max(...call.args.map(v => Number(context.evaluate(v))));
        }
    },
    min: {
        call: (context, call) => {
            return Math.min(...call.args.map(v => Number(context.evaluate(v))));
        }
    },
    /**
     * Clamp numeric value to given range, inclusive.
     *
     * Synopsis:
     * ```
     * ["clamp", v: number, min: number, max: number]`
     * ```
     */
    clamp: {
        call: (context, call) => {
            const v = context.evaluate(call.args[0]);
            const min = context.evaluate(call.args[1]);
            const max = context.evaluate(call.args[2]);
            if (typeof v !== "number" || typeof min !== "number" || typeof max !== "number") {
                throw new Error(`invalid operands '${v}', ${min}, ${max} for operator 'clamp'`);
            }
            return THREE.Math.clamp(v, min, max);
        }
    },
    pi: {
        call: () => {
            return Math.PI;
        }
    },
    round: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'round'`);
            }
            return Math.round(value);
        }
    },
    sin: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'sin'`);
            }
            return Math.sin(value);
        }
    },
    sqrt: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'sqrt'`);
            }
            return Math.sqrt(value);
        }
    },
    tan: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (typeof value !== "number") {
                throw new Error(`invalid operand '${value}' for operator 'tan'`);
            }
            return Math.tan(value);
        }
    }
};
exports.MathOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/MiscOperators.ts":
/*!******************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/MiscOperators.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const operators = {
    length: {
        call: (context, call) => {
            const value = context.evaluate(call.args[0]);
            if (Array.isArray(value) || typeof value === "string") {
                return value.length;
            }
            throw new Error(`invalid operand '${value}' for operator 'length'`);
        }
    },
    coalesce: {
        call: (context, call) => {
            for (const childExpr of call.args) {
                const value = context.evaluate(childExpr);
                if (value !== null) {
                    return value;
                }
            }
            return null;
        }
    }
};
exports.MiscOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/ObjectOperators.ts":
/*!********************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/ObjectOperators.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const hasOwnProperty = Object.prototype.hasOwnProperty;
var LookupMode;
(function (LookupMode) {
    LookupMode[LookupMode["get"] = 0] = "get";
    LookupMode[LookupMode["has"] = 1] = "has";
})(LookupMode || (LookupMode = {}));
function lookupMember(context, args, lookupMode) {
    const memberName = context.evaluate(args[0]);
    if (typeof memberName !== "string") {
        throw new Error(`expected the name of an attribute`);
    }
    const object = context.evaluate(args[1]);
    if (object && typeof object === "object" && hasOwnProperty.call(object, memberName)) {
        return lookupMode === LookupMode.get ? object[memberName] : true;
    }
    return lookupMode === LookupMode.get ? null : false;
}
const operators = {
    get: {
        call: (context, call) => lookupMember(context, call.args, LookupMode.get)
    },
    has: {
        call: (context, call) => lookupMember(context, call.args, LookupMode.has)
    }
};
exports.ObjectOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/StringOperators.ts":
/*!********************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/StringOperators.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const operators = {
    concat: {
        call: (context, call) => {
            return "".concat(...call.args.map(a => String(context.evaluate(a))));
        }
    },
    downcase: {
        call: (context, call) => {
            return String(context.evaluate(call.args[0])).toLocaleLowerCase();
        }
    },
    upcase: {
        call: (context, call) => {
            return String(context.evaluate(call.args[0])).toLocaleUpperCase();
        }
    },
    "~=": {
        call: (context, call) => {
            const left = context.evaluate(call.args[0]);
            const right = context.evaluate(call.args[1]);
            if (typeof left === "string" && typeof right === "string") {
                return left.indexOf(right) !== -1;
            }
            return false;
        }
    },
    "^=": {
        call: (context, call) => {
            const left = context.evaluate(call.args[0]);
            const right = context.evaluate(call.args[1]);
            if (typeof left === "string" && typeof right === "string") {
                return left.startsWith(right);
            }
            return false;
        }
    },
    "$=": {
        call: (context, call) => {
            const left = context.evaluate(call.args[0]);
            const right = context.evaluate(call.args[1]);
            if (typeof left === "string" && typeof right === "string") {
                return left.endsWith(right);
            }
            return false;
        }
    }
};
exports.StringOperators = operators;


/***/ }),

/***/ "../harp-datasource-protocol/lib/operators/TypeOperators.ts":
/*!******************************************************************!*\
  !*** ../harp-datasource-protocol/lib/operators/TypeOperators.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const operators = {
    typeof: {
        call: (context, call) => {
            return typeof context.evaluate(call.args[0]);
        }
    }
};
exports.TypeOperators = operators;


/***/ }),

/***/ "../harp-geojson-datasource/index-worker.ts":
/*!**************************************************!*\
  !*** ../harp-geojson-datasource/index-worker.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./lib/GeoJsonDecoder */ "../harp-geojson-datasource/lib/GeoJsonDecoder.ts"));


/***/ }),

/***/ "../harp-geojson-datasource/lib/GeoJsonDecoder.ts":
/*!********************************************************!*\
  !*** ../harp-geojson-datasource/lib/GeoJsonDecoder.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const index_worker_1 = __webpack_require__(/*! @here/harp-mapview-decoder/index-worker */ "../harp-mapview-decoder/index-worker.ts");
const TileDecoderService_1 = __webpack_require__(/*! @here/harp-mapview-decoder/lib/TileDecoderService */ "../harp-mapview-decoder/lib/TileDecoderService.ts");
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const GeoJsonGeometryCreator_1 = __webpack_require__(/*! ./GeoJsonGeometryCreator */ "../harp-geojson-datasource/lib/GeoJsonGeometryCreator.ts");
const logger = harp_utils_1.LoggerManager.instance.create("GeoJsonDecoder");
/**
 * `GeoJsonTileDecoder` is used to decode GeoJSON data and create geometries with additional
 * properties ready for use by [[GeoJsonTile]]. In case a custom styling is present in the GeoJSON
 * data, additional techniques will be created. Each decoded GeoJSON feature is represented as a
 * `Point`, a `Line` or a `Polygon`.
 *
 * The following techniques used for that:
 * <br/>
 * Point: `point` (THREE.PointsMaterial)
 * <br/>
 * Line: `solid-line` (SolidLineMaterial),
 * `segments` (THREE.LineBasicMaterial) - invisible lines for raycasting)
 * <br/>
 * Polygon: `polygon` (THREE.MeshBasicMaterial),
 * `segments` (THREE.LineBasicMaterial) - lines for styling polygon edges
 *
 * To improve performance, objects of the same type and technique are merged into the same geometry.
 */
class GeoJsonTileDecoder extends index_worker_1.ThemedTileDecoder {
    /**
     * Builds a `GeoJsonTileDecoder`.
     */
    constructor() {
        super();
    }
    /**
     *
     *@override
     */
    connect() {
        return Promise.resolve();
    }
    /**
     * Read the data contained in the `data` parameter and returns a [[DecodedTile]].
     *
     * @param data The [[GeoJsonDataType]] containing all the features to be processed.
     * @param tileKey The [[TileKey]] that identifies the tile.
     * @param styleSetEvaluator The [[StyleSetEvaluator]] that reads the style and apply it to the
     *      meshes.
     * @param projection The current camera projection.
     * @override
     */
    decodeThemedTile(data, tileKey, styleSetEvaluator, projection) {
        const decoder = new GeoJsonDecoder(projection, styleSetEvaluator);
        const decodedTile = decoder.getDecodedTile(tileKey, data);
        return Promise.resolve(decodedTile);
    }
}
exports.GeoJsonTileDecoder = GeoJsonTileDecoder;
/**
 * Decoder for the [[GeoJsonDataSource]].
 */
class GeoJsonDecoder {
    /**
     * Default constructor.
     *
     * @param m_projection MapView projection
     * @param m_styleSetEvaluator theme evaluator
     */
    constructor(m_projection, m_styleSetEvaluator) {
        this.m_projection = m_projection;
        this.m_styleSetEvaluator = m_styleSetEvaluator;
        this.m_storeExtendedTags = true;
    }
    /**
     * Returns a `DecodedTile` with geometries ([[GeoJsonGeometry]]) and techniques.
     *
     * @returns decoded tile
     */
    getDecodedTile(tileKey, data) {
        const center = this.getTileCenter(tileKey);
        const tileInfo = new harp_datasource_protocol_1.ExtendedTileInfo(tileKey, this.m_storeExtendedTags);
        const tileInfoWriter = new harp_datasource_protocol_1.ExtendedTileInfoWriter(tileInfo, this.m_storeExtendedTags);
        this.m_styleSetEvaluator.resetTechniques();
        const extendedTile = {
            info: tileInfo,
            writer: tileInfoWriter
        };
        const geometries = GeoJsonGeometryCreator_1.GeoJsonGeometryCreator.createGeometries(data, center, this.m_projection, this.m_styleSetEvaluator, extendedTile);
        const tile = {
            geometries: geometries.geometries,
            techniques: this.m_styleSetEvaluator.techniques,
            tileInfo: this.getTileInfo(extendedTile)
        };
        if (geometries.poiGeometries.length > 0) {
            tile.poiGeometries = geometries.poiGeometries;
        }
        if (geometries.textGeometries.length > 0) {
            tile.textGeometries = geometries.textGeometries;
        }
        if (geometries.textPathGeometries.length > 0) {
            tile.textPathGeometries = geometries.textPathGeometries;
        }
        // HARP-7419: TODO, support tile.pathGeometries, not currently needed, but may be needed
        // in future.
        return tile;
    }
    getTileCenter(tileKey) {
        const geoBox = harp_geoutils_1.webMercatorTilingScheme.getGeoBox(tileKey);
        const tileBounds = this.m_projection.projectBox(geoBox, new harp_geoutils_1.OrientedBox3());
        return tileBounds.position;
    }
    getTileInfo(extendedTile) {
        extendedTile.writer.finish();
        return extendedTile.info;
    }
}
/**
 * GeoJson tile decoder service.
 */
class GeoJsonTileDecoderService {
    /**
     * Register GeoJson tile decoder service based on [[GeoJsonTileDecoder]] service class in
     * [[WorkerServiceManager]].
     */
    static start() {
        index_worker_1.WorkerServiceManager.getInstance().register({
            serviceType: "geojson-tile-decoder",
            factory: (serviceId) => TileDecoderService_1.TileDecoderService.start(serviceId, new GeoJsonTileDecoder())
        });
    }
}
exports.GeoJsonTileDecoderService = GeoJsonTileDecoderService;
/**
 * Starts a GeoJson decoder service.
 *
 * @deprecated Please use [[GeoJsonTileDecoderService.start]].
 */
class GeoJsonWorkerClient {
    // TODO(HARP-3651): remove this class when clients are ready
    constructor() {
        logger.warn("GeoJsonWorkerClient class is deprecated, please use GeoJsonTileDecoderService.start");
        GeoJsonTileDecoderService.start();
    }
}
exports.GeoJsonWorkerClient = GeoJsonWorkerClient;


/***/ }),

/***/ "../harp-geojson-datasource/lib/GeoJsonGeometryCreator.ts":
/*!****************************************************************!*\
  !*** ../harp-geojson-datasource/lib/GeoJsonGeometryCreator.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const Lines_1 = __webpack_require__(/*! @here/harp-lines/lib/Lines */ "../harp-lines/lib/Lines.ts");
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const earcut_1 = __webpack_require__(/*! earcut */ "../../node_modules/earcut/src/earcut.js");
const THREE = __webpack_require__(/*! three */ "three");
const GeoJsonParser_1 = __webpack_require__(/*! ./GeoJsonParser */ "../harp-geojson-datasource/lib/GeoJsonParser.ts");
/**
 * Store temporary variables needed for the creation of a mesh.
 */
class MeshBuffer {
    constructor() {
        this.positions = [];
        this.indices = [];
        this.groups = [];
        this.outlineIndices = [];
        this.edgeIndices = [];
        /**
         * Optional list of feature start indices. The indices point into the index attribute.
         */
        this.featureStarts = [];
        /**
         * Optional object containing the geojson properties defined by the end-user.
         */
        this.geojsonProperties = [];
    }
}
/**
 * Bears the code creating the [[Tile]] geometries from a GeoJson.
 */
class GeoJsonGeometryCreator {
    /**
     * The method to call to create geometries from a GeoJson.
     *
     * @param geojson The GeoJson data.
     * @param center The center of the tile.
     * @param projection The projection in use.
     * @param styleSetEvaluator The evaluator of the current [[GeoJsonDataSource]].
     * @param extendedTile Tile information.
     */
    static createGeometries(geojson, center, projection, styleSetEvaluator, extendedTile) {
        const buffers = {
            geometryBuffer: new Map(),
            textGeometryBuffer: new Map(),
            textPathGeometryBuffer: new Map(),
            poiGeometryBuffer: new Map()
        };
        GeoJsonParser_1.GeoJsonParser.processGeoJson(geojson, extendedTile, center, projection, styleSetEvaluator, buffers);
        const geometries = {
            geometries: [],
            poiGeometries: [],
            textGeometries: [],
            textPathGeometries: []
        };
        const tileWorldBounds = new THREE.Box3();
        const geoBox = harp_geoutils_1.webMercatorTilingScheme.getGeoBox(extendedTile.info.tileKey);
        const tileBounds = projection.projectBox(geoBox, tileWorldBounds);
        const tileCenter = new THREE.Vector3();
        tileBounds.getCenter(tileCenter);
        const tileWorldExtents = tileWorldBounds.max.sub(tileCenter).x;
        buffers.geometryBuffer.forEach((geometryData, techniqueIndex) => {
            switch (geometryData.type) {
                case "point":
                    geometries.geometries.push(this.createPointGeometry(geometryData, techniqueIndex));
                    break;
                case "solid-line":
                case "dashed-line":
                    geometries.geometries.push(this.createSolidLineGeometry(geometryData, techniqueIndex, projection));
                    break;
                case "polygon":
                    geometries.geometries.push(this.createPolygonGeometry(geometryData, techniqueIndex));
                    break;
                case "outline":
                    geometries.geometries.push(this.createPolygonOutlineGeometry(geometryData, techniqueIndex, tileWorldExtents, projection));
                    break;
                case "segments":
                    geometries.geometries.push(this.createSegmentsGeometry(geometryData, techniqueIndex));
                    break;
            }
        });
        buffers.poiGeometryBuffer.forEach((geometryData, techniqueIndex) => {
            geometries.poiGeometries.push(this.createPoiGeometry(geometryData, techniqueIndex));
        });
        buffers.textGeometryBuffer.forEach((geometryData, techniqueIndex) => {
            geometries.textGeometries.push(this.createTextGeometry(geometryData, techniqueIndex));
        });
        buffers.textPathGeometryBuffer.forEach((geometryData, techniqueIndex) => {
            this.createTextPathGeometries(geometryData, techniqueIndex, geometries);
        });
        return geometries;
    }
    static createPoiGeometry(geometryData, techniqueIndex) {
        return {
            positions: {
                name: "position",
                type: "float",
                itemCount: 3,
                buffer: new Float32Array(geometryData.points.vertices).buffer
            },
            technique: techniqueIndex,
            texts: [0],
            objInfos: geometryData.points.geojsonProperties
        };
    }
    static createTextGeometry(geometryData, techniqueIndex) {
        const labelProperty = geometryData.labelProperty;
        const stringCatalog = geometryData.points.geojsonProperties.map((properties) => {
            return properties[labelProperty].toString();
        });
        return {
            positions: {
                name: "position",
                type: "float",
                itemCount: 3,
                buffer: new Float32Array(geometryData.points.vertices).buffer
            },
            technique: techniqueIndex,
            texts: [0],
            stringCatalog,
            objInfos: geometryData.points.geojsonProperties
        };
    }
    static createTextPathGeometries(geometryData, techniqueIndex, geometries) {
        for (let i = 0; i < geometryData.lines.vertices.length; i++) {
            const pathVertex = geometryData.lines.vertices[i];
            const path = [];
            path.push(...pathVertex);
            const pathLengthSqr = harp_utils_1.Math2D.computeSquaredLineLength(path);
            const properties = geometryData.lines.geojsonProperties[i];
            const text = properties[geometryData.labelProperty].toString();
            const geometry = {
                technique: techniqueIndex,
                path,
                pathLengthSqr,
                text,
                objInfos: properties
            };
            geometries.textPathGeometries.push(geometry);
        }
    }
    static createPointGeometry(geometryData, techniqueIndex) {
        return {
            type: harp_datasource_protocol_1.GeometryType.Point,
            vertexAttributes: [
                {
                    name: "position",
                    buffer: new Float32Array(geometryData.points.vertices).buffer,
                    itemCount: 3,
                    type: "float"
                }
            ],
            groups: [
                {
                    start: 0,
                    count: 0,
                    technique: techniqueIndex
                }
            ],
            objInfos: geometryData.points.geojsonProperties
        };
    }
    static createSolidLineGeometry(geometryData, techniqueIndex, projection) {
        const lineCenter = new THREE.Vector3();
        const lines = new Lines_1.LineGroup();
        const positions = new Array();
        for (const line of geometryData.lines.vertices) {
            lines.add(lineCenter, line, projection);
            positions.push(...line);
        }
        return {
            type: harp_datasource_protocol_1.GeometryType.SolidLine,
            index: {
                buffer: new Uint32Array(lines.indices).buffer,
                itemCount: 1,
                type: "uint32",
                name: "index"
            },
            interleavedVertexAttributes: [
                {
                    type: "float",
                    stride: lines.stride,
                    buffer: new Float32Array(lines.vertices).buffer,
                    attributes: lines.vertexAttributes
                }
            ],
            vertexAttributes: [
                {
                    name: "points",
                    buffer: new Float32Array(positions).buffer,
                    itemCount: 2,
                    type: "float"
                }
            ],
            groups: [
                {
                    start: 0,
                    count: 0,
                    technique: techniqueIndex
                }
            ]
        };
    }
    static createPolygonGeometry(geometryData, techniqueIndex) {
        const meshBuffer = new MeshBuffer();
        const { positions, indices, groups, featureStarts, geojsonProperties } = meshBuffer;
        const holesVertices = [];
        for (const polygon of geometryData.polygons) {
            const baseVertex = positions.length / 3;
            // Holes, if any.
            if (polygon.holes.length) {
                for (let i = 0; i < polygon.holes.length; i++) {
                    if (i === polygon.holes.length - 1) {
                        holesVertices[i] = polygon.vertices.slice(polygon.holes[i] * 3);
                    }
                    else {
                        holesVertices[i] = polygon.vertices.slice(polygon.holes[i] * 3, polygon.holes[i + 1] * 3);
                    }
                }
            }
            featureStarts.push(indices.length / 3);
            geojsonProperties.push(polygon.geojsonProperties);
            for (let i = 0; i < polygon.vertices.length; i += 3) {
                positions.push(polygon.vertices[i], polygon.vertices[i + 1], polygon.vertices[i + 2]);
            }
            const triangles = earcut_1.default(polygon.vertices, polygon.holes, 3);
            for (let i = 0; i < triangles.length; i += 3) {
                const v1 = triangles[i];
                const v2 = triangles[i + 1];
                const v3 = triangles[i + 2];
                indices.push(v1 + baseVertex, v2 + baseVertex, v3 + baseVertex);
            }
        }
        if (indices.length > 0) {
            groups.push({
                start: 0,
                count: indices.length,
                technique: techniqueIndex
            });
        }
        const geometry = {
            type: harp_datasource_protocol_1.GeometryType.Polygon,
            vertexAttributes: [
                {
                    name: "position",
                    buffer: new Float32Array(meshBuffer.positions).buffer,
                    itemCount: 3,
                    type: "float"
                }
            ],
            groups: meshBuffer.groups
        };
        if (meshBuffer.indices.length > 0) {
            geometry.index = {
                name: "index",
                buffer: new Uint32Array(meshBuffer.indices).buffer,
                itemCount: 1,
                type: "uint32"
            };
            geometry.featureStarts = meshBuffer.featureStarts;
            geometry.objInfos = meshBuffer.geojsonProperties;
        }
        return geometry;
    }
    static createPolygonOutlineGeometry(geometryData, techniqueIndex, tileWorldExtents, projection) {
        const meshBuffer = new MeshBuffer();
        const { indices, featureStarts, geojsonProperties } = meshBuffer;
        let contour;
        const holesVertices = [];
        const solidOutline = new Lines_1.LineGroup();
        const position = new Array();
        for (const polygon of geometryData.polygons) {
            contour = polygon.holes.length
                ? polygon.vertices.slice(0, polygon.holes[0] * 3)
                : polygon.vertices;
            // External ring.
            this.addOutlineVertices(contour, tileWorldExtents, solidOutline, position, projection);
            // Holes, if any.
            if (polygon.holes.length) {
                for (let i = 0; i < polygon.holes.length; i++) {
                    if (i === polygon.holes.length - 1) {
                        holesVertices[i] = polygon.vertices.slice(polygon.holes[i] * 3);
                    }
                    else {
                        holesVertices[i] = polygon.vertices.slice(polygon.holes[i] * 3, polygon.holes[i + 1] * 3);
                    }
                    this.addOutlineVertices(holesVertices[i], tileWorldExtents, solidOutline, position, projection);
                }
            }
            featureStarts.push(indices.length / 3);
            geojsonProperties.push(polygon.geojsonProperties);
        }
        const geometry = {
            type: harp_datasource_protocol_1.GeometryType.SolidLine,
            index: {
                buffer: new Uint32Array(solidOutline.indices).buffer,
                itemCount: 1,
                type: "uint32",
                name: "index"
            },
            interleavedVertexAttributes: [
                {
                    type: "float",
                    stride: solidOutline.stride,
                    buffer: new Float32Array(solidOutline.vertices).buffer,
                    attributes: solidOutline.vertexAttributes
                }
            ],
            vertexAttributes: [
                {
                    name: "points",
                    buffer: new Float32Array(position).buffer,
                    itemCount: 2,
                    type: "float"
                }
            ],
            groups: [
                {
                    start: 0,
                    count: 0,
                    technique: techniqueIndex
                }
            ]
        };
        if (meshBuffer.indices.length > 0) {
            geometry.index = {
                name: "index",
                buffer: new Uint32Array(meshBuffer.indices).buffer,
                itemCount: 1,
                type: "uint32"
            };
            geometry.featureStarts = meshBuffer.featureStarts;
            geometry.objInfos = meshBuffer.geojsonProperties;
        }
        return geometry;
    }
    static createSegmentsGeometry(geometryData, techniqueIndex) {
        return {
            type: harp_datasource_protocol_1.GeometryType.Line,
            vertexAttributes: [
                {
                    name: "position",
                    buffer: new Float32Array(geometryData.points.vertices).buffer,
                    itemCount: 3,
                    type: "float"
                }
            ],
            groups: [
                {
                    start: 0,
                    count: 0,
                    technique: techniqueIndex
                }
            ]
        };
    }
    static addOutlineVertices(contour, tileExtents, lines, buffer, projection) {
        const lineCenter = new THREE.Vector3();
        let outline = [];
        for (let i = 0; i < contour.length; i += 3) {
            outline.push(contour[i], contour[i + 1], contour[i + 2]);
            if ((this.isOnTileBorder(contour[i], tileExtents) &&
                this.isOnTileBorder(contour[i + 3], tileExtents)) ||
                (this.isOnTileBorder(contour[i + 1], tileExtents) &&
                    this.isOnTileBorder(contour[i + 4], tileExtents))) {
                lines.add(lineCenter, [...outline], projection);
                buffer.push(...outline);
                outline = [];
            }
        }
        lines.add(lineCenter, [...outline], projection);
        buffer.push(...outline);
    }
    static isOnTileBorder(value, extents) {
        return extents - Math.abs(value) <= 0.01;
    }
}
exports.GeoJsonGeometryCreator = GeoJsonGeometryCreator;


/***/ }),

/***/ "../harp-geojson-datasource/lib/GeoJsonParser.ts":
/*!*******************************************************!*\
  !*** ../harp-geojson-datasource/lib/GeoJsonParser.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const index_decoder_1 = __webpack_require__(/*! @here/harp-datasource-protocol/index-decoder */ "../harp-datasource-protocol/index-decoder.ts");
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const THREE = __webpack_require__(/*! three */ "three");
const Flattener_1 = __webpack_require__(/*! ./utils/Flattener */ "../harp-geojson-datasource/lib/utils/Flattener.ts");
const logger = harp_utils_1.LoggerManager.instance.create("GeoJsonFeatureParser");
/**
 * Store temporary variables needed for the creation of a geometry.
 */
class GeometryData {
    constructor() {
        this.points = { vertices: [], geojsonProperties: [] };
        this.lines = { vertices: [], geojsonProperties: [] };
        this.polygons = [];
    }
}
exports.GeometryData = GeometryData;
/**
 * Class holding the GeoJson data parsing.
 */
class GeoJsonParser {
    /**
     * Method exposed to parse the incoming GeoJson data.
     *
     * @param geojson The javascript object obtained from the parsing of the GeoJSON.
     * @param extendedTile The related [[ExtendedTile]].
     * @param center The [[THREE.Vector3]] holding the coordinates of the [[Tile]] center.
     * @param projection The current [[Projection]].
     * @param styleSetEvaluator The [[StyleSetEvaluator]] associated to the tile's decoder.
     * @param buffers The [[GeometryDataBuffers]].
     */
    static processGeoJson(geojson, extendedTile, center, projection, styleSetEvaluator, buffers) {
        switch (geojson.type) {
            case "Feature":
                this.processFeature(geojson, extendedTile, center, projection, styleSetEvaluator, buffers);
                break;
            case "FeatureCollection":
                geojson.features.forEach(feature => this.processFeature(feature, extendedTile, center, projection, styleSetEvaluator, buffers));
                break;
            default:
                const collectionFeature = {
                    type: "Feature",
                    geometry: geojson
                };
                this.processFeature(collectionFeature, extendedTile, center, projection, styleSetEvaluator, buffers);
                break;
        }
    }
    static processFeature(feature, extendedTile, center, projection, styleSetEvaluator, buffers) {
        // Skip features without geometries.
        if (feature.geometry === null) {
            return;
        }
        let techniqueIndices = [];
        switch (feature.geometry.type) {
            case "Point":
                techniqueIndices = this.findTechniqueIndices(feature, "point", styleSetEvaluator);
                for (const techniqueIndex of techniqueIndices) {
                    const technique = styleSetEvaluator.techniques[techniqueIndex];
                    if (harp_datasource_protocol_1.isPoiTechnique(technique)) {
                        this.processPois([feature.geometry.coordinates], center, projection, techniqueIndex, buffers.poiGeometryBuffer, feature.properties);
                    }
                    else if (harp_datasource_protocol_1.isTextTechnique(technique)) {
                        this.processPointLabels([feature.geometry.coordinates], center, projection, techniqueIndex, technique.label, buffers.textGeometryBuffer, feature.properties);
                    }
                    else if (harp_datasource_protocol_1.isCirclesTechnique(technique) || harp_datasource_protocol_1.isSquaresTechnique(technique)) {
                        this.processPoints([feature.geometry.coordinates], center, projection, techniqueIndex, buffers.geometryBuffer, feature.properties);
                    }
                }
                break;
            case "MultiPoint":
                techniqueIndices = this.findTechniqueIndices(feature, "point", styleSetEvaluator);
                for (const techniqueIndex of techniqueIndices) {
                    const technique = styleSetEvaluator.techniques[techniqueIndex];
                    if (harp_datasource_protocol_1.isPoiTechnique(technique)) {
                        this.processPois(feature.geometry.coordinates, center, projection, techniqueIndex, buffers.poiGeometryBuffer, feature.properties);
                    }
                    else if (harp_datasource_protocol_1.isTextTechnique(technique)) {
                        this.processPointLabels(feature.geometry.coordinates, center, projection, techniqueIndex, technique.label, buffers.textGeometryBuffer, feature.properties);
                    }
                    else if (harp_datasource_protocol_1.isCirclesTechnique(technique) || harp_datasource_protocol_1.isSquaresTechnique(technique)) {
                        this.processPoints(feature.geometry.coordinates, center, projection, techniqueIndex, buffers.geometryBuffer, feature.properties);
                    }
                }
                break;
            case "LineString":
                techniqueIndices = this.findTechniqueIndices(feature, "line", styleSetEvaluator);
                for (const techniqueIndex of techniqueIndices) {
                    const technique = styleSetEvaluator.techniques[techniqueIndex];
                    if (harp_datasource_protocol_1.isSolidLineTechnique(technique)) {
                        this.processLines(extendedTile, [feature.geometry.coordinates], center, projection, techniqueIndex, styleSetEvaluator, buffers.geometryBuffer, feature.id, feature.properties);
                    }
                    else if (harp_datasource_protocol_1.isTextTechnique(technique)) {
                        this.processLineLabels([feature.geometry.coordinates], center, projection, techniqueIndex, technique.label, buffers.textPathGeometryBuffer, feature.properties);
                    }
                }
                break;
            case "MultiLineString":
                techniqueIndices = this.findTechniqueIndices(feature, "line", styleSetEvaluator);
                for (const techniqueIndex of techniqueIndices) {
                    const technique = styleSetEvaluator.techniques[techniqueIndex];
                    if (harp_datasource_protocol_1.isSolidLineTechnique(technique)) {
                        this.processLines(extendedTile, feature.geometry.coordinates, center, projection, techniqueIndex, styleSetEvaluator, buffers.geometryBuffer, feature.id, feature.properties);
                    }
                    else if (harp_datasource_protocol_1.isTextTechnique(technique)) {
                        this.processLineLabels(feature.geometry.coordinates, center, projection, techniqueIndex, technique.label, buffers.textPathGeometryBuffer, feature.properties);
                    }
                }
                break;
            case "Polygon":
                techniqueIndices = this.findTechniqueIndices(feature, "polygon", styleSetEvaluator);
                for (const techniqueIndex of techniqueIndices) {
                    const technique = styleSetEvaluator.techniques[techniqueIndex];
                    if (harp_datasource_protocol_1.isFillTechnique(technique) || harp_datasource_protocol_1.isSolidLineTechnique(technique)) {
                        this.processPolygons([feature.geometry.coordinates], center, projection, techniqueIndex, buffers.geometryBuffer, harp_datasource_protocol_1.isSolidLineTechnique(technique), feature.properties);
                    }
                    else if (harp_datasource_protocol_1.isTextTechnique(technique)) {
                        this.processMultiPolygonLabels([feature.geometry.coordinates], center, projection, techniqueIndex, technique.label, buffers.textGeometryBuffer, feature.properties);
                    }
                }
                break;
            case "MultiPolygon":
                techniqueIndices = this.findTechniqueIndices(feature, "polygon", styleSetEvaluator);
                for (const techniqueIndex of techniqueIndices) {
                    const technique = styleSetEvaluator.techniques[techniqueIndex];
                    if (harp_datasource_protocol_1.isFillTechnique(technique) || harp_datasource_protocol_1.isSolidLineTechnique(technique)) {
                        this.processPolygons(feature.geometry.coordinates, center, projection, techniqueIndex, buffers.geometryBuffer, harp_datasource_protocol_1.isSolidLineTechnique(technique), feature.properties);
                    }
                    else if (harp_datasource_protocol_1.isTextTechnique(technique)) {
                        this.processMultiPolygonLabels(feature.geometry.coordinates, center, projection, techniqueIndex, technique.label, buffers.textGeometryBuffer, feature.properties);
                    }
                }
                break;
            case "GeometryCollection":
                feature.geometry.geometries.forEach(geometry => {
                    const collectionFeature = {
                        type: "Feature",
                        properties: feature.properties,
                        geometry
                    };
                    this.processFeature(collectionFeature, extendedTile, center, projection, styleSetEvaluator, buffers);
                });
                break;
            default:
                logger.warn("Invalid GeoJSON data. Unknown geometry type.");
        }
    }
    static processPoints(pointLocations, center, projection, techniqueIndex, geometryBuffer, geojsonProperties = {}) {
        const buffer = this.findOrCreateGeometryBuffer(techniqueIndex, geometryBuffer);
        buffer.type = "point";
        for (const location of pointLocations) {
            this.m_cached_geoCoord.latitude = location[1];
            this.m_cached_geoCoord.longitude = location[0];
            projection.projectPoint(this.m_cached_geoCoord, this.m_cached_worldCoord).sub(center);
            buffer.points.vertices.push(this.m_cached_worldCoord.x, this.m_cached_worldCoord.y, this.m_cached_worldCoord.z);
            const pointIndex = buffer.points.vertices.length / 3 - 1;
            buffer.points.geojsonProperties[pointIndex] = geojsonProperties;
        }
    }
    static processLines(extendedTile, lines, center, projection, techniqueIndex, styleSetEvaluator, geometryBuffer, featureId, geojsonProperties = {}) {
        const buffer = this.findOrCreateGeometryBuffer(techniqueIndex, geometryBuffer);
        buffer.type = "solid-line";
        for (const line of lines) {
            buffer.lines.geojsonProperties.push(geojsonProperties);
            const vertices = [];
            for (const point of line) {
                if (point === null || point[0] === null || point[0] === undefined) {
                    return;
                }
                this.m_cached_geoCoord.latitude = point[1];
                this.m_cached_geoCoord.longitude = point[0];
                projection
                    .projectPoint(this.m_cached_geoCoord, this.m_cached_worldCoord)
                    .sub(center);
                vertices.push(this.m_cached_worldCoord.x, this.m_cached_worldCoord.y, this.m_cached_worldCoord.z);
            }
            buffer.lines.vertices.push(vertices);
        }
        const featureDetails = {};
        if (featureId !== undefined) {
            featureDetails.featureId = featureId;
        }
        const env = new index_decoder_1.MapEnv(Object.assign({ type: "line" }, featureDetails));
        const techniques = styleSetEvaluator.getMatchingTechniques(env);
        const featureIdNumber = 0; //geojsonTile do not have an integer for the featureId. Use 0.
        if (buffer.lines.vertices.length !== buffer.lines.geojsonProperties.length) {
            logger.log("The amount of lines and the amount of geo properties has to be the same");
            return;
        }
        this.addTileInfo(extendedTile, techniques, buffer.lines.vertices, featureIdNumber, env, buffer.lines.geojsonProperties);
    }
    static processPolygons(multiPolygons, center, projection, techniqueIndex, geometryBuffer, isPolygonOutlines, geojsonProperties = {}) {
        const buffer = this.findOrCreateGeometryBuffer(techniqueIndex, geometryBuffer);
        buffer.type = isPolygonOutlines ? "outline" : "polygon";
        for (const polygons of multiPolygons) {
            const vertices = [];
            const holes = [];
            for (const polygon of polygons) {
                if (polygon[0] === null || typeof polygon[0][0] !== "number") {
                    return;
                }
                // the first polygon in the coordinates array is the main polygon the other ones
                // are holes.
                if (vertices.length) {
                    holes.push(vertices.length / 3);
                }
                for (const point of polygon) {
                    this.m_cached_geoCoord.latitude = point[1];
                    this.m_cached_geoCoord.longitude = point[0];
                    projection
                        .projectPoint(this.m_cached_geoCoord, this.m_cached_worldCoord)
                        .sub(center);
                    // polygon issue fix
                    if (point[0] >= 180) {
                        this.m_cached_worldCoord.x = this.m_cached_worldCoord.x * -1;
                    }
                    vertices.push(this.m_cached_worldCoord.x, this.m_cached_worldCoord.y, this.m_cached_worldCoord.z);
                }
            }
            buffer.polygons.push({ vertices, holes, geojsonProperties });
        }
    }
    static processLineLabels(lines, center, projection, techniqueIndex, labelProperty, textPathGeometryBuffer, geojsonProperties = {}) {
        const buffer = this.findOrCreateGeometryBuffer(techniqueIndex, textPathGeometryBuffer);
        buffer.type = "text-path";
        buffer.labelProperty = labelProperty;
        const vertices = [];
        for (const line of lines) {
            for (const point of line) {
                this.m_cached_geoCoord.latitude = point[1];
                this.m_cached_geoCoord.longitude = point[0];
                projection
                    .projectPoint(this.m_cached_geoCoord, this.m_cached_worldCoord)
                    .sub(center);
                vertices.push(this.m_cached_worldCoord.x, this.m_cached_worldCoord.y, this.m_cached_worldCoord.z);
            }
        }
        buffer.lines.vertices.push(vertices);
        buffer.lines.geojsonProperties.push(geojsonProperties);
    }
    static processMultiPolygonLabels(multiPolygon, center, projection, techniqueIndex, labelProperty, textGeometryBuffer, geojsonProperties = {}) {
        const buffer = this.findOrCreateGeometryBuffer(techniqueIndex, textGeometryBuffer);
        buffer.type = "point";
        buffer.labelProperty = labelProperty;
        const points = { x: [], y: [], z: [] };
        for (const polygons of multiPolygon) {
            for (const polygon of polygons) {
                for (const point of polygon) {
                    this.m_cached_geoCoord.latitude = point[1];
                    this.m_cached_geoCoord.longitude = point[0];
                    projection
                        .projectPoint(this.m_cached_geoCoord, this.m_cached_worldCoord)
                        .sub(center);
                    points.x.push(this.m_cached_worldCoord.x);
                    points.y.push(this.m_cached_worldCoord.y);
                    points.z.push(this.m_cached_worldCoord.z);
                }
            }
        }
        const length = points.x.length;
        this.m_cached_worldCoord.setX(points.x.reduce((a, b) => a + b) / length);
        this.m_cached_worldCoord.setY(points.y.reduce((a, b) => a + b) / length);
        this.m_cached_worldCoord.setZ(points.z.reduce((a, b) => a + b) / length);
        buffer.points.vertices.push(this.m_cached_worldCoord.x, this.m_cached_worldCoord.y, this.m_cached_worldCoord.z);
        buffer.points.geojsonProperties.push(geojsonProperties);
    }
    static processPointLabels(textLocations, center, projection, techniqueIndex, labelProperty, textGeometryBuffer, geojsonProperties = {}) {
        const buffer = this.findOrCreateGeometryBuffer(techniqueIndex, textGeometryBuffer);
        buffer.type = "text";
        buffer.labelProperty = labelProperty;
        for (const location of textLocations) {
            this.m_cached_geoCoord.latitude = location[1];
            this.m_cached_geoCoord.longitude = location[0];
            projection.projectPoint(this.m_cached_geoCoord, this.m_cached_worldCoord).sub(center);
            buffer.points.vertices.push(this.m_cached_worldCoord.x, this.m_cached_worldCoord.y, this.m_cached_worldCoord.z);
            const pointIndex = buffer.points.vertices.length / 3 - 1;
            buffer.points.geojsonProperties[pointIndex] = geojsonProperties;
        }
    }
    static processPois(poiLocations, center, projection, techniqueIndex, poiGeometryBuffer, geojsonProperties = {}) {
        const buffer = this.findOrCreateGeometryBuffer(techniqueIndex, poiGeometryBuffer);
        buffer.type = "poi";
        for (const location of poiLocations) {
            this.m_cached_geoCoord.latitude = location[1];
            this.m_cached_geoCoord.longitude = location[0];
            projection.projectPoint(this.m_cached_geoCoord, this.m_cached_worldCoord).sub(center);
            buffer.points.vertices.push(this.m_cached_worldCoord.x, this.m_cached_worldCoord.y, this.m_cached_worldCoord.z);
            const pointIndex = buffer.points.vertices.length / 3 - 1;
            buffer.points.geojsonProperties[pointIndex] = geojsonProperties;
        }
    }
    static findTechniqueIndices(feature, envType, styleSetEvaluator) {
        const featureDetails = Flattener_1.Flattener.flatten(feature.properties, "properties");
        featureDetails.featureId = feature.id;
        const env = new index_decoder_1.MapEnv(Object.assign({ type: envType }, featureDetails));
        const techniques = styleSetEvaluator.getMatchingTechniques(env);
        return techniques.map(technique => {
            return technique._index;
        });
    }
    static addTileInfo(extendedTile, techniques, lines, featureId, env, geojsonProperties) {
        if (geojsonProperties.length !== lines.length) {
            logger.error("geojsonProperties and lines should have the same lenght");
            return;
        }
        const tileInfoWriter = extendedTile.writer;
        for (const technique of techniques) {
            if (technique === undefined) {
                continue;
            }
            const infoTileTechniqueIndex = tileInfoWriter.addTechnique(technique);
            let currentGeoJsonIndex = 0;
            for (const aLine of lines) {
                // add the geoJsonProperties for this line. undefined values are accepted as some
                // line may not have any data.
                const lineFeatureGroup = extendedTile.info.lineGroup;
                if (lineFeatureGroup.userData === undefined) {
                    lineFeatureGroup.userData = [geojsonProperties[currentGeoJsonIndex]];
                }
                else {
                    lineFeatureGroup.userData.push(geojsonProperties[currentGeoJsonIndex]);
                }
                currentGeoJsonIndex++;
                const featureText = harp_datasource_protocol_1.ExtendedTileInfo.getFeatureText(env, technique);
                tileInfoWriter.addFeature(extendedTile.info.lineGroup, env, featureId, featureText, infoTileTechniqueIndex, harp_datasource_protocol_1.FeatureGroupType.Line);
                tileInfoWriter.addFeaturePoints(extendedTile.info.lineGroup, aLine);
            }
            if (this.m_gatherRoadSegments) {
                const segmentId = env.lookup("segmentId");
                if (segmentId !== undefined) {
                    const startOffset = env.lookup("startOffset");
                    const endOffset = env.lookup("endOffset");
                    tileInfoWriter.addRoadSegments(extendedTile.info.lineGroup, segmentId, startOffset !== undefined ? startOffset : 0, endOffset !== undefined ? endOffset : 1);
                }
            }
        }
    }
    static findOrCreateGeometryBuffer(index, geometryBuffer) {
        let buffer = geometryBuffer.get(index);
        if (buffer !== undefined) {
            return buffer;
        }
        buffer = new GeometryData();
        geometryBuffer.set(index, buffer);
        return buffer;
    }
}
exports.GeoJsonParser = GeoJsonParser;
GeoJsonParser.m_cached_worldCoord = new THREE.Vector3();
GeoJsonParser.m_cached_geoCoord = new harp_geoutils_1.GeoCoordinates(0, 0);
GeoJsonParser.m_gatherRoadSegments = true;


/***/ }),

/***/ "../harp-geojson-datasource/lib/utils/Flattener.ts":
/*!*********************************************************!*\
  !*** ../harp-geojson-datasource/lib/utils/Flattener.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a depthless object from a JSON-like object, via the method `flatten`. Traditional vanilla
 * JS writing is used to create the new properties representing the previously nested values: dots
 * (".") for objects and brackets ("[]") with their indices for arrays.
 *
 * @example
 * ```typescript
 * const jsonLike = {
 *     "number": 2,
 *     "string": "",
 *     "boolean": false,
 *     "null": null,
 *     "nestedObject": {
 *         "foo": null,
 *         "array": [57]
 *     },
 *     "array": [33, { bar: "foo" }]
 * };
 *
 * const flattenedJsonLike = Flattener.flatten(jsonLike, "properties");
 *
 * // `jsonLike` is not modified. `flattenedJsonLike` is as follows:
 * {
 *     "properties.number": 2,
 *     "properties.string": "",
 *     "properties.boolean": false,
 *     "properties.null": null,
 *     "properties.nestedObject.foo": null,
 *     "properties.nestedObject.array[0]": 57,
 *     "properties.array[0]": 33,
 *     "properties.array[1].bar": "foo"
 * }
 * ```
 */
class Flattener {
    /**
     * The entry point of the `Flattener`.
     *
     * @param model The original object whose fields will be flatten in another one.
     * @param prefix An optional prefix for the flattened properties.
     */
    static flatten(model, prefix = "") {
        const result = {};
        this.processObject(model, result, prefix);
        return result;
    }
    /**
     * Loops through the properties of an object and appends the string `".property"` to the path,
     * then further calls `Flattener.processValue` on each value of this object.
     *
     * @param object The object to flatten.
     * @param target The empty object created in `this.m_result`, and being filled.
     * @param path The path to extend with this object nesting level.
     */
    static processObject(object, target, path) {
        for (const property in object) {
            if (object[property] !== undefined) {
                const prefix = path.length ? path + "." + property : property;
                this.processValue(object[property], target, prefix);
            }
        }
    }
    /**
     * Loops through the array and appends the string `"[index]"` to the path, then further calls
     * `Flattener.processValue` on each element of the array.
     *
     * @param array The array to flatten.
     * @param target The empty object created in `this.m_result`, and being filled.
     * @param path The path to extend with this array nesting level.
     */
    static processArray(array, target, path) {
        for (let index = 0; index < array.length; index++) {
            const prefix = `${path}[${index}]`;
            this.processValue(array[index], target, prefix);
        }
    }
    /**
     * Writes the source value, or in case it is an array or an object, dispatches the flattening to
     * the relevant handlers.
     *
     * @param value The value to flatten. Can be any value supported by the JSON format.
     * @param target The empty object created in `this.m_result`, and being filled.
     * @param key The name of the property to write, prefixed with the upper nesting levels.
     */
    static processValue(value, target, key) {
        if (["number", "string", "boolean"].indexOf(typeof value) > -1 || value === null) {
            target[key] = value;
        }
        else if (Array.isArray(value)) {
            this.processArray(value, target, key);
        }
        else {
            this.processObject(value, target, key);
        }
    }
}
exports.Flattener = Flattener;


/***/ }),

/***/ "../harp-geometry/lib/SphericalGeometrySubdivisionModifier.ts":
/*!********************************************************************!*\
  !*** ../harp-geometry/lib/SphericalGeometrySubdivisionModifier.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const three_1 = __webpack_require__(/*! three */ "three");
const SubdivisionModifier_1 = __webpack_require__(/*! ./SubdivisionModifier */ "../harp-geometry/lib/SubdivisionModifier.ts");
const VERTEX_POSITION_CACHE = [new three_1.Vector3(), new three_1.Vector3(), new three_1.Vector3()];
/**
 * The [[SphericalGeometrySubdivisionModifier]] subdivides triangle mesh geometries positioned
 * on the surface of a sphere centered at `(0, 0, 0)`.
 */
class SphericalGeometrySubdivisionModifier extends SubdivisionModifier_1.SubdivisionModifier {
    /**
     * Constructs a new [[SphericalGeometrySubdivisionModifier]].
     *
     * @param angle The maximum angle in radians between two vertices and the origin.
     * @param projection The projection that defines the world space of this geometry.
     */
    constructor(angle, projection = harp_geoutils_1.sphereProjection) {
        super();
        this.angle = angle;
        this.projection = projection;
    }
    /** @override */
    shouldSplitTriangle(a, b, c) {
        const aa = harp_geoutils_1.sphereProjection.reprojectPoint(this.projection, a, VERTEX_POSITION_CACHE[0]);
        const bb = harp_geoutils_1.sphereProjection.reprojectPoint(this.projection, b, VERTEX_POSITION_CACHE[1]);
        const cc = harp_geoutils_1.sphereProjection.reprojectPoint(this.projection, c, VERTEX_POSITION_CACHE[2]);
        const alpha = aa.angleTo(bb);
        const beta = bb.angleTo(cc);
        const gamma = cc.angleTo(aa);
        // find the maximum angle
        const m = Math.max(alpha, Math.max(beta, gamma));
        // split the triangle if needed.
        if (m < this.angle) {
            return undefined;
        }
        if (m === alpha) {
            return 0;
        }
        else if (m === beta) {
            return 1;
        }
        else if (m === gamma) {
            return 2;
        }
        throw new Error("failed to split triangle");
    }
}
exports.SphericalGeometrySubdivisionModifier = SphericalGeometrySubdivisionModifier;


/***/ }),

/***/ "../harp-geometry/lib/SubdivisionModifier.ts":
/*!***************************************************!*\
  !*** ../harp-geometry/lib/SubdivisionModifier.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = __webpack_require__(/*! three */ "three");
const tmpVectorA = new three_1.Vector3();
const tmpVectorB = new three_1.Vector3();
const tmpVectorC = new three_1.Vector3();
/**
 * The [[SubdivisionModifier]] subdivides triangle mesh geometries.
 */
class SubdivisionModifier {
    /**
     * Constructs a new [[SubdivisionModifier]].
     */
    constructor() {
        // nothing to do
    }
    /**
     * Subdivides the faces of the given [[THREE.BufferGeometry]].
     *
     * This method modifies (in-place) the vertices and the faces of the geometry.
     * Please note that only the vertex position and their UV coordinates are subdivided.
     * Normals, vertex colors and other attributes are left unmodified.
     *
     * @param geometry The [[THREE.BufferGeometry]] to subdivide.
     */
    modify(geometry) {
        const positionAttr = geometry.getAttribute("position");
        const position = Array.from(positionAttr.array);
        const uvAttr = geometry.getAttribute("uv");
        const uv = uvAttr !== undefined ? Array.from(uvAttr.array) : undefined;
        const edgeAttr = geometry.getAttribute("edge");
        const edge = edgeAttr !== undefined ? Array.from(edgeAttr.array) : undefined;
        const wallAttr = geometry.getAttribute("wall");
        const wall = wallAttr !== undefined ? Array.from(wallAttr.array) : undefined;
        const indexAttr = geometry.getIndex();
        const indices = Array.from(indexAttr.array);
        // A cache containing the indices of the vertices added
        // when subdiving the faces of the geometry.
        const cache = new Map();
        /**
         * Returns the index of the vertex positioned in the middle of the given vertices.
         */
        function middleVertex(i, j) {
            // Build a unique `key` for the pair of indices `(i, j)`.
            const key = `${Math.min(i, j)}_${Math.max(i, j)}`;
            const h = cache.get(key);
            if (h !== undefined) {
                // Nothing to do, a vertex in the middle of (i, j) was already created.
                return h;
            }
            // The position of the new vertex.
            tmpVectorA.set(position[i * 3], position[i * 3 + 1], position[i * 3 + 2]);
            tmpVectorB.set(position[j * 3], position[j * 3 + 1], position[j * 3 + 2]);
            tmpVectorC.lerpVectors(tmpVectorA, tmpVectorB, 0.5);
            // The index of the new vertex.
            const index = position.length / 3;
            position.push(...tmpVectorC.toArray());
            // Cache the position of the new vertex.
            cache.set(key, index);
            // The uvs of the new vertex.
            if (uv !== undefined) {
                tmpVectorA.set(uv[i * 2], uv[i * 2 + 1], 0);
                tmpVectorB.set(uv[j * 2], uv[j * 2 + 1], 0);
                tmpVectorC.lerpVectors(tmpVectorA, tmpVectorB, 0.5);
                uv.push(tmpVectorC.x, tmpVectorC.y);
            }
            // The edge and wall attributes of the new vertex.
            // If a new vertex has been introduced between i and j, connect the elements
            // accordingly.
            if (edge !== undefined) {
                if (edge[i] === j) {
                    edge.push(j);
                    edge[i] = index;
                }
                else if (edge[j] === i) {
                    edge.push(i);
                    edge[j] = index;
                }
                else {
                    edge.push(-1);
                }
            }
            if (wall !== undefined) {
                if (wall[i] === j) {
                    wall.push(j);
                    wall[i] = index;
                }
                else if (wall[j] === i) {
                    wall.push(i);
                    wall[j] = index;
                }
                else {
                    wall.push(-1);
                }
            }
            return index;
        }
        const newIndices = [];
        while (indices.length >= 3) {
            const v0 = indices.shift();
            const v1 = indices.shift();
            const v2 = indices.shift();
            tmpVectorA.set(position[v0 * 3], position[v0 * 3 + 1], position[v0 * 3 + 2]);
            tmpVectorB.set(position[v1 * 3], position[v1 * 3 + 1], position[v1 * 3 + 2]);
            tmpVectorC.set(position[v2 * 3], position[v2 * 3 + 1], position[v2 * 3 + 2]);
            const edgeToSplit = this.shouldSplitTriangle(tmpVectorA, tmpVectorB, tmpVectorC);
            switch (edgeToSplit) {
                case 0: {
                    const v3 = middleVertex(v0, v1);
                    indices.push(v0, v3, v2, v3, v1, v2);
                    break;
                }
                case 1: {
                    const v3 = middleVertex(v1, v2);
                    indices.push(v0, v1, v3, v0, v3, v2);
                    break;
                }
                case 2: {
                    const v3 = middleVertex(v2, v0);
                    indices.push(v0, v1, v3, v3, v1, v2);
                    break;
                }
                case undefined: {
                    newIndices.push(v0, v1, v2);
                    break;
                }
                default:
                    throw new Error("failed to subdivide the given geometry");
            }
        }
        positionAttr.array = new Float32Array(position);
        positionAttr.count = position.length / positionAttr.itemSize;
        positionAttr.needsUpdate = true;
        geometry.setIndex(newIndices);
        if (uv !== undefined) {
            uvAttr.array = new Float32Array(uv);
            uvAttr.count = uv.length / uvAttr.itemSize;
            uvAttr.needsUpdate = true;
        }
        if (edge !== undefined) {
            edgeAttr.array = new Float32Array(edge);
            edgeAttr.count = edge.length / edgeAttr.itemSize;
            edgeAttr.needsUpdate = true;
        }
        return geometry;
    }
}
exports.SubdivisionModifier = SubdivisionModifier;


/***/ }),

/***/ "../harp-geoutils/index.ts":
/*!*********************************!*\
  !*** ../harp-geoutils/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./lib/coordinates/GeoBox */ "../harp-geoutils/lib/coordinates/GeoBox.ts"));
__export(__webpack_require__(/*! ./lib/coordinates/GeoCoordinatesLike */ "../harp-geoutils/lib/coordinates/GeoCoordinatesLike.ts"));
__export(__webpack_require__(/*! ./lib/coordinates/GeoCoordinates */ "../harp-geoutils/lib/coordinates/GeoCoordinates.ts"));
__export(__webpack_require__(/*! ./lib/coordinates/GeoPointLike */ "../harp-geoutils/lib/coordinates/GeoPointLike.ts"));
__export(__webpack_require__(/*! ./lib/coordinates/LatLngLike */ "../harp-geoutils/lib/coordinates/LatLngLike.ts"));
__export(__webpack_require__(/*! ./lib/projection/EarthConstants */ "../harp-geoutils/lib/projection/EarthConstants.ts"));
__export(__webpack_require__(/*! ./lib/projection/EquirectangularProjection */ "../harp-geoutils/lib/projection/EquirectangularProjection.ts"));
__export(__webpack_require__(/*! ./lib/projection/IdentityProjection */ "../harp-geoutils/lib/projection/IdentityProjection.ts"));
__export(__webpack_require__(/*! ./lib/projection/Projection */ "../harp-geoutils/lib/projection/Projection.ts"));
__export(__webpack_require__(/*! ./lib/projection/MercatorProjection */ "../harp-geoutils/lib/projection/MercatorProjection.ts"));
__export(__webpack_require__(/*! ./lib/projection/TransverseMercatorProjection */ "../harp-geoutils/lib/projection/TransverseMercatorProjection.ts"));
__export(__webpack_require__(/*! ./lib/projection/SphereProjection */ "../harp-geoutils/lib/projection/SphereProjection.ts"));
__export(__webpack_require__(/*! ./lib/tiling/FlatTileBoundingBoxGenerator */ "../harp-geoutils/lib/tiling/FlatTileBoundingBoxGenerator.ts"));
__export(__webpack_require__(/*! ./lib/tiling/HalfQuadTreeSubdivisionScheme */ "../harp-geoutils/lib/tiling/HalfQuadTreeSubdivisionScheme.ts"));
__export(__webpack_require__(/*! ./lib/tiling/QuadTreeSubdivisionScheme */ "../harp-geoutils/lib/tiling/QuadTreeSubdivisionScheme.ts"));
__export(__webpack_require__(/*! ./lib/tiling/QuadTree */ "../harp-geoutils/lib/tiling/QuadTree.ts"));
__export(__webpack_require__(/*! ./lib/tiling/SubTiles */ "../harp-geoutils/lib/tiling/SubTiles.ts"));
__export(__webpack_require__(/*! ./lib/tiling/TileKey */ "../harp-geoutils/lib/tiling/TileKey.ts"));
__export(__webpack_require__(/*! ./lib/tiling/TileKeyUtils */ "../harp-geoutils/lib/tiling/TileKeyUtils.ts"));
__export(__webpack_require__(/*! ./lib/tiling/TileTreeTraverse */ "../harp-geoutils/lib/tiling/TileTreeTraverse.ts"));
__export(__webpack_require__(/*! ./lib/tiling/TilingScheme */ "../harp-geoutils/lib/tiling/TilingScheme.ts"));
__export(__webpack_require__(/*! ./lib/tiling/HereTilingScheme */ "../harp-geoutils/lib/tiling/HereTilingScheme.ts"));
__export(__webpack_require__(/*! ./lib/tiling/WebMercatorTilingScheme */ "../harp-geoutils/lib/tiling/WebMercatorTilingScheme.ts"));
__export(__webpack_require__(/*! ./lib/tiling/MercatorTilingScheme */ "../harp-geoutils/lib/tiling/MercatorTilingScheme.ts"));
__export(__webpack_require__(/*! ./lib/tiling/PolarTilingScheme */ "../harp-geoutils/lib/tiling/PolarTilingScheme.ts"));
__export(__webpack_require__(/*! ./lib/math/Vector3Like */ "../harp-geoutils/lib/math/Vector3Like.ts"));
__export(__webpack_require__(/*! ./lib/math/Box3Like */ "../harp-geoutils/lib/math/Box3Like.ts"));
__export(__webpack_require__(/*! ./lib/math/OrientedBox3Like */ "../harp-geoutils/lib/math/OrientedBox3Like.ts"));
__export(__webpack_require__(/*! ./lib/math/MathUtils */ "../harp-geoutils/lib/math/MathUtils.ts"));
__export(__webpack_require__(/*! ./lib/math/TransformLike */ "../harp-geoutils/lib/math/TransformLike.ts"));
__export(__webpack_require__(/*! ./lib/math/OrientedBox3 */ "../harp-geoutils/lib/math/OrientedBox3.ts"));


/***/ }),

/***/ "../harp-geoutils/lib/coordinates/GeoBox.ts":
/*!**************************************************!*\
  !*** ../harp-geoutils/lib/coordinates/GeoBox.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GeoCoordinates_1 = __webpack_require__(/*! ./GeoCoordinates */ "../harp-geoutils/lib/coordinates/GeoCoordinates.ts");
const THREE = __webpack_require__(/*! three */ "three");
/**
 * `GeoBox` is used to represent a bounding box in geo coordinates.
 */
class GeoBox {
    /**
     * Constructs a new `GeoBox` with the given geo coordinates.
     *
     * @param southWest The south west position in geo coordinates.
     * @param northEast The north east position in geo coordinates.
     */
    constructor(southWest, northEast) {
        this.southWest = southWest;
        this.northEast = northEast;
    }
    /**
     * Returns a `GeoBox` with the given geo coordinates.
     *
     * @param southWest The south west position in geo coordinates.
     * @param northEast The north east position in geo coordinates.
     */
    static fromCoordinates(southWest, northEast) {
        return new GeoBox(southWest, northEast);
    }
    /**
     * Returns the minimum altitude or `undefined`.
     */
    get minAltitude() {
        if (this.southWest.altitude === undefined || this.northEast.altitude === undefined) {
            return undefined;
        }
        return Math.min(this.southWest.altitude, this.northEast.altitude);
    }
    /**
     * Returns the maximum altitude or `undefined`.
     */
    get maxAltitude() {
        if (this.southWest.altitude === undefined || this.northEast.altitude === undefined) {
            return undefined;
        }
        return Math.max(this.southWest.altitude, this.northEast.altitude);
    }
    /**
     * Returns the south latitude in degrees of this `GeoBox`.
     */
    get south() {
        return this.southWest.latitude;
    }
    /**
     * Returns the north altitude in degrees of this `GeoBox`.
     */
    get north() {
        return this.northEast.latitude;
    }
    /**
     * Returns the west longitude in degrees of this `GeoBox`.
     */
    get west() {
        return this.southWest.longitude;
    }
    /**
     * Returns the east longitude in degrees of this `GeoBox`.
     */
    get east() {
        return this.northEast.longitude;
    }
    /**
     * Returns the center of this `GeoBox`.
     */
    get center() {
        const latitude = (this.south + this.north) * 0.5;
        const { west, east } = this;
        const { minAltitude, altitudeSpan } = this;
        let altitude;
        if (minAltitude !== undefined && altitudeSpan !== undefined) {
            altitude = minAltitude + altitudeSpan * 0.5;
        }
        if (west < east) {
            return new GeoCoordinates_1.GeoCoordinates(latitude, (west + east) * 0.5, altitude);
        }
        let longitude = (360 + east + west) * 0.5;
        if (longitude > 360) {
            longitude -= 360;
        }
        return new GeoCoordinates_1.GeoCoordinates(latitude, longitude, altitude);
    }
    /**
     * Returns the latitude span in radians.
     */
    get latitudeSpanInRadians() {
        return THREE.Math.degToRad(this.latitudeSpan);
    }
    /**
     * Returns the longitude span in radians.
     */
    get longitudeSpanInRadians() {
        return THREE.Math.degToRad(this.longitudeSpan);
    }
    /**
     * Returns the latitude span in degrees.
     */
    get latitudeSpan() {
        return this.north - this.south;
    }
    get altitudeSpan() {
        if (this.maxAltitude === undefined || this.minAltitude === undefined) {
            return undefined;
        }
        return this.maxAltitude - this.minAltitude;
    }
    /**
     * Returns the longitude span in degrees.
     */
    get longitudeSpan() {
        let width = this.northEast.longitude - this.southWest.longitude;
        if (width < 0) {
            width += 360;
        }
        return width;
    }
    /**
     * Returns the latitude span in degrees.
     * @deprecated Use [[latitudeSpan]] instead.
     */
    get latitudeSpanInDegrees() {
        return this.latitudeSpan;
    }
    /**
     * Returns the longitude span in degrees.
     * @deprecated Use [[longitudeSpan]] instead.
     */
    get longitudeSpanInDegrees() {
        return this.longitudeSpan;
    }
    /**
     * Returns `true` if the given geo coordinates are contained in this `GeoBox`.
     *
     * @param point The geo coordinates.
     */
    contains(point) {
        if (point.altitude === undefined ||
            this.minAltitude === undefined ||
            this.maxAltitude === undefined) {
            return this.containsHelper(point);
        }
        const isFlat = this.minAltitude === this.maxAltitude;
        const isSameAltitude = this.minAltitude === point.altitude;
        const isWithinAltitudeRange = this.minAltitude <= point.altitude && this.maxAltitude > point.altitude;
        // If box is flat, we should check the altitude and containment,
        // otherwise we should check also altitude difference where we consider
        // point to be inside if alt is from [m_minAltitude, m_maxAltitude) range!
        if (isFlat ? isSameAltitude : isWithinAltitudeRange) {
            return this.containsHelper(point);
        }
        return false;
    }
    /**
     * Clones this `GeoBox` instance.
     */
    clone() {
        return new GeoBox(this.southWest, this.northEast);
    }
    /**
     * Update the bounding box by considering a given point.
     *
     * @param point The point that may expand the bounding box.
     */
    growToContain(point) {
        this.southWest.latitude = Math.min(this.southWest.latitude, point.latitude);
        this.southWest.longitude = Math.min(this.southWest.longitude, point.longitude);
        this.southWest.altitude =
            this.southWest.altitude !== undefined && point.altitude !== undefined
                ? Math.min(this.southWest.altitude, point.altitude)
                : this.southWest.altitude !== undefined
                    ? this.southWest.altitude
                    : point.altitude !== undefined
                        ? point.altitude
                        : undefined;
        this.northEast.latitude = Math.max(this.northEast.latitude, point.latitude);
        this.northEast.longitude = Math.max(this.northEast.longitude, point.longitude);
        this.northEast.altitude =
            this.northEast.altitude !== undefined && point.altitude !== undefined
                ? Math.max(this.northEast.altitude, point.altitude)
                : this.northEast.altitude !== undefined
                    ? this.northEast.altitude
                    : point.altitude !== undefined
                        ? point.altitude
                        : undefined;
    }
    containsHelper(point) {
        if (point.latitude < this.southWest.latitude || point.latitude >= this.northEast.latitude) {
            return false;
        }
        const { west, east } = this;
        if (east > west) {
            return point.longitude >= west && point.longitude < east;
        }
        return point.longitude > east || point.longitude <= west;
    }
}
exports.GeoBox = GeoBox;


/***/ }),

/***/ "../harp-geoutils/lib/coordinates/GeoCoordinates.ts":
/*!**********************************************************!*\
  !*** ../harp-geoutils/lib/coordinates/GeoCoordinates.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GeoCoordinatesLike_1 = __webpack_require__(/*! ./GeoCoordinatesLike */ "../harp-geoutils/lib/coordinates/GeoCoordinatesLike.ts");
const GeoPointLike_1 = __webpack_require__(/*! ./GeoPointLike */ "../harp-geoutils/lib/coordinates/GeoPointLike.ts");
const LatLngLike_1 = __webpack_require__(/*! ./LatLngLike */ "../harp-geoutils/lib/coordinates/LatLngLike.ts");
const THREE = __webpack_require__(/*! three */ "three");
/**
 * `GeoCoordinates` is used to represent geo positions.
 */
class GeoCoordinates {
    /**
     * Creates a `GeoCoordinates` from the given latitude, longitude, and optional altitude.
     *
     * @param latitude Latitude in degrees.
     * @param longitude Longitude in degrees.
     * @param altitude Altitude in meters.
     */
    constructor(latitude, longitude, altitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
    /**
     * Returns a `GeoCoordinates` from the given latitude, longitude, and optional altitude.
     *
     * @param latitude Latitude in degrees.
     * @param longitude Longitude in degrees.
     * @param altitude Altitude in meters.
     */
    static fromDegrees(latitude, longitude, altitude) {
        return new GeoCoordinates(latitude, longitude, altitude);
    }
    /**
     * Returns a `GeoCoordinates` from the given latitude, longitude, and optional altitude.
     *
     * @param latitude Latitude in radians.
     * @param longitude Longitude in radians.
     * @param altitude Altitude in meters.
     */
    static fromRadians(latitude, longitude, altitude) {
        return new GeoCoordinates(THREE.Math.radToDeg(latitude), THREE.Math.radToDeg(longitude), altitude);
    }
    /**
     * Creates a [[GeoCoordinates]] from a [[LatLngLike]] literal.
     * ```typescript
     * const center = { lat: 53.3, lng: 13.4 };
     * mapView.geoCenter = GeoCoordinates.fromLatLng(center);
     * ```
     * @param latLng A [[LatLngLike]] object literal.
     */
    static fromLatLng(latLng) {
        return new GeoCoordinates(latLng.lat, latLng.lng);
    }
    /**
     * Creates a [[GeoCoordinates]] from a [[GeoPointLike]] tuple.
     *
     * Example:
     * ```typescript
     * mapView.geoCenter = GeoCoordinates.fromGeoPoint([longitude, latitude]);
     *
     * let geoCoords: number[] = ...;
     *
     * if (isGeoPointLike(geoCoords)) {
     *     const p = GeoCoordinates.fromGeoPoint(geoCoords);
     * }
     * ```
     * @param geoPoint An [[Array]] of at least two elements following the order
     * longitude, latitude, altitude.
     */
    static fromGeoPoint(geoPoint) {
        return new GeoCoordinates(geoPoint[1], geoPoint[0], geoPoint[2]);
    }
    /**
     * Creates a [[GeoCoordinates]] from different types of geo coordinate objects.
     *
     * Example:
     * ```typescript
     * const fromGeoPointLike = GeoCoordinates.fromObject([longitude, latitude]);
     * const fromGeoCoordinateLike = GeoCoordinates.fromObject({ longitude, latitude });
     * const fromGeoCoordinate = GeoCoordinates.fromObject(new GeoCoordinates(latitude, longitude));
     * const fromLatLngLike = GeoCoordinates.fromObject({ lat: latitude , lng: longitude });
     * ```
     *
     * @param geoPoint Either [[GeoPointLike]], [[GeoCoordinatesLike]]
     * or [[LatLngLike]] object literal.
     */
    static fromObject(geoPoint) {
        if (GeoPointLike_1.isGeoPointLike(geoPoint)) {
            return GeoCoordinates.fromGeoPoint(geoPoint);
        }
        else if (GeoCoordinatesLike_1.isGeoCoordinatesLike(geoPoint)) {
            return GeoCoordinates.fromDegrees(geoPoint.latitude, geoPoint.longitude, geoPoint.altitude);
        }
        else if (LatLngLike_1.isLatLngLike(geoPoint)) {
            return GeoCoordinates.fromDegrees(geoPoint.lat, geoPoint.lng);
        }
        throw new Error("Invalid input coordinate format.");
    }
    /**
     * Returns the latitude in radians.
     */
    get latitudeInRadians() {
        return THREE.Math.degToRad(this.latitude);
    }
    /**
     * Returns the longitude in radians.
     */
    get longitudeInRadians() {
        return THREE.Math.degToRad(this.longitude);
    }
    /**
     * Returns the latitude in degrees.
     * @deprecated Use the [[latitude]] property instead.
     */
    get latitudeInDegrees() {
        return this.latitude;
    } // compat api
    /**
     * Returns the longitude in degrees.
     * @deprecated Use the [[longitude]] property instead.
     */
    get longitudeInDegrees() {
        return this.longitude;
    } // compat api
    /**
     * The latitude in the degrees.
     */
    get lat() {
        return this.latitude;
    }
    /**
     * The longitude in the degrees.
     */
    get lng() {
        return this.longitude;
    }
    /**
     * Returns `true` if this `GeoCoordinates` is valid; returns `false` otherwise.
     */
    isValid() {
        return !isNaN(this.latitude) && !isNaN(this.longitude);
    }
    /**
     * Returns the normalized `GeoCoordinates`.
     */
    normalized() {
        let { latitude, longitude } = this;
        if (isNaN(latitude) || isNaN(longitude)) {
            return this;
        }
        if (latitude > 90) {
            let wrapped = (latitude + 90) % 360;
            if (wrapped >= 180) {
                longitude += 180;
                wrapped = 360 - wrapped;
            }
            latitude = wrapped - 90;
        }
        if (latitude < -90) {
            let wrapped = (latitude - 90) % 360;
            if (wrapped <= -180) {
                longitude += 180;
                wrapped = -360 - wrapped;
            }
            latitude = wrapped + 90;
        }
        if (longitude < -180 || longitude > 180) {
            const sign = Math.sign(longitude);
            longitude = (((longitude % 360) + 180 * sign) % 360) - 180 * sign;
        }
        if (latitude === this.latitude && longitude === this.longitude) {
            return this;
        }
        return new GeoCoordinates(latitude, longitude, this.altitude);
    }
    /**
     * Returns `true` if this `GeoCoordinates` is equal to the other.
     *
     * @param other GeoCoordinatesLike to compare to.
     */
    equals(other) {
        return (this.latitude === other.latitude &&
            this.longitude === other.longitude &&
            this.altitude === other.altitude);
    }
    /**
     * Copy values from the other.
     *
     * @param other GeoCoordinatesLike to copy all values from.
     */
    copy(other) {
        this.latitude = other.latitude;
        this.longitude = other.longitude;
        this.altitude = other.altitude;
        return this;
    }
    /**
     * Clones this `GeoCoordinates`.
     * @deprecated
     */
    clone() {
        return new GeoCoordinates(this.latitude, this.longitude, this.altitude);
    }
    /**
     * Returns this [[GeoCoordinates]] as [[LatLngLike]] literal.
     */
    toLatLng() {
        return { lat: this.latitude, lng: this.longitude };
    }
    /**
     * Converts this [[GeoCoordinates]] to a [[GeoPointLike]].
     */
    toGeoPoint() {
        return this.altitude !== undefined
            ? [this.longitude, this.latitude, this.altitude]
            : [this.longitude, this.latitude];
    }
}
exports.GeoCoordinates = GeoCoordinates;


/***/ }),

/***/ "../harp-geoutils/lib/coordinates/GeoCoordinatesLike.ts":
/*!**************************************************************!*\
  !*** ../harp-geoutils/lib/coordinates/GeoCoordinatesLike.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type guard to assert that `object` conforms to [[GeoCoordinatesLike]] data interface.
 */
function isGeoCoordinatesLike(object) {
    return (object &&
        typeof object.latitude === "number" &&
        typeof object.longitude === "number" &&
        (typeof object.altitude === "number" || typeof object.altitude === "undefined"));
}
exports.isGeoCoordinatesLike = isGeoCoordinatesLike;


/***/ }),

/***/ "../harp-geoutils/lib/coordinates/GeoPointLike.ts":
/*!********************************************************!*\
  !*** ../harp-geoutils/lib/coordinates/GeoPointLike.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type guard to assert that `object` conforms to [[GeoPointLike]] interface.
 */
function isGeoPointLike(geoPoint) {
    if (Array.isArray(geoPoint)) {
        const [longitude, latitude, altitude] = geoPoint;
        return (typeof longitude === "number" &&
            typeof latitude === "number" &&
            (altitude === undefined || typeof altitude === "number"));
    }
    return false;
}
exports.isGeoPointLike = isGeoPointLike;


/***/ }),

/***/ "../harp-geoutils/lib/coordinates/LatLngLike.ts":
/*!******************************************************!*\
  !*** ../harp-geoutils/lib/coordinates/LatLngLike.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type guard to assert that `object` conforms to [[LatLngLike]] interface.
 */
function isLatLngLike(object) {
    return object && typeof object.lat === "number" && typeof object.lng === "number";
}
exports.isLatLngLike = isLatLngLike;


/***/ }),

/***/ "../harp-geoutils/lib/math/Box3Like.ts":
/*!*********************************************!*\
  !*** ../harp-geoutils/lib/math/Box3Like.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns true if the given object implements the [[Box3Like]] interface.
 *
 * @param object A valid object.
 */
function isBox3Like(object) {
    const box3 = object;
    return box3.min !== undefined && box3.max !== undefined;
}
exports.isBox3Like = isBox3Like;


/***/ }),

/***/ "../harp-geoutils/lib/math/MathUtils.ts":
/*!**********************************************!*\
  !*** ../harp-geoutils/lib/math/MathUtils.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __webpack_require__(/*! three */ "three");
var MathUtils;
(function (MathUtils) {
    /**
     * Creates a new empty bounding box.
     * @deprecated
     */
    function newEmptyBox3() {
        return {
            min: { x: Infinity, y: Infinity, z: Infinity },
            max: { x: -Infinity, y: -Infinity, z: -Infinity }
        };
    }
    MathUtils.newEmptyBox3 = newEmptyBox3;
    /**
     * Set the components of the given [Vector3Like] instance.
     *
     * @param x The x component.
     * @param y The y component.
     * @param z The z component.
     * @param v The [Vector3Like]
     */
    function newVector3(x, y, z, v) {
        if (v === undefined) {
            return { x, y, z };
        }
        v.x = x;
        v.y = y;
        v.z = z;
        return v;
    }
    MathUtils.newVector3 = newVector3;
    /**
     * Converts an angle measured in degrees to an equivalent value in radians.
     *
     * @param degrees Value in degrees.
     * @returns Value in radians.
     * @deprecated
     */
    MathUtils.degToRad = THREE.Math.degToRad;
    /**
     * Converts an angle measured in radians to an equivalent value in degrees.
     *
     * @param degrees Value in radians.
     * @returns Value in degrees.
     * @deprecated
     */
    MathUtils.radToDeg = THREE.Math.radToDeg;
    /**
     * Ensures that input value fits in a given range.
     *
     * @param value The value to be clamped.
     * @param min Minimum value.
     * @param max Maximum value.
     * @returns Clamped value.
     * @deprecated
     */
    MathUtils.clamp = THREE.Math.clamp;
    /**
     * Normalize angle in degrees to range `[0, 360)`.
     *
     * @param a Angle in degrees.
     * @returns Angle in degrees in range `[0, 360)`.
     */
    function normalizeAngleDeg(a) {
        a = a % 360;
        if (a < 0) {
            a = a + 360;
        }
        return a;
    }
    MathUtils.normalizeAngleDeg = normalizeAngleDeg;
    /**
     * Return the minimal delta between angles `a` and `b` given in degrees.
     *
     * Equivalent to `a - b` in coordinate space with exception vector direction can be reversed
     * that if `abs(a-b) > 180` because trip is shorter in 'other' direction.
     *
     * Useful when interpolating between `b` and `a` in angle space.
     *
     * @param a Start angle in degrees.
     * @param b End angle in degrees.
     * @returns Angle that that satisfies condition `a - b - d = 0` in angle space.
     */
    function angleDistanceDeg(a, b) {
        a = normalizeAngleDeg(a);
        b = normalizeAngleDeg(b);
        const d = a - b;
        if (d > 180) {
            return d - 360;
        }
        else if (d <= -180) {
            return d + 360;
        }
        else {
            return d;
        }
    }
    MathUtils.angleDistanceDeg = angleDistanceDeg;
    /**
     * Interpolate linearly between two angles given in degrees.
     *
     * @param p0 Angle from in degrees
     * @param p1 Angle to in degrees
     * @param t Interpolation factor (alpha), in range `0-1`.
     */
    function interpolateAnglesDeg(p0, p1, t) {
        // hand crafted version,
        // see stack for maybe better versions:
        //    https://stackoverflow.com/questions/2708476/rotation-interpolation
        const d = angleDistanceDeg(p1, p0);
        const r = (p0 + d * t) % 360;
        return r;
    }
    MathUtils.interpolateAnglesDeg = interpolateAnglesDeg;
})(MathUtils = exports.MathUtils || (exports.MathUtils = {}));


/***/ }),

/***/ "../harp-geoutils/lib/math/OrientedBox3.ts":
/*!*************************************************!*\
  !*** ../harp-geoutils/lib/math/OrientedBox3.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = __webpack_require__(/*! three */ "three");
class OrientedBox3 {
    /**
     * Creates a new `OrientedBox3`.
     *
     * @hideconstructor
     */
    constructor(position, rotationMatrix, extents) {
        /**
         * The position of the center of this `OrientedBox3`.
         */
        this.position = new three_1.Vector3();
        /**
         * The x-axis of this `OrientedBox3`.
         */
        this.xAxis = new three_1.Vector3(1, 0, 0);
        /**
         * The y-axis of this `OrientedBox3`.
         */
        this.yAxis = new three_1.Vector3(0, 1, 0);
        /**
         * The z-axis of this `OrientedBox3`.
         */
        this.zAxis = new three_1.Vector3(0, 0, 1);
        /**
         * The extents of this `OrientedBox3`.
         */
        this.extents = new three_1.Vector3();
        if (position !== undefined) {
            this.position.copy(position);
        }
        if (rotationMatrix !== undefined) {
            rotationMatrix.extractBasis(this.xAxis, this.yAxis, this.zAxis);
        }
        if (extents !== undefined) {
            this.extents.copy(extents);
        }
    }
    /**
     * Create a copy of this [[OrientedBoundingBox]].
     */
    clone() {
        const newBox = new OrientedBox3();
        newBox.copy(this);
        return newBox;
    }
    /**
     * Copies the values of `other` to this [[OrientedBox3]].
     * @param other The other [[OrientedBox3]] to copy.
     */
    copy(other) {
        this.position.copy(other.position);
        this.xAxis.copy(other.xAxis);
        this.yAxis.copy(other.yAxis);
        this.zAxis.copy(other.zAxis);
        this.extents.copy(other.extents);
    }
    /**
     * Gets the center position of this [[OrientedBox3]].
     *
     * @param center The returned center position.
     */
    getCenter(center = new three_1.Vector3()) {
        return center.copy(this.position);
    }
    /**
     * Gets the size of this [[OrientedBox3]].
     *
     * @param size The returned size.
     */
    getSize(size = new three_1.Vector3()) {
        return size.copy(this.extents).multiplyScalar(2);
    }
    /**
     * Gets the orientation matrix of this `OrientedBox3`.
     * @param matrix The output orientation matrix.
     */
    getRotationMatrix(matrix = new three_1.Matrix4()) {
        return matrix.makeBasis(this.xAxis, this.yAxis, this.zAxis);
    }
    /**
     * Checks intersection with the given `THREE.Frustum` or array of `THREE.Plane`s.
     *
     * @param frustumOrPlanes Frustum or array of planes.
     */
    intersects(frustumOrPlanes) {
        const planes = Array.isArray(frustumOrPlanes)
            ? frustumOrPlanes
            : frustumOrPlanes.planes;
        for (const plane of planes) {
            const r = Math.abs(plane.normal.dot(this.xAxis) * this.extents.x) +
                Math.abs(plane.normal.dot(this.yAxis) * this.extents.y) +
                Math.abs(plane.normal.dot(this.zAxis) * this.extents.z);
            const d = plane.distanceToPoint(this.position);
            if (d + r < 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * Returns true if this [[OrientedBox3]] contains the given point.
     *
     * @param point A valid point.
     */
    contains(point) {
        const dx = point.x - this.position.x;
        const dy = point.y - this.position.y;
        const dz = point.z - this.position.z;
        const x = Math.abs(dx * this.xAxis.x + dy * this.xAxis.y + dz * this.xAxis.z);
        const y = Math.abs(dx * this.yAxis.x + dy * this.yAxis.y + dz * this.yAxis.z);
        const z = Math.abs(dx * this.zAxis.x + dy * this.zAxis.y + dz * this.zAxis.z);
        if (x > this.extents.x || y > this.extents.y || z > this.extents.z) {
            return false;
        }
        return true;
    }
    /**
     * Returns the distance from this [[OrientedBox3]] and the given `point`.
     *
     * @param point A point.
     */
    distanceToPoint(point) {
        return Math.sqrt(this.distanceToPointSquared(point));
    }
    /**
     * Returns the squared distance from this [[OrientedBox3]] and the given `point`.
     *
     * @param point A point.
     */
    distanceToPointSquared(point) {
        const d = new three_1.Vector3();
        d.subVectors(point, this.position);
        const lengths = [d.dot(this.xAxis), d.dot(this.yAxis), d.dot(this.zAxis)];
        let result = 0;
        for (let i = 0; i < 3; ++i) {
            const length = lengths[i];
            const extent = this.extents.getComponent(i);
            if (length < -extent) {
                const dd = extent + length;
                result += dd * dd;
            }
            else if (length > extent) {
                const dd = length - extent;
                result += dd * dd;
            }
        }
        return result;
    }
}
exports.OrientedBox3 = OrientedBox3;


/***/ }),

/***/ "../harp-geoutils/lib/math/OrientedBox3Like.ts":
/*!*****************************************************!*\
  !*** ../harp-geoutils/lib/math/OrientedBox3Like.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns true if the given object implements the interface [[OrientedBox3Like]].
 *
 * @param object The object.
 */
function isOrientedBox3Like(object) {
    const obb = object;
    return (obb.position !== undefined &&
        obb.xAxis !== undefined &&
        obb.yAxis !== undefined &&
        obb.zAxis !== undefined &&
        obb.extents !== undefined);
}
exports.isOrientedBox3Like = isOrientedBox3Like;


/***/ }),

/***/ "../harp-geoutils/lib/math/TransformLike.ts":
/*!**************************************************!*\
  !*** ../harp-geoutils/lib/math/TransformLike.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns true if the given object implements the interface [[TransformLike]].
 *
 * @param object The object.
 */
function isTransformLike(object) {
    const transform = object;
    return (transform.position !== undefined &&
        transform.xAxis !== undefined &&
        transform.yAxis !== undefined &&
        transform.zAxis !== undefined);
}
exports.isTransformLike = isTransformLike;


/***/ }),

/***/ "../harp-geoutils/lib/math/Vector3Like.ts":
/*!************************************************!*\
  !*** ../harp-geoutils/lib/math/Vector3Like.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isVector3Like(v) {
    return v && typeof v.x === "number" && typeof v.y === "number" && typeof v.z === "number";
}
exports.isVector3Like = isVector3Like;


/***/ }),

/***/ "../harp-geoutils/lib/projection/EarthConstants.ts":
/*!*********************************************************!*\
  !*** ../harp-geoutils/lib/projection/EarthConstants.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
class EarthConstants {
}
exports.EarthConstants = EarthConstants;
/** The equatorial circumference in meters. */
EarthConstants.EQUATORIAL_CIRCUMFERENCE = 40075016.6855784861531768177614;
/** The equatorial radius in meters. */
EarthConstants.EQUATORIAL_RADIUS = 6378137.0;
/** The lowest point on earth (Dead Sea) in meters. */
EarthConstants.MIN_ELEVATION = -433.0;
/** The highest point on earth (Mt. Everest) in meters. */
EarthConstants.MAX_ELEVATION = 8848.0;
/** The highest artificial structure (building) on earth, Burj Khalifa tower in Dubai */
EarthConstants.MAX_BUILDING_HEIGHT = 828;


/***/ }),

/***/ "../harp-geoutils/lib/projection/EquirectangularProjection.ts":
/*!********************************************************************!*\
  !*** ../harp-geoutils/lib/projection/EquirectangularProjection.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GeoBox_1 = __webpack_require__(/*! ../coordinates/GeoBox */ "../harp-geoutils/lib/coordinates/GeoBox.ts");
const GeoCoordinates_1 = __webpack_require__(/*! ../coordinates/GeoCoordinates */ "../harp-geoutils/lib/coordinates/GeoCoordinates.ts");
const Box3Like_1 = __webpack_require__(/*! ../math/Box3Like */ "../harp-geoutils/lib/math/Box3Like.ts");
const MathUtils_1 = __webpack_require__(/*! ../math/MathUtils */ "../harp-geoutils/lib/math/MathUtils.ts");
const OrientedBox3Like_1 = __webpack_require__(/*! ../math/OrientedBox3Like */ "../harp-geoutils/lib/math/OrientedBox3Like.ts");
const EarthConstants_1 = __webpack_require__(/*! ./EarthConstants */ "../harp-geoutils/lib/projection/EarthConstants.ts");
const Projection_1 = __webpack_require__(/*! ./Projection */ "../harp-geoutils/lib/projection/Projection.ts");
const THREE = __webpack_require__(/*! three */ "three");
class EquirectangularProjection extends Projection_1.Projection {
    constructor() {
        super(...arguments);
        /** @override */
        this.type = Projection_1.ProjectionType.Planar;
    }
    /** @override */
    getScaleFactor(_worldPoint) {
        return 1;
    }
    /** @override */
    worldExtent(minAltitude, maxAltitude, result) {
        if (!result) {
            result = MathUtils_1.MathUtils.newEmptyBox3();
        }
        result.min.x = 0.0;
        result.min.y = 0.0;
        result.min.z = minAltitude;
        result.max.x = this.unitScale;
        result.max.y = this.unitScale / 2;
        result.max.z = maxAltitude;
        return result;
    }
    /** @override */
    projectPoint(geoPoint, result) {
        if (result === undefined) {
            /*
             * The following tslint:disable is due to the fact that the [[WorldCoordinates]]
             * might be a concrete class which is not available at runtime.
             * Consider the following example:
             *
             *  const x: THREE.Vector3 = new THREE.Vector3(0,0,0);
             *  const result = EquirectangularProjection.projectPoint<THREE.Vector3>(x);
             *
             * Note: type of `result` is Vector3Like and not as expected: THREE.Vector3!
             */
            // tslint:disable-next-line:no-object-literal-type-assertion
            result = { x: 0, y: 0, z: 0 };
        }
        result.x =
            (THREE.Math.degToRad(geoPoint.longitude) + Math.PI) *
                EquirectangularProjection.geoToWorldScale *
                this.unitScale;
        result.y =
            (THREE.Math.degToRad(geoPoint.latitude) + Math.PI * 0.5) *
                EquirectangularProjection.geoToWorldScale *
                this.unitScale;
        result.z = geoPoint.altitude || 0;
        return result;
    }
    /** @override */
    unprojectPoint(worldPoint) {
        const geoPoint = GeoCoordinates_1.GeoCoordinates.fromRadians((worldPoint.y * EquirectangularProjection.worldToGeoScale) / this.unitScale -
            Math.PI * 0.5, (worldPoint.x * EquirectangularProjection.worldToGeoScale) / this.unitScale - Math.PI, worldPoint.z);
        return geoPoint;
    }
    /** @override */
    unprojectAltitude(worldPoint) {
        return worldPoint.z;
    }
    /** @override */
    projectBox(geoBox, result) {
        const worldCenter = this.projectPoint(new GeoCoordinates_1.GeoCoordinates(geoBox.center.latitude, geoBox.center.longitude, 0));
        const { latitudeSpanInRadians, longitudeSpanInRadians, altitudeSpan } = geoBox;
        const sizeX = longitudeSpanInRadians * EquirectangularProjection.geoToWorldScale;
        const sizeY = latitudeSpanInRadians * EquirectangularProjection.geoToWorldScale;
        if (!result) {
            result = MathUtils_1.MathUtils.newEmptyBox3();
        }
        if (Box3Like_1.isBox3Like(result)) {
            result.min.x = worldCenter.x - sizeX * 0.5 * this.unitScale;
            result.min.y = worldCenter.y - sizeY * 0.5 * this.unitScale;
            result.max.x = worldCenter.x + sizeX * 0.5 * this.unitScale;
            result.max.y = worldCenter.y + sizeY * 0.5 * this.unitScale;
            if (altitudeSpan !== undefined) {
                result.min.z = worldCenter.z - altitudeSpan * 0.5;
                result.max.z = worldCenter.z + altitudeSpan * 0.5;
            }
            else {
                result.min.z = 0;
                result.max.z = 0;
            }
        }
        else if (OrientedBox3Like_1.isOrientedBox3Like(result)) {
            MathUtils_1.MathUtils.newVector3(1, 0, 0, result.xAxis);
            MathUtils_1.MathUtils.newVector3(0, 1, 0, result.yAxis);
            MathUtils_1.MathUtils.newVector3(0, 0, 1, result.zAxis);
            result.position.x = worldCenter.x;
            result.position.y = worldCenter.y;
            result.position.z = worldCenter.z;
            result.extents.x = sizeX * 0.5 * this.unitScale;
            result.extents.y = sizeY * 0.5 * this.unitScale;
            result.extents.z = Math.max(Number.EPSILON, (altitudeSpan || 0) * 0.5);
        }
        return result;
    }
    /** @override */
    unprojectBox(worldBox) {
        const minGeo = this.unprojectPoint(worldBox.min);
        const maxGeo = this.unprojectPoint(worldBox.max);
        return GeoBox_1.GeoBox.fromCoordinates(minGeo, maxGeo);
    }
    /** @override */
    groundDistance(worldPoint) {
        return worldPoint.z;
    }
    /** @override */
    scalePointToSurface(worldPoint) {
        worldPoint.z = 0;
        return worldPoint;
    }
    /** @override */
    surfaceNormal(_worldPoint, normal) {
        if (normal === undefined) {
            normal = { x: 0, y: 0, z: 1 };
        }
        else {
            normal.x = 0;
            normal.y = 0;
            normal.z = 1;
        }
        return normal;
    }
}
EquirectangularProjection.geoToWorldScale = 1.0 / (2.0 * Math.PI);
EquirectangularProjection.worldToGeoScale = (2.0 * Math.PI) / 1.0;
/**
 * Equirectangular [[Projection]] used to convert geo coordinates to unit coordinates and vice
 * versa.
 */
exports.normalizedEquirectangularProjection = new EquirectangularProjection(1);
/**
 * Equirectangular [[Projection]] used to convert geo coordinates to world coordinates and vice
 * versa.
 */
exports.equirectangularProjection = new EquirectangularProjection(EarthConstants_1.EarthConstants.EQUATORIAL_CIRCUMFERENCE);


/***/ }),

/***/ "../harp-geoutils/lib/projection/IdentityProjection.ts":
/*!*************************************************************!*\
  !*** ../harp-geoutils/lib/projection/IdentityProjection.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GeoBox_1 = __webpack_require__(/*! ../coordinates/GeoBox */ "../harp-geoutils/lib/coordinates/GeoBox.ts");
const GeoCoordinates_1 = __webpack_require__(/*! ../coordinates/GeoCoordinates */ "../harp-geoutils/lib/coordinates/GeoCoordinates.ts");
const Box3Like_1 = __webpack_require__(/*! ../math/Box3Like */ "../harp-geoutils/lib/math/Box3Like.ts");
const MathUtils_1 = __webpack_require__(/*! ../math/MathUtils */ "../harp-geoutils/lib/math/MathUtils.ts");
const OrientedBox3Like_1 = __webpack_require__(/*! ../math/OrientedBox3Like */ "../harp-geoutils/lib/math/OrientedBox3Like.ts");
const Projection_1 = __webpack_require__(/*! ./Projection */ "../harp-geoutils/lib/projection/Projection.ts");
const THREE = __webpack_require__(/*! three */ "three");
class IdentityProjection extends Projection_1.Projection {
    constructor() {
        super(...arguments);
        /** @override */
        this.type = Projection_1.ProjectionType.Planar;
    }
    /** @override */
    getScaleFactor(_worldPoint) {
        return 1;
    }
    /** @override */
    worldExtent(minAltitude, maxAltitude, result) {
        if (!result) {
            result = MathUtils_1.MathUtils.newEmptyBox3();
        }
        result.min.x = -Math.PI;
        result.min.y = -Math.PI * 0.5;
        result.min.z = minAltitude;
        result.max.x = Math.PI;
        result.max.y = Math.PI * 0.5;
        result.max.z = maxAltitude;
        return result;
    }
    /** @override */
    projectPoint(geoPoint, result) {
        if (!result) {
            // tslint:disable-next-line:no-object-literal-type-assertion
            result = { x: 0, y: 0, z: 0 };
        }
        result.x = THREE.Math.degToRad(geoPoint.longitude);
        result.y = THREE.Math.degToRad(geoPoint.latitude);
        result.z = geoPoint.altitude || 0;
        return result;
    }
    /** @override */
    unprojectPoint(worldPoint) {
        const geoPoint = GeoCoordinates_1.GeoCoordinates.fromRadians(worldPoint.y, worldPoint.x, worldPoint.z);
        return geoPoint;
    }
    /** @override */
    unprojectAltitude(worldPoint) {
        return worldPoint.z;
    }
    /** @override */
    projectBox(geoBox, result) {
        if (!result) {
            result = MathUtils_1.MathUtils.newEmptyBox3();
        }
        const min = this.projectPoint(new GeoCoordinates_1.GeoCoordinates(geoBox.south, geoBox.west, geoBox.minAltitude));
        const max = this.projectPoint(new GeoCoordinates_1.GeoCoordinates(geoBox.north, geoBox.east, geoBox.maxAltitude));
        if (Box3Like_1.isBox3Like(result)) {
            result.min.x = min.x;
            result.min.y = min.y;
            result.min.z = min.z;
            result.max.x = max.x;
            result.max.y = max.y;
            result.max.z = max.z;
        }
        else if (OrientedBox3Like_1.isOrientedBox3Like(result)) {
            MathUtils_1.MathUtils.newVector3(1, 0, 0, result.xAxis);
            MathUtils_1.MathUtils.newVector3(0, 1, 0, result.yAxis);
            MathUtils_1.MathUtils.newVector3(0, 0, 1, result.zAxis);
            result.position.x = (min.x + max.x) * 0.5;
            result.position.y = (min.y + max.y) * 0.5;
            result.position.z = (min.z + max.z) * 0.5;
            result.extents.x = (max.x - min.x) * 0.5;
            result.extents.y = (max.y - min.y) * 0.5;
            result.extents.z = Math.max(Number.EPSILON, (max.z - min.z) * 0.5);
        }
        return result;
    }
    /** @override */
    unprojectBox(worldBox) {
        const minGeo = this.unprojectPoint(worldBox.min);
        const maxGeo = this.unprojectPoint(worldBox.max);
        return GeoBox_1.GeoBox.fromCoordinates(minGeo, maxGeo);
    }
    /** @override */
    groundDistance(worldPoint) {
        return worldPoint.z;
    }
    /** @override */
    scalePointToSurface(worldPoint) {
        worldPoint.z = 0;
        return worldPoint;
    }
    /** @override */
    surfaceNormal(_worldPoint, normal) {
        if (normal === undefined) {
            normal = { x: 0, y: 0, z: 1 };
        }
        else {
            normal.x = 0;
            normal.y = 0;
            normal.z = 1;
        }
        return normal;
    }
}
/**
 * Identity [[Projection]] used to convert geo coordinates to unit coordinates and vice versa.
 */
exports.identityProjection = new IdentityProjection(1);


/***/ }),

/***/ "../harp-geoutils/lib/projection/MercatorProjection.ts":
/*!*************************************************************!*\
  !*** ../harp-geoutils/lib/projection/MercatorProjection.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GeoBox_1 = __webpack_require__(/*! ../coordinates/GeoBox */ "../harp-geoutils/lib/coordinates/GeoBox.ts");
const GeoCoordinates_1 = __webpack_require__(/*! ../coordinates/GeoCoordinates */ "../harp-geoutils/lib/coordinates/GeoCoordinates.ts");
const Box3Like_1 = __webpack_require__(/*! ../math/Box3Like */ "../harp-geoutils/lib/math/Box3Like.ts");
const MathUtils_1 = __webpack_require__(/*! ../math/MathUtils */ "../harp-geoutils/lib/math/MathUtils.ts");
const OrientedBox3Like_1 = __webpack_require__(/*! ../math/OrientedBox3Like */ "../harp-geoutils/lib/math/OrientedBox3Like.ts");
const EarthConstants_1 = __webpack_require__(/*! ./EarthConstants */ "../harp-geoutils/lib/projection/EarthConstants.ts");
const Projection_1 = __webpack_require__(/*! ./Projection */ "../harp-geoutils/lib/projection/Projection.ts");
class MercatorProjection extends Projection_1.Projection {
    constructor() {
        super(...arguments);
        /** @override */
        this.type = Projection_1.ProjectionType.Planar;
    }
    static clamp(val, min, max) {
        return Math.min(Math.max(min, val), max);
    }
    static latitudeClamp(latitude) {
        return MercatorProjection.clamp(latitude, -MercatorConstants.MAXIMUM_LATITUDE, MercatorConstants.MAXIMUM_LATITUDE);
    }
    static latitudeProject(latitude) {
        return Math.log(Math.tan(Math.PI * 0.25 + latitude * 0.5)) / Math.PI;
    }
    static latitudeClampProject(latitude) {
        return MercatorProjection.latitudeProject(MercatorProjection.latitudeClamp(latitude));
    }
    static unprojectLatitude(y) {
        return 2.0 * Math.atan(Math.exp(Math.PI * y)) - Math.PI * 0.5;
    }
    /** @override */
    getScaleFactor(worldPoint) {
        return Math.cosh(2 * Math.PI * (worldPoint.y / this.unitScale - 0.5));
    }
    /** @override */
    worldExtent(minAltitude, maxAltitude, result) {
        if (!result) {
            result = MathUtils_1.MathUtils.newEmptyBox3();
        }
        result.min.x = 0;
        result.min.y = 0;
        result.min.z = minAltitude;
        result.max.x = this.unitScale;
        result.max.y = this.unitScale;
        result.max.z = maxAltitude;
        return result;
    }
    /** @override */
    projectPoint(geoPointLike, result) {
        let geoPoint;
        if (geoPointLike instanceof GeoCoordinates_1.GeoCoordinates) {
            geoPoint = geoPointLike;
        }
        else {
            geoPoint = new GeoCoordinates_1.GeoCoordinates(geoPointLike.latitude, geoPointLike.longitude, geoPointLike.altitude);
        }
        if (!result) {
            // tslint:disable-next-line:no-object-literal-type-assertion
            result = { x: 0, y: 0, z: 0 };
        }
        result.x = ((geoPoint.longitude + 180) / 360) * this.unitScale;
        result.y =
            (MercatorProjection.latitudeClampProject(geoPoint.latitudeInRadians) * 0.5 + 0.5) *
                this.unitScale;
        result.z = geoPoint.altitude || 0;
        return result;
    }
    /** @override */
    unprojectPoint(worldPoint) {
        const geoPoint = GeoCoordinates_1.GeoCoordinates.fromRadians(MercatorProjection.unprojectLatitude((worldPoint.y / this.unitScale - 0.5) * 2.0), (worldPoint.x / this.unitScale) * 2 * Math.PI - Math.PI, worldPoint.z);
        return geoPoint;
    }
    /** @override */
    unprojectAltitude(worldPoint) {
        return worldPoint.z;
    }
    /** @override */
    projectBox(geoBox, result) {
        const worldCenter = this.projectPoint(geoBox.center);
        const worldNorth = (MercatorProjection.latitudeClampProject(geoBox.northEast.latitudeInRadians) * 0.5 +
            0.5) *
            this.unitScale;
        const worldSouth = (MercatorProjection.latitudeClampProject(geoBox.southWest.latitudeInRadians) * 0.5 +
            0.5) *
            this.unitScale;
        const worldYCenter = (worldNorth + worldSouth) * 0.5;
        worldCenter.y = worldYCenter;
        const latitudeSpan = worldNorth - worldSouth;
        const longitudeSpan = (geoBox.longitudeSpan / 360) * this.unitScale;
        if (!result) {
            result = MathUtils_1.MathUtils.newEmptyBox3();
        }
        if (Box3Like_1.isBox3Like(result)) {
            result.min.x = worldCenter.x - longitudeSpan * 0.5;
            result.min.y = worldCenter.y - latitudeSpan * 0.5;
            result.max.x = worldCenter.x + longitudeSpan * 0.5;
            result.max.y = worldCenter.y + latitudeSpan * 0.5;
            const altitudeSpan = geoBox.altitudeSpan;
            if (altitudeSpan !== undefined) {
                result.min.z = worldCenter.z - altitudeSpan * 0.5;
                result.max.z = worldCenter.z + altitudeSpan * 0.5;
            }
            else {
                result.min.z = 0;
                result.max.z = 0;
            }
        }
        else if (OrientedBox3Like_1.isOrientedBox3Like(result)) {
            MathUtils_1.MathUtils.newVector3(1, 0, 0, result.xAxis);
            MathUtils_1.MathUtils.newVector3(0, 1, 0, result.yAxis);
            MathUtils_1.MathUtils.newVector3(0, 0, 1, result.zAxis);
            result.position.x = worldCenter.x;
            result.position.y = worldCenter.y;
            result.position.z = worldCenter.z;
            result.extents.x = longitudeSpan * 0.5;
            result.extents.y = latitudeSpan * 0.5;
            result.extents.z = Math.max(Number.EPSILON, (geoBox.altitudeSpan || 0) * 0.5);
        }
        else {
            throw new Error("invalid bounding box");
        }
        return result;
    }
    /** @override */
    unprojectBox(worldBox) {
        const minGeo = this.unprojectPoint(worldBox.min);
        const maxGeo = this.unprojectPoint(worldBox.max);
        const geoBox = GeoBox_1.GeoBox.fromCoordinates(minGeo, maxGeo);
        return geoBox;
    }
    /** @override */
    groundDistance(worldPoint) {
        return worldPoint.z;
    }
    /** @override */
    scalePointToSurface(worldPoint) {
        worldPoint.z = 0;
        return worldPoint;
    }
    /** @override */
    surfaceNormal(_worldPoint, normal) {
        if (normal === undefined) {
            normal = { x: 0, y: 0, z: 1 };
        }
        else {
            normal.x = 0;
            normal.y = 0;
            normal.z = 1;
        }
        return normal;
    }
    /** @override */
    reprojectPoint(sourceProjection, worldPos, result) {
        // this implementation of [[reprojectPoint]] supports both
        // [[WebMercatorProjection]] and [[MercatorProjection]]. The only
        // difference betweeen these two variants of WEB Mercator
        // is in the orientation of the Y axis, so we just flip Y coordinates
        // when reprojecting between them.
        if (sourceProjection !== this &&
            (sourceProjection === exports.webMercatorProjection || sourceProjection === exports.mercatorProjection)) {
            if (result === undefined) {
                // tslint:disable-next-line: no-object-literal-type-assertion
                result = {};
            }
            result.x = worldPos.x;
            result.y = this.unitScale - worldPos.y;
            result.z = worldPos.z;
            return result;
        }
        return super.reprojectPoint(sourceProjection, worldPos, result);
    }
}
class WebMercatorProjection extends MercatorProjection {
    /** @override */
    projectPoint(geoPointLike, result) {
        let geoPoint;
        if (geoPointLike instanceof GeoCoordinates_1.GeoCoordinates) {
            geoPoint = geoPointLike;
        }
        else {
            geoPoint = new GeoCoordinates_1.GeoCoordinates(geoPointLike.latitude, geoPointLike.longitude, geoPointLike.altitude);
        }
        /*
         * The following tslint:disable is due to the fact that the [[WorldCoordinates]]
         * might be a concrete class which is not available at runtime.
         * Consider the following example:
         *
         *  const x: THREE.Vector3 = new THREE.Vector3(0,0,0);
         *  const result = EquirectangularProjection.projectPoint<THREE.Vector3>(x);
         *
         * Note: type of `result` is Vector3Like and not as expected: THREE.Vector3!
         */
        if (!result) {
            // tslint:disable-next-line:no-object-literal-type-assertion
            result = { x: 0, y: 0, z: 0 };
        }
        result.x = ((geoPoint.longitude + 180) / 360) * this.unitScale;
        const sy = Math.sin(MercatorProjection.latitudeClamp(geoPoint.latitudeInRadians));
        result.y = (0.5 - Math.log((1 + sy) / (1 - sy)) / (4 * Math.PI)) * this.unitScale;
        result.z = geoPoint.altitude || 0;
        return result;
    }
    /** @override */
    unprojectPoint(worldPoint) {
        const x = worldPoint.x / this.unitScale - 0.5;
        const y = 0.5 - worldPoint.y / this.unitScale;
        const longitude = 360 * x;
        const latitude = 90 - (360 * Math.atan(Math.exp(-y * 2 * Math.PI))) / Math.PI;
        return new GeoCoordinates_1.GeoCoordinates(latitude, longitude, worldPoint.z);
    }
    /** @override */
    projectBox(geoBox, result) {
        const r = super.projectBox(geoBox, result);
        if (Box3Like_1.isBox3Like(r)) {
            // Invert the y axis for web mercator, this means that max => min & min => max
            const maxY = r.max.y;
            r.max.y = this.unitScale - r.min.y;
            r.min.y = this.unitScale - maxY;
        }
        else if (OrientedBox3Like_1.isOrientedBox3Like(r)) {
            MathUtils_1.MathUtils.newVector3(1, 0, 0, r.xAxis);
            MathUtils_1.MathUtils.newVector3(0, -1, 0, r.yAxis);
            MathUtils_1.MathUtils.newVector3(0, 0, -1, r.zAxis);
            r.position.y = this.unitScale - r.position.y;
        }
        return r;
    }
    /** @override */
    unprojectBox(worldBox) {
        const minGeo = this.unprojectPoint(worldBox.min);
        const maxGeo = this.unprojectPoint(worldBox.max);
        const geoBox = new GeoBox_1.GeoBox(new GeoCoordinates_1.GeoCoordinates(maxGeo.latitude, minGeo.longitude, minGeo.altitude), new GeoCoordinates_1.GeoCoordinates(minGeo.latitude, maxGeo.longitude, maxGeo.altitude));
        return geoBox;
    }
    /** @override */
    surfaceNormal(_worldPoint, normal) {
        if (normal === undefined) {
            normal = { x: 0, y: 0, z: -1 };
        }
        else {
            normal.x = 0;
            normal.y = 0;
            normal.z = -1;
        }
        return normal;
    }
    /** @override */
    localTangentSpace(geoPoint, result) {
        this.projectPoint(geoPoint, result.position);
        MathUtils_1.MathUtils.newVector3(1, 0, 0, result.xAxis);
        MathUtils_1.MathUtils.newVector3(0, -1, 0, result.yAxis);
        MathUtils_1.MathUtils.newVector3(0, 0, -1, result.zAxis);
        return result;
    }
}
class MercatorConstants {
}
exports.MercatorConstants = MercatorConstants;
// Math.atan(Math.sinh(Math.PI))
MercatorConstants.MAXIMUM_LATITUDE = 1.4844222297453323;
/**
 * Mercator [[Projection]] used to convert geo coordinates to world coordinates and vice versa.
 */
exports.mercatorProjection = new MercatorProjection(EarthConstants_1.EarthConstants.EQUATORIAL_CIRCUMFERENCE);
/**
 * Web Mercator [[Projection]] used to convert geo coordinates to world coordinates and vice versa.
 */
exports.webMercatorProjection = new WebMercatorProjection(EarthConstants_1.EarthConstants.EQUATORIAL_CIRCUMFERENCE);


/***/ }),

/***/ "../harp-geoutils/lib/projection/Projection.ts":
/*!*****************************************************!*\
  !*** ../harp-geoutils/lib/projection/Projection.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtils_1 = __webpack_require__(/*! ../math/MathUtils */ "../harp-geoutils/lib/math/MathUtils.ts");
/**
 * The type of projection.
 */
var ProjectionType;
(function (ProjectionType) {
    /**
     * A type of [Projection] with zero curvature.
     */
    ProjectionType[ProjectionType["Planar"] = 0] = "Planar";
    /**
     * A spherical [Projection].
     */
    ProjectionType[ProjectionType["Spherical"] = 1] = "Spherical";
})(ProjectionType = exports.ProjectionType || (exports.ProjectionType = {}));
/**
 * `Projection` is used to convert positions from geo coordinates to world coordinates and vice
 * versa.
 */
class Projection {
    /**
     * Constructs the Projection
     *
     * @param unitScale How to transform the projected coordinates to world units.
     */
    constructor(unitScale) {
        this.unitScale = unitScale;
        //Prevent empty constructor error.
    }
    /**
     * Gets the [[TransformLike]] of the local tangent space at the given geo coordinates.
     *
     * @param geoPoint The geo coordinates.
     * @param result The [[TransformLike]].
     */
    localTangentSpace(geoPoint, result) {
        this.projectPoint(geoPoint, result.position);
        MathUtils_1.MathUtils.newVector3(1, 0, 0, result.xAxis);
        MathUtils_1.MathUtils.newVector3(0, 1, 0, result.yAxis);
        MathUtils_1.MathUtils.newVector3(0, 0, 1, result.zAxis);
        return result;
    }
    /**
     * Reproject a world position from the given source [[Projection]].
     * Implementations should be aware of worldPos and result may be one object
     *
     * @param sourceProjection The source projection.
     * @param worldPos A valid position in the world space defined by the source projection.
     * @param result The resulting position reprojected using this [[Projection]].
     * @hidden
     */
    reprojectPoint(sourceProjection, worldPos, result) {
        if (sourceProjection === this) {
            if (result === undefined) {
                return { x: worldPos.x, y: worldPos.y, z: worldPos.z };
            }
            result.x = worldPos.x;
            result.y = worldPos.y;
            result.z = worldPos.z;
            return result;
        }
        return this.projectPoint(sourceProjection.unprojectPoint(worldPos), result);
    }
}
exports.Projection = Projection;


/***/ }),

/***/ "../harp-geoutils/lib/projection/SphereProjection.ts":
/*!***********************************************************!*\
  !*** ../harp-geoutils/lib/projection/SphereProjection.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GeoCoordinates_1 = __webpack_require__(/*! ../coordinates/GeoCoordinates */ "../harp-geoutils/lib/coordinates/GeoCoordinates.ts");
const Box3Like_1 = __webpack_require__(/*! ../math/Box3Like */ "../harp-geoutils/lib/math/Box3Like.ts");
const MathUtils_1 = __webpack_require__(/*! ../math/MathUtils */ "../harp-geoutils/lib/math/MathUtils.ts");
const OrientedBox3Like_1 = __webpack_require__(/*! ../math/OrientedBox3Like */ "../harp-geoutils/lib/math/OrientedBox3Like.ts");
const EarthConstants_1 = __webpack_require__(/*! ./EarthConstants */ "../harp-geoutils/lib/projection/EarthConstants.ts");
const MercatorProjection_1 = __webpack_require__(/*! ./MercatorProjection */ "../harp-geoutils/lib/projection/MercatorProjection.ts");
const Projection_1 = __webpack_require__(/*! ./Projection */ "../harp-geoutils/lib/projection/Projection.ts");
const THREE = __webpack_require__(/*! three */ "three");
/**
 * Transforms the given vector using the provided basis.
 */
function apply(xAxis, yAxis, zAxis, v) {
    const x = xAxis.x * v.x + yAxis.x * v.y + zAxis.x * v.z;
    const y = xAxis.y * v.x + yAxis.y * v.y + zAxis.y * v.z;
    const z = xAxis.z * v.x + yAxis.z * v.y + zAxis.z * v.z;
    v.x = x;
    v.y = y;
    v.z = z;
    return v;
}
/**
 * Returns the quadrants for the given longitude. The quadrant is defined as:
 *  - quadrant(+Math.PI * -1.0) = 0
 *  - quadrant(+Math.PI * -0.5) = 1
 *  - quadrant(+Math.PI *  0.0) = 2
 *  - quadrant(+Math.PI *  0.5) = 3
 *  - quadrant(+Math.PI *  1.0) = 4
 *
 * @param longitude The longitude in radians.
 */
function getLongitudeQuadrant(longitude) {
    const oneOverPI = 1 / Math.PI;
    const quadrantIndex = Math.floor(2 * (longitude * oneOverPI + 1));
    return THREE.Math.clamp(quadrantIndex, 0, 4);
}
function lengthOfVector3(worldPoint) {
    const d = Math.sqrt(worldPoint.x * worldPoint.x + worldPoint.y * worldPoint.y + worldPoint.z * worldPoint.z);
    return d;
}
/**
 * Creates a Box3 enclosing the geobox.
 *
 * @param geoBox Ghe given geobox
 * @param worldBox The resulting axis aligned bounding box.
 */
function makeBox3(geoBox, worldBox, unitScale) {
    const halfEquatorialRadius = (unitScale + (geoBox.maxAltitude || 0)) * 0.5;
    const minLongitude = THREE.Math.degToRad(geoBox.west);
    const maxLongitude = THREE.Math.degToRad(geoBox.east);
    const minLongitudeQuadrant = getLongitudeQuadrant(minLongitude);
    const maxLongitudeQuadrant = getLongitudeQuadrant(maxLongitude);
    let xMin = Math.cos(minLongitude);
    let xMax = xMin;
    let yMin = Math.sin(minLongitude);
    let yMax = yMin;
    for (let quadrantIndex = minLongitudeQuadrant + 1; quadrantIndex <= maxLongitudeQuadrant; quadrantIndex++) {
        // tslint:disable-next-line: no-bitwise
        const x = ((quadrantIndex + 1) & 1) * ((quadrantIndex & 2) - 1);
        xMin = Math.min(x, xMin);
        xMax = Math.max(x, xMax);
        // tslint:disable-next-line: no-bitwise
        const y = (quadrantIndex & 1) * ((quadrantIndex & 2) - 1);
        yMin = Math.min(y, yMin);
        yMax = Math.max(y, yMax);
    }
    const cosMaxLongitude = Math.cos(maxLongitude);
    xMin = Math.min(cosMaxLongitude, xMin);
    xMax = Math.max(cosMaxLongitude, xMax);
    const sinMaxLongitude = Math.sin(maxLongitude);
    yMin = Math.min(sinMaxLongitude, yMin);
    yMax = Math.max(sinMaxLongitude, yMax);
    const xCenter = (xMax + xMin) * halfEquatorialRadius;
    const xExtent = (xMax - xMin) * halfEquatorialRadius;
    const yCenter = (yMax + yMin) * halfEquatorialRadius;
    const yExtent = (yMax - yMin) * halfEquatorialRadius;
    // Calculate Z boundaries.
    const minLatitude = THREE.Math.degToRad(geoBox.south);
    const maxLatutide = THREE.Math.degToRad(geoBox.north);
    const zMax = Math.sin(maxLatutide);
    const zMin = Math.sin(minLatitude);
    const zCenter = (zMax + zMin) * halfEquatorialRadius;
    const zExtent = (zMax - zMin) * halfEquatorialRadius;
    worldBox.min.x = xCenter - xExtent;
    worldBox.min.y = yCenter - yExtent;
    worldBox.min.z = zCenter - zExtent;
    worldBox.max.x = xCenter + xExtent;
    worldBox.max.y = yCenter + yExtent;
    worldBox.max.z = zCenter + zExtent;
    return worldBox;
}
/**
 * Computes the spherical projection of the given geo coordinates.
 *
 * @param geoPoint The geo coordinates.
 * @param worldpoint The resulting world coordinates.
 */
function project(geoPoint, worldpoint, unitScale) {
    const radius = unitScale + (geoPoint.altitude || 0);
    const latitude = THREE.Math.degToRad(geoPoint.latitude);
    const longitude = THREE.Math.degToRad(geoPoint.longitude);
    const cosLatitude = Math.cos(latitude);
    worldpoint.x = radius * cosLatitude * Math.cos(longitude);
    worldpoint.y = radius * cosLatitude * Math.sin(longitude);
    worldpoint.z = radius * Math.sin(latitude);
    return worldpoint;
}
class SphereProjection extends Projection_1.Projection {
    constructor() {
        super(...arguments);
        /** @override */
        this.type = Projection_1.ProjectionType.Spherical;
    }
    /** @override */
    worldExtent(_minElevation, maxElevation, result = MathUtils_1.MathUtils.newEmptyBox3()) {
        const radius = this.unitScale + maxElevation;
        result.min.x = -radius;
        result.min.y = -radius;
        result.min.z = -radius;
        result.max.x = radius;
        result.max.y = radius;
        result.max.z = radius;
        return result;
    }
    /** @override */
    projectPoint(geoPoint, result = MathUtils_1.MathUtils.newVector3(0, 0, 0)) {
        return project(geoPoint, result, this.unitScale);
    }
    /** @override */
    unprojectPoint(point) {
        const parallelRadiusSq = point.x * point.x + point.y * point.y;
        const parallelRadius = Math.sqrt(parallelRadiusSq);
        const v = point.z / parallelRadius;
        if (isNaN(v)) {
            return GeoCoordinates_1.GeoCoordinates.fromRadians(0, 0, -this.unitScale);
        }
        const radius = Math.sqrt(parallelRadiusSq + point.z * point.z);
        return GeoCoordinates_1.GeoCoordinates.fromRadians(Math.atan(v), Math.atan2(point.y, point.x), radius - this.unitScale);
    }
    /** @override */
    unprojectAltitude(point) {
        const parallelRadiusSq = point.x * point.x + point.y * point.y + point.z * point.z;
        return Math.sqrt(parallelRadiusSq) - EarthConstants_1.EarthConstants.EQUATORIAL_RADIUS;
    }
    /** @override */
    projectBox(geoBox, result = MathUtils_1.MathUtils.newEmptyBox3()) {
        if (Box3Like_1.isBox3Like(result)) {
            return makeBox3(geoBox, result, this.unitScale);
        }
        else if (OrientedBox3Like_1.isOrientedBox3Like(result)) {
            if (geoBox.longitudeSpan >= 90) {
                const bounds = makeBox3(geoBox, MathUtils_1.MathUtils.newEmptyBox3(), this.unitScale);
                MathUtils_1.MathUtils.newVector3(1, 0, 0, result.xAxis);
                MathUtils_1.MathUtils.newVector3(0, 1, 0, result.yAxis);
                MathUtils_1.MathUtils.newVector3(0, 0, 1, result.zAxis);
                result.position.x = (bounds.max.x + bounds.min.x) * 0.5;
                result.position.y = (bounds.max.y + bounds.min.y) * 0.5;
                result.position.z = (bounds.max.z + bounds.min.z) * 0.5;
                result.extents.x = (bounds.max.x - bounds.min.x) * 0.5;
                result.extents.y = (bounds.max.y - bounds.min.y) * 0.5;
                result.extents.z = (bounds.max.z - bounds.min.z) * 0.5;
                return result;
            }
            const { south, west, north, east, center: mid } = geoBox;
            const midX = mid.longitude;
            const midY = mid.latitude;
            const cosSouth = Math.cos(THREE.Math.degToRad(south));
            const sinSouth = Math.sin(THREE.Math.degToRad(south));
            const cosWest = Math.cos(THREE.Math.degToRad(west));
            const sinWest = Math.sin(THREE.Math.degToRad(west));
            const cosNorth = Math.cos(THREE.Math.degToRad(north));
            const sinNorth = Math.sin(THREE.Math.degToRad(north));
            const cosEast = Math.cos(THREE.Math.degToRad(east));
            const sinEast = Math.sin(THREE.Math.degToRad(east));
            const cosMidX = Math.cos(THREE.Math.degToRad(midX));
            const sinMidX = Math.sin(THREE.Math.degToRad(midX));
            const cosMidY = Math.cos(THREE.Math.degToRad(midY));
            const sinMidY = Math.sin(THREE.Math.degToRad(midY));
            // Build the orientation of the OBB using the normal vector and its partial derivates.
            // the sperical coordinates of the mid point of the geobox.
            MathUtils_1.MathUtils.newVector3(cosMidX * cosMidY, sinMidX * cosMidY, sinMidY, result.zAxis);
            // the partial derivates of the normal vector.
            MathUtils_1.MathUtils.newVector3(-sinMidX, cosMidX, 0, result.xAxis);
            MathUtils_1.MathUtils.newVector3(-cosMidX * sinMidY, -sinMidX * sinMidY, cosMidY, result.yAxis);
            let width;
            let minY;
            let maxY;
            if (south >= 0) {
                // abs(dot(southWest - southEast, xAxis))
                width = Math.abs(cosSouth * (cosMidX * (sinWest - sinEast) + sinMidX * (cosEast - cosWest)));
                // dot(south, yAxis)
                minY = cosMidY * sinSouth - sinMidY * cosSouth;
                // dot(northEast, zAxis)
                maxY =
                    cosMidY * sinNorth -
                        sinMidY * cosNorth * (cosMidX * cosEast + sinMidX * sinEast);
            }
            else {
                if (north <= 0) {
                    // abs(dot(northWest - northEast, xAxis))
                    width = Math.abs(cosNorth * (cosMidX * (sinWest - sinEast) + sinMidX * (cosEast - cosWest)));
                    // dot(north, yAxis)
                    maxY = cosMidY * sinNorth - sinMidY * cosNorth;
                }
                else {
                    // abs(dot(west - east, xAxis))
                    width = Math.abs(cosMidX * (sinWest - sinEast) + sinMidX * (cosEast - cosWest));
                    // dot(northEast, yAxis)
                    maxY =
                        cosMidY * sinNorth -
                            sinMidY * cosNorth * (sinMidX * sinEast + cosMidX * cosEast);
                }
                // dot(southEast, yAxis)
                minY =
                    cosMidY * sinSouth -
                        sinMidY * cosSouth * (cosMidX * cosEast + sinMidX * sinEast);
            }
            const rMax = (this.unitScale + (geoBox.maxAltitude || 0)) * 0.5;
            const rMin = (this.unitScale + (geoBox.minAltitude || 0)) * 0.5;
            // min(dot(southEast, zAxis), dot(northEast, zAxis))
            const d = cosMidY * (cosMidX * cosEast + sinMidX * sinEast);
            const minZ = Math.min(cosNorth * d + sinNorth * sinMidY, cosSouth * d + sinSouth * sinMidY);
            MathUtils_1.MathUtils.newVector3(width * rMax, (maxY - minY) * rMax, rMax - minZ * rMin, result.extents);
            MathUtils_1.MathUtils.newVector3(0, (minY + maxY) * rMax, rMax + rMax, result.position);
            apply(result.xAxis, result.yAxis, result.zAxis, result.position);
            result.position.x = result.position.x - result.zAxis.x * result.extents.z;
            result.position.y = result.position.y - result.zAxis.y * result.extents.z;
            result.position.z = result.position.z - result.zAxis.z * result.extents.z;
            return result;
        }
        throw new Error("Invalid bounding box");
    }
    /** @override */
    unprojectBox(_worldBox) {
        throw new Error("Method not implemented.");
    }
    /** @override */
    getScaleFactor(_worldPoint) {
        return 1;
    }
    /** @override */
    groundDistance(worldPoint) {
        return lengthOfVector3(worldPoint) - this.unitScale;
    }
    /** @override */
    scalePointToSurface(worldPoint) {
        const scale = this.unitScale / (lengthOfVector3(worldPoint) || 1);
        worldPoint.x *= scale;
        worldPoint.y *= scale;
        worldPoint.z *= scale;
        return worldPoint;
    }
    /** @override */
    surfaceNormal(worldPoint, normal) {
        if (normal === undefined) {
            normal = { x: 0, y: 0, z: 0 };
        }
        const scale = 1 / (lengthOfVector3(worldPoint) || 1);
        normal.x = worldPoint.x * scale;
        normal.y = worldPoint.y * scale;
        normal.z = worldPoint.z * scale;
        return normal;
    }
    /** @override */
    reprojectPoint(sourceProjection, worldPos, result) {
        if (sourceProjection === MercatorProjection_1.mercatorProjection || sourceProjection === MercatorProjection_1.webMercatorProjection) {
            const { x, y, z } = worldPos;
            const r = this.unitScale;
            const mx = x / r - Math.PI;
            const my = y / r - Math.PI;
            const w = Math.exp(my);
            const d = w * w;
            const gx = (2 * w) / (d + 1);
            const gy = (d - 1) / (d + 1);
            const scale = r + z;
            if (result === undefined) {
                // tslint:disable-next-line: no-object-literal-type-assertion
                result = {};
            }
            result.x = Math.cos(mx) * gx * scale;
            result.y = Math.sin(mx) * gx * scale;
            result.z = gy * scale;
            if (sourceProjection === MercatorProjection_1.webMercatorProjection) {
                result.z = -result.z;
            }
            return result;
        }
        return super.reprojectPoint(sourceProjection, worldPos, result);
    }
    /** @override */
    localTangentSpace(geoPoint, result) {
        const latitude = THREE.Math.degToRad(geoPoint.latitude);
        const longitude = THREE.Math.degToRad(geoPoint.longitude);
        const cosLongitude = Math.cos(longitude);
        const sinLongitude = Math.sin(longitude);
        const cosLatitude = Math.cos(latitude);
        const sinLatitude = Math.sin(latitude);
        MathUtils_1.MathUtils.newVector3(cosLongitude * cosLatitude, sinLongitude * cosLatitude, sinLatitude, result.zAxis);
        MathUtils_1.MathUtils.newVector3(-sinLongitude, cosLongitude, 0, result.xAxis);
        MathUtils_1.MathUtils.newVector3(-cosLongitude * sinLatitude, -sinLongitude * sinLatitude, cosLatitude, result.yAxis);
        this.projectPoint(geoPoint, result.position);
        return result;
    }
}
exports.sphereProjection = new SphereProjection(EarthConstants_1.EarthConstants.EQUATORIAL_RADIUS);


/***/ }),

/***/ "../harp-geoutils/lib/projection/TransverseMercatorProjection.ts":
/*!***********************************************************************!*\
  !*** ../harp-geoutils/lib/projection/TransverseMercatorProjection.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GeoBox_1 = __webpack_require__(/*! ../coordinates/GeoBox */ "../harp-geoutils/lib/coordinates/GeoBox.ts");
const GeoCoordinates_1 = __webpack_require__(/*! ../coordinates/GeoCoordinates */ "../harp-geoutils/lib/coordinates/GeoCoordinates.ts");
const Box3Like_1 = __webpack_require__(/*! ../math/Box3Like */ "../harp-geoutils/lib/math/Box3Like.ts");
const MathUtils_1 = __webpack_require__(/*! ../math/MathUtils */ "../harp-geoutils/lib/math/MathUtils.ts");
const OrientedBox3Like_1 = __webpack_require__(/*! ../math/OrientedBox3Like */ "../harp-geoutils/lib/math/OrientedBox3Like.ts");
const EarthConstants_1 = __webpack_require__(/*! ./EarthConstants */ "../harp-geoutils/lib/projection/EarthConstants.ts");
const Projection_1 = __webpack_require__(/*! ./Projection */ "../harp-geoutils/lib/projection/Projection.ts");
/**
 *
 * https://en.wikipedia.org/wiki/Transverse_Mercator_projection
 * http://mathworld.wolfram.com/MercatorProjection.html
 *
 */
class TransverseMercatorProjection extends Projection_1.Projection {
    constructor(unitScale) {
        super(unitScale);
        this.unitScale = unitScale;
        /** @override */
        this.type = Projection_1.ProjectionType.Planar;
        this.m_phi0 = 0;
        this.m_lambda0 = 0;
    }
    /**
     * Like in regular Mercator projection, there are two points on sphere
     * with radius about 5 degrees, that is out of projected space.
     *
     *
     * in regular Mercator these points are:
     *     (90, any), (-90, any)
     *
     * and in transverse Mercator:
     *     (0, 90), (0, -90)
     *
     * So, in transverse we need to compute distnce to poles, and clamp if
     * radius is exceeded
     */
    static clampGeoPoint(geoPoint, _unitScale) {
        const lat = geoPoint.latitude;
        const lon = geoPoint.longitude;
        const r = TransverseMercatorUtils.POLE_RADIUS;
        const rsq = TransverseMercatorUtils.POLE_RADIUS_SQ;
        const nearestQuarter = Math.round(lon / 90);
        const deltaLon = nearestQuarter * 90 - lon;
        if (nearestQuarter % 2 === 0 || Math.abs(deltaLon) > r) {
            return geoPoint;
        }
        const deltaLat = lat - 0;
        const distanceToPoleSq = deltaLon * deltaLon + deltaLat * deltaLat;
        if (distanceToPoleSq < rsq) {
            const distanceToPole = Math.sqrt(distanceToPoleSq);
            const scale = (r - distanceToPole) / distanceToPole;
            // const quarter = ((nearestQuarter % 4) + 4) % 4;
            // const dir = quarter === 1 ? -1 : quarter === 3 ? 1 : 0;
            const dir = 1;
            const offsetLon = deltaLon === 0 && deltaLat === 0 ? r * dir : deltaLon;
            return new GeoCoordinates_1.GeoCoordinates(lat + deltaLat * scale, lon + offsetLon * scale);
        }
        return geoPoint;
    }
    /** @override */
    getScaleFactor(worldPoint) {
        return Math.cosh((worldPoint.x / this.unitScale - 0.5) * 2 * Math.PI);
    }
    /** @override */
    worldExtent(minAltitude, maxAltitude, result) {
        if (!result) {
            result = MathUtils_1.MathUtils.newEmptyBox3();
        }
        result.min.x = 0;
        result.min.y = 0;
        result.min.z = minAltitude;
        result.max.x = this.unitScale;
        result.max.y = this.unitScale;
        result.max.z = maxAltitude;
        return result;
    }
    /** @override */
    projectPoint(geoPoint, result) {
        if (!result) {
            // tslint:disable-next-line:no-object-literal-type-assertion
            result = { x: 0, y: 0, z: 0 };
        }
        const clamped = TransverseMercatorProjection.clampGeoPoint(geoPoint, this.unitScale);
        const normalLon = clamped.longitude / 360 + 0.5;
        const offset = normalLon === 1 ? 0 : Math.floor(normalLon);
        const phi = MathUtils_1.MathUtils.degToRad(clamped.latitude);
        const lambda = MathUtils_1.MathUtils.degToRad(clamped.longitude - offset * 360) - this.m_lambda0;
        const B = Math.cos(phi) * Math.sin(lambda);
        // result.x = 1/2 * Math.log((1 + B) / (1 - B));
        result.x = Math.atanh(B);
        result.y = Math.atan2(Math.tan(phi), Math.cos(lambda)) - this.m_phi0;
        const outScale = 0.5 / Math.PI;
        result.x = this.unitScale * (MathUtils_1.MathUtils.clamp(result.x * outScale + 0.5, 0, 1) + offset);
        result.y = this.unitScale * MathUtils_1.MathUtils.clamp(result.y * outScale + 0.5, 0, 1);
        result.z = geoPoint.altitude || 0;
        return result;
    }
    /** @override */
    unprojectPoint(worldPoint) {
        const tau = Math.PI * 2;
        const nx = worldPoint.x / this.unitScale;
        const ny = worldPoint.y / this.unitScale;
        const offset = nx === 1 ? 0 : Math.floor(nx);
        const x = tau * (nx - 0.5 - offset);
        const y = tau * (ny - 0.5);
        const z = worldPoint.z || 0;
        const D = y + this.m_phi0;
        const phi = Math.asin(Math.sin(D) / Math.cosh(x));
        const lambda = this.m_lambda0 + Math.atan2(Math.sinh(x), Math.cos(D)) + offset * tau;
        const geoPoint = GeoCoordinates_1.GeoCoordinates.fromRadians(phi, lambda, z);
        return geoPoint;
    }
    /** @override */
    projectBox(geoBox, result) {
        const { north, south, east, west } = geoBox;
        const pointsToCheck = [
            geoBox.center,
            geoBox.northEast,
            geoBox.southWest,
            new GeoCoordinates_1.GeoCoordinates(south, east),
            new GeoCoordinates_1.GeoCoordinates(north, west)
        ];
        const E = TransverseMercatorUtils.POLE_EDGE_DEG;
        const containsWestCut = west < -90 && east > -90;
        const containsEastCut = west < 90 && east > 90;
        const containsCenterX = west < 0 && east > 0;
        const containsCenterY = west < E && east > -E && north > 0 && south < 0;
        if (containsWestCut) {
            pointsToCheck.push(new GeoCoordinates_1.GeoCoordinates(north, -90));
            pointsToCheck.push(new GeoCoordinates_1.GeoCoordinates(south, -90));
        }
        if (containsEastCut) {
            pointsToCheck.push(new GeoCoordinates_1.GeoCoordinates(north, 90));
            pointsToCheck.push(new GeoCoordinates_1.GeoCoordinates(south, 90));
        }
        if (containsCenterX) {
            pointsToCheck.push(new GeoCoordinates_1.GeoCoordinates(north, 0));
            pointsToCheck.push(new GeoCoordinates_1.GeoCoordinates(south, 0));
        }
        if (containsCenterY) {
            pointsToCheck.push(new GeoCoordinates_1.GeoCoordinates(0, west));
            pointsToCheck.push(new GeoCoordinates_1.GeoCoordinates(0, east));
        }
        TransverseMercatorUtils.alignLatitude(pointsToCheck, pointsToCheck[0]);
        const projected = pointsToCheck.map(p => this.projectPoint(p));
        const vx = projected.map(p => p.x);
        const vy = projected.map(p => p.y);
        const vz = projected.map(p => p.z);
        const minX = Math.min(...vx);
        const minY = Math.min(...vy);
        const minZ = Math.min(...vz);
        const maxX = Math.max(...vx);
        const maxY = Math.max(...vy);
        const maxZ = Math.max(...vz);
        if (!result) {
            result = MathUtils_1.MathUtils.newEmptyBox3();
        }
        if (Box3Like_1.isBox3Like(result)) {
            result.min.x = minX;
            result.min.y = minY;
            result.min.z = minZ;
            result.max.x = maxX;
            result.max.y = maxY;
            result.max.z = maxZ;
        }
        else if (OrientedBox3Like_1.isOrientedBox3Like(result)) {
            MathUtils_1.MathUtils.newVector3(1, 0, 0, result.xAxis);
            MathUtils_1.MathUtils.newVector3(0, 1, 0, result.yAxis);
            MathUtils_1.MathUtils.newVector3(0, 0, 1, result.zAxis);
            result.position.x = (minX + maxX) / 2;
            result.position.y = (minY + maxY) / 2;
            result.position.z = (minZ + maxZ) / 2;
            result.extents.x = (maxX - minX) / 2;
            result.extents.y = (maxY - minY) / 2;
            result.extents.z = (maxZ - minZ) / 2;
        }
        else {
            throw new Error("invalid bounding box");
        }
        return result;
    }
    /**
     * There are 8 sub-regions on entire projection space
     * where both longitude and latitude preserve direction.
     * If bounding box hits more than one region, it should be splitted
     * into sub-boxes by regions, (un)projected and then united again.
     *
     *
     * directions in form [latitude / longitude]:
     *    1 ┌─────────|─────────┐
     *      │ dr / dl | dl / ul │
     * 0.75 ----------|----------
     *      │ ur / dr | ul / ur │
     * 0.5  ----------|----------
     *      │ ul / ur | ur / dr │
     * 0.25 ----------|----------
     *      │ dl / ul | dr / dl │
     *      └─────────|─────────┘
     *     0         0.5        1
     *     @override
     */
    unprojectBox(worldBox) {
        const s = this.unitScale;
        const min = worldBox.min;
        const max = worldBox.max;
        const pointsToCheck = [
            { x: (min.x + max.x) / 2, y: (min.y + max.y) / 2, z: 0 },
            min,
            max,
            { x: min.x, y: max.y, z: 0 },
            { x: max.x, y: min.y, z: 0 }
        ];
        const center = 0.5 * s;
        const lowerQ = 0.25 * s;
        const upperQ = 0.75 * s;
        const containsCenterX = min.x < center && max.x > center;
        const containsCenterY = min.y < center && max.y > center;
        const containsLowerQY = min.y < lowerQ && max.y > lowerQ;
        const containsUpperQY = min.y < upperQ && max.y > upperQ;
        if (containsCenterY) {
            pointsToCheck.push({ x: min.x, y: center, z: 0 });
            pointsToCheck.push({ x: max.x, y: center, z: 0 });
            if (containsCenterX) {
                pointsToCheck.push({ x: center, y: center, z: 0 });
            }
        }
        if (containsLowerQY) {
            pointsToCheck.push({ x: min.x, y: lowerQ, z: 0 });
            pointsToCheck.push({ x: max.x, y: lowerQ, z: 0 });
            if (containsCenterX) {
                pointsToCheck.push({ x: center, y: lowerQ, z: 0 });
            }
        }
        if (containsUpperQY) {
            pointsToCheck.push({ x: min.x, y: upperQ, z: 0 });
            pointsToCheck.push({ x: max.x, y: upperQ, z: 0 });
            if (containsCenterX) {
                pointsToCheck.push({ x: center, y: upperQ, z: 0 });
            }
        }
        const geoPoints = pointsToCheck.map(p => this.unprojectPoint(p));
        TransverseMercatorUtils.alignLongitude(geoPoints, geoPoints[0]);
        const latitudes = geoPoints.map(g => g.latitude);
        const longitudes = geoPoints.filter(g => Math.abs(g.latitude) < 90).map(g => g.longitude);
        const altitudes = geoPoints.map(g => g.altitude || 0);
        const minGeo = new GeoCoordinates_1.GeoCoordinates(Math.min(...latitudes), Math.min(...longitudes), Math.min(...altitudes));
        const maxGeo = new GeoCoordinates_1.GeoCoordinates(Math.max(...latitudes), Math.max(...longitudes), Math.max(...altitudes));
        const geoBox = GeoBox_1.GeoBox.fromCoordinates(minGeo, maxGeo);
        return geoBox;
    }
    /** @override */
    unprojectAltitude(worldPoint) {
        return worldPoint.z;
    }
    /** @override */
    groundDistance(worldPoint) {
        return worldPoint.z;
    }
    /** @override */
    scalePointToSurface(worldPoint) {
        worldPoint.z = 0;
        return worldPoint;
    }
    /** @override */
    surfaceNormal(_worldPoint, normal) {
        if (normal === undefined) {
            normal = { x: 0, y: 0, z: -1 };
        }
        else {
            normal.x = 0;
            normal.y = 0;
            normal.z = -1;
        }
        return normal;
    }
}
class TransverseMercatorUtils {
    /**
     * There are two regions on projected space that have same geo coordinates,
     * it's the entire lines   { x: [0..1], y: 0 } and { x: [0..1], y: 1 }
     * they both have geo coordinates of   (0, [-90..+90])
     * and should be aligned somehow to fall into first or second region
     * to make proper bounding boxes, tile bounds, etc.
     */
    static alignLatitude(points, referencePoint) {
        const EPSILON = 1e-9;
        for (const point of points) {
            if (point.latitude === 0) {
                point.latitude = referencePoint.latitude * EPSILON;
            }
        }
    }
    /**
     * There are two regions on projected plane,
     * { x: 0.5, y: [0..0.25] }    and    { x: 0.5, y: [0.75..1] }
     * that represent longitude edge where -180 and +180 met.
     * Points falling in this regions should be aligned to get proper boxes etc.
     */
    static alignLongitude(points, referencePoint) {
        const bad = referencePoint.longitude < 0 ? 180 : -180;
        const good = referencePoint.longitude < 0 ? -180 : 180;
        for (const point of points) {
            if (point.longitude === bad) {
                point.longitude = good;
            }
        }
    }
}
exports.TransverseMercatorUtils = TransverseMercatorUtils;
TransverseMercatorUtils.POLE_EDGE = 1.4844222297453323;
TransverseMercatorUtils.POLE_EDGE_DEG = MathUtils_1.MathUtils.radToDeg(TransverseMercatorUtils.POLE_EDGE);
TransverseMercatorUtils.POLE_RADIUS = 90 - TransverseMercatorUtils.POLE_EDGE_DEG;
TransverseMercatorUtils.POLE_RADIUS_SQ = Math.pow(TransverseMercatorUtils.POLE_RADIUS, 2);
/**
 * Transverse Mercator [[Projection]] used to convert geo coordinates to world coordinates
 * and vice versa.
 */
exports.transverseMercatorProjection = new TransverseMercatorProjection(EarthConstants_1.EarthConstants.EQUATORIAL_CIRCUMFERENCE);


/***/ }),

/***/ "../harp-geoutils/lib/tiling/FlatTileBoundingBoxGenerator.ts":
/*!*******************************************************************!*\
  !*** ../harp-geoutils/lib/tiling/FlatTileBoundingBoxGenerator.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtils_1 = __webpack_require__(/*! ../math/MathUtils */ "../harp-geoutils/lib/math/MathUtils.ts");
/**
 * `FlatTileBoundingBoxGenerator` generates bounding boxes in world and geo coordinates for a given
 * TilingScheme.
 */
class FlatTileBoundingBoxGenerator {
    /**
     * Creates a new `FlatTileBoundingBoxGenerator` that can generate bounding boxes for the given
     * TilingScheme.
     *
     * @param tilingScheme The [[TilingScheme]] used to compute bounding boxes.
     * @param minElevation The minimum elevation in meters.
     * @param maxElevation The maximum elevation in meters.
     */
    constructor(tilingScheme, minElevation = 0, maxElevation = 0) {
        this.tilingScheme = tilingScheme;
        this.minElevation = minElevation;
        this.maxElevation = maxElevation;
        this.m_tilingScheme = tilingScheme;
        this.m_worldBox = tilingScheme.projection.worldExtent(minElevation, maxElevation);
        const { min, max } = this.m_worldBox;
        this.m_worldDimensions = { x: max.x - min.x, y: max.y - min.y, z: max.z - min.z };
    }
    /**
     * Returns the [[Projection]] of the [[TilingScheme]].
     */
    get projection() {
        return this.m_tilingScheme.projection;
    }
    /**
     * Returns the [[SubdivisionScheme]] of the [[TilingScheme]].
     */
    get subdivisionScheme() {
        return this.m_tilingScheme.subdivisionScheme;
    }
    /**
     * Returns the bounding box in world coordinates of the given [[TileKey]].
     *
     * Example:
     * ```typescript
     * const worldBounds = new THREE.Box3();
     * generator.getWorldBox(geoBox, worldBounds);
     * console.log(worldBounds.getCenter());
     * ```
     *
     * @param tileKey The TileKey.
     * @param result The optional object used to store the resulting bounding box in world
     * coordinates.
     */
    getWorldBox(tileKey, result) {
        const level = tileKey.level;
        const levelDimensionX = this.subdivisionScheme.getLevelDimensionX(level);
        const levelDimensionY = this.subdivisionScheme.getLevelDimensionY(level);
        const sizeX = this.m_worldDimensions.x / levelDimensionX;
        const sizeY = this.m_worldDimensions.y / levelDimensionY;
        const originX = this.m_worldBox.min.x + sizeX * tileKey.column;
        const originY = this.m_worldBox.min.y + sizeY * tileKey.row;
        if (!result) {
            result = MathUtils_1.MathUtils.newEmptyBox3();
        }
        result.min.x = originX;
        result.min.y = originY;
        result.min.z = this.m_worldBox.min.z;
        result.max.x = originX + sizeX;
        result.max.y = originY + sizeY;
        result.max.z = this.m_worldBox.max.z;
        return result;
    }
    /**
     * Returns the bounding box in geo coordinates for the given [[TileKey]].
     *
     * Example:
     * ```typescript
     * const geoBox = generator.getGeoBox(worldBounds);
     * console.log(geoBox.center);
     * ```
     *
     * @param tileKey The [[TileKey]].
     */
    getGeoBox(tileKey) {
        const worldBox = this.getWorldBox(tileKey);
        return this.projection.unprojectBox(worldBox);
    }
}
exports.FlatTileBoundingBoxGenerator = FlatTileBoundingBoxGenerator;


/***/ }),

/***/ "../harp-geoutils/lib/tiling/HalfQuadTreeSubdivisionScheme.ts":
/*!********************************************************************!*\
  !*** ../harp-geoutils/lib/tiling/HalfQuadTreeSubdivisionScheme.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
class HalfQuadTreeSubdivisionScheme {
    getSubdivisionX() {
        return 2;
    }
    getSubdivisionY(level) {
        return level === 0 ? 1 : 2;
    }
    getLevelDimensionX(level) {
        // tslint:disable-next-line:no-bitwise
        return 1 << level;
    }
    getLevelDimensionY(level) {
        // tslint:disable-next-line:no-bitwise
        return level !== 0 ? 1 << (level - 1) : 1;
    }
}
/**
 * A [[SubdivisionScheme]] used to represent half quadtrees. This particular subdivision scheme is
 * used by the HERE tiling scheme.
 */
exports.halfQuadTreeSubdivisionScheme = new HalfQuadTreeSubdivisionScheme();


/***/ }),

/***/ "../harp-geoutils/lib/tiling/HereTilingScheme.ts":
/*!*******************************************************!*\
  !*** ../harp-geoutils/lib/tiling/HereTilingScheme.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const EquirectangularProjection_1 = __webpack_require__(/*! ../projection/EquirectangularProjection */ "../harp-geoutils/lib/projection/EquirectangularProjection.ts");
const HalfQuadTreeSubdivisionScheme_1 = __webpack_require__(/*! ./HalfQuadTreeSubdivisionScheme */ "../harp-geoutils/lib/tiling/HalfQuadTreeSubdivisionScheme.ts");
const TilingScheme_1 = __webpack_require__(/*! ./TilingScheme */ "../harp-geoutils/lib/tiling/TilingScheme.ts");
/**
 * [[TilingScheme]] used by most of the data published by HERE.
 *
 * The `hereTilingScheme` features a half quadtree subdivision scheme and an equirectangular
 * projection.
 */
exports.hereTilingScheme = new TilingScheme_1.TilingScheme(HalfQuadTreeSubdivisionScheme_1.halfQuadTreeSubdivisionScheme, EquirectangularProjection_1.normalizedEquirectangularProjection);


/***/ }),

/***/ "../harp-geoutils/lib/tiling/MercatorTilingScheme.ts":
/*!***********************************************************!*\
  !*** ../harp-geoutils/lib/tiling/MercatorTilingScheme.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const MercatorProjection_1 = __webpack_require__(/*! ../projection/MercatorProjection */ "../harp-geoutils/lib/projection/MercatorProjection.ts");
const QuadTreeSubdivisionScheme_1 = __webpack_require__(/*! ./QuadTreeSubdivisionScheme */ "../harp-geoutils/lib/tiling/QuadTreeSubdivisionScheme.ts");
const TilingScheme_1 = __webpack_require__(/*! ./TilingScheme */ "../harp-geoutils/lib/tiling/TilingScheme.ts");
/**
 * The [[TilingScheme]] used by the HERE web tiles.
 *
 * The `mercatorTilingScheme` features a quadtree subdivision scheme and a Mercator projection.
 */
exports.mercatorTilingScheme = new TilingScheme_1.TilingScheme(QuadTreeSubdivisionScheme_1.quadTreeSubdivisionScheme, MercatorProjection_1.mercatorProjection);


/***/ }),

/***/ "../harp-geoutils/lib/tiling/PolarTilingScheme.ts":
/*!********************************************************!*\
  !*** ../harp-geoutils/lib/tiling/PolarTilingScheme.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const TransverseMercatorProjection_1 = __webpack_require__(/*! ../projection/TransverseMercatorProjection */ "../harp-geoutils/lib/projection/TransverseMercatorProjection.ts");
const QuadTreeSubdivisionScheme_1 = __webpack_require__(/*! ./QuadTreeSubdivisionScheme */ "../harp-geoutils/lib/tiling/QuadTreeSubdivisionScheme.ts");
const TilingScheme_1 = __webpack_require__(/*! ./TilingScheme */ "../harp-geoutils/lib/tiling/TilingScheme.ts");
/**
 * A [[TilingScheme]] featuring quadtree subdivision scheme and
 * transverse Mercator projection.
 */
exports.polarTilingScheme = new TilingScheme_1.TilingScheme(QuadTreeSubdivisionScheme_1.quadTreeSubdivisionScheme, TransverseMercatorProjection_1.transverseMercatorProjection);


/***/ }),

/***/ "../harp-geoutils/lib/tiling/QuadTree.ts":
/*!***********************************************!*\
  !*** ../harp-geoutils/lib/tiling/QuadTree.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const TileKey_1 = __webpack_require__(/*! ./TileKey */ "../harp-geoutils/lib/tiling/TileKey.ts");
/**
 * A class used to represent a quadtree.
 */
class QuadTree {
    /**
     * Constructs a new `QuadTree` for the given [[TilingScheme]].
     *
     * Example:
     * ```typescript
     * const quadTree = new QuadTree(hereTilingScheme);
     * const geoBox = quadTree.getGeoBox(tileKey);
     * console.log(geoBox.center);
     * ```
     *
     * @param tilingScheme The TilingScheme used by this `QuadTree`.
     */
    constructor(tilingScheme) {
        this.tilingScheme = tilingScheme;
    }
    /**
     * Visits this `QuadTree` and invoke the given accept method with the current [[TileKey]] and
     * its bounding box in geo coordinates.
     *
     * Example:
     * ```typescript
     * const geoPos = new GeoCoordinates(latitude, longitude);
     * const quadTree = new QuadTree(hereTilingScheme);
     * quadTree.visit((tileKey, geoBox) => {
     *     if (geoBox.contains(geoPos)) {
     *         console.log("tile", tileKey, "contains", geoPos);
     *         return tileKey.level < 14; // stop visiting the quadtree if the level is >= 14.
     *     }
     *     return false; // stop visiting the quadtree,
     *                   // the tile's geoBox doesn't contain the given coordinates.
     * });
     * ```
     *
     * @param accept A function that takes a [[TileKey]] and its bounding box in geo coordinates and
     * returns `true` if the visit of the `QuadTree` should continue; otherwise `false`.
     */
    visit(accept) {
        this.visitTileKey(TileKey_1.TileKey.fromRowColumnLevel(0, 0, 0), accept);
    }
    /**
     * Visits the subtree starting from the given tile.
     *
     * @param tileKey The root of the subtree that should be visited.
     * @param accept A function that takes a [[TileKey]] and its bounding box in geo coordinates and
     * returns `true` if the visit of the `QuadTree` should continue; otherwise `false`.
     */
    visitTileKey(tileKey, accept) {
        const geoBox = this.tilingScheme.getGeoBox(tileKey);
        if (!accept(tileKey, geoBox)) {
            return;
        }
        for (const subTileKey of this.tilingScheme.getSubTileKeys(tileKey)) {
            this.visitTileKey(subTileKey, accept);
        }
    }
}
exports.QuadTree = QuadTree;


/***/ }),

/***/ "../harp-geoutils/lib/tiling/QuadTreeSubdivisionScheme.ts":
/*!****************************************************************!*\
  !*** ../harp-geoutils/lib/tiling/QuadTreeSubdivisionScheme.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
class QuadTreeSubdivisionScheme {
    getSubdivisionX() {
        return 2;
    }
    getSubdivisionY() {
        return 2;
    }
    getLevelDimensionX(level) {
        // tslint:disable-next-line:no-bitwise
        return 1 << level;
    }
    getLevelDimensionY(level) {
        // tslint:disable-next-line:no-bitwise
        return 1 << level;
    }
}
/**
 * [[SubdivisionScheme]] representing a quadtree.
 */
exports.quadTreeSubdivisionScheme = new QuadTreeSubdivisionScheme();


/***/ }),

/***/ "../harp-geoutils/lib/tiling/SubTiles.ts":
/*!***********************************************!*\
  !*** ../harp-geoutils/lib/tiling/SubTiles.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const TileKey_1 = __webpack_require__(/*! ./TileKey */ "../harp-geoutils/lib/tiling/TileKey.ts");
class SubTiles {
    constructor(tileKey, sizeX, sizeY) {
        this.tileKey = tileKey;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
    [Symbol.iterator]() {
        return this.sizeX === 2 && this.sizeY === 2
            ? SubTiles.ZCurveIterator(this.tileKey)
            : SubTiles.RowColumnIterator(this.tileKey, this.sizeX, this.sizeY);
    }
}
exports.SubTiles = SubTiles;
(function (SubTiles) {
    function* RowColumnIterator(parentKey, sizeX, sizeY) {
        for (let y = 0; y < sizeY; y++) {
            for (let x = 0; x < sizeX; x++) {
                yield TileKey_1.TileKey.fromRowColumnLevel(parentKey.row * sizeY + y, parentKey.column * sizeX + x, parentKey.level + 1);
            }
        }
    }
    SubTiles.RowColumnIterator = RowColumnIterator;
    function* ZCurveIterator(parentKey) {
        // tslint:disable:no-bitwise
        for (let i = 0; i < 4; i++) {
            yield TileKey_1.TileKey.fromRowColumnLevel((parentKey.row << 1) | (i >> 1), (parentKey.column << 1) | (i & 1), parentKey.level + 1);
        }
        // tslint:enableno-bitwise
    }
    SubTiles.ZCurveIterator = ZCurveIterator;
})(SubTiles = exports.SubTiles || (exports.SubTiles = {}));


/***/ }),

/***/ "../harp-geoutils/lib/tiling/TileKey.ts":
/*!**********************************************!*\
  !*** ../harp-geoutils/lib/tiling/TileKey.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** @hidden */
const powerOfTwo = [
    0x1,
    0x2,
    0x4,
    0x8,
    0x10,
    0x20,
    0x40,
    0x80,
    0x100,
    0x200,
    0x400,
    0x800,
    0x1000,
    0x2000,
    0x4000,
    0x8000,
    0x10000,
    0x20000,
    0x40000,
    0x80000,
    0x100000,
    0x200000,
    0x400000,
    0x800000,
    0x1000000,
    0x2000000,
    0x4000000,
    0x8000000,
    0x10000000,
    0x20000000,
    0x40000000,
    0x80000000,
    0x100000000,
    0x200000000,
    0x400000000,
    0x800000000,
    0x1000000000,
    0x2000000000,
    0x4000000000,
    0x8000000000,
    0x10000000000,
    0x20000000000,
    0x40000000000,
    0x80000000000,
    0x100000000000,
    0x200000000000,
    0x400000000000,
    0x800000000000,
    0x1000000000000,
    0x2000000000000,
    0x4000000000000,
    0x8000000000000,
    0x10000000000000 // Math.pow(2, 52), highest bit that can be set correctly.
];
/**
 * The `TileKey` instances are used to address a tile in a quadtree.
 *
 * A tile key is defined by a row, a column, and a level. The tree has a root at level 0, with one
 * single tile. On every level, each tile is divided into four children (therefore the name
 * quadtree).
 *
 * Within each [[level]], any particular tile is addressed with [[row]] and [[column]]. The number
 * of rows and columns in each level is 2 to the power of the level. This means: On level 0, only
 * one tile exists, [[columnsAtLevel]]() and [[rowsAtLevel]]() are both 1. On level 1, 4 tiles
 * exist, in 2 rows and 2 columns. On level 2 we have 16 tiles, in 4 rows and 4 columns. And so on.
 *
 * A tile key is usually created using [[fromRowColumnLevel]]() method.
 *
 * `TileKey` instances are immutable, all members return new instances of `TileKey` and do not
 * modify the original object.
 *
 * Utility functions like [[parent]](), [[changedLevelBy]](), and [[changedLevelTo]]() allow for
 * easy vertical navigation of the tree. The number of available rows and columns in the tile's
 * level is given with [[rowCount]]() and [[columnCount]]().
 *
 * Tile keys can be created from and converted into various alternative formats:
 *
 *  - [[toQuadKey]]() / [[fromQuadKey]]() - string representation 4-based
 *  - [[toHereTile]]() / [[fromHereTile]]() - string representation 10-based
 *  - [[mortonCode]]() / [[fromMortonCode]]() - number representation
 *
 * Note - as JavaScript's number type can hold 53 bits in its mantissa, only levels up to 26 can be
 * represented in the number representation returned by [[mortonCode]]().
 */
class TileKey {
    /**
     * Constructs a new immutable instance of a `TileKey`.
     *
     * For the better readability, [[TileKey.fromRowColumnLevel]] should be preferred.
     *
     * Note - row and column must not be greater than the maximum rows/columns for the given level.
     *
     * @param row Represents the row in the quadtree.
     * @param column Represents the column in the quadtree.
     * @param level Represents the level in the quadtree.
     */
    constructor(row, column, level) {
        this.row = row;
        this.column = column;
        this.level = level;
    }
    /**
     * Creates a tile key.
     *
     * @param row The requested row. Must be less than 2 to the power of level.
     * @param column The requested column. Must be less than 2 to the power of level.
     * @param level The requested level.
     */
    static fromRowColumnLevel(row, column, level) {
        return new TileKey(row, column, level);
    }
    /**
     * Creates a tile key from a quad string.
     *
     * The quad string can be created with [[toQuadKey]].
     *
     * @param quadkey The quadkey to convert.
     * @returns A new instance of `TileKey`.
     */
    static fromQuadKey(quadkey) {
        const level = quadkey.length;
        let row = 0;
        let column = 0;
        // tslint:disable:no-bitwise
        for (let i = 0; i < quadkey.length; ++i) {
            const mask = 1 << i;
            const d = parseInt(quadkey.charAt(level - i - 1), 10);
            if (d & 0x1) {
                column |= mask;
            }
            if (d & 0x2) {
                row |= mask;
            }
        }
        // tslint:enable:no-bitwise
        return TileKey.fromRowColumnLevel(row, column, level);
    }
    /**
     * Creates a tile key from a numeric Morton code representation.
     *
     * You can convert a tile key into a numeric Morton code with [[mortonCode]].
     *
     * @param quadKey64 The Morton code to be converted.
     * @returns A new instance of [[TileKey]].
     */
    static fromMortonCode(quadKey64) {
        let level = 0;
        let row = 0;
        let column = 0;
        let quadKey = quadKey64;
        // tslint:disable:no-bitwise
        while (quadKey > 1) {
            const mask = 1 << level;
            if (quadKey & 0x1) {
                column |= mask;
            }
            if (quadKey & 0x2) {
                row |= mask;
            }
            level++;
            quadKey = (quadKey - (quadKey & 0x3)) / 4;
        }
        // tslint:enable:no-bitwise
        const result = TileKey.fromRowColumnLevel(row, column, level);
        result.m_mortonCode = quadKey64;
        return result;
    }
    /**
     * Creates a tile key from a heretile code string.
     *
     * The string can be created with [[toHereTile]].
     *
     * @param quadkey64 The string representation of the HERE tile key.
     * @returns A new instance of `TileKey`.
     */
    static fromHereTile(quadkey64) {
        const result = TileKey.fromMortonCode(parseInt(quadkey64, 10));
        result.m_hereTile = quadkey64;
        return result;
    }
    /**
     * Returns the number of available columns at a given level.
     *
     * This is 2 to the power of the level.
     *
     * @param level The level for which to return the number of columns.
     * @returns The available columns at the given level.
     */
    static columnsAtLevel(level) {
        return Math.pow(2, level);
    }
    /**
     * Returns the number of available rows at a given level.
     *
     * This is 2 to the power of the level.
     *
     * @param level The level for which to return the number of rows.
     * @returns The available rows at the given level.
     */
    static rowsAtLevel(level) {
        return Math.pow(2, level);
    }
    /**
     * Returns the closest matching `TileKey` in a cartesian coordinate system.
     *
     * @param level The level for the tile key.
     * @param coordX The X coordinate.
     * @param coordY The Y coordinate.
     * @param totalWidth The maximum X coordinate.
     * @param totalHeight The maximum Y coordinate.
     * @returns A new tile key at the given level that includes the given coordinates.
     */
    static atCoords(level, coordX, coordY, totalWidth, totalHeight) {
        return TileKey.fromRowColumnLevel(Math.floor(coordY / (totalHeight / TileKey.rowsAtLevel(level))), Math.floor(coordX / (totalWidth / TileKey.columnsAtLevel(level))), level);
    }
    /**
     * Computes the Morton code of the parent tile key of the given Morton code.
     *
     * Note: The parent key of the root key is the root key itself.
     *
     * @param mortonCode A Morton code, for example, obtained from [[mortonCode]].
     * @returns The Morton code of the parent tile.
     */
    static parentMortonCode(mortonCode) {
        return Math.floor(mortonCode / 4);
    }
    /**
     * Returns a tile key representing the parent of the tile addressed by this tile key.
     *
     * Throws an exception is this tile is already the root.
     */
    parent() {
        if (this.level === 0) {
            throw new Error("Cannot get the parent of the root tile key");
        }
        // tslint:disable-next-line:no-bitwise
        return TileKey.fromRowColumnLevel(this.row >>> 1, this.column >>> 1, this.level - 1);
    }
    /**
     * Returns a new tile key at a level that differs from this tile's level by delta.
     *
     * Equivalent to `changedLevelTo(level() + delta)`.
     *
     * Note - root key is returned if `delta` is smaller than the level of this tile key.
     *
     * @param delta The numeric difference between the current level and the requested level.
     */
    changedLevelBy(delta) {
        const level = Math.max(0, this.level + delta);
        let row = this.row;
        let column = this.column;
        // tslint:disable:no-bitwise
        if (delta >= 0) {
            row <<= delta;
            column <<= delta;
        }
        else {
            row >>>= -delta;
            column >>>= -delta;
        }
        // tslint:enable:no-bitwise
        return TileKey.fromRowColumnLevel(row, column, level);
    }
    /**
     * Returns a new tile key at the requested level.
     *
     * If the requested level is smaller than the tile's level, then the key of an ancestor of this
     * tile is returned. If the requested level is larger than the tile's level, then the key of
     * first child or grandchild of this tile is returned, for example, the child with the lowest
     * row and column number. If the requested level equals this tile's level, then the tile key
     * itself is returned. If the requested level is negative, the root tile key is returned.
     *
     * @param level The requested level.
     */
    changedLevelTo(level) {
        return this.changedLevelBy(level - this.level);
    }
    /**
     * Converts the tile key to a numeric code representation.
     *
     * You can create a tile key from a numeric Morton code with [[fromMortonCode]].
     *
     * Note - only levels <= 26 are supported.
     */
    mortonCode() {
        if (this.m_mortonCode === undefined) {
            let column = this.column;
            let row = this.row;
            // tslint:disable:no-bitwise
            let result = powerOfTwo[this.level << 1];
            for (let i = 0; i < this.level; ++i) {
                if (column & 0x1) {
                    result += powerOfTwo[2 * i];
                }
                if (row & 0x1) {
                    result += powerOfTwo[2 * i + 1];
                }
                column >>>= 1;
                row >>>= 1;
            }
            // tslint:enable:no-bitwise
            this.m_mortonCode = result;
        }
        return this.m_mortonCode;
    }
    /**
     * Converts the tile key into a string for using in REST API calls.
     *
     * The string is a quadkey Morton code representation as a string.
     *
     * You can convert back from a quadkey string with [[fromHereTile]].
     */
    toHereTile() {
        if (this.m_hereTile === undefined) {
            this.m_hereTile = this.mortonCode().toString();
        }
        return this.m_hereTile;
    }
    /**
     * Converts the tile key into a string for using in REST API calls.
     *
     * If the tile is the root tile, the quadkey is '-'. Otherwise the string is a number to the
     * base of 4, but without the leading 1, with the following properties:
     *  1. the number of digits equals the level.
     *  2. removing the last digit gives the parent tile's quadkey string, i.e. appending 0,1,2,3
     *     to a quadkey string gives the tiles's children.
     *
     * You can convert back from a quadkey string with [[fromQuadKey]].
     */
    toQuadKey() {
        let result = "";
        // tslint:disable:no-bitwise
        for (let i = this.level; i > 0; --i) {
            const mask = 1 << (i - 1);
            const col = (this.column & mask) !== 0;
            const row = (this.row & mask) !== 0;
            if (col && row) {
                result += "3";
            }
            else if (row) {
                result += "2";
            }
            else if (col) {
                result += "1";
            }
            else {
                result += "0";
            }
        }
        // tslint:enable:no-bitwise
        return result;
    }
    /**
     * Equality operator.
     *
     * @param qnr The tile key to compare to.
     * @returns `true` if this tile key has identical row, column and level, `false` otherwise.
     */
    equals(qnr) {
        return this.row === qnr.row && this.column === qnr.column && this.level === qnr.level;
    }
    /**
     * Returns the absolute quadkey that is constructed from its sub quadkey.
     *
     * @param sub The sub key.
     * @returns The absolute tile key in the quadtree.
     */
    addedSubKey(sub) {
        const subQuad = TileKey.fromQuadKey(sub.length === 0 ? "-" : sub);
        const child = this.changedLevelBy(subQuad.level);
        return TileKey.fromRowColumnLevel(child.row + subQuad.row, child.column + subQuad.column, child.level);
    }
    /**
     * Returns the absolute quadkey that is constructed from its sub HERE tile key.
     *
     * @param sub The sub HERE key.
     * @returns The absolute tile key in the quadtree.
     */
    addedSubHereTile(sub) {
        const subQuad = TileKey.fromHereTile(sub);
        const child = this.changedLevelBy(subQuad.level);
        return TileKey.fromRowColumnLevel(child.row + subQuad.row, child.column + subQuad.column, child.level);
    }
    /**
     * Returns a sub quadkey that is relative to its parent.
     *
     * This function can be used to generate sub keys that are relative to a parent that is delta
     * levels up in the quadtree.
     *
     * This function can be used to create shortened keys for quads on lower levels if the parent is
     * known.
     *
     * Note - the sub quadkeys fit in a 16-bit unsigned integer if the `delta` is smaller than 8. If
     * `delta` is smaller than 16, the sub quadkey fits into an unsigned 32-bit integer.
     *
     * Deltas larger than 16 are not supported.
     *
     * @param delta The number of levels relative to its parent quadkey. Must be greater or equal to
     * 0 and smaller than 16.
     * @returns The quadkey relative to its parent that is `delta` levels up the tree.
     */
    getSubHereTile(delta) {
        const key = this.mortonCode();
        // tslint:disable-next-line:no-bitwise
        const msb = 1 << (delta * 2);
        const mask = msb - 1;
        // tslint:disable-next-line:no-bitwise
        const result = (key & mask) | msb;
        return result.toString();
    }
    /**
     * Returns the number of available rows in the tile's [[level]].
     *
     * This is 2 to the power of the level.
     */
    rowCount() {
        return TileKey.rowsAtLevel(this.level);
    }
    /**
     * Returns the number of available columns in the tile's [[level]].
     *
     * This is 2 to the power of the level.
     */
    columnCount() {
        return TileKey.columnsAtLevel(this.level);
    }
}
exports.TileKey = TileKey;


/***/ }),

/***/ "../harp-geoutils/lib/tiling/TileKeyUtils.ts":
/*!***************************************************!*\
  !*** ../harp-geoutils/lib/tiling/TileKeyUtils.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GeoCoordinates_1 = __webpack_require__(/*! ../coordinates/GeoCoordinates */ "../harp-geoutils/lib/coordinates/GeoCoordinates.ts");
const TileKey_1 = __webpack_require__(/*! ./TileKey */ "../harp-geoutils/lib/tiling/TileKey.ts");
class TileKeyUtils {
    static geoCoordinatesToTileKey(tilingScheme, geoPoint, level) {
        const projection = tilingScheme.projection;
        const worldPoint = projection.projectPoint(geoPoint);
        return this.worldCoordinatesToTileKey(tilingScheme, worldPoint, level);
    }
    static worldCoordinatesToTileKey(tilingScheme, worldPoint, level) {
        const projection = tilingScheme.projection;
        const subdivisionScheme = tilingScheme.subdivisionScheme;
        const cx = subdivisionScheme.getLevelDimensionX(level);
        const cy = subdivisionScheme.getLevelDimensionY(level);
        const { min, max } = projection.worldExtent(0, 0);
        const worldSizeX = max.x - min.x;
        const worldSizeY = max.y - min.y;
        if (worldPoint.x < min.x || worldPoint.x > max.x) {
            return null;
        }
        if (worldPoint.y < min.y || worldPoint.y > max.y) {
            return null;
        }
        const column = Math.min(cx - 1, Math.floor((cx * (worldPoint.x - min.x)) / worldSizeX));
        const row = Math.min(cy - 1, Math.floor((cy * (worldPoint.y - min.y)) / worldSizeY));
        return TileKey_1.TileKey.fromRowColumnLevel(row, column, level);
    }
    static geoRectangleToTileKeys(tilingScheme, geoBox, level) {
        const wrap = (value, lower, upper) => {
            if (value < lower) {
                return upper - ((lower - value) % (upper - lower));
            }
            return lower + ((value - lower) % (upper - lower));
        };
        const clamp = (x, minVal, maxVal) => {
            return Math.min(Math.max(x, minVal), maxVal);
        };
        // Clamp at the poles and wrap around the international date line.
        const southWestLongitude = wrap(geoBox.southWest.longitudeInRadians, -Math.PI, Math.PI);
        const southWestLatitude = clamp(geoBox.southWest.latitudeInRadians, -(Math.PI * 0.5), Math.PI * 0.5);
        const northEastLongitude = wrap(geoBox.northEast.longitudeInRadians, -Math.PI, Math.PI);
        const northEastLatitude = clamp(geoBox.northEast.latitudeInRadians, -(Math.PI * 0.5), Math.PI * 0.5);
        const minTileKey = TileKeyUtils.geoCoordinatesToTileKey(tilingScheme, GeoCoordinates_1.GeoCoordinates.fromRadians(southWestLatitude, southWestLongitude), level);
        const maxTileKey = TileKeyUtils.geoCoordinatesToTileKey(tilingScheme, GeoCoordinates_1.GeoCoordinates.fromRadians(northEastLatitude, northEastLongitude), level);
        const columnCount = tilingScheme.subdivisionScheme.getLevelDimensionX(level);
        if (!minTileKey || !maxTileKey) {
            throw new Error("Invalid coordinates");
        }
        const minColumn = minTileKey.column;
        let maxColumn = maxTileKey.column;
        // wrap around case
        if (southWestLongitude > northEastLongitude) {
            if (maxColumn !== minColumn) {
                maxColumn += columnCount;
            }
            else {
                // do not duplicate
                maxColumn += columnCount - 1;
            }
        }
        const minRow = Math.min(minTileKey.row, maxTileKey.row);
        const maxRow = Math.max(minTileKey.row, maxTileKey.row);
        const keys = new Array();
        for (let row = minRow; row <= maxRow; ++row) {
            for (let column = minColumn; column <= maxColumn; ++column) {
                keys.push(TileKey_1.TileKey.fromRowColumnLevel(row, column % columnCount, level));
            }
        }
        return keys;
    }
}
exports.TileKeyUtils = TileKeyUtils;


/***/ }),

/***/ "../harp-geoutils/lib/tiling/TileTreeTraverse.ts":
/*!*******************************************************!*\
  !*** ../harp-geoutils/lib/tiling/TileTreeTraverse.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const SubTiles_1 = __webpack_require__(/*! ./SubTiles */ "../harp-geoutils/lib/tiling/SubTiles.ts");
class TileTreeTraverse {
    constructor(subdivisionScheme) {
        this.m_subdivisionScheme = subdivisionScheme;
    }
    subTiles(tileKey) {
        const divX = this.m_subdivisionScheme.getSubdivisionX(tileKey.level);
        const divY = this.m_subdivisionScheme.getSubdivisionY(tileKey.level);
        return new SubTiles_1.SubTiles(tileKey, divX, divY);
    }
}
exports.TileTreeTraverse = TileTreeTraverse;


/***/ }),

/***/ "../harp-geoutils/lib/tiling/TilingScheme.ts":
/*!***************************************************!*\
  !*** ../harp-geoutils/lib/tiling/TilingScheme.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const FlatTileBoundingBoxGenerator_1 = __webpack_require__(/*! ./FlatTileBoundingBoxGenerator */ "../harp-geoutils/lib/tiling/FlatTileBoundingBoxGenerator.ts");
const TileKeyUtils_1 = __webpack_require__(/*! ./TileKeyUtils */ "../harp-geoutils/lib/tiling/TileKeyUtils.ts");
const TileTreeTraverse_1 = __webpack_require__(/*! ./TileTreeTraverse */ "../harp-geoutils/lib/tiling/TileTreeTraverse.ts");
/**
 * The `TilingScheme` represents how the data is tiled.
 */
class TilingScheme {
    /**
     * Constructs a new `TilingScheme` with the given subdivision scheme and projection.
     *
     * @param subdivisionScheme The subdivision scheme used by this `TilingScheme`.
     * @param projection The projection used by this `TilingScheme`.
     */
    constructor(subdivisionScheme, projection) {
        this.subdivisionScheme = subdivisionScheme;
        this.projection = projection;
        this.boundingBoxGenerator = new FlatTileBoundingBoxGenerator_1.FlatTileBoundingBoxGenerator(this);
        this.tileTreeTraverse = new TileTreeTraverse_1.TileTreeTraverse(subdivisionScheme);
    }
    /**
     * Returns the sub tile keys of the given tile.
     *
     * @param tileKey The [[TileKey]].
     * @returns The list of the sub tile keys.
     */
    getSubTileKeys(tileKey) {
        return this.tileTreeTraverse.subTiles(tileKey);
    }
    /**
     * Gets the [[TileKey]] from the given geo position and level.
     *
     * @param geoPoint The position in geo coordinates.
     * @param level The level of the resulting `TileKey`.
     */
    getTileKey(geoPoint, level) {
        return TileKeyUtils_1.TileKeyUtils.geoCoordinatesToTileKey(this, geoPoint, level);
    }
    /**
     * Gets the list of [[TileKey]]s contained in the given [[GeoBox]].
     *
     * @param geoBox The bounding box in geo coordinates.
     * @param level The level of the resulting `TileKey`.
     */
    getTileKeys(geoBox, level) {
        return TileKeyUtils_1.TileKeyUtils.geoRectangleToTileKeys(this, geoBox, level);
    }
    /**
     * Returns the bounding box in geo coordinates for the given [[TileKey]].
     *
     * @param tileKey The `TileKey`.
     */
    getGeoBox(tileKey) {
        return this.boundingBoxGenerator.getGeoBox(tileKey);
    }
    /**
     * Returns the bounding box in world coordinates.
     *
     * @param tileKey The `TileKey`.
     * @param result The optional object that will contain the resulting bounding box.
     */
    getWorldBox(tileKey, result) {
        return this.boundingBoxGenerator.getWorldBox(tileKey, result);
    }
}
exports.TilingScheme = TilingScheme;


/***/ }),

/***/ "../harp-geoutils/lib/tiling/WebMercatorTilingScheme.ts":
/*!**************************************************************!*\
  !*** ../harp-geoutils/lib/tiling/WebMercatorTilingScheme.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const MercatorProjection_1 = __webpack_require__(/*! ../projection/MercatorProjection */ "../harp-geoutils/lib/projection/MercatorProjection.ts");
const QuadTreeSubdivisionScheme_1 = __webpack_require__(/*! ./QuadTreeSubdivisionScheme */ "../harp-geoutils/lib/tiling/QuadTreeSubdivisionScheme.ts");
const TilingScheme_1 = __webpack_require__(/*! ./TilingScheme */ "../harp-geoutils/lib/tiling/TilingScheme.ts");
/**
 * A [[TilingScheme]] featuring quadtree subdivision scheme and web Mercator projection.
 */
exports.webMercatorTilingScheme = new TilingScheme_1.TilingScheme(QuadTreeSubdivisionScheme_1.quadTreeSubdivisionScheme, MercatorProjection_1.webMercatorProjection);


/***/ }),

/***/ "../harp-lines/lib/Lines.ts":
/*!**********************************!*\
  !*** ../harp-lines/lib/Lines.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const THREE = __webpack_require__(/*! three */ "three");
// Preallocate temp variables used during line generation.
const tmpV = new THREE.Vector3();
const tmpNormal = new THREE.Vector3();
const tmpTangent0 = new THREE.Vector3();
const tmpTangent1 = new THREE.Vector3();
const tmpBitangent = new THREE.Vector3();
const SEGMENT_OFFSET = 0.1;
/**
 * Declares all the vertex attributes used for rendering a line using the [[SolidLineMaterial]].
 */
/** Base line vertex attributes. */
const LINE_VERTEX_ATTRIBUTES = {
    attributes: [
        // The "extrusionCoord" is a vec4 which represents:
        // xy: Extrusion coordinates
        // sign(xy): Extrusion direction
        // z: Line length
        { name: "extrusionCoord", itemSize: 3, offset: 0 },
        { name: "position", itemSize: 3, offset: 3 },
        { name: "tangent", itemSize: 3, offset: 6 },
        { name: "bitangent", itemSize: 4, offset: 9 }
    ],
    stride: 13
};
/** Optional normal and uv coordinates. */
const NORMAL_UV_VERTEX_ATTRIBUTES = {
    attributes: [
        { name: "uv", itemSize: 2, offset: LINE_VERTEX_ATTRIBUTES.stride },
        { name: "normal", itemSize: 3, offset: LINE_VERTEX_ATTRIBUTES.stride + 2 }
    ],
    stride: 5
};
/** Base line vertex attributes plus normals and uv coordinates. */
const LINE_VERTEX_ATTRIBUTES_NUV = {
    attributes: [...LINE_VERTEX_ATTRIBUTES.attributes, ...NORMAL_UV_VERTEX_ATTRIBUTES.attributes],
    stride: LINE_VERTEX_ATTRIBUTES.stride + NORMAL_UV_VERTEX_ATTRIBUTES.stride
};
/**
 * Declares all the vertex attributes used for rendering a line using the
 * [[HighPrecisionLineMaterial]].
 */
const HP_LINE_VERTEX_ATTRIBUTES = {
    attributes: [
        { name: "extrusionCoord", itemSize: 2, offset: 0 },
        { name: "position", itemSize: 3, offset: 2 },
        { name: "positionLow", itemSize: 3, offset: 5 },
        { name: "tangent", itemSize: 3, offset: 8 },
        { name: "bitangent", itemSize: 4, offset: 11 }
    ],
    stride: 15
};
/** High precision line vertex attributes plus normals and uv coordinates. */
const HP_LINE_VERTEX_ATTRIBUTES_NUV = {
    attributes: [
        ...HP_LINE_VERTEX_ATTRIBUTES.attributes,
        ...NORMAL_UV_VERTEX_ATTRIBUTES.attributes
    ],
    stride: HP_LINE_VERTEX_ATTRIBUTES.stride + NORMAL_UV_VERTEX_ATTRIBUTES.stride
};
/**
 * Class that holds the vertex and index attributes for a [[Lines]] object.
 */
class LineGeometry {
    constructor() {
        this.vertices = [];
        this.vertexColors = [];
        this.indices = [];
    }
}
exports.LineGeometry = LineGeometry;
function getVertexDescriptor(hasNormalsAndUvs, highPrecision) {
    if (highPrecision) {
        return hasNormalsAndUvs ? HP_LINE_VERTEX_ATTRIBUTES_NUV : HP_LINE_VERTEX_ATTRIBUTES;
    }
    else {
        return hasNormalsAndUvs ? LINE_VERTEX_ATTRIBUTES_NUV : LINE_VERTEX_ATTRIBUTES;
    }
}
/**
 * Creates a [[LineGeometry]] object out of a polyline.
 *
 * @param center Center of the polyline.
 * @param polyline Array of `numbers` describing a polyline.
 * @param offsets Array of `numbers` representing line segment offsets.
 * @param uvs Array of `numbers` representing texture coordinates.
 * @param colors Array of `numbers` describing a polyline's colors.
 * @param geometry [[LineGeometry]] object used to store the vertex and index attributes.
 * @param highPrecision If `true` will create high-precision vertex information.
 */
function createLineGeometry(center, polyline, projection, offsets, uvs, colors, geometry = new LineGeometry(), highPrecision = false) {
    if (polyline.length === 0) {
        return geometry;
    }
    const stride = getVertexDescriptor(uvs !== undefined, highPrecision).stride;
    const pointCount = polyline.length / 3;
    const segments = new Array(pointCount);
    const tangents = new Array(polyline.length - 3);
    const baseVertex = geometry.vertices.length / stride;
    const hasSegmentOffsets = offsets !== undefined && offsets.length > 0;
    const hasTexCoords = uvs !== undefined && uvs.length > 0;
    const vertexColors = colors !== undefined && colors.length && polyline.length;
    harp_utils_1.assert(!hasSegmentOffsets || offsets.length === pointCount);
    harp_utils_1.assert(!hasTexCoords || uvs.length / 2 === pointCount);
    harp_utils_1.assert(!vertexColors || colors.length === polyline.length);
    // Compute segments and tangents.
    let sum = SEGMENT_OFFSET;
    segments[0] = sum;
    for (let i = 0; i < pointCount - 1; ++i) {
        let sqrLength = 0;
        for (let j = 0; j < 3; ++j) {
            const d = polyline[(i + 1) * 3 + j] - polyline[i * 3 + j];
            tangents[i * 3 + j] = d;
            sqrLength += d * d;
        }
        const len = Math.sqrt(sqrLength);
        sum = sum + len;
        segments[i + 1] = sum;
    }
    const lineCoverage = hasSegmentOffsets
        ? Math.abs(offsets[offsets.length - 1] - offsets[0])
        : 1.0;
    const lineLength = segments[segments.length - 1] / lineCoverage;
    // Override the segments if offsets are explicitly provided.
    if (hasSegmentOffsets) {
        for (let i = 0; i < pointCount; ++i) {
            segments[i] = offsets[i] * lineLength + SEGMENT_OFFSET;
        }
    }
    // Check if we're working with a closed line.
    let isClosed = true;
    for (let j = 0; j < 3; ++j) {
        isClosed = isClosed && polyline[j] === polyline[polyline.length - 3 + j];
    }
    const tmpVertices = [];
    const addVertexPair = (i, T1, T2, segment, extrusionCoord) => {
        tmpVertices.length = 0;
        // Store the segment and extrusionCoord attributes.
        geometry.vertices.push(segment, extrusionCoord * -1, lineLength);
        tmpVertices.push(segment, extrusionCoord * 1, lineLength);
        // Store the position attribute (component-dependant).
        for (let j = 0; j < 3; ++j) {
            if (!highPrecision) {
                geometry.vertices.push(polyline[i * 3 + j]);
                tmpVertices.push(polyline[i * 3 + j]);
            }
            else {
                const highComp = Math.fround(polyline[i * 3 + j]);
                const lowComp = polyline[i * 3 + j] - highComp;
                geometry.vertices.push(highComp, lowComp);
                tmpVertices.push(highComp, lowComp);
            }
            tmpNormal.setComponent(j, polyline[i * 3 + j]);
        }
        // Store the bitangent attribute (component-dependant).
        for (let j = 0; j < 3; ++j) {
            tmpTangent0.setComponent(j, tangents[T1 + j]);
            tmpTangent1.setComponent(j, tangents[T2 + j]);
        }
        tmpTangent0.normalize();
        geometry.vertices.push(tmpTangent0.x, tmpTangent0.y, tmpTangent0.z);
        tmpVertices.push(tmpTangent0.x, tmpTangent0.y, tmpTangent0.z);
        tmpNormal.add(center); // tmpNormal contains world position
        projection.surfaceNormal(tmpNormal, tmpNormal);
        const angle = computeBitangent(tmpNormal, tmpTangent0, tmpTangent1.normalize(), tmpBitangent);
        geometry.vertices.push(tmpBitangent.x, tmpBitangent.y, tmpBitangent.z, angle);
        tmpVertices.push(tmpBitangent.x, tmpBitangent.y, tmpBitangent.z, angle);
        if (hasTexCoords) {
            // uvs
            geometry.vertices.push(uvs[i * 2], uvs[i * 2 + 1]);
            tmpVertices.push(uvs[i * 2], uvs[i * 2 + 1]);
            // normals
            geometry.vertices.push(tmpNormal.x, tmpNormal.y, tmpNormal.z);
            tmpVertices.push(tmpNormal.x, tmpNormal.y, tmpNormal.z);
        }
        geometry.vertices.push(...tmpVertices);
        // Add vertex colors (if supplied).
        if (vertexColors) {
            geometry.vertexColors.push(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
            geometry.vertexColors.push(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
        }
    };
    for (let i = 0; i < pointCount; ++i) {
        // Retrieve the per-point tangents.
        const T1 = isClosed && i === 0 ? tangents.length - 3 : Math.max(0, i - 1) * 3;
        const T2 = isClosed && i === pointCount - 1 ? 0 : Math.min(i * 3, tangents.length - 3);
        // Process v0 and v1.
        if (i > 0) {
            addVertexPair(i, T1, T2, segments[i - 1], segments[i]);
        }
        // Process v2 and v3.
        if (i + 1 < pointCount) {
            addVertexPair(i, T1, T2, segments[Math.min(i, segments.length - 1)] * -1, segments[Math.min(i + 1, segments.length - 1)]);
        }
    }
    // Store the triangle indices in the final index buffer.
    for (let i = 0; i < pointCount - 1; ++i) {
        const base = baseVertex + i * 4;
        geometry.indices.push(base, base + 1, base + 2, base + 2, base + 1, base + 3);
    }
    return geometry;
}
exports.createLineGeometry = createLineGeometry;
/**
 * Creates a [[LineGeometry]] object out of a polyline.
 *
 * @param polyline Array of `numbers` describing a polyline.
 * @param colors Array of `numbers` describing a polyline's colors.
 * @param geometry [[LineGeometry]] object used to store the vertex and index attributes.
 */
function createSimpleLineGeometry(polyline, colors, geometry = new LineGeometry()) {
    if (polyline.length === 0) {
        return geometry;
    }
    const pointCount = polyline.length / 3;
    let index = geometry.vertices.length / 3;
    const vertexColors = colors !== undefined && colors.length && polyline.length;
    for (let i = 0; i < pointCount; ++i, index++) {
        if (i > 0) {
            geometry.indices.push(index);
        }
        if (i < pointCount - 1) {
            geometry.indices.push(index);
        }
        for (let j = 0; j < 3; ++j) {
            geometry.vertices.push(polyline[i * 3 + j]);
            if (vertexColors) {
                geometry.vertexColors.push(colors[i * 3 + j]);
            }
        }
    }
    return geometry;
}
exports.createSimpleLineGeometry = createSimpleLineGeometry;
/**
 * Class used to render groups (or batches) of width-variable lines (in the same tile).
 */
class LineGroup {
    constructor(hasNormalsAndUvs = false, highPrecision = false, isSimple = false) {
        this.hasNormalsAndUvs = hasNormalsAndUvs;
        this.highPrecision = highPrecision;
        this.isSimple = isSimple;
        this.m_geometry = new LineGeometry();
    }
    /**
     * Adds all the attribute data needed to a [[BufferGeometry]] object for rendering `Lines`.
     *
     * @param vertices Array of vertex attributes.
     * @param colors Array of vertex colors.
     * @param indices Array of vertex indices.
     * @param geometry [[BufferGeometry]] object which will store all the `Lines` attribute data.
     * @param hasNormalsAnUvs Whether vertices have normal and uv coordinates as attributes.
     * @param highPrecision If `true` will create high-precision vertex information.
     * @param isSimple `true` to create simple (nonsolid, nonextruded) lines. Defaults to `false`.
     */
    static createGeometry(vertices, colors, indices, geometry, hasNormalsAndUvs = false, highPrecision = false, isSimple = false) {
        if (isSimple) {
            geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
            if (colors.length === vertices.length) {
                geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));
            }
            geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
            return geometry;
        }
        else {
            const vertexDescriptor = getVertexDescriptor(hasNormalsAndUvs, highPrecision);
            const buffer = new THREE.InterleavedBuffer(new Float32Array(vertices), vertexDescriptor.stride);
            vertexDescriptor.attributes.forEach(descr => {
                const attribute = new THREE.InterleavedBufferAttribute(buffer, descr.itemSize, descr.offset, false);
                geometry.setAttribute(descr.name, attribute);
            });
            if (colors.length === vertices.length) {
                geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));
            }
            geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
            return geometry;
        }
    }
    /**
     * Clears the list of line strips.
     */
    clear() {
        this.m_geometry.vertices = [];
        this.m_geometry.vertexColors = [];
        this.m_geometry.indices = [];
    }
    /**
     * Add the given points to this line group.
     *
     * @param center World center of the provided points.
     * @param points Sequence of (x,y,z) coordinates.
     * @param offsets Sequence of line segment offsets.
     * @param uvs Sequence of (u,v) texture coordinates.
     * @param colors Sequence of (r,g,b) color components.
     */
    add(center, points, projection, offsets, uvs, colors) {
        if (!this.isSimple) {
            harp_utils_1.assert(!this.hasNormalsAndUvs || uvs !== undefined);
            createLineGeometry(center, points, projection, offsets, uvs, colors, this.m_geometry, this.highPrecision);
        }
        else {
            createSimpleLineGeometry(points, colors, this.m_geometry);
        }
        return this;
    }
    /**
     * Returns the list of vertices.
     */
    get vertices() {
        return this.m_geometry.vertices;
    }
    /**
     * Returns the list of vertex colors.
     */
    get vertexColors() {
        return this.m_geometry.vertexColors;
    }
    /**
     * Returns the list of indices.
     */
    get indices() {
        return this.m_geometry.indices;
    }
    /**
     * Returns the list of [[VertexAttributeDescriptor]]s.
     */
    get vertexAttributes() {
        return getVertexDescriptor(this.hasNormalsAndUvs, this.highPrecision).attributes;
    }
    /**
     * Returns the vertex attribute stride.
     */
    get stride() {
        return getVertexDescriptor(this.hasNormalsAndUvs, this.highPrecision).stride;
    }
    /**
     * Creates a three.js geometry.
     */
    createGeometry(geometry) {
        if (geometry === undefined) {
            geometry = new THREE.BufferGeometry();
        }
        return LineGroup.createGeometry(this.m_geometry.vertices, this.m_geometry.vertexColors, this.m_geometry.indices, geometry, this.hasNormalsAndUvs, this.highPrecision);
    }
}
exports.LineGroup = LineGroup;
function computeBitangent(n, t0, t1, bt) {
    let angle = 0;
    if (!t0.equals(t1)) {
        angle = Math.acos(t0.dot(t1)) * Math.sign(n.dot(tmpV.copy(t0).cross(t1)));
        if (Number.isNaN(angle)) {
            angle = 0;
        }
    }
    bt.copy(t0)
        .add(t1)
        .normalize()
        .cross(n)
        .normalize();
    return angle;
}


/***/ }),

/***/ "../harp-lines/lib/TriangulateLines.ts":
/*!*********************************************!*\
  !*** ../harp-lines/lib/TriangulateLines.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __webpack_require__(/*! three */ "three");
const UNIT_Z = new THREE.Vector3(0, 0, 1);
const POINTS = [0, 1, 2, 1, 3, 2];
const BEVEL_POINTS = [0, 1, 3, 3, 1, 2, 0, 3, 4, 5, 4, 3];
const SECTORS_IN_CIRCLE = 8;
const STEP = Math.PI / SECTORS_IN_CIRCLE;
/**
 * Adds a half-circle geometry to original line
 *
 * @param x The line end X (used as circle center X)
 * @param y The line end Y (used as circle center Y)
 * @param lineAngle The cap incline angle
 * @param radius The cap (circle) radius
 * @param vertices The input vertex buffer (cap vertices are added there)
 * @param indices The input index buffer (cap indices are is added there)
 */
function addCircle(x, y, lineAngle, radius, vertices, indices) {
    const baseVertex = vertices.length / 3;
    // Add cap center to vertices directly (it doesn't need rotation)
    vertices.push(x, y, 0);
    for (let i = 0; i < SECTORS_IN_CIRCLE + 1; ++i) {
        const angle = STEP * i + Math.PI / 2 + lineAngle; // Start angle is -90deg
        vertices.push(x + radius * Math.cos(angle), y + radius * Math.sin(angle), 0);
        indices.push(baseVertex, baseVertex + i + 1, baseVertex + ((i + 1) % (SECTORS_IN_CIRCLE + 1)) + 1);
    }
}
/**
 * Returns the number of points in circle used for caps.
 *
 * @param lineWidth Width of line.
 */
// tslint:disable-next-line:no-unused-variable
function numCirclePoints(lineWidth) {
    return SECTORS_IN_CIRCLE + 1;
}
exports.numCirclePoints = numCirclePoints;
/**
 * Create a triangle mesh from the given polyline.
 *
 * @param points Sequence of (x,y,z) coordinates.
 * @param width The width of the extruded line.
 * @param vertices The output vertex buffer.
 * @param indices The output index buffer.
 * @param startWithCircle `true` if the line should start will a circle.
 * @param endWithCircle `true` if the line should end with a circle.
 */
function triangulateLine(points, width, vertices, indices, startWithCircle = true, endWithCircle = startWithCircle) {
    if (points.length < 3) {
        return;
    }
    // This vector is used for computing cap angle
    const angleVec = new THREE.Vector2();
    if (startWithCircle) {
        // Define lineAngle as (direction - origin) vector angle to X axis
        const lineAngle = points.length !== 3
            ? angleVec.set(points[3] - points[0], points[4] - points[1]).angle()
            : 0;
        addCircle(points[0], points[1], lineAngle, width, vertices, indices);
    }
    const baseVertex = vertices.length / 3;
    // bt = Bitangent (i.e. extrusion vector)
    const prevBt = new THREE.Vector3();
    const p = new THREE.Vector3(); // current point
    const n = new THREE.Vector3(); // next point
    const bt = new THREE.Vector3();
    const averageBt = new THREE.Vector3();
    const p0 = new THREE.Vector3();
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    const p3 = new THREE.Vector3();
    const N = points.length / 3;
    let vertexOffset = 0;
    for (let i = 0; i < N; ++i) {
        let useBevel = false;
        p.set(points[i * 3], points[i * 3 + 1], points[i * 3 + 2]);
        if (i + 1 < N) {
            n.set(points[(i + 1) * 3], points[(i + 1) * 3 + 1], points[(i + 1) * 3 + 2]);
            bt.copy(n)
                .sub(p)
                .normalize()
                .cross(UNIT_Z);
            averageBt.copy(bt);
            if (i > 0) {
                averageBt.add(prevBt).multiplyScalar(1.0 - 0.5 * bt.dot(prevBt));
                useBevel = prevBt.angleTo(bt) > Math.PI / 2;
                if (useBevel) {
                    const inclineWidth = width / Math.cos(bt.angleTo(prevBt) / 2);
                    p0.copy(bt)
                        .add(prevBt)
                        .normalize()
                        .multiplyScalar(-inclineWidth)
                        .add(p);
                    p1.copy(prevBt)
                        .multiplyScalar(width)
                        .add(p);
                    // p2 is used for "miter" connections
                    p2.copy(bt)
                        .add(prevBt)
                        .normalize()
                        .multiplyScalar(inclineWidth)
                        .add(p);
                    p3.copy(bt)
                        .multiplyScalar(width)
                        .add(p);
                }
            }
            if (useBevel) {
                vertices.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
            }
            else {
                p0.copy(averageBt)
                    .multiplyScalar(-width)
                    .add(p);
                p1.copy(averageBt)
                    .multiplyScalar(width)
                    .add(p);
                vertices.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
            }
            prevBt.copy(bt);
        }
        else {
            p0.copy(prevBt)
                .multiplyScalar(-width)
                .add(p);
            p1.copy(prevBt)
                .multiplyScalar(width)
                .add(p);
            vertices.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
        }
        if (i !== N - 1) {
            (useBevel ? BEVEL_POINTS : POINTS).forEach(o => indices.push(baseVertex + vertexOffset + o));
            vertexOffset += useBevel ? 4 : 2;
        }
    }
    if (endWithCircle) {
        const lineAngle = points.length !== 2
            ? angleVec
                .set(points[(N - 3) * 3] - points[(N - 2) * 3], points[(N - 3) * 3 + 1] - points[(N - 2) * 3 + 1])
                .angle()
            : Math.PI;
        addCircle(points[(N - 2) * 3], points[(N - 2) * 3 + 1], lineAngle, width, vertices, indices);
    }
}
exports.triangulateLine = triangulateLine;
/**
 * Reconstruct the original points of a line from the vertices of the triangulated line.
 *
 * @param inBuffer Buffer with vertices.
 * @param startOffset Start index, will differ from `0` if the line has caps.
 * @returns Buffer containing the original points of the triangulated line.
 */
function reconstructLine(inBuffer, startOffset) {
    const outBuffer = new Float32Array(inBuffer.length / 2);
    for (let i = startOffset * 3, i2 = i * 2; i < outBuffer.length; i += 3, i2 += 6) {
        outBuffer[i] = inBuffer[i2] + (inBuffer[i2 + 3] - inBuffer[i2]) * 0.5;
        outBuffer[i + 1] = inBuffer[i2 + 1] + (inBuffer[i2 + 3 + 1] - inBuffer[i2 + 1]) * 0.5;
        outBuffer[i + 2] = inBuffer[i2 + 2] + (inBuffer[i2 + 3 + 2] - inBuffer[i2 + 2]) * 0.5;
    }
    return outBuffer;
}
exports.reconstructLine = reconstructLine;
/**
 * Extract the line width from a triangulated line.
 *
 * @param inBuffer Array of vertex elements of a triangulated line.
 * @param startIndex Start index, will differ from `0` if the line has caps.
 */
function reconstructLineWidth(inBuffer, startIndex) {
    const xd = inBuffer[startIndex * 2 + 3] - inBuffer[startIndex * 2];
    const yd = inBuffer[startIndex * 2 + 3 + 1] - inBuffer[startIndex * 2 + 1];
    const zd = inBuffer[startIndex * 2 + 3 + 2] - inBuffer[startIndex * 2 + 2];
    return Math.sqrt(xd * xd + yd * yd + zd * zd) * 0.5;
}
exports.reconstructLineWidth = reconstructLineWidth;


/***/ }),

/***/ "../harp-mapview-decoder/index-worker.ts":
/*!***********************************************!*\
  !*** ../harp-mapview-decoder/index-worker.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./lib/ThemedTileDecoder */ "../harp-mapview-decoder/lib/ThemedTileDecoder.ts"));
__export(__webpack_require__(/*! ./lib/TileDecoderService */ "../harp-mapview-decoder/lib/TileDecoderService.ts"));
__export(__webpack_require__(/*! ./lib/TilerService */ "../harp-mapview-decoder/lib/TilerService.ts"));
__export(__webpack_require__(/*! ./lib/WorkerService */ "../harp-mapview-decoder/lib/WorkerService.ts"));
__export(__webpack_require__(/*! ./lib/WorkerServiceManager */ "../harp-mapview-decoder/lib/WorkerServiceManager.ts"));
__export(__webpack_require__(/*! ./lib/GeoJsonTiler */ "../harp-mapview-decoder/lib/GeoJsonTiler.ts"));


/***/ }),

/***/ "../harp-mapview-decoder/lib/GeoJsonTiler.ts":
/*!***************************************************!*\
  !*** ../harp-mapview-decoder/lib/GeoJsonTiler.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
const geojsonvtExport = __webpack_require__(/*! geojson-vt */ "../../node_modules/geojson-vt/src/index.js");
// to be able to run tests on nodejs
const geojsonvt = geojsonvtExport.default || geojsonvtExport;
class GeoJsonTiler {
    constructor() {
        this.indexes = new Map();
    }
    dispose() {
        /* */
    }
    async connect() {
        return Promise.resolve();
    }
    async registerIndex(indexId, input) {
        if (this.indexes.has(indexId)) {
            return;
        }
        return this.updateIndex(indexId, input);
    }
    async updateIndex(indexId, input) {
        if (input instanceof URL) {
            const response = await fetch(input.href);
            if (!response.ok) {
                throw new Error(`GeoJsonTiler: Unable to fetch ${input.href}: ${response.statusText}`);
            }
            input = await response.json();
        }
        else {
            input = input;
        }
        const index = geojsonvt(input, {
            maxZoom: 20,
            indexMaxZoom: 5,
            indexMaxPoints: 100000,
            tolerance: 3,
            extent: 4096,
            buffer: 0,
            lineMetrics: false,
            promoteId: null,
            generateId: true,
            debug: 0 // logging level (0, 1 or 2)
        });
        index.geojson = input;
        this.indexes.set(indexId, index);
    }
    async getTile(indexId, tileKey) {
        const index = this.indexes.get(indexId);
        if (index === undefined) {
            throw new Error("Tile not found");
        }
        const tile = index.getTile(tileKey.level, tileKey.column, tileKey.row);
        if (tile !== null) {
            tile.layer = indexId;
            for (const feature of tile.features) {
                feature.originalGeometry = this.getOriginalGeometry(feature, index.geojson);
            }
        }
        return tile || {};
    }
    getOriginalGeometry(feature, geojson) {
        switch (geojson.type) {
            case "Point":
            case "MultiPoint":
            case "LineString":
            case "MultiLineString":
            case "Polygon":
            case "MultiPolygon":
            case "GeometryCollection":
                return geojson;
            case "Feature":
                return geojson.geometry;
            case "FeatureCollection":
                return geojson.features[feature.id].geometry;
        }
    }
}
exports.GeoJsonTiler = GeoJsonTiler;


/***/ }),

/***/ "../harp-mapview-decoder/lib/ThemedTileDecoder.ts":
/*!********************************************************!*\
  !*** ../harp-mapview-decoder/lib/ThemedTileDecoder.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_decoder_1 = __webpack_require__(/*! @here/harp-datasource-protocol/index-decoder */ "../harp-datasource-protocol/index-decoder.ts");
/**
 * `ThemedTileDecoder` implements an [[ITileDecoder]] which uses a [[Theme]] to apply styles to the
 * objects displayed in the map.
 *
 * By default, decoders are executed in web workers (using [[TileDecoderService]]) for performance
 * reasons.
 */
class ThemedTileDecoder {
    constructor() {
        this.m_storageLevelOffset = 0;
    }
    dispose() {
        // implemented in subclasses
    }
    decodeTile(data, tileKey, projection) {
        if (this.m_styleSetEvaluator === undefined) {
            return Promise.reject(new Error("No style is defined"));
        }
        return this.decodeThemedTile(data, tileKey, this.m_styleSetEvaluator, projection);
    }
    // tslint:disable:no-unused-variable
    getTileInfo(data, tileKey, projection) {
        return Promise.resolve(undefined);
    }
    // tslint:disable:no-unused-variable
    configure(styleSet, definitions, languages, options) {
        if (styleSet !== undefined) {
            this.m_styleSetEvaluator = new index_decoder_1.StyleSetEvaluator(styleSet, definitions);
        }
        if (languages !== undefined) {
            this.languages = languages;
        }
        if (options !== undefined && options.storageLevelOffset !== undefined) {
            this.m_storageLevelOffset = options.storageLevelOffset;
        }
    }
}
exports.ThemedTileDecoder = ThemedTileDecoder;


/***/ }),

/***/ "../harp-mapview-decoder/lib/TileDecoderService.ts":
/*!*********************************************************!*\
  !*** ../harp-mapview-decoder/lib/TileDecoderService.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const WorkerService_1 = __webpack_require__(/*! ./WorkerService */ "../harp-mapview-decoder/lib/WorkerService.ts");
const logger = harp_utils_1.LoggerManager.instance.create("TileDecoderService");
/**
 * An extension to [[WorkerService]], the `TileDecoderService` implements an asynchronous
 * (message based) service to decode tile content in web workers. The `TileDecoderService` itself
 * lives in the web worker, and communicates with messages by means of a [[ConcurrentWorkerSet]]
 * with the application.
 *
 * The `TileDecoderService` handles a [[DecodeTileRequest]], which contains a tile and its freshly
 * loaded binary data, decodes the content with the [[ITileDecoder]] that the service is configured
 * to use, and sends the data back in form of a [[WorkerServiceResponse]].
 */
class TileDecoderService extends WorkerService_1.WorkerService {
    /**
     * Set up the `TileDecoderService`. The name of the service must be unique
     *
     * @param serviceId Service id. Must be unique.
     * @param m_decoder Decoder to handle the decoding and info requests.
     */
    constructor(serviceId, m_decoder) {
        super(serviceId);
        this.serviceId = serviceId;
        this.m_decoder = m_decoder;
        this.m_decoder.connect();
    }
    /**
     * Start a [[TileDecoderService]] with a given decoder.
     *
     * @param serviceId Service id. Must be unique.
     * @param decoder   [[TileDecoder]] instance.
     */
    static start(serviceId, decoder) {
        return new TileDecoderService(serviceId, decoder);
    }
    /**
     * Handle incoming request messages. Identifies message type and processes the request.
     *
     * @param request Message that is either a DecodeTileRequest or a TileInfoRequest.
     * @returns A promise which resolves to a [[WorkerServiceResponse]].
     * @override
     */
    handleRequest(request) {
        if (harp_datasource_protocol_1.WorkerDecoderProtocol.isDecodeTileRequest(request)) {
            return this.handleDecodeTileRequest(request);
        }
        else if (harp_datasource_protocol_1.WorkerDecoderProtocol.isTileInfoRequest(request)) {
            return this.handleTileInfoRequest(request);
        }
        else {
            return super.handleRequest(request);
        }
    }
    /**
     * Handle incoming configuration message. Configuration message is passed on to decoder.
     *
     * @param request Message of type [[ConfigurationMessage]].
     * @override
     */
    handleMessage(message) {
        if (harp_datasource_protocol_1.WorkerDecoderProtocol.isConfigurationMessage(message)) {
            this.handleConfigurationMessage(message);
        }
        else {
            logger.error(`[${this.serviceId}]: invalid message ${message.type}`);
        }
    }
    handleDecodeTileRequest(request) {
        const tileKey = harp_geoutils_1.TileKey.fromMortonCode(request.tileKey);
        const projection = harp_datasource_protocol_1.getProjection(request.projection);
        return this.m_decoder.decodeTile(request.data, tileKey, projection).then(decodedTile => {
            const transferList = [];
            decodedTile.geometries.forEach(geom => {
                geom.vertexAttributes.forEach(attr => {
                    if (attr.buffer instanceof ArrayBuffer) {
                        transferList.push(attr.buffer);
                    }
                });
                if (geom.index && geom.index.buffer instanceof ArrayBuffer) {
                    transferList.push(geom.index.buffer);
                }
                if (geom.objInfos !== undefined &&
                    geom.objInfos.length === 1 &&
                    typeof geom.objInfos[0] === "object" &&
                    "displacementMap" in geom.objInfos[0]) {
                    transferList.push(geom.objInfos[0].displacementMap.buffer);
                }
            });
            decodedTile.techniques.forEach(technique => {
                harp_datasource_protocol_1.addBuffersToTransferList(technique, transferList);
            });
            return {
                response: decodedTile,
                transferList
            };
        });
    }
    handleTileInfoRequest(request) {
        const tileKey = harp_geoutils_1.TileKey.fromMortonCode(request.tileKey);
        const projection = harp_datasource_protocol_1.getProjection(request.projection);
        return this.m_decoder.getTileInfo(request.data, tileKey, projection).then(tileInfo => {
            const transferList = tileInfo !== undefined && tileInfo.transferList !== undefined
                ? tileInfo.transferList
                : [];
            return {
                response: tileInfo,
                transferList
            };
        });
    }
    handleConfigurationMessage(message) {
        this.m_decoder.configure(message.styleSet, message.definitions, message.languages, message.options);
    }
}
exports.TileDecoderService = TileDecoderService;


/***/ }),

/***/ "../harp-mapview-decoder/lib/TilerService.ts":
/*!***************************************************!*\
  !*** ../harp-mapview-decoder/lib/TilerService.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const GeoJsonTiler_1 = __webpack_require__(/*! ./GeoJsonTiler */ "../harp-mapview-decoder/lib/GeoJsonTiler.ts");
const WorkerService_1 = __webpack_require__(/*! ./WorkerService */ "../harp-mapview-decoder/lib/WorkerService.ts");
/**
 * An extension to [[WorkerService]], the `TilerService` implements an asynchronous (message based)
 * service to tile untiled payloads in web workers. The `TilerService` itself lives in the web
 * worker, and communicates with messages by means of a [[ConcurrentWorkerSet]] with the
 * application.
 *
 * The `TilerService` registers tile indices (parent tile to be subdivided) by handling a
 * [[RegisterIndexRequest]], and can later retrieve tiled payloads from through the [[TileRequest]].
 * The data is sent back in form of a [[WorkerServiceResponse]].
 */
class TilerService extends WorkerService_1.WorkerService {
    /**
     * Set up the `TilerService`. The name of the service must be unique
     *
     * @param serviceId Service id. Must be unique.
     */
    constructor(serviceId) {
        super(serviceId);
        this.serviceId = serviceId;
        this.tiler = new GeoJsonTiler_1.GeoJsonTiler();
    }
    /**
     * Start a [[TilerService]].
     *
     * @param serviceId Service id. Must be unique.
     */
    static start(serviceId) {
        return new TilerService(serviceId);
    }
    /**
     * Handle incoming request messages. Identifies message type and processes the request.
     *
     * @param request [[WorkerTilerProtocol]] request.
     * @returns A promise which resolves to a [[WorkerServiceResponse]].
     * @override
     */
    handleRequest(request) {
        if (harp_datasource_protocol_1.WorkerTilerProtocol.isRegisterIndexRequest(request)) {
            return this.handleRegisterIndexRequest(request);
        }
        else if (harp_datasource_protocol_1.WorkerTilerProtocol.isUpdateIndexRequest(request)) {
            return this.handleUpdateIndexRequest(request);
        }
        else if (harp_datasource_protocol_1.WorkerTilerProtocol.isTileRequest(request)) {
            return this.handleTileRequest(request);
        }
        else {
            return super.handleRequest(request);
        }
    }
    async handleTileRequest(request) {
        const tileKey = harp_geoutils_1.TileKey.fromMortonCode(request.tileKey);
        const tile = await this.tiler.getTile(request.index, tileKey);
        return { response: tile || {} };
    }
    async handleRegisterIndexRequest(message) {
        const input = typeof message.input === "string" ? new URL(message.input) : message.input;
        await this.tiler.registerIndex(message.id, input);
        return { response: {} };
    }
    async handleUpdateIndexRequest(message) {
        const input = typeof message.input === "string" ? new URL(message.input) : message.input;
        this.tiler.updateIndex(message.id, input);
        return { response: {} };
    }
}
exports.TilerService = TilerService;


/***/ }),

/***/ "../harp-mapview-decoder/lib/WorkerService.ts":
/*!****************************************************!*\
  !*** ../harp-mapview-decoder/lib/WorkerService.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const logger = harp_utils_1.LoggerManager.instance.create("WorkerService", { enabled: false });
/**
 * Worker Service communication helper.
 *
 * Listens to Web Worker messages from [[ConcurrentWorkerSet]] and implements:
 *  - worker service initialization
 *  - request/response scheme
 *  - error handling.
 *
 * This class should be subclassed to provide concrete like [[TileDecoderService]].
 *
 * Communication peer for [[ConcurrentWorkerSet]].
 */
class WorkerService {
    /**
     * Sets up the `WorkerService` with the specified name, and starts processing messages.
     *
     * @param serviceId The service id.
     */
    constructor(serviceId) {
        this.serviceId = serviceId;
        this.m_pendingRequests = new Map();
        /**
         * Central message handler for this service.
         *
         * Responsible for filtering message target and managing request/response sequence.
         *
         * @param message Message to be dispatched.
         */
        this.onMessage = (message) => {
            if (typeof message.data.service !== "string" || message.data.service !== this.serviceId) {
                return;
            }
            try {
                if (harp_datasource_protocol_1.WorkerServiceProtocol.isRequestMessage(message.data)) {
                    const request = message.data;
                    const requestEntry = {
                        service: request.service,
                        messageId: request.messageId,
                        responseSent: false
                    };
                    this.m_pendingRequests.set(request.messageId, requestEntry);
                    this.tryHandleRequest(request.request)
                        .then(response => {
                        this.doSendResponse(requestEntry, {
                            service: this.serviceId,
                            type: harp_datasource_protocol_1.WorkerServiceProtocol.ServiceMessageName.Response,
                            messageId: request.messageId,
                            response: response.response
                        }, response.transferList);
                    })
                        .catch(error => {
                        this.doSendResponse(requestEntry, {
                            service: this.serviceId,
                            type: harp_datasource_protocol_1.WorkerServiceProtocol.ServiceMessageName.Response,
                            messageId: request.messageId,
                            errorMessage: error.toString(),
                            errorStack: error.stack
                        });
                    });
                }
                else {
                    this.tryHandleMessage(message.data);
                }
            }
            catch (err) {
                logger.error(`[${this.serviceId}]: Unhandled exception when handling ${message.type}`);
            }
        };
        self.addEventListener("message", this.onMessage);
        const isInitializedMessage = {
            service: serviceId,
            type: harp_datasource_protocol_1.WorkerServiceProtocol.ServiceMessageName.Initialized
        };
        self.postMessage(isInitializedMessage);
    }
    /**
     * Destroy the `WorkerService`. Cancels all pending requests ad removes itself from the message
     * queue.
     */
    destroy() {
        this.cancelAllPendingRequests();
        self.removeEventListener("message", this.onMessage);
    }
    /**
     * Message handler to be overridden by implementation.
     *
     * @param message `MessageEvent.data` as received by `WorkerService`.
     */
    handleMessage(message) {
        logger.error(`[${this.serviceId}]: Invalid message ${message.type}`);
    }
    /**
     * Call request handler to be overridden by implementation.
     *
     * @param request [[RequestMessage.request]] as received by `WorkerService`.
     */
    handleRequest(request) {
        throw new Error(`ServiceAdapter[${this.serviceId}]: Invalid request '${request.type}'`);
    }
    /**
     * Safety belt over [[handleMessage]] for correct exception handling & logging.
     */
    tryHandleMessage(message) {
        try {
            this.handleMessage(message);
        }
        catch (error) {
            logger.error(`[${this.serviceId}]: Failed, handling message ${message.type}`);
        }
    }
    /**
     * Safety belt over [[handleRequest]] for correct exception handling in promise chain.
     */
    tryHandleRequest(request) {
        try {
            return this.handleRequest(request);
        }
        catch (error) {
            // we don't log exceptions here as they are propagated to client as responses
            logger.error(`[${this.serviceId}]: Failure`, error);
            return Promise.reject(error);
        }
    }
    doSendResponse(requestEntry, response, transferList) {
        if (requestEntry.responseSent) {
            return;
        }
        if (transferList !== undefined) {
            self.postMessage(response, transferList);
        }
        else {
            self.postMessage(response);
        }
        requestEntry.responseSent = true;
        this.m_pendingRequests.delete(requestEntry.messageId);
    }
    cancelAllPendingRequests() {
        this.m_pendingRequests.forEach(requestEntry => {
            this.doSendResponse(requestEntry, {
                service: this.serviceId,
                type: harp_datasource_protocol_1.WorkerServiceProtocol.ServiceMessageName.Response,
                messageId: requestEntry.messageId,
                errorMessage: "cancelled"
            });
        });
    }
}
exports.WorkerService = WorkerService;


/***/ }),

/***/ "../harp-mapview-decoder/lib/WorkerServiceManager.ts":
/*!***********************************************************!*\
  !*** ../harp-mapview-decoder/lib/WorkerServiceManager.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const WorkerService_1 = __webpack_require__(/*! ./WorkerService */ "../harp-mapview-decoder/lib/WorkerService.ts");
/**
 * Manages dynamic worker services in Web Worker context.
 *
 * Handles `CreateService` and `DestroyService` messages sent to Web Worker. Singleton (in scope of
 * one worker runtime!), starts automatically with first [[getInstance]] call.
 */
class WorkerServiceManager extends WorkerService_1.WorkerService {
    constructor(serviceId = harp_datasource_protocol_1.WorkerServiceProtocol.WORKER_SERVICE_MANAGER_SERVICE_ID) {
        super(serviceId);
        /**
         * Contains all registered service factories indexed by `serviceType`.
         */
        this.m_factories = new Map();
        /**
         * Contains all managed worker services indexed by their `serviceId`.
         */
        this.m_services = new Map();
    }
    /**
     * Gets the default instance of `WorkerServiceManager`. Starts the service when first called.
     */
    static getInstance() {
        if (this.m_service === undefined) {
            this.m_service = new WorkerServiceManager(harp_datasource_protocol_1.WorkerServiceProtocol.WORKER_SERVICE_MANAGER_SERVICE_ID);
        }
        return this.m_service;
    }
    /**
     * Register [[WorkerService]] class to this manager.
     *
     * @param workerServiceDescriptor service type and factory
     */
    register(workerServiceDescriptor) {
        this.m_factories.set(workerServiceDescriptor.serviceType, workerServiceDescriptor.factory);
    }
    /** @override */
    handleRequest(request) {
        if (request.type === harp_datasource_protocol_1.WorkerServiceProtocol.Requests.CreateService) {
            const existingService = this.m_services.get(request.targetServiceId);
            if (existingService !== undefined) {
                throw Error(
                // tslint:disable-next-line: max-line-length
                `error - service with targetServiceId='${request.targetServiceId}' already running, ignoring CreateService request`);
            }
            const factory = this.m_factories.get(request.targetServiceType);
            if (factory === undefined) {
                throw Error(`unknown targetServiceType requested: '${request.targetServiceType}'`);
            }
            const service = factory(request.targetServiceId);
            this.m_services.set(request.targetServiceId, service);
        }
        if (request.type === harp_datasource_protocol_1.WorkerServiceProtocol.Requests.DestroyService) {
            const service = this.m_services.get(request.targetServiceId);
            if (service === undefined) {
                throw Error(`unknown targetServiceId '${request.targetServiceId}'`);
            }
            service.destroy();
            this.m_services.delete(request.targetServiceId);
        }
        return Promise.resolve({
            response: {}
        });
    }
}
exports.WorkerServiceManager = WorkerServiceManager;


/***/ }),

/***/ "../harp-mapview/lib/workers/WorkerBootstrapDefs.ts":
/*!**********************************************************!*\
  !*** ../harp-mapview/lib/workers/WorkerBootstrapDefs.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isWorkerBootstrapRequest(message) {
    return (message &&
        message.type === "worker-bootstrap-request" &&
        Array.isArray(message.dependencies));
}
exports.isWorkerBootstrapRequest = isWorkerBootstrapRequest;
function isWorkerBootstrapResponse(message) {
    return (message &&
        message.type === "worker-bootstrap-response" &&
        Array.isArray(message.resolvedDependencies));
}
exports.isWorkerBootstrapResponse = isWorkerBootstrapResponse;


/***/ }),

/***/ "../harp-materials/lib/MapMeshMaterialsDefs.ts":
/*!*****************************************************!*\
  !*** ../harp-materials/lib/MapMeshMaterialsDefs.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ExtrusionFeatureDefs;
(function (ExtrusionFeatureDefs) {
    /**
     * Minimum ratio value for extrusion effect
     */
    ExtrusionFeatureDefs.DEFAULT_RATIO_MIN = 0.0;
    /**
     * Maximum ratio value for extrusion effect
     */
    ExtrusionFeatureDefs.DEFAULT_RATIO_MAX = 1;
    /**
     * Buildings height used whenever no height-data is present or height is very small.
     *
     * Used to avoid z-fighting between ground plane and building.
     */
    ExtrusionFeatureDefs.MIN_BUILDING_HEIGHT = 0.01;
})(ExtrusionFeatureDefs = exports.ExtrusionFeatureDefs || (exports.ExtrusionFeatureDefs = {}));


/***/ }),

/***/ "../harp-omv-datasource/index-worker.ts":
/*!**********************************************!*\
  !*** ../harp-omv-datasource/index-worker.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./lib/OmvDecoder */ "../harp-omv-datasource/lib/OmvDecoder.ts"));
__export(__webpack_require__(/*! ./lib/OmvTiler */ "../harp-omv-datasource/lib/OmvTiler.ts"));
__export(__webpack_require__(/*! ./lib/OmvDecoderDefs */ "../harp-omv-datasource/lib/OmvDecoderDefs.ts"));


/***/ }),

/***/ "../harp-omv-datasource/lib/OmvData.ts":
/*!*********************************************!*\
  !*** ../harp-omv-datasource/lib/OmvData.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_decoder_1 = __webpack_require__(/*! @here/harp-datasource-protocol/index-decoder */ "../harp-datasource-protocol/index-decoder.ts");
const Long = __webpack_require__(/*! long */ "../../node_modules/long/src/long.js");
const three_1 = __webpack_require__(/*! three */ "three");
const OmvDecoderDefs_1 = __webpack_require__(/*! ./OmvDecoderDefs */ "../harp-omv-datasource/lib/OmvDecoderDefs.ts");
const OmvUtils_1 = __webpack_require__(/*! ./OmvUtils */ "../harp-omv-datasource/lib/OmvUtils.ts");
const vector_tile_1 = __webpack_require__(/*! ./proto/vector_tile */ "../harp-omv-datasource/lib/proto/vector_tile.js");
/**
 * @hidden
 */
var CommandKind;
(function (CommandKind) {
    CommandKind[CommandKind["MoveTo"] = 1] = "MoveTo";
    CommandKind[CommandKind["LineTo"] = 2] = "LineTo";
    CommandKind[CommandKind["ClosePath"] = 7] = "ClosePath";
})(CommandKind = exports.CommandKind || (exports.CommandKind = {}));
/**
 * @hidden
 */
function isMoveToCommand(command) {
    return command.kind === CommandKind.MoveTo;
}
exports.isMoveToCommand = isMoveToCommand;
/**
 * @hidden
 */
function isLineToCommand(command) {
    return command.kind === CommandKind.LineTo;
}
exports.isLineToCommand = isLineToCommand;
/**
 * @hidden
 */
function isClosePathCommand(command) {
    return command.kind === CommandKind.ClosePath;
}
exports.isClosePathCommand = isClosePathCommand;
/**
 * @hidden
 */
function visitOmv(vectorTile, visitor) {
    if (!vectorTile.layers) {
        return;
    }
    for (const layer of vectorTile.layers) {
        if (!visitor.visitLayer || visitor.visitLayer(layer)) {
            visitOmvLayer(layer, visitor);
        }
        if (visitor.endVisitLayer) {
            visitor.endVisitLayer(layer);
        }
    }
}
exports.visitOmv = visitOmv;
/**
 * @hidden
 */
function visitOmvLayer(layer, visitor) {
    if (!visitor.visitLayer || visitor.visitLayer(layer)) {
        if (layer.features) {
            for (const feature of layer.features) {
                switch (feature.type) {
                    case vector_tile_1.com.mapbox.pb.Tile.GeomType.UNKNOWN:
                        break;
                    case vector_tile_1.com.mapbox.pb.Tile.GeomType.POINT:
                        if (visitor.visitPointFeature) {
                            visitor.visitPointFeature(feature);
                        }
                        break;
                    case vector_tile_1.com.mapbox.pb.Tile.GeomType.LINESTRING:
                        if (visitor.visitLineFeature) {
                            visitor.visitLineFeature(feature);
                        }
                        break;
                    case vector_tile_1.com.mapbox.pb.Tile.GeomType.POLYGON:
                        if (visitor.visitPolygonFeature) {
                            visitor.visitPolygonFeature(feature);
                        }
                        break;
                }
            }
        }
    }
    if (visitor.endVisitLayer) {
        visitor.endVisitLayer(layer);
    }
}
exports.visitOmvLayer = visitOmvLayer;
/**
 * @hidden
 */
class FeatureAttributes {
    accept(layer, feature, visitor) {
        const { keys, values } = layer;
        const tags = feature.tags;
        if (!tags || !keys || !values) {
            return;
        }
        for (let i = 0; i < tags.length; i += 2) {
            const key = keys[tags[i]];
            const value = values[tags[i + 1]];
            if (!visitor.visitAttribute(key, value)) {
                break;
            }
        }
    }
}
exports.FeatureAttributes = FeatureAttributes;
/**
 * @hidden
 */
class GeometryCommands {
    accept(geometry, visitor) {
        if (!geometry) {
            return;
        }
        const geometryCount = geometry.length;
        let currX = 0;
        let currY = 0;
        const xCoords = [];
        const yCoords = [];
        const commands = [];
        for (let cmdIndex = 0; cmdIndex < geometryCount;) {
            // tslint:disable:no-bitwise
            const kind = (geometry[cmdIndex] & 0x7);
            const count = geometry[cmdIndex] >> 0x3;
            // tslint:enable:no-bitwise
            ++cmdIndex;
            if (kind === CommandKind.MoveTo || kind === CommandKind.LineTo) {
                for (let n = 0; n < count; ++n) {
                    const xx = geometry[cmdIndex++];
                    const yy = geometry[cmdIndex++];
                    // tslint:disable:no-bitwise
                    currX += (xx >> 1) ^ -(xx & 1);
                    currY += (yy >> 1) ^ -(yy & 1);
                    if (visitor.type === "Polygon") {
                        xCoords.push(currX);
                        yCoords.push(currY);
                    }
                    const position = new three_1.Vector2(currX, currY);
                    commands.push({ kind, position });
                }
            }
            else {
                for (const command of commands) {
                    visitor.visitCommand(command);
                }
                visitor.visitCommand({ kind });
                xCoords.length = 0;
                yCoords.length = 0;
                commands.length = 0;
            }
        }
        if (commands.length > 0) {
            for (const command of commands) {
                visitor.visitCommand(command);
            }
        }
    }
}
exports.GeometryCommands = GeometryCommands;
const propertyCategories = [
    "stringValue",
    "floatValue",
    "doubleValue",
    "intValue",
    "uintValue",
    "sintValue",
    "boolValue"
];
function simplifiedValue(value) {
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    for (const category of propertyCategories) {
        if (hasOwnProperty.call(value, category)) {
            const v = value[category];
            if (v === undefined) {
                throw new Error("unpexted undefined value");
            }
            return Long.isLong(v) ? v.toNumber() : v;
        }
    }
    throw new Error("not happening");
}
function replaceReservedName(name) {
    switch (name) {
        case "id":
            return "$id";
        default:
            return name;
    } // switch
}
function decodeFeatureId(feature, logger) {
    if (feature.id !== undefined) {
        if (typeof feature.id === "number") {
            return feature.id;
        }
        else if (feature.id !== null && Long.isLong(feature.id)) {
            if (feature.id.greaterThan(Number.MAX_SAFE_INTEGER)) {
                if (logger !== undefined) {
                    logger.error("Invalid ID: Larger than largest available Number in feature: ", feature);
                }
            }
            return feature.id.toNumber(); // long
        }
    }
    return undefined;
}
function readAttributes(layer, feature, defaultAttributes = {}) {
    const attrs = new FeatureAttributes();
    const attributes = defaultAttributes || {};
    attrs.accept(layer, feature, {
        visitAttribute: (name, value) => {
            attributes[replaceReservedName(name)] = simplifiedValue(value);
            return true;
        }
    });
    return attributes;
}
function createFeatureEnv(layer, feature, geometryType, storageLevel, storageLevelOffset, logger, parent) {
    const attributes = {
        $layer: layer.name,
        $level: storageLevel,
        $zoom: Math.max(0, storageLevel - (storageLevelOffset || 0)),
        $geometryType: geometryType
    };
    // Some sources serve `id` directly as `IFeature` property ...
    if (feature.id !== undefined) {
        const featureId = decodeFeatureId(feature, logger);
        if (featureId !== undefined) {
            attributes.$id = featureId;
        }
    }
    readAttributes(layer, feature, attributes);
    return new index_decoder_1.MapEnv(attributes, parent);
}
function asGeometryType(feature) {
    if (feature === undefined) {
        return OmvDecoderDefs_1.OmvGeometryType.UNKNOWN;
    }
    switch (feature.type) {
        case vector_tile_1.com.mapbox.pb.Tile.GeomType.UNKNOWN:
            return OmvDecoderDefs_1.OmvGeometryType.UNKNOWN;
        case vector_tile_1.com.mapbox.pb.Tile.GeomType.POINT:
            return OmvDecoderDefs_1.OmvGeometryType.POINT;
        case vector_tile_1.com.mapbox.pb.Tile.GeomType.LINESTRING:
            return OmvDecoderDefs_1.OmvGeometryType.LINESTRING;
        case vector_tile_1.com.mapbox.pb.Tile.GeomType.POLYGON:
            return OmvDecoderDefs_1.OmvGeometryType.POLYGON;
        default:
            return OmvDecoderDefs_1.OmvGeometryType.UNKNOWN;
    } // switch
}
/**
 * The class [[OmvProtobufDataAdapter]] converts OMV protobuf geo data
 * to geometries for the given [[IGeometryProcessor]].
 */
class OmvProtobufDataAdapter {
    /**
     * Constructs a new [[OmvProtobufDataAdapter]].
     *
     * @param processor The [[IGeometryProcessor]] used to process the data.
     * @param dataFilter The [[OmvFeatureFilter]] used to filter features.
     * @param logger The [[ILogger]] used to log diagnostic messages.
     */
    constructor(processor, dataFilter, logger) {
        this.id = "omv-protobuf";
        this.m_geometryCommands = new GeometryCommands();
        this.m_processor = processor;
        this.m_dataFilter = dataFilter;
        this.m_logger = logger;
    }
    /**
     * The [[OmvFeatureFilter]] used to filter features.
     */
    get dataFilter() {
        return this.m_dataFilter;
    }
    /**
     * The [[OmvFeatureFilter]] used to filter features.
     */
    set dataFilter(dataFilter) {
        this.m_dataFilter = dataFilter;
    }
    /**
     * Checks that the given data can be processed by this [[OmvProtobufDataAdapter]].
     */
    canProcess(data) {
        return OmvUtils_1.isArrayBufferLike(data);
    }
    /**
     * Processes the given data payload using this adapter's [[IGeometryProcessor]].
     *
     * @param data The data payload to process.
     * @param tileKey The [[TileKey]] of the tile enclosing the data.
     */
    process(data, tileKey) {
        const payload = new Uint8Array(data);
        const proto = vector_tile_1.com.mapbox.pb.Tile.decode(payload);
        this.m_tileKey = tileKey;
        visitOmv(proto, this);
    }
    /**
     * Visits the OMV layer.
     *
     * @param layer The OMV layer to process.
     */
    visitLayer(layer) {
        this.m_layer = layer;
        const storageLevel = this.m_tileKey.level;
        const layerName = layer.name;
        if (this.m_dataFilter !== undefined &&
            !this.m_dataFilter.wantsLayer(layerName, storageLevel)) {
            return false;
        }
        return true;
    }
    /**
     * Visits point features.
     *
     * @param feature The OMV point features to process.
     */
    visitPointFeature(feature) {
        if (feature.geometry === undefined) {
            return;
        }
        const storageLevel = this.m_tileKey.level;
        const layerName = this.m_layer.name;
        const layerExtents = this.m_layer.extent || 4096;
        if (this.m_dataFilter !== undefined &&
            !this.m_dataFilter.wantsPointFeature(layerName, asGeometryType(feature), storageLevel)) {
            return;
        }
        const geometry = [];
        this.m_geometryCommands.accept(feature.geometry, {
            type: "Point",
            visitCommand: command => {
                if (isMoveToCommand(command)) {
                    geometry.push(command.position);
                }
            }
        });
        if (geometry.length === 0) {
            return;
        }
        const env = createFeatureEnv(this.m_layer, feature, "point", storageLevel, this.m_processor.storageLevelOffset, this.m_logger);
        this.m_processor.processPointFeature(layerName, layerExtents, geometry, env, storageLevel);
    }
    /**
     * Visits the line features.
     *
     * @param feature The line features to process.
     */
    visitLineFeature(feature) {
        if (feature.geometry === undefined) {
            return;
        }
        const storageLevel = this.m_tileKey.level;
        const layerName = this.m_layer.name;
        const layerExtents = this.m_layer.extent || 4096;
        if (this.m_dataFilter !== undefined &&
            !this.m_dataFilter.wantsLineFeature(layerName, asGeometryType(feature), storageLevel)) {
            return;
        }
        const geometry = [];
        let positions;
        this.m_geometryCommands.accept(feature.geometry, {
            type: "Line",
            visitCommand: command => {
                if (isMoveToCommand(command)) {
                    positions = [command.position];
                    geometry.push({ positions });
                }
                else if (isLineToCommand(command)) {
                    positions.push(command.position);
                }
            }
        });
        if (geometry.length === 0) {
            return;
        }
        const env = createFeatureEnv(this.m_layer, feature, "line", storageLevel, this.m_processor.storageLevelOffset, this.m_logger);
        this.m_processor.processLineFeature(layerName, layerExtents, geometry, env, storageLevel);
    }
    /**
     * Visits the polygon features.
     *
     * @param feature The polygon features to process.
     */
    visitPolygonFeature(feature) {
        if (feature.geometry === undefined) {
            return;
        }
        const storageLevel = this.m_tileKey.level;
        const layerName = this.m_layer.name;
        const layerExtents = this.m_layer.extent || 4096;
        if (this.m_dataFilter !== undefined &&
            !this.m_dataFilter.wantsPolygonFeature(layerName, asGeometryType(feature), storageLevel)) {
            return;
        }
        const geometry = [];
        const currentPolygon = { rings: [] };
        let currentRing;
        this.m_geometryCommands.accept(feature.geometry, {
            type: "Polygon",
            visitCommand: command => {
                if (isMoveToCommand(command)) {
                    currentRing = [command.position];
                }
                else if (isLineToCommand(command)) {
                    currentRing.push(command.position);
                }
                else if (isClosePathCommand(command)) {
                    currentPolygon.rings.push(currentRing);
                }
            }
        });
        if (currentPolygon.rings.length > 0) {
            geometry.push(currentPolygon);
        }
        if (geometry.length === 0) {
            return;
        }
        const env = createFeatureEnv(this.m_layer, feature, "polygon", storageLevel, this.m_processor.storageLevelOffset, this.m_logger);
        this.m_processor.processPolygonFeature(layerName, layerExtents, geometry, env, storageLevel);
    }
}
exports.OmvProtobufDataAdapter = OmvProtobufDataAdapter;


/***/ }),

/***/ "../harp-omv-datasource/lib/OmvDataFilter.ts":
/*!***************************************************!*\
  !*** ../harp-omv-datasource/lib/OmvDataFilter.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const OmvDecoderDefs_1 = __webpack_require__(/*! ./OmvDecoderDefs */ "../harp-omv-datasource/lib/OmvDecoderDefs.ts");
/**
 * Builds an `OmvFilterDescription` (internal type) that specifies an [[OmvFeatureFilter]] as well
 * as an [[OmvFeatureModifier]].
 *
 */
class OmvFeatureFilterDescriptionBuilder {
    /**
     * Builds an `OmvFilterDescription` (internal type) that specifies an [[OmvFeatureFilter]] as
     * well as an [[OmvFeatureModifier]].
     *
     * @param processLayersDefault If `true`, all unspecified layers will be processed. If `false`,
     * all unspecified layers will be ignored.
     * @param processPointsDefault If `true`, all unspecified point features will be processed. If
     * `false`, all unspecified point features will be ignored.
     * @param processLinesDefault If `true`, all unspecified line features will be processed. If
     * `false`, all unspecified line features will be ignored.
     * @param processPolygonsDefault If `true`, all unspecified polygon features will be processed.
     * If `false`, all unspecified polygon features will be ignored.
     */
    constructor(options) {
        this.m_processLayersDefault = true;
        this.m_processPointsDefault = true;
        this.m_processLinesDefault = true;
        this.m_processPolygonsDefault = true;
        this.m_layersToProcess = new Array();
        this.m_layersToIgnore = new Array();
        this.m_pointsToProcess = new Array();
        this.m_ignoredPoints = new Array();
        this.m_linesToProcess = new Array();
        this.m_linesToIgnore = new Array();
        this.m_polygonsToProcess = new Array();
        this.m_polygonsToIgnore = new Array();
        this.m_kindsToProcess = [];
        this.m_kindsToIgnore = [];
        if (options) {
            this.m_processLayersDefault =
                options.processLayersDefault !== undefined ? options.processLayersDefault : true;
            this.m_processPointsDefault =
                options.processPointsDefault !== undefined ? options.processPointsDefault : true;
            this.m_processLinesDefault =
                options.processLinesDefault !== undefined ? options.processLinesDefault : true;
            this.m_processPolygonsDefault =
                options.processPolygonsDefault !== undefined
                    ? options.processPolygonsDefault
                    : true;
        }
    }
    /**
     * Add a layer that should be processed.
     *
     * @param layer Layer name to be matched.
     * @param match Match condition.
     */
    processLayer(layer, match = OmvDecoderDefs_1.OmvFilterString.StringMatch.Match, minLevel = 0, maxLevel = Infinity) {
        this.m_layersToProcess.push({
            name: { value: layer, match },
            minLevel,
            maxLevel
        });
    }
    /**
     * Add a layer that should be ignored.
     *
     * @param layer Layer name to be matched.
     * @param match Match condition.
     */
    ignoreLayer(layer, match = OmvDecoderDefs_1.OmvFilterString.StringMatch.Match, minLevel = 0, maxLevel = Infinity) {
        this.m_layersToIgnore.push({
            name: { value: layer, match },
            minLevel,
            maxLevel
        });
    }
    /**
     * Add a valid point feature.
     *
     * @param options Feature options.
     */
    processPoint(options) {
        this.addItem(this.m_pointsToProcess, options);
    }
    /**
     * Add valid point features.
     *
     * @param options Multi feature options.
     */
    processPoints(options) {
        this.addItems(this.m_pointsToProcess, options);
    }
    /**
     * Add a point feature that should be ignored.
     *
     * @param options Feature options.
     */
    ignorePoint(options) {
        this.addItem(this.m_ignoredPoints, options);
    }
    /**
     * Add point features that should be ignored.
     *
     * @param options Multi feature options.
     */
    ignorePoints(options) {
        this.addItems(this.m_ignoredPoints, options);
    }
    /**
     * Add a valid line feature.
     *
     * @param options Feature options.
     */
    processLine(options) {
        this.addItem(this.m_linesToProcess, options);
    }
    /**
     * Add valid line features.
     *
     * @param options Multi feature options.
     */
    processLines(options) {
        this.addItems(this.m_linesToProcess, options);
    }
    /**
     * Ignore a line feature.
     *
     * @param options Feature options.
     */
    ignoreLine(options) {
        this.addItem(this.m_linesToIgnore, options);
    }
    /**
     * Ignore line features.
     *
     * @param options Multi feature options.
     */
    ignoreLines(options) {
        this.addItems(this.m_linesToIgnore, options);
    }
    /**
     * Add a valid polygon feature.
     *
     * @param options Feature options.
     */
    processPolygon(options) {
        this.addItem(this.m_polygonsToProcess, options);
    }
    /**
     * Add valid polygon features.
     *
     * @param options Multi feature options.
     */
    processPolygons(options) {
        this.addItems(this.m_polygonsToProcess, options);
    }
    /**
     * Ignore a valid polygon feature.
     *
     * @param options Feature options.
     */
    ignorePolygon(options) {
        this.addItem(this.m_polygonsToIgnore, options);
    }
    /**
     * Ignore polygon features.
     *
     * @param options Multi feature options.
     */
    ignorePolygons(options) {
        this.addItems(this.m_polygonsToIgnore, options);
    }
    /**
     * Add all the specified strings as "enabledKinds".
     *
     * @param {string[]} enabledKinds List of kinds that should be generated.
     */
    processKinds(enabledKinds) {
        this.m_kindsToProcess = this.m_kindsToProcess.concat(enabledKinds);
    }
    /**
     * Add all the specified strings as "disabledKinds".
     *
     * @param {string[]} disabledKinds List of kinds that should _not_ be generated.
     */
    ignoreKinds(disabledKinds) {
        this.m_kindsToIgnore = this.m_kindsToIgnore.concat(disabledKinds);
    }
    /**
     * Create a filter description that can be passed as an option to the [[OmvDataSource]].
     */
    createDescription() {
        return {
            processLayersDefault: this.m_processLayersDefault,
            processPointsDefault: this.m_processPointsDefault,
            processLinesDefault: this.m_processLinesDefault,
            processPolygonsDefault: this.m_processPolygonsDefault,
            layersToProcess: this.m_layersToProcess,
            layersToIgnore: this.m_layersToIgnore,
            pointsToProcess: this.m_pointsToProcess,
            pointsToIgnore: this.m_ignoredPoints,
            linesToProcess: this.m_linesToProcess,
            linesToIgnore: this.m_linesToIgnore,
            polygonsToProcess: this.m_polygonsToProcess,
            polygonsToIgnore: this.m_polygonsToIgnore,
            kindsToProcess: this.m_kindsToProcess,
            kindsToIgnore: this.m_kindsToIgnore
        };
    }
    addItem(items, options) {
        if (options.minLevel === undefined || isNaN(options.minLevel)) {
            options.minLevel = 0;
        }
        if (options.maxLevel === undefined || isNaN(options.maxLevel)) {
            options.maxLevel = Infinity;
        }
        const item = {
            layerName: {
                value: options.layer,
                match: options.matchLayer === undefined
                    ? OmvDecoderDefs_1.OmvFilterString.StringMatch.Match
                    : options.matchLayer
            },
            geometryTypes: options.geomType !== undefined
                ? Array.isArray(options.geomType)
                    ? options.geomType
                    : [options.geomType]
                : undefined,
            classes: [
                {
                    value: options.featureClass,
                    match: options.matchClass === undefined
                        ? OmvDecoderDefs_1.OmvFilterString.StringMatch.Match
                        : options.matchClass
                }
            ],
            minLevel: options.minLevel,
            maxLevel: options.maxLevel,
            featureAttribute: options.featureAttribute
        };
        items.push(item);
    }
    addItems(items, options) {
        if (options.minLevel === undefined || isNaN(options.minLevel)) {
            options.minLevel = 0;
        }
        if (options.maxLevel === undefined || isNaN(options.maxLevel)) {
            options.maxLevel = Infinity;
        }
        const item = {
            layerName: {
                value: options.layer,
                match: options.matchLayer === undefined
                    ? OmvDecoderDefs_1.OmvFilterString.StringMatch.Match
                    : options.matchLayer
            },
            geometryTypes: options.geomTypes !== undefined
                ? Array.isArray(options.geomTypes)
                    ? options.geomTypes
                    : [options.geomTypes]
                : undefined,
            classes: options.featureClasses,
            minLevel: options.minLevel,
            maxLevel: options.maxLevel,
            featureAttribute: options.featureAttribute
        };
        items.push(item);
    }
}
exports.OmvFeatureFilterDescriptionBuilder = OmvFeatureFilterDescriptionBuilder;
/**
 * `OmvFeatureFilter` implementation that uses a `OmvFeatureFilterDescription` to filter `TileData`
 * features before they are completely decoded.
 *
 * @hidden
 */
class OmvGenericFeatureFilter {
    constructor(description) {
        this.description = description;
        if (this.description.kindsToProcess.length > 0) {
            this.enabledKinds = new harp_datasource_protocol_1.GeometryKindSet(this.description.kindsToProcess);
        }
        if (this.description.kindsToIgnore.length > 0) {
            this.disabledKinds = new harp_datasource_protocol_1.GeometryKindSet(this.description.kindsToIgnore);
        }
    }
    static matchLayer(layer, layerItems, level) {
        for (const layerItem of layerItems) {
            if (level < layerItem.minLevel || level > layerItem.maxLevel) {
                continue;
            }
            if (OmvDecoderDefs_1.OmvFilterString.matchString(layer, layerItem.name)) {
                return true;
            }
        }
        return false;
    }
    wantsLayer(layer, level) {
        if (OmvGenericFeatureFilter.matchLayer(layer, this.description.layersToProcess, level)) {
            return true;
        }
        if (OmvGenericFeatureFilter.matchLayer(layer, this.description.layersToIgnore, level)) {
            return false;
        }
        return this.description.processLayersDefault;
    }
    wantsPointFeature(layer, geometryType, level) {
        return this.wantsFeature(this.description.pointsToProcess, this.description.pointsToIgnore, layer, geometryType, level, this.description.processPointsDefault);
    }
    wantsLineFeature(layer, geometryType, level) {
        return this.wantsFeature(this.description.linesToProcess, this.description.linesToIgnore, layer, geometryType, level, this.description.processLinesDefault);
    }
    wantsPolygonFeature(layer, geometryType, level) {
        return this.wantsFeature(this.description.polygonsToProcess, this.description.polygonsToIgnore, layer, geometryType, level, this.description.processPolygonsDefault);
    }
    wantsKind(kind) {
        // undefined -> no way to filter
        if (kind === undefined) {
            return true;
        }
        return (!(this.disabledKinds !== undefined &&
            this.disabledKinds.hasOrIntersects(kind)) ||
            (this.enabledKinds !== undefined &&
                this.enabledKinds.hasOrIntersects(kind)));
    }
    get hasKindFilter() {
        return this.enabledKinds !== undefined || this.disabledKinds !== undefined;
    }
    wantsFeature(itemsToProcess, itemsToIgnore, layer, geometryType, level, defaultResult) {
        for (const item of itemsToProcess) {
            if (level < item.minLevel || level > item.maxLevel) {
                continue;
            }
            if (!OmvDecoderDefs_1.OmvFilterString.matchString(layer, item.layerName)) {
                // this rule is not for this layer
                continue;
            }
            if (item.geometryTypes !== undefined && item.geometryTypes.indexOf(geometryType) >= 0) {
                return true;
            }
        }
        for (const item of itemsToIgnore) {
            if (!OmvDecoderDefs_1.OmvFilterString.matchString(layer, item.layerName)) {
                // this rule is not for this layer
                continue;
            }
            if (item.geometryTypes !== undefined && item.geometryTypes.indexOf(geometryType) >= 0) {
                return false;
            }
        }
        return defaultResult;
    }
}
exports.OmvGenericFeatureFilter = OmvGenericFeatureFilter;
/**
 * An [[OmvFeatureFilter]] implementation that delegates all filter decision
 * returning `true` for any predicate if all delegates return `true`.
 */
class ComposedDataFilter {
    constructor(filters) {
        this.filters = filters;
    }
    get hasKindFilter() {
        return this.filters.reduce((result, filter) => result && filter.hasKindFilter, true);
    }
    wantsLayer(layer, level) {
        return this.filters.reduce((result, filter) => result && filter.wantsLayer(layer, level), true);
    }
    wantsPointFeature(layer, geometryType, level) {
        return this.filters.reduce((result, filter) => result && filter.wantsPointFeature(layer, geometryType, level), true);
    }
    wantsLineFeature(layer, geometryType, level) {
        return this.filters.reduce((result, filter) => result && filter.wantsLineFeature(layer, geometryType, level), true);
    }
    wantsPolygonFeature(layer, geometryType, level) {
        return this.filters.reduce((result, filter) => result && filter.wantsPolygonFeature(layer, geometryType, level), true);
    }
    wantsKind(kind) {
        return this.filters.reduce((result, filter) => result && filter.wantsKind(kind), true);
    }
}
exports.ComposedDataFilter = ComposedDataFilter;
/**
 * `OmvFeatureModifier` implementation that uses a `OmvFeatureFilterDescription` to filter
 * `TileData` features before they are completely decoded.
 *
 * @hidden
 */
class OmvGenericFeatureModifier {
    constructor(description) {
        this.description = description;
    }
    static matchItems(layerName, featureClass, items) {
        for (const item of items) {
            if (item.classes !== undefined) {
                if (!OmvDecoderDefs_1.OmvFilterString.matchString(layerName, item.layerName)) {
                    continue;
                }
                for (const matchClass of item.classes) {
                    if (OmvDecoderDefs_1.OmvFilterString.matchString(featureClass, matchClass)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    static matchAttribute(layerName, env, items) {
        for (const item of items) {
            if (item.featureAttribute !== undefined) {
                if (OmvDecoderDefs_1.OmvFilterString.matchString(layerName, item.layerName) &&
                    env.lookup(item.featureAttribute.key) === item.featureAttribute.value) {
                    return true;
                }
            }
        }
        return false;
    }
    doProcessPointFeature(layer, env) {
        return this.doProcessFeature(this.description.pointsToProcess, this.description.pointsToIgnore, layer, env, this.description.processPointsDefault);
    }
    doProcessLineFeature(layer, env) {
        return this.doProcessFeature(this.description.linesToProcess, this.description.linesToIgnore, layer, env, this.description.processLinesDefault);
    }
    doProcessPolygonFeature(layer, env) {
        return this.doProcessFeature(this.description.polygonsToProcess, this.description.polygonsToIgnore, layer, env, this.description.processPolygonsDefault);
    }
    doProcessFeature(itemsToProcess, itemsToIgnore, layer, env, defaultResult) {
        if (layer === undefined || (itemsToProcess.length === 0 && itemsToIgnore.length === 0)) {
            return defaultResult;
        }
        let featureClass;
        const featureClassThing = env.lookup("class");
        if (featureClassThing !== undefined && featureClassThing !== null) {
            featureClass = featureClassThing.toString();
        }
        if (featureClass &&
            OmvGenericFeatureModifier.matchItems(layer, featureClass, itemsToProcess)) {
            return true;
        }
        if (featureClass &&
            OmvGenericFeatureModifier.matchItems(layer, featureClass, itemsToIgnore)) {
            return false;
        }
        if (OmvGenericFeatureModifier.matchAttribute(layer, env, itemsToProcess)) {
            return true;
        }
        if (OmvGenericFeatureModifier.matchAttribute(layer, env, itemsToIgnore)) {
            return false;
        }
        return defaultResult;
    }
}
exports.OmvGenericFeatureModifier = OmvGenericFeatureModifier;


/***/ }),

/***/ "../harp-omv-datasource/lib/OmvDecodedTileEmitter.ts":
/*!***********************************************************!*\
  !*** ../harp-omv-datasource/lib/OmvDecodedTileEmitter.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const Lines_1 = __webpack_require__(/*! @here/harp-lines/lib/Lines */ "../harp-lines/lib/Lines.ts");
const TriangulateLines_1 = __webpack_require__(/*! @here/harp-lines/lib/TriangulateLines */ "../harp-lines/lib/TriangulateLines.ts");
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const earcut_1 = __webpack_require__(/*! earcut */ "../../node_modules/earcut/src/earcut.js");
const THREE = __webpack_require__(/*! three */ "three");
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const OmvDecoder_1 = __webpack_require__(/*! ./OmvDecoder */ "../harp-omv-datasource/lib/OmvDecoder.ts");
const OmvUtils_1 = __webpack_require__(/*! ./OmvUtils */ "../harp-omv-datasource/lib/OmvUtils.ts");
const TechniqueAttr_1 = __webpack_require__(/*! @here/harp-datasource-protocol/lib/TechniqueAttr */ "../harp-datasource-protocol/lib/TechniqueAttr.ts");
// tslint:disable-next-line:max-line-length
const SphericalGeometrySubdivisionModifier_1 = __webpack_require__(/*! @here/harp-geometry/lib/SphericalGeometrySubdivisionModifier */ "../harp-geometry/lib/SphericalGeometrySubdivisionModifier.ts");
const MapMeshMaterialsDefs_1 = __webpack_require__(/*! @here/harp-materials/lib/MapMeshMaterialsDefs */ "../harp-materials/lib/MapMeshMaterialsDefs.ts");
const clipPolygon_1 = __webpack_require__(/*! ./clipPolygon */ "../harp-omv-datasource/lib/clipPolygon.ts");
const logger = harp_utils_1.LoggerManager.instance.create("OmvDecodedTileEmitter");
const tempTileOrigin = new THREE.Vector3();
const tempVertOrigin = new THREE.Vector3();
const tempVertNormal = new THREE.Vector3();
const tempFootDisp = new THREE.Vector3();
const tempRoofDisp = new THREE.Vector3();
const tmpV2 = new THREE.Vector2();
const tmpV2r = new THREE.Vector2();
const tmpV3 = new THREE.Vector3();
const tmpV3r = new THREE.Vector3();
const tmpV4 = new THREE.Vector3();
const tempP0 = new THREE.Vector2();
const tempP1 = new THREE.Vector2();
const tempPreviousTangent = new THREE.Vector2();
const tmpPointA = new THREE.Vector3();
const tmpPointB = new THREE.Vector3();
const tmpPointC = new THREE.Vector3();
const tmpPointD = new THREE.Vector3();
const tmpPointE = new THREE.Vector3();
const tmpLine = new THREE.Line3();
/**
 * Minimum number of pixels per character. Used during estimation if there is enough screen space
 * available to render a text. Based on the estimated screen size of a tile.
 */
const MIN_AVERAGE_CHAR_WIDTH = 5;
/**
 * Estimation "fudge factor", tweaking the size estimation to
 *
 * a) allow room for zooming in to the tile, and
 *
 * b) allow for some tilting, where the edge of a tile closer to the camera has more space.
 *
 * Useful values are between 0 (allow all labels), 0.5 (allow labels at twice the default display
 * size of the tile) and 1.0 (skip labels that would normally not be displayed at default tile
 * size).
 */
const SIZE_ESTIMATION_FACTOR = 0.5;
/**
 * Maximum allowed corner angle inside a label path.
 */
const MAX_CORNER_ANGLE = Math.PI / 8;
/**
 * Used to identify an invalid (or better: unused) array index.
 */
const INVALID_ARRAY_INDEX = -1;
// for tilezen by default extrude all buildings even those without height data
class MeshBuffers {
    constructor(type) {
        this.type = type;
        this.positions = [];
        this.normals = [];
        this.textureCoordinates = [];
        this.colors = [];
        this.extrusionAxis = [];
        this.indices = [];
        this.edgeIndices = [];
        this.groups = [];
        this.texts = [];
        this.pathLengths = [];
        this.stringCatalog = [];
        this.imageTextures = [];
        /**
         * Optional list of feature start indices. The indices point into the index attribute.
         */
        this.featureStarts = [];
        /**
         * An optional list of additional data that can be used as additional data for the object
         * picking.
         */
        this.objInfos = [];
    }
    addText(text) {
        let index = this.stringCatalog.indexOf(text);
        if (index < 0) {
            index = this.stringCatalog.length;
            this.stringCatalog.push(text);
        }
        return index;
    }
}
var LineType;
(function (LineType) {
    LineType[LineType["Simple"] = 0] = "Simple";
    LineType[LineType["Complex"] = 1] = "Complex";
})(LineType = exports.LineType || (exports.LineType = {}));
const tmpColor = new THREE.Color();
class OmvDecodedTileEmitter {
    constructor(m_decodeInfo, m_styleSetEvaluator, m_gatherFeatureAttributes, m_skipShortLabels, m_enableElevationOverlay, m_languages) {
        this.m_decodeInfo = m_decodeInfo;
        this.m_styleSetEvaluator = m_styleSetEvaluator;
        this.m_gatherFeatureAttributes = m_gatherFeatureAttributes;
        this.m_skipShortLabels = m_skipShortLabels;
        this.m_enableElevationOverlay = m_enableElevationOverlay;
        this.m_languages = m_languages;
        // mapping from style index to mesh buffers
        this.m_meshBuffers = new Map();
        this.m_geometries = [];
        this.m_textGeometries = [];
        this.m_textPathGeometries = [];
        this.m_pathGeometries = [];
        this.m_poiGeometries = [];
        this.m_simpleLines = [];
        this.m_solidLines = [];
        this.m_sources = [];
        this.m_maxGeometryHeight = 0;
    }
    get projection() {
        return this.m_decodeInfo.targetProjection;
    }
    get center() {
        return this.m_decodeInfo.center;
    }
    /**
     * Creates the Point of Interest geometries for the given feature.
     *
     * @param layer Tile's layer to be processed.
     * @param extents Tile's layer extents.
     * @param geometry The current feature containing the main geometry.
     * @param env The [[MapEnv]] containing the environment information for the map.
     * @param techniques The array of [[Technique]] that will be applied to the geometry.
     * @param featureId The id of the feature.
     */
    processPointFeature(layer, extents, geometry, context, techniques, featureId) {
        const env = context.env;
        this.processFeatureCommon(env);
        for (const technique of techniques) {
            if (technique === undefined) {
                continue;
            }
            const techniqueIndex = technique._index;
            const meshBuffers = this.findOrCreateMeshBuffers(techniqueIndex, harp_datasource_protocol_1.GeometryType.Point);
            if (meshBuffers === undefined) {
                continue;
            }
            const { positions, texts, imageTextures, objInfos } = meshBuffers;
            const shouldCreateTextGeometries = harp_datasource_protocol_1.isTextTechnique(technique) || harp_datasource_protocol_1.isPoiTechnique(technique);
            let imageTexture;
            const wantsPoi = harp_datasource_protocol_1.isPoiTechnique(technique);
            if (wantsPoi) {
                const poiTechnique = technique;
                imageTexture = TechniqueAttr_1.evaluateTechniqueAttr(context, poiTechnique.imageTexture);
                // TODO: Move to decoder independent parts of code.
                if (poiTechnique.poiName !== undefined) {
                    imageTexture = TechniqueAttr_1.evaluateTechniqueAttr(context, poiTechnique.poiName);
                }
                else if (typeof poiTechnique.poiNameField === "string") {
                    const poiNameFieldValue = env.lookup(poiTechnique.poiNameField);
                    imageTexture = poiNameFieldValue;
                }
                else if (typeof poiTechnique.imageTextureField === "string") {
                    const imageTextureValue = env.lookup(poiTechnique.imageTextureField);
                    imageTexture = harp_datasource_protocol_1.composeTechniqueTextureName(imageTextureValue, poiTechnique);
                }
            }
            for (const pos of geometry) {
                if (shouldCreateTextGeometries) {
                    const textTechnique = technique;
                    const text = harp_datasource_protocol_1.ExtendedTileInfo.getFeatureText(context, textTechnique, this.m_languages);
                    if (text !== undefined && text.length > 0) {
                        texts.push(meshBuffers.addText(text));
                    }
                    else {
                        texts.push(INVALID_ARRAY_INDEX);
                    }
                }
                // Always store the position, otherwise the following POIs will be
                // misplaced.
                if (shouldCreateTextGeometries) {
                    OmvUtils_1.webMercatorTile2TargetWorld(extents, this.m_decodeInfo, pos, tmpV3);
                }
                else {
                    OmvUtils_1.webMercatorTile2TargetTile(extents, this.m_decodeInfo, pos, tmpV3);
                }
                positions.push(tmpV3.x, tmpV3.y, tmpV3.z);
                objInfos.push(this.m_gatherFeatureAttributes ? env.entries : harp_datasource_protocol_1.getFeatureId(env.entries));
                if (wantsPoi) {
                    if (imageTexture === undefined) {
                        imageTextures.push(INVALID_ARRAY_INDEX);
                    }
                    else {
                        imageTextures.push(meshBuffers.addText(imageTexture));
                    }
                }
            }
        }
    }
    /**
     *
     * Creates the line geometries for the given feature.
     *
     * @param layer Tile's layer to be processed.
     * @param extents Tile's layer extents.
     * @param geometry The current feature containing the main geometry.
     * @param env The [[MapEnv]] containing the environment information for the map.
     * @param techniques The array of [[Technique]] that will be applied to the geometry.
     * @param featureId The id of the feature.
     */
    processLineFeature(layer, extents, geometry, context, techniques, featureId) {
        const env = context.env;
        this.processFeatureCommon(env);
        const localLines = []; // lines in target tile space.
        const worldLines = []; // lines in world space.
        const uvs = [];
        const offsets = [];
        const { projectedTileBounds } = this.m_decodeInfo;
        let localLineSegments; // lines in target tile space for special dashes.
        const tileWidth = projectedTileBounds.max.x - projectedTileBounds.min.x;
        const tileHeight = projectedTileBounds.max.y - projectedTileBounds.min.y;
        const tileSizeInMeters = Math.max(tileWidth, tileHeight);
        let computeTexCoords;
        let texCoordinateType;
        const hasUntiledLines = geometry[0].untiledPositions !== undefined;
        // If true, special handling for dashes is required (round and diamond shaped dashes).
        let hasIndividualLineSegments = false;
        let hasContinuousLineSegments = false;
        // Check if any of the techniques needs texture coordinates
        for (const technique of techniques) {
            if (technique === undefined) {
                continue;
            }
            if (!computeTexCoords) {
                computeTexCoords = this.getComputeTexCoordsFunc(technique);
                texCoordinateType = this.getTextureCoordinateType(technique);
            }
            else {
                // Support generation of only one type of texture coordinates.
                const otherTexCoordType = this.getTextureCoordinateType(technique);
                harp_utils_1.assert(otherTexCoordType === undefined || texCoordinateType === otherTexCoordType);
            }
            hasIndividualLineSegments =
                hasIndividualLineSegments || harp_datasource_protocol_1.isSpecialDashesLineTechnique(technique);
            hasContinuousLineSegments = hasContinuousLineSegments || !hasIndividualLineSegments;
        }
        for (const polyline of geometry) {
            // Compute the world position of the untiled line and its distance to the origin of the
            // line to properly join lines.
            const untiledLine = [];
            let lineDist = 0;
            if (hasUntiledLines) {
                this.m_decodeInfo.targetProjection.projectPoint(polyline.untiledPositions[0], tmpV3r);
                polyline.untiledPositions.forEach(pos => {
                    // Calculate the distance to the next un-normalized point.
                    this.m_decodeInfo.targetProjection.projectPoint(pos, tmpV3);
                    lineDist += tmpV3.distanceTo(tmpV3r);
                    tmpV3r.copy(tmpV3);
                    // Pushed the normalized point for line matching.
                    this.m_decodeInfo.targetProjection.projectPoint(pos.normalized(), tmpV3);
                    untiledLine.push(tmpV3.x, tmpV3.y, tmpV3.z, lineDist);
                });
            }
            // Add continuous line as individual segments to improve special dashes by overlapping
            // their connecting vertices. The technique/style should defined round or rectangular
            // caps.
            if (hasIndividualLineSegments) {
                localLineSegments = [];
                // Compute length of whole line and offsets of individual segments.
                let lineLength = 0;
                const pointCount = polyline.positions.length;
                if (pointCount > 1) {
                    let lastSegmentOffset = 0;
                    for (let i = 0; i < pointCount - 1; i++) {
                        const localLine = [];
                        const worldLine = [];
                        const lineUvs = [];
                        const segmentOffsets = [];
                        const pos1 = polyline.positions[i];
                        const pos2 = polyline.positions[i + 1];
                        OmvUtils_1.webMercatorTile2TargetWorld(extents, this.m_decodeInfo, pos1, tmpV3);
                        worldLine.push(tmpV3.x, tmpV3.y, tmpV3.z);
                        OmvUtils_1.webMercatorTile2TargetWorld(extents, this.m_decodeInfo, pos2, tmpV4);
                        worldLine.push(tmpV4.x, tmpV4.y, tmpV4.z);
                        if (computeTexCoords) {
                            {
                                const { u, v } = computeTexCoords(pos1, extents);
                                lineUvs.push(u, v);
                            }
                            {
                                const { u, v } = computeTexCoords(pos2, extents);
                                lineUvs.push(u, v);
                            }
                        }
                        if (hasUntiledLines) {
                            // Find where in the [0...1] range relative to the line our current
                            // vertex lies.
                            let offset = this.findRelativePositionInLine(tmpV3, untiledLine) / lineDist;
                            segmentOffsets.push(offset);
                            offset = this.findRelativePositionInLine(tmpV4, untiledLine) / lineDist;
                            segmentOffsets.push(offset);
                        }
                        else {
                            segmentOffsets.push(lastSegmentOffset);
                            // Compute length of segment and whole line to scale down later.
                            const segmentLength = tmpV3.distanceTo(tmpV4);
                            lineLength += segmentLength;
                            lastSegmentOffset += segmentLength;
                            segmentOffsets.push(lastSegmentOffset);
                        }
                        tmpV3.sub(this.m_decodeInfo.center);
                        localLine.push(tmpV3.x, tmpV3.y, tmpV3.z);
                        tmpV4.sub(this.m_decodeInfo.center);
                        localLine.push(tmpV4.x, tmpV4.y, tmpV4.z);
                        localLineSegments.push(localLine);
                        worldLines.push(worldLine);
                        uvs.push(lineUvs);
                        offsets.push(segmentOffsets);
                    }
                }
                if (!hasUntiledLines && lineLength > 0) {
                    // Scale down each individual segment to range [0..1] for whole line.
                    for (const segOffsets of offsets) {
                        segOffsets.forEach((offs, index) => {
                            segOffsets[index] = offs / lineLength;
                        });
                    }
                }
            }
            // Add continuous lines
            if (hasContinuousLineSegments) {
                const localLine = [];
                const worldLine = [];
                const lineUvs = [];
                const lineOffsets = [];
                polyline.positions.forEach(pos => {
                    OmvUtils_1.webMercatorTile2TargetWorld(extents, this.m_decodeInfo, pos, tmpV3);
                    worldLine.push(tmpV3.x, tmpV3.y, tmpV3.z);
                    if (computeTexCoords) {
                        const { u, v } = computeTexCoords(pos, extents);
                        lineUvs.push(u, v);
                    }
                    if (hasUntiledLines) {
                        // Find where in the [0...1] range relative to the line our current vertex
                        // lines.
                        const offset = this.findRelativePositionInLine(tmpV3, untiledLine) / lineDist;
                        lineOffsets.push(offset);
                    }
                    tmpV3.sub(this.m_decodeInfo.center);
                    localLine.push(tmpV3.x, tmpV3.y, tmpV3.z);
                });
                localLines.push(localLine);
                worldLines.push(worldLine);
                uvs.push(lineUvs);
                offsets.push(lineOffsets);
            }
        }
        const wantCircle = this.m_decodeInfo.tileKey.level >= 11;
        for (const technique of techniques) {
            if (technique === undefined) {
                continue;
            }
            const techniqueIndex = technique._index;
            const techniqueName = technique.name;
            if (harp_datasource_protocol_1.isLineTechnique(technique) || harp_datasource_protocol_1.isSolidLineTechnique(technique)) {
                const lineGeometry = harp_datasource_protocol_1.isLineTechnique(technique)
                    ? this.m_simpleLines
                    : this.m_solidLines;
                const lineType = harp_datasource_protocol_1.isLineTechnique(technique) ? LineType.Simple : LineType.Complex;
                if (hasIndividualLineSegments) {
                    harp_utils_1.assert(localLineSegments !== undefined, "OmvDecodedTileEmitter#processLineFeature: " +
                        "Internal error - No localLineSegments");
                    this.applyLineTechnique(lineGeometry, technique, techniqueIndex, lineType, env.entries, localLineSegments, context, this.getTextureCoordinateType(technique) ? uvs : undefined, offsets);
                }
                if (localLines.length > 0) {
                    this.applyLineTechnique(lineGeometry, technique, techniqueIndex, lineType, env.entries, localLines, context, this.getTextureCoordinateType(technique) ? uvs : undefined, hasUntiledLines ? offsets : undefined);
                }
            }
            else if (harp_datasource_protocol_1.isTextTechnique(technique) ||
                harp_datasource_protocol_1.isPoiTechnique(technique) ||
                harp_datasource_protocol_1.isLineMarkerTechnique(technique)) {
                const textTechnique = technique;
                const text = harp_datasource_protocol_1.ExtendedTileInfo.getFeatureText(context, textTechnique, this.m_languages);
                if (text === undefined || text.length === 0) {
                    continue;
                }
                let validLines = [];
                if (this.m_skipShortLabels) {
                    // Filter the lines, keep only those that are long enough for labelling. Also,
                    // split jagged label paths to keep processing and rendering only those that
                    // have no sharp corners, which would not be rendered anyway.
                    const metersPerPixel = tileSizeInMeters / this.m_decodeInfo.tileSizeOnScreen;
                    const minEstimatedLabelLength = MIN_AVERAGE_CHAR_WIDTH *
                        text.length *
                        metersPerPixel *
                        SIZE_ESTIMATION_FACTOR;
                    const minEstimatedLabelLengthSqr = minEstimatedLabelLength * minEstimatedLabelLength;
                    validLines = this.splitJaggyLines(worldLines, minEstimatedLabelLengthSqr, MAX_CORNER_ANGLE);
                }
                else {
                    validLines = worldLines;
                }
                if (validLines.length === 0) {
                    continue;
                }
                if (harp_datasource_protocol_1.isTextTechnique(technique)) {
                    if (text === undefined) {
                        continue;
                    }
                    for (const path of validLines) {
                        const pathLengthSqr = harp_utils_1.Math2D.computeSquaredLineLength(path);
                        this.m_textPathGeometries.push({
                            technique: techniqueIndex,
                            path,
                            pathLengthSqr,
                            text: String(text),
                            objInfos: this.m_gatherFeatureAttributes
                                ? env.entries
                                : harp_datasource_protocol_1.getFeatureId(env.entries)
                        });
                    }
                }
                else {
                    const lineMarkerTechnique = technique;
                    let imageTexture = TechniqueAttr_1.evaluateTechniqueAttr(context, lineMarkerTechnique.imageTexture);
                    // TODO: `imageTextureField` and `imageTexturePrefix` and `imageTexturePostfix`
                    // are now deprecated
                    // TODO: Move to decoder independent parts of code.
                    if (typeof lineMarkerTechnique.imageTextureField === "string") {
                        const imageTextureValue = env.lookup(lineMarkerTechnique.imageTextureField);
                        imageTexture = imageTextureValue;
                        if (typeof lineMarkerTechnique.imageTexturePrefix === "string") {
                            imageTexture = lineMarkerTechnique.imageTexturePrefix + imageTexture;
                        }
                        if (typeof lineMarkerTechnique.imageTexturePostfix === "string") {
                            imageTexture = imageTexture + lineMarkerTechnique.imageTexturePostfix;
                        }
                    }
                    for (const aLine of validLines) {
                        this.m_poiGeometries.push({
                            technique: techniqueIndex,
                            positions: {
                                name: "position",
                                type: "float",
                                buffer: new Float32Array(aLine).buffer,
                                itemCount: 3
                            },
                            texts: [0],
                            stringCatalog: [text, imageTexture],
                            imageTextures: [1],
                            objInfos: this.m_gatherFeatureAttributes
                                ? [env.entries]
                                : [harp_datasource_protocol_1.getFeatureId(env.entries)]
                        });
                    }
                }
            }
            else if (harp_datasource_protocol_1.isLabelRejectionLineTechnique(technique)) {
                for (const path of worldLines) {
                    const worldPath = [];
                    for (let i = 0; i < path.length; i += 3) {
                        worldPath.push(new THREE.Vector3().fromArray(path, i));
                    }
                    this.m_pathGeometries.push({
                        path: worldPath
                    });
                }
            }
            else if (harp_datasource_protocol_1.isExtrudedLineTechnique(technique)) {
                const meshBuffers = this.findOrCreateMeshBuffers(techniqueIndex, harp_datasource_protocol_1.GeometryType.ExtrudedLine);
                if (meshBuffers === undefined) {
                    continue;
                }
                const { positions, indices, groups, featureStarts, objInfos } = meshBuffers;
                const start = indices.length;
                const lineWidth = TechniqueAttr_1.evaluateTechniqueAttr(context, technique.lineWidth);
                if (lineWidth === undefined) {
                    continue;
                }
                const techniqueCaps = TechniqueAttr_1.evaluateTechniqueAttr(context, technique.caps, "Circle");
                const addCircle = wantCircle && techniqueCaps === "Circle";
                localLines.forEach(aLine => {
                    TriangulateLines_1.triangulateLine(aLine, lineWidth, positions, indices, addCircle);
                    featureStarts.push(start);
                    objInfos.push(this.m_gatherFeatureAttributes ? env.entries : harp_datasource_protocol_1.getFeatureId(env.entries));
                });
                const count = indices.length - start;
                groups.push({ start, count, technique: techniqueIndex, featureId });
            }
            else {
                logger.warn(`OmvDecodedTileEmitter#processLineFeature: Invalid line technique
                     ${techniqueName} for layer: ${env.entries.$layer} `);
            }
        }
    }
    /**
     * Creates the polygons geometries for the given feature.
     *
     * @param layer Tile's layer to be processed.
     * @param extents Tile's layer extents.
     * @param geometry The current feature containing the main geometry.
     * @param feature The [[MapEnv]] containing the environment information for the map.
     * @param techniques The array of [[Technique]] that will be applied to the geometry.
     * @param featureId The id of the feature.
     */
    processPolygonFeature(layer, extents, geometry, context, techniques, featureId) {
        const env = context.env;
        this.processFeatureCommon(env);
        techniques.forEach(technique => {
            if (technique === undefined) {
                return;
            }
            const techniqueIndex = technique._index;
            if (techniqueIndex === undefined) {
                throw new Error("OmvDecodedTileEmitter#processPolygonFeature: " +
                    "Internal error - No technique index");
            }
            const polygons = [];
            const isExtruded = harp_datasource_protocol_1.isExtrudedPolygonTechnique(technique);
            const isFilled = harp_datasource_protocol_1.isFillTechnique(technique);
            const isStandard = harp_datasource_protocol_1.isStandardTechnique(technique);
            const isPolygon = isExtruded || isFilled || isStandard;
            const computeTexCoords = this.getComputeTexCoordsFunc(technique);
            const vertexStride = computeTexCoords !== undefined ? 4 : 2;
            let clipRing;
            for (const polygon of geometry) {
                const rings = [];
                for (const outline of polygon.rings) {
                    const ringContour = [];
                    let coords = outline;
                    if (isFilled || isStandard) {
                        const shouldClipPolygon = coords.some(p => p.x < 0 || p.x > extents || p.y < 0 || p.y > extents);
                        if (shouldClipPolygon) {
                            if (!clipRing) {
                                clipRing = [
                                    new THREE.Vector2(0, 0),
                                    new THREE.Vector2(extents, 0),
                                    new THREE.Vector2(extents, extents),
                                    new THREE.Vector2(0, extents)
                                ];
                            }
                            coords = clipPolygon_1.clipPolygon(coords, clipRing);
                        }
                    }
                    if (coords.length === 0) {
                        continue;
                    }
                    for (const coord of coords) {
                        ringContour.push(coord.x, coord.y);
                        if (computeTexCoords !== undefined) {
                            const { u, v } = computeTexCoords(coord, extents);
                            ringContour.push(u, v);
                        }
                    }
                    rings.push(new OmvDecoder_1.Ring(extents, vertexStride, ringContour));
                }
                if (rings.length === 0) {
                    continue;
                }
                polygons.push(rings);
            }
            const isLine = harp_datasource_protocol_1.isSolidLineTechnique(technique) || harp_datasource_protocol_1.isLineTechnique(technique);
            if (isPolygon) {
                this.applyPolygonTechnique(polygons, technique, techniqueIndex, featureId, context, extents);
            }
            else if (isLine) {
                const lineGeometry = technique.name === "line" ? this.m_simpleLines : this.m_solidLines;
                const lineType = technique.name === "line" ? LineType.Simple : LineType.Complex;
                // Use individual line segments instead of a continuous line in special cases (round
                // and diamond shaped dashes).
                const needIndividualLineSegments = harp_datasource_protocol_1.isSpecialDashesLineTechnique(technique);
                polygons.forEach(rings => {
                    const lines = [];
                    const offsets = needIndividualLineSegments
                        ? []
                        : undefined;
                    rings.forEach(ring => {
                        const length = ring.contour.length / ring.vertexStride;
                        let line = [];
                        // Compute length of whole line and offsets of individual segments.
                        let ringLength = 0;
                        let lastSegmentOffset = 0;
                        let segmentOffsets = needIndividualLineSegments
                            ? []
                            : undefined;
                        for (let i = 0; i < length; ++i) {
                            if (needIndividualLineSegments && line.length > 0) {
                                // Allocate a line for every segment.
                                line = [];
                                segmentOffsets = [];
                            }
                            const nextIdx = (i + 1) % length;
                            const currX = ring.contour[i * ring.vertexStride];
                            const currY = ring.contour[i * ring.vertexStride + 1];
                            const nextX = ring.contour[nextIdx * ring.vertexStride];
                            const nextY = ring.contour[nextIdx * ring.vertexStride + 1];
                            const isOutline = !((currX <= 0 && nextX <= 0) ||
                                (currX >= ring.extents && nextX >= ring.extents) ||
                                (currY <= 0 && nextY <= 0) ||
                                (currY >= ring.extents && nextY >= ring.extents));
                            if (!isOutline && line.length !== 0) {
                                lines.push(line);
                                line = [];
                            }
                            else if (isOutline && line.length === 0) {
                                OmvUtils_1.webMercatorTile2TargetTile(extents, this.m_decodeInfo, tmpV2.set(currX, currY), tmpV3);
                                line.push(tmpV3.x, tmpV3.y, tmpV3.z);
                                if (needIndividualLineSegments) {
                                    // Add next point as the end point of this line segment.
                                    OmvUtils_1.webMercatorTile2TargetTile(extents, this.m_decodeInfo, tmpV2.set(nextX, nextY), tmpV4);
                                    line.push(tmpV4.x, tmpV4.y, tmpV4.z);
                                    segmentOffsets.push(lastSegmentOffset);
                                    // Compute length of segment and whole line to scale down later.
                                    const segmentLength = tmpV3.distanceTo(tmpV4);
                                    ringLength += segmentLength;
                                    lastSegmentOffset += segmentLength;
                                    segmentOffsets.push(lastSegmentOffset);
                                }
                            }
                            if (isOutline && !needIndividualLineSegments) {
                                OmvUtils_1.webMercatorTile2TargetTile(extents, this.m_decodeInfo, tmpV2.set(nextX, nextY), tmpV3);
                                line.push(tmpV3.x, tmpV3.y, tmpV3.z);
                            }
                            if (needIndividualLineSegments && line.length > 0 && ringLength > 0) {
                                // Scale down each individual segment to range [0..1] for the whole
                                // line.
                                segmentOffsets.forEach((offs, index) => {
                                    segmentOffsets[index] = offs / ringLength;
                                });
                                // Close the line segment as a single line.
                                lines.push(line);
                                offsets.push(segmentOffsets);
                            }
                        }
                        if (!needIndividualLineSegments && line.length > 0) {
                            lines.push(line);
                        }
                    });
                    if (lines.length === 0) {
                        return;
                    }
                    this.applyLineTechnique(lineGeometry, technique, techniqueIndex, lineType, env.entries, lines, context, undefined, offsets);
                });
            }
        });
    }
    /**
     * Creates the geometries that belongs to the [[Tile].
     *
     * @returns The [[DecodedTile]]
     */
    getDecodedTile() {
        this.createGeometries();
        this.processSimpleLines(this.m_simpleLines);
        this.processLines(this.m_solidLines);
        const decodedTile = {
            techniques: this.m_styleSetEvaluator.decodedTechniques,
            geometries: this.m_geometries,
            decodeTime: undefined
        };
        if (this.m_textGeometries.length > 0) {
            decodedTile.textGeometries = this.m_textGeometries;
        }
        if (this.m_poiGeometries.length > 0) {
            decodedTile.poiGeometries = this.m_poiGeometries;
        }
        if (this.m_textPathGeometries.length > 0) {
            decodedTile.textPathGeometries = this.m_textPathGeometries;
        }
        if (this.m_pathGeometries.length > 0) {
            decodedTile.pathGeometries = this.m_pathGeometries;
        }
        if (this.m_sources.length !== 0) {
            decodedTile.copyrightHolderIds = this.m_sources;
        }
        decodedTile.maxGeometryHeight = this.m_maxGeometryHeight;
        return decodedTile;
    }
    /**
     * Split the lines array into multiple parts if there are sharp corners. Reject parts that are
     * too short to display the label text.
     *
     * @param {number[][]} lines Array containing the points of the paths.
     * @param {number} minEstimatedLabelLengthSqr Minimum label size squared.
     * @param {number} maxCornerAngle Maximum angle between consecutive path segments in radians.
     * @returns The split and filtered lines array.
     */
    splitJaggyLines(lines, minEstimatedLabelLengthSqr, maxCornerAngle) {
        const validLines = [];
        const computeBoundingBoxSizeSqr = (aLine, startIndex, endIndex) => {
            let minX = Number.MAX_SAFE_INTEGER;
            let maxX = Number.MIN_SAFE_INTEGER;
            let minY = Number.MAX_SAFE_INTEGER;
            let maxY = Number.MIN_SAFE_INTEGER;
            for (let i = startIndex; i < endIndex; i += 3) {
                const x = aLine[i];
                const y = aLine[i + 1];
                if (x < minX) {
                    minX = x;
                }
                if (x > maxX) {
                    maxX = x;
                }
                if (y < minY) {
                    minY = y;
                }
                if (y > maxY) {
                    maxY = y;
                }
            }
            return (maxX - minX) * (maxX - minX) + (maxY - minY) * (maxY - minY);
        };
        // Work on a copy of the path.
        const pathsToCheck = lines.slice();
        while (pathsToCheck.length > 0) {
            const path = pathsToCheck.pop();
            if (path === undefined || path.length < 6) {
                continue;
            }
            let splitIndex = -1;
            for (let i = 0; i < path.length - 3; i += 3) {
                tempP0.set(path[i], path[i + 1]);
                tempP1.set(path[i + 3], path[i + 4]);
                const tangent = tempP1.sub(tempP0).normalize();
                if (i > 0) {
                    const theta = Math.atan2(tempPreviousTangent.x * tangent.y - tangent.x * tempPreviousTangent.y, tangent.dot(tempPreviousTangent));
                    if (Math.abs(theta) > maxCornerAngle) {
                        splitIndex = i;
                        break;
                    }
                }
                tempPreviousTangent.set(tangent.x, tangent.y);
            }
            if (splitIndex > 0) {
                // Estimate if the first part of the path is long enough for the label.
                const firstPathLengthSqr = computeBoundingBoxSizeSqr(path, 0, splitIndex + 3);
                // Estimate if the second part of the path is long enough for the label.
                const secondPathLengthSqr = computeBoundingBoxSizeSqr(path, splitIndex, path.length);
                if (firstPathLengthSqr > minEstimatedLabelLengthSqr) {
                    // Split off the valid first path points with a clone of the path.
                    validLines.push(path.slice(0, splitIndex + 3));
                }
                if (secondPathLengthSqr > minEstimatedLabelLengthSqr) {
                    // Now process the second part of the path, it may have to be split
                    // again.
                    pathsToCheck.push(path.slice(splitIndex));
                }
            }
            else {
                // Estimate if the path is long enough for the label, otherwise ignore
                // it for rendering text. First, compute the bounding box in world
                // coordinates.
                const pathLengthSqr = computeBoundingBoxSizeSqr(path, 0, path.length);
                if (pathLengthSqr > minEstimatedLabelLengthSqr) {
                    validLines.push(path);
                }
            }
        }
        return validLines;
    }
    getTextureCoordinateType(technique) {
        // Set TileSpace coordinate type to generate texture coordinates for the displacement map
        // used in elevation overlay.
        if ((harp_datasource_protocol_1.isFillTechnique(technique) ||
            harp_datasource_protocol_1.isSolidLineTechnique(technique) ||
            harp_datasource_protocol_1.isExtrudedPolygonTechnique(technique)) &&
            this.m_enableElevationOverlay) {
            return harp_datasource_protocol_1.TextureCoordinateType.TileSpace;
        }
        return harp_datasource_protocol_1.textureCoordinateType(technique);
    }
    getComputeTexCoordsFunc(technique) {
        const texCoordType = this.getTextureCoordinateType(technique);
        return texCoordType === harp_datasource_protocol_1.TextureCoordinateType.TileSpace
            ? (tilePos, tileExtents) => {
                const { x: u, y: v } = new THREE.Vector2()
                    .copy(tilePos)
                    .divideScalar(tileExtents);
                return { u, v: 1 - v };
            }
            : texCoordType === harp_datasource_protocol_1.TextureCoordinateType.EquirectangularSpace
                ? (tilePos, extents) => {
                    const worldPos = OmvUtils_1.tile2world(extents, this.m_decodeInfo, tilePos, false, tmpV2r);
                    const { x: u, y: v } = harp_geoutils_1.normalizedEquirectangularProjection.reprojectPoint(harp_geoutils_1.webMercatorProjection, new THREE.Vector3(worldPos.x, worldPos.y, 0));
                    return { u, v };
                }
                : undefined;
    }
    applyLineTechnique(linesGeometry, technique, techniqueIndex, lineType = LineType.Complex, featureAttributes, lines, context, uvs, offsets) {
        const renderOrderOffset = TechniqueAttr_1.evaluateTechniqueAttr(context, technique.renderOrderOffset, 0);
        let lineGroup;
        const lineGroupGeometries = linesGeometry.find(aLine => {
            return (aLine.technique === techniqueIndex && aLine.renderOrderOffset === renderOrderOffset);
        });
        const hasNormalsAndUvs = uvs !== undefined;
        if (lineGroupGeometries === undefined) {
            lineGroup = new Lines_1.LineGroup(hasNormalsAndUvs, undefined, lineType === LineType.Simple);
            const aLine = {
                type: lineType === LineType.Complex ? harp_datasource_protocol_1.GeometryType.SolidLine : harp_datasource_protocol_1.GeometryType.Line,
                technique: techniqueIndex,
                renderOrderOffset: renderOrderOffset !== undefined ? Number(renderOrderOffset) : undefined,
                lines: lineGroup
            };
            const techniqueTransient = TechniqueAttr_1.evaluateTechniqueAttr(context, technique.transient, false);
            if (!techniqueTransient && this.m_gatherFeatureAttributes) {
                // if this technique is transient, do not save the featureIds with the geometry
                aLine.objInfos = [featureAttributes];
                aLine.featureStarts = [0];
            }
            linesGeometry.push(aLine);
        }
        else {
            lineGroup = lineGroupGeometries.lines;
            if (this.m_gatherFeatureAttributes &&
                lineGroupGeometries.objInfos &&
                lineGroupGeometries.featureStarts) {
                // Add ID to tag the geometry, also provide the current length of the index
                // attribute
                lineGroupGeometries.objInfos.push(featureAttributes);
                lineGroupGeometries.featureStarts.push(lineGroup.indices.length);
            }
        }
        let i = 0;
        lines.forEach(aLine => {
            lineGroup.add(this.m_decodeInfo.center, aLine, this.projection, offsets ? offsets[i] : undefined, uvs ? uvs[i] : undefined);
            i++;
        });
    }
    applyPolygonTechnique(polygons, technique, techniqueIndex, featureId, context, extents) {
        const isExtruded = harp_datasource_protocol_1.isExtrudedPolygonTechnique(technique);
        const geometryType = isExtruded ? harp_datasource_protocol_1.GeometryType.ExtrudedPolygon : harp_datasource_protocol_1.GeometryType.Polygon;
        const meshBuffers = this.findOrCreateMeshBuffers(techniqueIndex, geometryType);
        if (meshBuffers === undefined) {
            return;
        }
        const extrudedPolygonTechnique = technique;
        const fillTechnique = technique;
        const boundaryWalls = extrudedPolygonTechnique.boundaryWalls !== false;
        const isFilled = harp_datasource_protocol_1.isFillTechnique(technique);
        const texCoordType = this.getTextureCoordinateType(technique);
        let height = TechniqueAttr_1.evaluateTechniqueAttr(context, extrudedPolygonTechnique.height);
        let floorHeight = TechniqueAttr_1.evaluateTechniqueAttr(context, extrudedPolygonTechnique.floorHeight);
        if (height === undefined) {
            // Get the height values for the footprint and extrusion.
            const featureHeight = context.env.lookup("height");
            const styleSetDefaultHeight = TechniqueAttr_1.evaluateTechniqueAttr(context, extrudedPolygonTechnique.defaultHeight);
            height =
                featureHeight !== undefined
                    ? featureHeight
                    : styleSetDefaultHeight !== undefined
                        ? styleSetDefaultHeight
                        : 0;
        }
        if (floorHeight === undefined) {
            const featureMinHeight = context.env.lookup("min_height");
            floorHeight = featureMinHeight !== undefined && !isFilled ? featureMinHeight : 0;
        }
        // Prevent that extruded buildings are completely flat (can introduce errors in normal
        // computation and extrusion).
        height = Math.max(floorHeight + MapMeshMaterialsDefs_1.ExtrusionFeatureDefs.MIN_BUILDING_HEIGHT, height);
        const styleSetConstantHeight = harp_utils_1.getOptionValue(extrudedPolygonTechnique.constantHeight, false);
        this.m_decodeInfo.tileBounds.getCenter(tempTileOrigin);
        const { positions, normals, textureCoordinates, colors, extrusionAxis, indices, edgeIndices, groups } = meshBuffers;
        const featureStride = texCoordType !== undefined ? 4 : 2;
        const vertexStride = featureStride + 2;
        const isSpherical = this.m_decodeInfo.targetProjection.type === harp_geoutils_1.ProjectionType.Spherical;
        const edgeWidth = isExtruded
            ? extrudedPolygonTechnique.lineWidth || 0.0
            : isFilled
                ? fillTechnique.lineWidth || 0.0
                : 0.0;
        const hasEdges = edgeWidth > 0.0;
        let color;
        if (harp_datasource_protocol_1.isExtrudedPolygonTechnique(technique)) {
            if (harp_utils_1.getOptionValue(technique.vertexColors, false)) {
                let colorValue = TechniqueAttr_1.evaluateTechniqueAttr(context, technique.color);
                if (colorValue === undefined) {
                    const featureColor = context.env.lookup("color");
                    if (this.isColorStringValid(featureColor)) {
                        colorValue = String(featureColor);
                    }
                }
                if (colorValue === undefined) {
                    colorValue = TechniqueAttr_1.evaluateTechniqueAttr(context, technique.defaultColor, 0x000000);
                }
                if (colorValue === undefined) {
                    colorValue = 0x000000;
                }
                tmpColor.set(colorValue);
                color = tmpColor;
            }
        }
        for (const polygon of polygons) {
            const startIndexCount = indices.length;
            for (let ringIndex = 0; ringIndex < polygon.length;) {
                const vertices = [];
                const polygonBaseVertex = positions.length / 3;
                const { contour, winding } = polygon[ringIndex++];
                for (let i = 0; i < contour.length / featureStride; ++i) {
                    // Invert the Y component to preserve the correct winding without transforming
                    // from webMercator's local to global space.
                    for (let j = 0; j < featureStride; ++j) {
                        vertices.push((j === 1 ? -1 : 1) * contour[i * featureStride + j]);
                    }
                    // Calculate nextEdge and nextWall.
                    const nextIdx = (i + 1) % (contour.length / featureStride);
                    const currX = contour[i * featureStride];
                    const currY = contour[i * featureStride + 1];
                    const nextX = contour[nextIdx * featureStride];
                    const nextY = contour[nextIdx * featureStride + 1];
                    const insideExtents = !((currX <= 0 && nextX <= 0) ||
                        (currX >= extents && nextX >= extents) ||
                        (currY <= 0 && nextY <= 0) ||
                        (currY >= extents && nextY >= extents));
                    vertices.push(insideExtents ? nextIdx : -1, boundaryWalls || insideExtents ? nextIdx : -1);
                }
                // Iterate over the inner rings. The inner rings have the opposite winding
                // of the outer rings.
                const holes = [];
                while (ringIndex < polygon.length && polygon[ringIndex].winding !== winding) {
                    const vertexOffset = vertices.length / vertexStride;
                    holes.push(vertexOffset);
                    const hole = polygon[ringIndex++].contour;
                    for (let i = 0; i < hole.length / featureStride; ++i) {
                        // Invert the Y component to preserve the correct winding without
                        // transforming from webMercator's local to global space.
                        for (let j = 0; j < featureStride; ++j) {
                            vertices.push((j === 1 ? -1 : 1) * hole[i * featureStride + j]);
                        }
                        // Calculate nextEdge and nextWall.
                        const nextIdx = (i + 1) % (hole.length / featureStride);
                        const currX = hole[i * featureStride];
                        const currY = hole[i * featureStride + 1];
                        const nextX = hole[nextIdx * featureStride];
                        const nextY = hole[nextIdx * featureStride + 1];
                        const insideExtents = !((currX <= 0 && nextX <= 0) ||
                            (currX >= extents && nextX >= extents) ||
                            (currY <= 0 && nextY <= 0) ||
                            (currY >= extents && nextY >= extents));
                        vertices.push(insideExtents ? vertexOffset + nextIdx : -1, boundaryWalls || insideExtents ? vertexOffset + nextIdx : -1);
                    }
                }
                try {
                    // Triangulate the footprint polyline.
                    const triangles = earcut_1.default(vertices, holes, vertexStride);
                    const originalVertexCount = vertices.length / vertexStride;
                    // Subdivide for spherical projections if needed.
                    if (isSpherical) {
                        const geom = new THREE.BufferGeometry();
                        const positionArray = [];
                        const uvArray = [];
                        const edgeArray = [];
                        const wallArray = [];
                        // Transform to global webMercator coordinates to be able to reproject to
                        // sphere.
                        for (let i = 0; i < vertices.length; i += vertexStride) {
                            const worldPos = OmvUtils_1.tile2world(extents, this.m_decodeInfo, tmpV2.set(vertices[i], vertices[i + 1]), true, tmpV2r);
                            positionArray.push(worldPos.x, worldPos.y, 0);
                            if (texCoordType !== undefined) {
                                uvArray.push(vertices[i + 2], vertices[i + 3]);
                            }
                            edgeArray.push(vertices[i + featureStride]);
                            wallArray.push(vertices[i + featureStride + 1]);
                        }
                        // Create the temporary geometry used for subdivision.
                        const posAttr = new THREE.BufferAttribute(new Float32Array(positionArray), 3);
                        geom.setAttribute("position", posAttr);
                        let uvAttr;
                        if (texCoordType !== undefined) {
                            uvAttr = new THREE.BufferAttribute(new Float32Array(uvArray), 2);
                            geom.setAttribute("uv", uvAttr);
                        }
                        const edgeAttr = new THREE.BufferAttribute(new Float32Array(edgeArray), 1);
                        geom.setAttribute("edge", edgeAttr);
                        const wallAttr = new THREE.BufferAttribute(new Float32Array(wallArray), 1);
                        geom.setAttribute("wall", edgeAttr);
                        const indexAttr = new THREE.BufferAttribute(new Uint32Array(triangles), 1);
                        geom.setIndex(indexAttr);
                        // FIXME(HARP-5700): Subdivision modifier ignores texture coordinates.
                        const modifier = new SphericalGeometrySubdivisionModifier_1.SphericalGeometrySubdivisionModifier(THREE.Math.degToRad(10), harp_geoutils_1.webMercatorProjection);
                        modifier.modify(geom);
                        // Reassemble the vertex buffer, transforming the subdivided global
                        // webMercator points back to local space.
                        vertices.length = 0;
                        triangles.length = 0;
                        for (let i = 0; i < posAttr.array.length; i += 3) {
                            const tilePos = OmvUtils_1.world2tile(extents, this.m_decodeInfo, tmpV2.set(posAttr.array[i], posAttr.array[i + 1]), true, tmpV2r);
                            vertices.push(tilePos.x, tilePos.y);
                            if (texCoordType !== undefined) {
                                vertices.push(uvAttr.array[(i / 3) * 2]);
                                vertices.push(uvAttr.array[(i / 3) * 2 + 1]);
                            }
                            vertices.push(edgeAttr.array[i / 3]);
                            vertices.push(wallAttr.array[i / 3]);
                        }
                        const geomIndex = geom.getIndex();
                        if (geomIndex !== null) {
                            triangles.push(...geomIndex.array);
                        }
                    }
                    // Add the footprint/roof vertices to the position buffer.
                    tempVertNormal.set(0, 0, 1);
                    // Assemble the vertex buffer.
                    for (let i = 0; i < vertices.length; i += vertexStride) {
                        OmvUtils_1.webMercatorTile2TargetTile(extents, this.m_decodeInfo, tmpV2.set(vertices[i], vertices[i + 1]), tmpV3, true);
                        let scaleFactor = 1.0;
                        if (isExtruded && styleSetConstantHeight !== true) {
                            tempVertOrigin.set(tempTileOrigin.x + tmpV3.x, tempTileOrigin.y + tmpV3.y, tempTileOrigin.z + tmpV3.z);
                            scaleFactor = this.m_decodeInfo.targetProjection.getScaleFactor(tempVertOrigin);
                        }
                        this.m_maxGeometryHeight = Math.max(this.m_maxGeometryHeight, scaleFactor * height);
                        if (isSpherical) {
                            tempVertNormal
                                .set(tmpV3.x, tmpV3.y, tmpV3.z)
                                .add(this.center)
                                .normalize();
                        }
                        tempFootDisp.copy(tempVertNormal).multiplyScalar(floorHeight * scaleFactor);
                        tempRoofDisp.copy(tempVertNormal).multiplyScalar(height * scaleFactor);
                        positions.push(tmpV3.x + tempFootDisp.x, tmpV3.y + tempFootDisp.y, tmpV3.z + tempFootDisp.z);
                        if (texCoordType !== undefined) {
                            textureCoordinates.push(vertices[i + 2], vertices[i + 3]);
                        }
                        if (this.m_enableElevationOverlay) {
                            normals.push(...tempVertNormal.toArray());
                        }
                        if (isExtruded) {
                            positions.push(tmpV3.x + tempRoofDisp.x, tmpV3.y + tempRoofDisp.y, tmpV3.z + tempRoofDisp.z);
                            extrusionAxis.push(0.0, 0.0, 0.0, 0.0, tempRoofDisp.x - tempFootDisp.x, tempRoofDisp.y - tempFootDisp.y, tempRoofDisp.z - tempFootDisp.z, 1.0);
                            if (texCoordType !== undefined) {
                                textureCoordinates.push(vertices[i + 2], vertices[i + 3]);
                            }
                            if (this.m_enableElevationOverlay) {
                                normals.push(...tempVertNormal.toArray());
                            }
                            if (color !== undefined) {
                                colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
                            }
                        }
                    }
                    // Add the footprint/roof indices to the index buffer.
                    for (let i = 0; i < triangles.length; i += 3) {
                        if (isExtruded) {
                            // When extruding we duplicate the vertices, so that all even vertices
                            // belong to the bottom and all odd vertices belong to the top.
                            const i0 = polygonBaseVertex + triangles[i + 0] * 2 + 1;
                            const i1 = polygonBaseVertex + triangles[i + 1] * 2 + 1;
                            const i2 = polygonBaseVertex + triangles[i + 2] * 2 + 1;
                            indices.push(i0, i1, i2);
                        }
                        else {
                            const i0 = polygonBaseVertex + triangles[i + 0];
                            const i1 = polygonBaseVertex + triangles[i + 1];
                            const i2 = polygonBaseVertex + triangles[i + 2];
                            indices.push(i0, i1, i2);
                        }
                    }
                    // Assemble the index buffer for edges (follow vertices as linked list).
                    if (hasEdges) {
                        this.addEdges(polygonBaseVertex, originalVertexCount, vertexStride, featureStride, positions, vertices, edgeIndices, isExtruded, extrudedPolygonTechnique.footprint, extrudedPolygonTechnique.maxSlope);
                    }
                    if (isExtruded) {
                        this.addWalls(polygonBaseVertex, originalVertexCount, vertexStride, featureStride, vertices, indices);
                    }
                }
                catch (err) {
                    logger.error(`cannot triangulate geometry`, err);
                }
            }
            if (this.m_gatherFeatureAttributes) {
                meshBuffers.objInfos.push(context.env.entries);
                meshBuffers.featureStarts.push(startIndexCount);
            }
            const count = indices.length - startIndexCount;
            if (count > 0) {
                groups.push({
                    start: startIndexCount,
                    count,
                    technique: techniqueIndex,
                    featureId
                });
            }
        }
    }
    createGeometries() {
        this.m_meshBuffers.forEach((meshBuffers, techniqueIdx) => {
            if (meshBuffers.positions.length === 0) {
                return;
            } // nothing to do
            if (!this.m_styleSetEvaluator.techniques ||
                this.m_styleSetEvaluator.techniques.length <= techniqueIdx) {
                throw new Error("Invalid technique index");
            }
            const technique = this.m_styleSetEvaluator.techniques[techniqueIdx];
            if (technique === undefined) {
                return;
            }
            const positionElements = new Float32Array(meshBuffers.positions);
            if (meshBuffers.texts.length > 0 && harp_datasource_protocol_1.isTextTechnique(technique)) {
                this.m_textGeometries.push({
                    positions: {
                        name: "position",
                        type: "float",
                        buffer: positionElements.buffer,
                        itemCount: 3
                    },
                    texts: meshBuffers.texts,
                    technique: techniqueIdx,
                    stringCatalog: meshBuffers.stringCatalog,
                    objInfos: meshBuffers.objInfos
                });
                return;
            }
            if (meshBuffers.texts.length > 0 && harp_datasource_protocol_1.isPoiTechnique(technique)) {
                this.m_poiGeometries.push({
                    positions: {
                        name: "position",
                        type: "float",
                        buffer: positionElements.buffer,
                        itemCount: 3
                    },
                    texts: meshBuffers.texts,
                    technique: techniqueIdx,
                    stringCatalog: meshBuffers.stringCatalog,
                    imageTextures: meshBuffers.imageTextures,
                    objInfos: meshBuffers.objInfos
                });
                return;
            }
            if (meshBuffers.groups.length === 0) {
                // create a default group containing all the vertices in the position attribute.
                meshBuffers.groups.push({
                    start: 0,
                    count: positionElements.length / 3,
                    technique: techniqueIdx
                });
            }
            const geometry = {
                type: meshBuffers.type,
                vertexAttributes: [
                    {
                        name: "position",
                        buffer: positionElements.buffer,
                        itemCount: 3,
                        type: "float"
                    }
                ],
                groups: meshBuffers.groups
            };
            if (meshBuffers.normals.length > 0) {
                const normals = new Float32Array(meshBuffers.normals);
                harp_utils_1.assert(normals.length === positionElements.length, "length of normals buffer is different than the length of the " +
                    "position buffer");
                geometry.vertexAttributes.push({
                    name: "normal",
                    buffer: normals.buffer,
                    itemCount: 3,
                    type: "float"
                });
            }
            if (meshBuffers.colors.length > 0) {
                const colors = new Float32Array(meshBuffers.colors);
                harp_utils_1.assert(colors.length === positionElements.length, "length of colors buffer is different than the length of the " +
                    "position buffer");
                geometry.vertexAttributes.push({
                    name: "color",
                    buffer: colors.buffer,
                    itemCount: 3,
                    type: "float"
                });
            }
            if (meshBuffers.textureCoordinates.length > 0) {
                const positionCount = meshBuffers.positions.length / 3;
                const texCoordCount = meshBuffers.textureCoordinates.length / 2;
                harp_utils_1.assert(texCoordCount === positionCount, "length of textureCoordinates buffer is different than the length of the" +
                    "position buffer");
                const textureCoordinates = new Float32Array(meshBuffers.textureCoordinates);
                geometry.vertexAttributes.push({
                    name: "uv",
                    buffer: textureCoordinates.buffer,
                    itemCount: 2,
                    type: "float"
                });
            }
            if (meshBuffers.extrusionAxis.length > 0) {
                const extrusionAxis = new Float32Array(meshBuffers.extrusionAxis);
                harp_utils_1.assert(extrusionAxis.length / 4 === positionElements.length / 3, "length of extrusionAxis buffer is different than the length of the " +
                    "position buffer");
                geometry.vertexAttributes.push({
                    name: "extrusionAxis",
                    buffer: extrusionAxis.buffer,
                    itemCount: 4,
                    type: "float"
                });
            }
            if (meshBuffers.indices.length > 0) {
                // TODO: use uint16 for buffers when possible
                geometry.index = {
                    name: "index",
                    buffer: new Uint32Array(meshBuffers.indices).buffer,
                    itemCount: 1,
                    type: "uint32"
                };
            }
            if (meshBuffers.edgeIndices.length > 0) {
                // TODO: use uint16 for buffers when possible. Issue HARP-3987
                geometry.edgeIndex = {
                    name: "edgeIndex",
                    buffer: new Uint32Array(meshBuffers.edgeIndices)
                        .buffer,
                    itemCount: 1,
                    type: "uint32"
                };
            }
            geometry.featureStarts = meshBuffers.featureStarts;
            geometry.objInfos = meshBuffers.objInfos;
            this.m_geometries.push(geometry);
        });
    }
    processLines(linesArray) {
        linesArray.forEach(linesGeometry => {
            const { vertices, indices } = linesGeometry.lines;
            const renderOrderOffset = linesGeometry.renderOrderOffset;
            const technique = linesGeometry.technique;
            const buffer = new Float32Array(vertices).buffer;
            const index = new Uint32Array(indices).buffer;
            const attr = {
                type: "float",
                stride: linesGeometry.lines.stride,
                buffer,
                attributes: linesGeometry.lines.vertexAttributes
            };
            const geometry = {
                type: harp_datasource_protocol_1.GeometryType.SolidLine,
                index: {
                    buffer: index,
                    itemCount: 1,
                    type: "uint32",
                    name: "index"
                },
                interleavedVertexAttributes: [attr],
                groups: [{ start: 0, count: indices.length, technique, renderOrderOffset }],
                vertexAttributes: [],
                featureStarts: linesGeometry.featureStarts,
                objInfos: linesGeometry.objInfos
            };
            this.m_geometries.push(geometry);
        });
    }
    processSimpleLines(linesArray) {
        linesArray.forEach(linesGeometry => {
            const { vertices, indices } = linesGeometry.lines;
            const renderOrderOffset = linesGeometry.renderOrderOffset;
            const technique = linesGeometry.technique;
            const buffer = new Float32Array(vertices).buffer;
            const index = new Uint32Array(indices).buffer;
            const attr = {
                buffer,
                itemCount: 3,
                type: "float",
                name: "position"
            };
            const geometry = {
                type: harp_datasource_protocol_1.GeometryType.Line,
                index: {
                    buffer: index,
                    itemCount: 1,
                    type: "uint32",
                    name: "index"
                },
                vertexAttributes: [attr],
                groups: [{ start: 0, count: indices.length, technique, renderOrderOffset }],
                featureStarts: linesGeometry.featureStarts,
                objInfos: linesGeometry.objInfos
            };
            this.m_geometries.push(geometry);
        });
    }
    findOrCreateMeshBuffers(index, type) {
        let buffers = this.m_meshBuffers.get(index);
        if (buffers !== undefined) {
            if (buffers.type !== type) {
                logger.error(`MeshBuffer has been created with wrong type "${harp_datasource_protocol_1.GeometryType[type]}"
                instead of "${harp_datasource_protocol_1.GeometryType[buffers.type]}"`);
                return undefined;
            }
            return buffers;
        }
        buffers = new MeshBuffers(type);
        this.m_meshBuffers.set(index, buffers);
        return buffers;
    }
    processFeatureCommon(env) {
        const source = env.lookup("source");
        if (typeof source === "string" && source !== "") {
            if (!this.m_sources.includes(source)) {
                this.m_sources.push(source);
            }
        }
    }
    isColorStringValid(color) {
        return typeof color === "string" && color.length > 0;
    }
    addEdges(featureBaseVertex, featureVertexCount, vertexStride, featureStride, positions, vertices, indices, isExtruded, hasFootprint, maxSlope) {
        const tmpEdgeA = new THREE.Vector3();
        const tmpEdgeB = new THREE.Vector3();
        let firstRingVertex;
        let prevRingVertex;
        let currRingVertex = 0;
        let maxRingVertex = 0;
        while (currRingVertex < featureVertexCount) {
            while (currRingVertex !== firstRingVertex) {
                if (firstRingVertex === undefined) {
                    firstRingVertex = currRingVertex;
                }
                if (currRingVertex < featureVertexCount) {
                    maxRingVertex = Math.max(maxRingVertex, currRingVertex);
                }
                const nextRingVertex = vertices[currRingVertex * vertexStride + featureStride];
                if (nextRingVertex < 0) {
                    break;
                }
                else {
                    if (!isExtruded) {
                        indices.push(featureBaseVertex + currRingVertex, featureBaseVertex + nextRingVertex);
                    }
                    else {
                        if (hasFootprint === true) {
                            indices.push(featureBaseVertex + currRingVertex * 2, featureBaseVertex + nextRingVertex * 2);
                        }
                        indices.push(featureBaseVertex + currRingVertex * 2 + 1, featureBaseVertex + nextRingVertex * 2 + 1);
                        if (maxSlope !== undefined) {
                            if (prevRingVertex !== undefined) {
                                const prevPos = (featureBaseVertex + prevRingVertex * 2) * 3;
                                const currPos = (featureBaseVertex + currRingVertex * 2) * 3;
                                const nextPos = (featureBaseVertex + nextRingVertex * 2) * 3;
                                tmpEdgeA
                                    .set(positions[currPos] - positions[prevPos], positions[currPos + 1] - positions[prevPos + 1], positions[currPos + 2] - positions[prevPos + 2])
                                    .normalize();
                                tmpEdgeB
                                    .set(positions[nextPos] - positions[currPos], positions[nextPos + 1] - positions[currPos + 1], positions[nextPos + 2] - positions[currPos + 2])
                                    .normalize();
                                if (tmpEdgeA.dot(tmpEdgeB) <= maxSlope) {
                                    indices.push(featureBaseVertex + currRingVertex * 2, featureBaseVertex + currRingVertex * 2 + 1);
                                }
                            }
                        }
                        else {
                            indices.push(featureBaseVertex + currRingVertex * 2, featureBaseVertex + currRingVertex * 2 + 1);
                        }
                    }
                    prevRingVertex = currRingVertex;
                    currRingVertex = nextRingVertex;
                }
            }
            currRingVertex = maxRingVertex + 1;
            firstRingVertex = undefined;
            prevRingVertex = undefined;
        }
    }
    addWalls(featureBaseVertex, featureVertexCount, vertexStride, featureStride, vertices, indices) {
        let firstRingVertex;
        let currRingVertex = 0;
        let maxRingVertex = 0;
        while (currRingVertex < featureVertexCount) {
            while (currRingVertex !== firstRingVertex) {
                if (firstRingVertex === undefined) {
                    firstRingVertex = currRingVertex;
                }
                if (currRingVertex < featureVertexCount) {
                    maxRingVertex = Math.max(maxRingVertex, currRingVertex);
                }
                const nextRingVertex = vertices[currRingVertex * vertexStride + featureStride + 1];
                if (nextRingVertex < 0) {
                    break;
                }
                else {
                    indices.push(featureBaseVertex + currRingVertex * 2, featureBaseVertex + currRingVertex * 2 + 1, featureBaseVertex + nextRingVertex * 2 + 1, featureBaseVertex + nextRingVertex * 2 + 1, featureBaseVertex + nextRingVertex * 2, featureBaseVertex + currRingVertex * 2);
                }
                currRingVertex = nextRingVertex;
            }
            currRingVertex = maxRingVertex + 1;
            firstRingVertex = undefined;
        }
    }
    findRelativePositionInLine(p, line) {
        let lineDist = Infinity;
        let lineOffset = 0;
        for (let i = 0; i < line.length; i += 4) {
            // Find the closest point C in segment AB to point P.
            tmpLine.set(tmpPointA.set(line[i], line[i + 1], line[i + 2]), tmpPointB.set(line[i + 4], line[i + 5], line[i + 6]));
            tmpLine.closestPointToPoint(p, true, tmpPointC);
            // If P is in AB (or really close), save A as anchor point and C (to estimate distance
            // from segment origin).
            const dist = tmpPointC.distanceTo(p);
            if (dist < lineDist) {
                tmpPointD.copy(tmpPointC);
                tmpPointE.copy(tmpPointA);
                lineDist = dist;
                lineOffset = line[i + 3];
            }
        }
        // Return the relative position of P inside the line.
        return lineOffset + tmpPointD.distanceTo(tmpPointE);
    }
}
exports.OmvDecodedTileEmitter = OmvDecodedTileEmitter;


/***/ }),

/***/ "../harp-omv-datasource/lib/OmvDecoder.ts":
/*!************************************************!*\
  !*** ../harp-omv-datasource/lib/OmvDecoder.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const index_worker_1 = __webpack_require__(/*! @here/harp-mapview-decoder/index-worker */ "../harp-mapview-decoder/index-worker.ts");
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const THREE = __webpack_require__(/*! three */ "three");
const OmvData_1 = __webpack_require__(/*! ./OmvData */ "../harp-omv-datasource/lib/OmvData.ts");
const OmvDataFilter_1 = __webpack_require__(/*! ./OmvDataFilter */ "../harp-omv-datasource/lib/OmvDataFilter.ts");
const OmvDecodedTileEmitter_1 = __webpack_require__(/*! ./OmvDecodedTileEmitter */ "../harp-omv-datasource/lib/OmvDecodedTileEmitter.ts");
const OmvDecoderDefs_1 = __webpack_require__(/*! ./OmvDecoderDefs */ "../harp-omv-datasource/lib/OmvDecoderDefs.ts");
const OmvTileInfoEmitter_1 = __webpack_require__(/*! ./OmvTileInfoEmitter */ "../harp-omv-datasource/lib/OmvTileInfoEmitter.ts");
const OmvTomTomFeatureModifier_1 = __webpack_require__(/*! ./OmvTomTomFeatureModifier */ "../harp-omv-datasource/lib/OmvTomTomFeatureModifier.ts");
const StyleSetDataFilter_1 = __webpack_require__(/*! ./StyleSetDataFilter */ "../harp-omv-datasource/lib/StyleSetDataFilter.ts");
const VTJsonDataAdapter_1 = __webpack_require__(/*! ./VTJsonDataAdapter */ "../harp-omv-datasource/lib/VTJsonDataAdapter.ts");
const logger = harp_utils_1.LoggerManager.instance.create("OmvDecoder", { enabled: false });
class Ring {
    /**
     * Constructs a new [[Ring]].
     *
     * @param extents The extents of the enclosing layer.
     * @param vertexStride The stride of this elements stored in 'contour'.
     * @param contour The [[Array]] containing the projected world coordinates.
     */
    constructor(extents, vertexStride, contour) {
        this.extents = extents;
        this.vertexStride = vertexStride;
        this.contour = contour;
        this.winding = this.area() < 0;
    }
    area() {
        const points = this.contour;
        const stride = this.vertexStride;
        const n = points.length / stride;
        let area = 0.0;
        for (let p = n - 1, q = 0; q < n; p = q++) {
            area +=
                points[p * stride] * points[q * stride + 1] -
                    points[q * stride] * points[p * stride + 1];
        }
        return area / 2;
    }
}
exports.Ring = Ring;
class OmvDecoder {
    constructor(m_projection, m_styleSetEvaluator, m_showMissingTechniques, m_dataFilter, m_featureModifier, m_gatherFeatureAttributes = false, m_createTileInfo = false, m_gatherRoadSegments = false, m_skipShortLabels = true, m_storageLevelOffset = 0, m_enableElevationOverlay = false, m_languages) {
        this.m_projection = m_projection;
        this.m_styleSetEvaluator = m_styleSetEvaluator;
        this.m_showMissingTechniques = m_showMissingTechniques;
        this.m_dataFilter = m_dataFilter;
        this.m_featureModifier = m_featureModifier;
        this.m_gatherFeatureAttributes = m_gatherFeatureAttributes;
        this.m_createTileInfo = m_createTileInfo;
        this.m_gatherRoadSegments = m_gatherRoadSegments;
        this.m_skipShortLabels = m_skipShortLabels;
        this.m_storageLevelOffset = m_storageLevelOffset;
        this.m_enableElevationOverlay = m_enableElevationOverlay;
        this.m_languages = m_languages;
        this.m_dataAdapters = [];
        const styleSetDataFilter = new StyleSetDataFilter_1.StyleSetDataFilter(m_styleSetEvaluator);
        const dataPreFilter = m_dataFilter
            ? new OmvDataFilter_1.ComposedDataFilter([styleSetDataFilter, m_dataFilter])
            : styleSetDataFilter;
        // Register the default adapters.
        this.m_dataAdapters.push(new OmvData_1.OmvProtobufDataAdapter(this, dataPreFilter, logger));
        this.m_dataAdapters.push(new VTJsonDataAdapter_1.VTJsonDataAdapter(this, dataPreFilter, logger));
    }
    get storageLevelOffset() {
        return this.m_storageLevelOffset;
    }
    /**
     * Given a tile and a protobuffer, it returns a decoded tile and it creates the geometries that
     * belong to it.
     *
     * @param tileKey The tile to be decoded.
     * @param data The protobuffer to decode from.
     * @returns A [[DecodedTile]]
     */
    getDecodedTile(tileKey, data) {
        let dataAdapter;
        for (const adapter of this.m_dataAdapters.values()) {
            if (adapter.canProcess(data)) {
                dataAdapter = adapter;
                break;
            }
        }
        if (dataAdapter === undefined) {
            return {
                techniques: [],
                geometries: []
            };
        }
        this.m_styleSetEvaluator.resetTechniques();
        const tileSizeOnScreen = this.estimatedTileSizeOnScreen();
        const decodeInfo = new OmvDecoder.DecodeInfo(dataAdapter.id, this.m_projection, tileKey, tileSizeOnScreen);
        this.m_decodedTileEmitter = new OmvDecodedTileEmitter_1.OmvDecodedTileEmitter(decodeInfo, this.m_styleSetEvaluator, this.m_gatherFeatureAttributes, this.m_skipShortLabels, this.m_enableElevationOverlay, this.m_languages);
        if (this.m_createTileInfo) {
            const storeExtendedTags = true;
            this.m_infoTileEmitter = new OmvTileInfoEmitter_1.OmvTileInfoEmitter(decodeInfo, this.m_styleSetEvaluator, storeExtendedTags, this.m_gatherRoadSegments);
        }
        dataAdapter.process(data, tileKey, decodeInfo.geoBox);
        const decodedTile = this.m_decodedTileEmitter.getDecodedTile();
        if (this.m_createTileInfo) {
            decodedTile.tileInfo = this.m_infoTileEmitter.getTileInfo();
        }
        return decodedTile;
    }
    getTileInfo(tileKey, data) {
        let dataAdapter;
        for (const adapter of this.m_dataAdapters.values()) {
            if (adapter.canProcess(data)) {
                dataAdapter = adapter;
                break;
            }
        }
        if (dataAdapter === undefined) {
            return new harp_datasource_protocol_1.ExtendedTileInfo(tileKey, false);
        }
        this.m_styleSetEvaluator.resetTechniques();
        const tileSizeOnScreen = this.estimatedTileSizeOnScreen();
        const decodeInfo = new OmvDecoder.DecodeInfo(dataAdapter.id, this.m_projection, tileKey, tileSizeOnScreen);
        const storeExtendedTags = true;
        this.m_infoTileEmitter = new OmvTileInfoEmitter_1.OmvTileInfoEmitter(decodeInfo, this.m_styleSetEvaluator, storeExtendedTags, this.m_gatherRoadSegments);
        for (const adapter of this.m_dataAdapters.values()) {
            if (adapter.canProcess(data)) {
                adapter.process(data, tileKey, decodeInfo.geoBox);
                break;
            }
        }
        return this.m_infoTileEmitter.getTileInfo();
    }
    processPointFeature(layer, extents, geometry, env, storageLevel) {
        if (this.m_featureModifier !== undefined &&
            !this.m_featureModifier.doProcessPointFeature(layer, env, storageLevel)) {
            return;
        }
        const techniques = this.applyKindFilter(this.m_styleSetEvaluator.getMatchingTechniques(env, layer, "point"), harp_datasource_protocol_1.GeometryKind.Label);
        if (techniques.length === 0) {
            if (this.m_showMissingTechniques) {
                logger.log("OmvDecoder#processPointFeature: no techniques for object:", JSON.stringify(env.unmap()));
            }
            return;
        }
        const context = {
            env,
            storageLevel,
            zoomLevel: this.getZoomLevel(storageLevel),
            cachedExprResults: this.m_styleSetEvaluator.expressionEvaluatorCache
        };
        const featureId = env.lookup("$id");
        if (this.m_decodedTileEmitter) {
            this.m_decodedTileEmitter.processPointFeature(layer, extents, geometry, context, techniques, featureId);
        }
        if (this.m_infoTileEmitter) {
            this.m_infoTileEmitter.processPointFeature(layer, extents, geometry, context, techniques, featureId);
        }
    }
    processLineFeature(layer, extents, geometry, env, storageLevel) {
        if (this.m_featureModifier !== undefined &&
            !this.m_featureModifier.doProcessLineFeature(layer, env, storageLevel)) {
            return;
        }
        const techniques = this.applyKindFilter(this.m_styleSetEvaluator.getMatchingTechniques(env, layer, "line"), harp_datasource_protocol_1.GeometryKind.Line);
        if (techniques.length === 0) {
            if (this.m_showMissingTechniques) {
                logger.log("OmvDecoder#processLineFeature: no techniques for object:", JSON.stringify(env.unmap()));
            }
            return;
        }
        const context = {
            env,
            storageLevel,
            zoomLevel: this.getZoomLevel(storageLevel),
            cachedExprResults: this.m_styleSetEvaluator.expressionEvaluatorCache
        };
        const featureId = env.lookup("$id");
        if (this.m_decodedTileEmitter) {
            this.m_decodedTileEmitter.processLineFeature(layer, extents, geometry, context, techniques, featureId);
        }
        if (this.m_infoTileEmitter) {
            this.m_infoTileEmitter.processLineFeature(layer, extents, geometry, context, techniques, featureId);
        }
    }
    processPolygonFeature(layer, extents, geometry, env, storageLevel) {
        if (this.m_featureModifier !== undefined &&
            !this.m_featureModifier.doProcessPolygonFeature(layer, env, storageLevel)) {
            return;
        }
        const techniques = this.applyKindFilter(this.m_styleSetEvaluator.getMatchingTechniques(env, layer, "polygon"), harp_datasource_protocol_1.GeometryKind.Area);
        if (techniques.length === 0) {
            if (this.m_showMissingTechniques) {
                logger.log("OmvDecoder#processPolygonFeature: no techniques for object:", JSON.stringify(env.unmap()));
            }
            return;
        }
        const context = {
            env,
            storageLevel,
            zoomLevel: this.getZoomLevel(storageLevel),
            cachedExprResults: this.m_styleSetEvaluator.expressionEvaluatorCache
        };
        const featureId = env.lookup("$id");
        if (this.m_decodedTileEmitter) {
            this.m_decodedTileEmitter.processPolygonFeature(layer, extents, geometry, context, techniques, featureId);
        }
        if (this.m_infoTileEmitter) {
            this.m_infoTileEmitter.processPolygonFeature(layer, extents, geometry, context, techniques, featureId);
        }
    }
    /**
     * Estimate the number of screen pixels a tile will cover. The actual number of pixels will be
     * influenced by tilt and rotation, so estimated the number here should be an upper bound.
     *
     * @returns {number} Estimated number of screen pixels.
     */
    estimatedTileSizeOnScreen() {
        const tileSizeOnScreen = 256 * Math.pow(2, -this.m_storageLevelOffset);
        return tileSizeOnScreen;
    }
    getZoomLevel(storageLevel) {
        return Math.max(0, storageLevel - (this.m_storageLevelOffset || 0));
    }
    applyKindFilter(techniques, defaultKind) {
        if (this.m_dataFilter !== undefined && this.m_dataFilter.hasKindFilter) {
            techniques = techniques.filter(technique => {
                return technique.kind === undefined
                    ? this.m_dataFilter.wantsKind(defaultKind)
                    : this.m_dataFilter.wantsKind(technique.kind);
            });
        }
        return techniques;
    }
}
exports.OmvDecoder = OmvDecoder;
(function (OmvDecoder) {
    class DecodeInfo {
        /**
         * Constructs a new [[DecodeInfo]].
         *
         * @param adapterId The id of the [[OmvDataAdapter]] used for decoding.
         * @param targetProjection The [[Projection]]
         * @param tileKey The [[TileKey]] of the Tile to decode.
         * @param tileSizeOnScreen The estimated size of the Tile in pixels.
         */
        constructor(adapterId, targetProjection, tileKey, tileSizeOnScreen) {
            this.adapterId = adapterId;
            this.targetProjection = targetProjection;
            this.tileKey = tileKey;
            this.tileSizeOnScreen = tileSizeOnScreen;
            this.projectedBoundingBox = new harp_geoutils_1.OrientedBox3();
            /**
             * The tile bounds in the OMV tile space [[webMercatorTilingScheme]].
             */
            this.tileBounds = new THREE.Box3();
            /**
             * The tile size in the OMV tile space [[webMercatorTilingScheme]].
             */
            this.tileSize = new THREE.Vector3();
            /**
             * The center of the Tile in the target [[Projection]] space.
             * Geometries generated by decoding the OMV tile must be relative
             * to this position.
             */
            this.center = new THREE.Vector3();
            /**
             * The tile bounds in the world space of the
             * target projection [[DecodeInfo.targetProjection]].
             *
             * @deprecated
             */
            this.projectedTileBounds = new THREE.Box3();
            this.geoBox = this.tilingScheme.getGeoBox(tileKey);
            this.targetProjection.projectBox(this.geoBox, this.projectedTileBounds);
            this.targetProjection.projectBox(this.geoBox, this.projectedBoundingBox);
            this.projectedBoundingBox.getCenter(this.center);
            this.tilingScheme.getWorldBox(tileKey, this.tileBounds);
            this.tileBounds.getSize(this.tileSize);
        }
        /**
         * The [[TilingScheme]] of the OMV data, currenly it is defined
         * to be [[webMercatorTilingScheme]].
         */
        get tilingScheme() {
            return harp_geoutils_1.webMercatorTilingScheme;
        }
        /**
         * The [[Projection]] of OMV tiled data, currenly it is defined
         * to be [[webMercatorProjection]].
         */
        get sourceProjection() {
            return this.tilingScheme.projection;
        }
    }
    OmvDecoder.DecodeInfo = DecodeInfo;
})(OmvDecoder = exports.OmvDecoder || (exports.OmvDecoder = {}));
class OmvTileDecoder extends index_worker_1.ThemedTileDecoder {
    constructor() {
        super(...arguments);
        this.m_showMissingTechniques = false;
        this.m_gatherFeatureAttributes = false;
        this.m_createTileInfo = false;
        this.m_gatherRoadSegments = false;
        this.m_skipShortLabels = true;
        this.m_enableElevationOverlay = false;
    }
    /** @override */
    connect() {
        return Promise.resolve();
    }
    /** @override */
    decodeThemedTile(data, tileKey, styleSetEvaluator, projection) {
        const startTime = harp_utils_1.PerformanceTimer.now();
        const decoder = new OmvDecoder(projection, styleSetEvaluator, this.m_showMissingTechniques, this.m_featureFilter, this.m_featureModifier, this.m_gatherFeatureAttributes, this.m_createTileInfo, this.m_gatherRoadSegments, this.m_skipShortLabels, this.m_storageLevelOffset, this.m_enableElevationOverlay, this.languages);
        const decodedTile = decoder.getDecodedTile(tileKey, data);
        decodedTile.decodeTime = harp_utils_1.PerformanceTimer.now() - startTime;
        return Promise.resolve(decodedTile);
    }
    /** @override */
    getTileInfo(data, tileKey, projection) {
        const startTime = harp_utils_1.PerformanceTimer.now();
        const styleSetEvaluator = this.m_styleSetEvaluator;
        if (styleSetEvaluator === undefined) {
            return Promise.reject(new Error("no theme loaded"));
        }
        const decoder = new OmvDecoder(projection, styleSetEvaluator, this.m_showMissingTechniques, this.m_featureFilter, this.m_featureModifier, this.m_gatherFeatureAttributes, this.m_createTileInfo, this.m_gatherRoadSegments, this.m_skipShortLabels, this.m_storageLevelOffset, this.m_enableElevationOverlay, this.languages);
        const tileInfo = decoder.getTileInfo(tileKey, data);
        tileInfo.setupTime = harp_utils_1.PerformanceTimer.now() - startTime;
        return Promise.resolve(tileInfo);
    }
    /** @override */
    configure(styleSet, definitions, languages, options) {
        super.configure(styleSet, definitions, languages, options);
        if (options) {
            const omvOptions = options;
            if (omvOptions.showMissingTechniques !== undefined) {
                this.m_showMissingTechniques = omvOptions.showMissingTechniques === true;
            }
            if (omvOptions && omvOptions.filterDescription !== undefined) {
                if (omvOptions.filterDescription !== null) {
                    // create new filter/modifier from description
                    this.m_featureFilter = new OmvDataFilter_1.OmvGenericFeatureFilter(omvOptions.filterDescription);
                    this.m_featureModifier = this.createFeatureModifier(omvOptions.filterDescription, omvOptions.featureModifierId);
                }
                else {
                    // null is the signal to clear the filter/modifier
                    this.m_featureFilter = undefined;
                    this.m_featureModifier = undefined;
                }
            }
            if (omvOptions.gatherFeatureAttributes !== undefined) {
                this.m_gatherFeatureAttributes = omvOptions.gatherFeatureAttributes === true;
            }
            if (omvOptions.createTileInfo !== undefined) {
                this.m_createTileInfo = omvOptions.createTileInfo === true;
            }
            if (omvOptions.gatherRoadSegments !== undefined) {
                this.m_gatherRoadSegments = omvOptions.gatherRoadSegments === true;
            }
            if (omvOptions.skipShortLabels !== undefined) {
                this.m_skipShortLabels = omvOptions.skipShortLabels;
            }
            if (omvOptions.enableElevationOverlay !== undefined) {
                this.m_enableElevationOverlay = omvOptions.enableElevationOverlay;
            }
        }
        if (languages !== undefined) {
            this.languages = languages;
        }
    }
    createFeatureModifier(filterDescription, featureModifierId) {
        if (featureModifierId === OmvDecoderDefs_1.FeatureModifierId.tomTom) {
            return new OmvTomTomFeatureModifier_1.OmvTomTomFeatureModifier(filterDescription);
        }
        else {
            return new OmvDataFilter_1.OmvGenericFeatureModifier(filterDescription);
        }
    }
}
exports.OmvTileDecoder = OmvTileDecoder;
/**
 * OMV tile decoder service.
 */
class OmvTileDecoderService {
    /**
     * Register[[OmvTileDecoder]] service class in [[WorkerServiceManager]].
     *
     * Has to be called during initialization of decoder bundle.
     */
    static start() {
        index_worker_1.WorkerServiceManager.getInstance().register({
            serviceType: OmvDecoderDefs_1.OMV_TILE_DECODER_SERVICE_TYPE,
            factory: (serviceId) => index_worker_1.TileDecoderService.start(serviceId, new OmvTileDecoder())
        });
    }
}
exports.OmvTileDecoderService = OmvTileDecoderService;
/**
 * Starts an OMV decoder service.
 *
 * @deprecated Please use [[OmvTileDecoderService.start]].
 */
class OmvWorkerClient {
    // TODO(HARP-3651): remove this class when clients are ready
    constructor() {
        logger.warn("OmvWorkerClient class is deprecated, please use OmvTileDecoderService.start");
        OmvTileDecoderService.start();
    }
}
exports.default = OmvWorkerClient;


/***/ }),

/***/ "../harp-omv-datasource/lib/OmvDecoderDefs.ts":
/*!****************************************************!*\
  !*** ../harp-omv-datasource/lib/OmvDecoderDefs.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Feature Modifier ids to choose which OmvFeatureModifer should be used in OmvDecoder.
 */
var FeatureModifierId;
(function (FeatureModifierId) {
    /**
     * Identifier to use the OmvTomTomFeatureModifier in the OmvDecoder.
     */
    FeatureModifierId[FeatureModifierId["tomTom"] = 0] = "tomTom";
})(FeatureModifierId = exports.FeatureModifierId || (exports.FeatureModifierId = {}));
/**
 * Adding the match condition type and the matching function to the namespace of `OmvFilterString`.
 */
var OmvFilterString;
(function (OmvFilterString) {
    /**
     * Match condition.
     */
    let StringMatch;
    (function (StringMatch) {
        /** Matches any. */
        StringMatch[StringMatch["Any"] = 0] = "Any";
        /** Exact match. */
        StringMatch[StringMatch["Match"] = 1] = "Match";
        /** Matches if a test string starts with a filter string. */
        StringMatch[StringMatch["StartsWith"] = 2] = "StartsWith";
        /** Matches if a test string contains a filter string. */
        StringMatch[StringMatch["Contains"] = 3] = "Contains";
        /** Matches if a test string ends with a filter string. */
        StringMatch[StringMatch["EndsWith"] = 4] = "EndsWith";
    })(StringMatch = OmvFilterString.StringMatch || (OmvFilterString.StringMatch = {}));
    /**
     * Check for a string against a filter.
     *
     * @param str The string to check against a filter.
     * @param filterString The filter containing the match condition.
     * @returns `true` if the match condition is satisfied.
     */
    function matchString(str, filterString) {
        switch (filterString.match) {
            case OmvFilterString.StringMatch.Any:
                return true;
            case OmvFilterString.StringMatch.Match:
                return str === filterString.value;
            case OmvFilterString.StringMatch.StartsWith:
                return filterString.value.startsWith(str);
            case OmvFilterString.StringMatch.EndsWith:
                return filterString.value.endsWith(str);
            default:
                return str.indexOf(filterString.value) >= 0;
        }
    }
    OmvFilterString.matchString = matchString;
})(OmvFilterString = exports.OmvFilterString || (exports.OmvFilterString = {}));
var OmvGeometryType;
(function (OmvGeometryType) {
    OmvGeometryType[OmvGeometryType["UNKNOWN"] = 0] = "UNKNOWN";
    OmvGeometryType[OmvGeometryType["POINT"] = 1] = "POINT";
    OmvGeometryType[OmvGeometryType["LINESTRING"] = 2] = "LINESTRING";
    OmvGeometryType[OmvGeometryType["POLYGON"] = 3] = "POLYGON";
})(OmvGeometryType = exports.OmvGeometryType || (exports.OmvGeometryType = {}));
/**
 * Default OMV tile decoder service type.
 *
 * Used for requesting decoder services using [[WorkerServiceManager]].
 */
exports.OMV_TILE_DECODER_SERVICE_TYPE = "omv-tile-decoder";
/**
 * Default OMV tiler service type.
 *
 * Used for requesting tiler services using [[WorkerServiceManager]].
 */
exports.OMV_TILER_SERVICE_TYPE = "omv-tiler";


/***/ }),

/***/ "../harp-omv-datasource/lib/OmvTileInfoEmitter.ts":
/*!********************************************************!*\
  !*** ../harp-omv-datasource/lib/OmvTileInfoEmitter.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ "../harp-datasource-protocol/index.ts");
const THREE = __webpack_require__(/*! three */ "three");
const OmvDecoder_1 = __webpack_require__(/*! ./OmvDecoder */ "../harp-omv-datasource/lib/OmvDecoder.ts");
const OmvUtils_1 = __webpack_require__(/*! ./OmvUtils */ "../harp-omv-datasource/lib/OmvUtils.ts");
class OmvTileInfoEmitter {
    /**
     * Create OmvTileInfoEmitter object
     *
     * @param m_decodeInfo
     * @param m_styleSetEvaluator
     * @param m_storeExtendedTags
     * @param m_gatherRoadSegments
     */
    constructor(m_decodeInfo, 
    // tslint:disable-next-line:no-unused-variable
    m_styleSetEvaluator, m_storeExtendedTags, m_gatherRoadSegments, m_languages) {
        this.m_decodeInfo = m_decodeInfo;
        this.m_styleSetEvaluator = m_styleSetEvaluator;
        this.m_storeExtendedTags = m_storeExtendedTags;
        this.m_gatherRoadSegments = m_gatherRoadSegments;
        this.m_languages = m_languages;
        this.m_tileInfo = new harp_datasource_protocol_1.ExtendedTileInfo(m_decodeInfo.tileKey, this.m_storeExtendedTags);
        this.m_tileInfoWriter = new harp_datasource_protocol_1.ExtendedTileInfoWriter(this.m_tileInfo, this.m_storeExtendedTags);
    }
    processPointFeature(layer, extents, geometry, context, techniques, featureId) {
        const tileInfoWriter = this.m_tileInfoWriter;
        const tmpV = new THREE.Vector3();
        for (const technique of techniques) {
            if (technique === undefined) {
                continue;
            }
            const infoTileTechniqueIndex = tileInfoWriter.addTechnique(technique);
            const featureText = harp_datasource_protocol_1.ExtendedTileInfo.getFeatureText(context, technique, this.m_languages);
            for (const pos of geometry) {
                OmvUtils_1.webMercatorTile2TargetTile(extents, this.m_decodeInfo, pos, tmpV);
                tileInfoWriter.addFeature(this.m_tileInfo.pointGroup, context.env, featureId, featureText, infoTileTechniqueIndex, harp_datasource_protocol_1.FeatureGroupType.Point);
                tileInfoWriter.addFeaturePoint(this.m_tileInfo.pointGroup, tmpV.x, tmpV.y);
            }
        }
    }
    processLineFeature(layer, extents, geometry, context, techniques, featureId) {
        const tileInfoWriter = this.m_tileInfoWriter;
        const env = context.env;
        const tmpV = new THREE.Vector3();
        const lines = [];
        for (const polyline of geometry) {
            const line = [];
            for (const pos of polyline.positions) {
                OmvUtils_1.webMercatorTile2TargetTile(extents, this.m_decodeInfo, pos, tmpV);
                line.push(tmpV.x, tmpV.y);
            }
            lines.push(line);
        }
        for (const technique of techniques) {
            if (technique === undefined) {
                continue;
            }
            const infoTileTechniqueIndex = tileInfoWriter.addTechnique(technique);
            const featureText = harp_datasource_protocol_1.ExtendedTileInfo.getFeatureText(context, technique, this.m_languages);
            for (const aLine of lines) {
                tileInfoWriter.addFeature(this.m_tileInfo.lineGroup, env, featureId, featureText, infoTileTechniqueIndex, harp_datasource_protocol_1.FeatureGroupType.Line);
                tileInfoWriter.addFeaturePoints(this.m_tileInfo.lineGroup, aLine);
            }
        }
        if (this.m_gatherRoadSegments) {
            const segmentId = env.lookup("segmentId");
            if (segmentId !== undefined) {
                const startOffset = env.lookup("startOffset");
                const endOffset = env.lookup("endOffset");
                tileInfoWriter.addRoadSegments(this.m_tileInfo.lineGroup, segmentId, startOffset !== undefined ? startOffset : 0, endOffset !== undefined ? endOffset : 1);
            }
        }
    }
    processPolygonFeature(layer, extents, geometry, context, techniques, featureId) {
        if (techniques.length === 0) {
            throw new Error("OmvTileInfoEmitter#processPolygonFeature: Internal error - No technique index");
        }
        const tileInfoWriter = this.m_tileInfoWriter;
        const tmpV = new THREE.Vector3();
        const polygons = [];
        for (const polygon of geometry) {
            const rings = [];
            for (const outline of polygon.rings) {
                const contour = [];
                for (const pos of outline) {
                    OmvUtils_1.webMercatorTile2TargetTile(extents, this.m_decodeInfo, pos, tmpV);
                    contour.push(tmpV.x, tmpV.y, tmpV.z);
                }
                rings.push(new OmvDecoder_1.Ring(extents, 3, contour));
            }
            polygons.push(rings);
        }
        for (const technique of techniques) {
            if (technique === undefined) {
                continue;
            }
            const infoTileTechniqueIndex = tileInfoWriter.addTechnique(technique);
            const featureText = harp_datasource_protocol_1.ExtendedTileInfo.getFeatureText(context, technique, this.m_languages);
            tileInfoWriter.addFeature(this.m_tileInfo.polygonGroup, context.env, featureId, featureText, infoTileTechniqueIndex, harp_datasource_protocol_1.FeatureGroupType.Polygon);
        }
        for (const rings of polygons) {
            // rings are shared between techniques
            if (rings.length === 0) {
                continue;
            }
            const outerRingWinding = rings[0].winding;
            for (const aRing of rings) {
                tileInfoWriter.addRingPoints(this.m_tileInfo.polygonGroup, aRing.contour, aRing.winding === outerRingWinding);
            }
        }
    }
    getTileInfo() {
        this.m_tileInfoWriter.finish();
        return this.m_tileInfo;
    }
}
exports.OmvTileInfoEmitter = OmvTileInfoEmitter;


/***/ }),

/***/ "../harp-omv-datasource/lib/OmvTiler.ts":
/*!**********************************************!*\
  !*** ../harp-omv-datasource/lib/OmvTiler.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_worker_1 = __webpack_require__(/*! @here/harp-mapview-decoder/index-worker */ "../harp-mapview-decoder/index-worker.ts");
const OmvDecoderDefs_1 = __webpack_require__(/*! ./OmvDecoderDefs */ "../harp-omv-datasource/lib/OmvDecoderDefs.ts");
/**
 * OMV tile decoder service.
 */
class OmvTilerService {
    /**
     * Register[[OmvTiler]] service class in [[WorkerServiceManager]].
     *
     * Has to be called during initialization of decoder bundle.
     */
    static start() {
        index_worker_1.WorkerServiceManager.getInstance().register({
            serviceType: OmvDecoderDefs_1.OMV_TILER_SERVICE_TYPE,
            factory: (serviceId) => index_worker_1.TilerService.start(serviceId)
        });
    }
}
exports.OmvTilerService = OmvTilerService;


/***/ }),

/***/ "../harp-omv-datasource/lib/OmvTomTomFeatureModifier.ts":
/*!**************************************************************!*\
  !*** ../harp-omv-datasource/lib/OmvTomTomFeatureModifier.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const harp_utils_1 = __webpack_require__(/*! @here/harp-utils */ "../harp-utils/index.web.ts");
const OmvDataFilter_1 = __webpack_require__(/*! ./OmvDataFilter */ "../harp-omv-datasource/lib/OmvDataFilter.ts");
const logger = harp_utils_1.LoggerManager.instance.create("OmvTomTomFeatureModifier");
const DEFAULT_BUILDING_COLOR = "#AAAAAA";
const DEFAULT_DO_EXTRUDE_BUILDINGS = "true";
const DEFAULT_BUILDING_MIN_HEIGHT = "2";
const DEFAULT_BUILDING_HEIGHT = "20";
/**
 * Modifies the MapEnv of the TomTom Vector Tiles to be similar to the OMV format, so that the same
 * theme files can be used.
 */
class OmvTomTomFeatureModifier extends OmvDataFilter_1.OmvGenericFeatureModifier {
    constructor(description) {
        super(description);
    }
    /** @override */
    doProcessFeature(itemsToProcess, itemsToIgnore, layer, env, defaultResult) {
        this.rewriteEnvironment(layer, env);
        return super.doProcessFeature(itemsToProcess, itemsToIgnore, layer, env, defaultResult);
    }
    /**
     * Rewrites the Environment to match the environment naming used in OMV.
     *
     * Does not cover roadlabels, as the roadlabels in the Tomtom format are delivered in a
     * different format combined in the environment with the road line geometry, which is
     * represented as two separate environment in the default format.
     *
     * @param layer
     * @param env
     */
    rewriteEnvironment(layer, env) {
        // Rewriting landuse layers
        if (this.isWood(layer)) {
            this.updateEnvironment(env, "landuse", "wood");
        }
        else if (this.isHospital(layer)) {
            this.updateEnvironment(env, "landuse", "hospital");
        }
        else if (this.isCemetery(layer)) {
            this.updateEnvironment(env, "landuse", "cemetery");
        }
        else if (this.isIndustrial(layer)) {
            this.updateEnvironment(env, "landuse", "industrial");
        }
        else if (this.isPark(layer)) {
            this.updateEnvironment(env, "landuse", "park");
        }
        else if (this.isBuiltup(layer)) {
            this.updateEnvironment(env, "landuse", "builtup");
            // Rewriting the water layer
        }
        else if (this.isWater(layer)) {
            this.updateEnvironment(env, "water");
            // Rewriting the road label layer
        }
        else if (this.isRoadLabel(layer)) {
            this.updateEnvironment(env, "road_label");
            // Rewriting road layers with category classes
        }
        else if (this.isRoadPath(layer)) {
            this.updateEnvironment(env, "road", "path");
        }
        else if (this.isRoadStreet(layer)) {
            this.updateEnvironment(env, "road", "street");
        }
        else if (this.isRoadPrimary(layer)) {
            this.updateEnvironment(env, "road", "primary");
        }
        else if (this.isRoadSecondary(layer)) {
            this.updateEnvironment(env, "road", "secondary");
        }
        else if (this.isRailway(layer)) {
            this.updateEnvironment(env, "road", "major_rail");
        }
        else if (this.isFerry(layer)) {
            this.updateEnvironment(env, "road", "ferry");
            // Rewriting aeroway layer
        }
        else if (this.isAeroway(layer)) {
            this.updateEnvironment(env, "aeroway");
            // Rewriting border layer
        }
        else if (this.isBorder(layer)) {
            this.updateEnvironment(env, "admin");
            // Rewriting label layers
        }
        else if (this.isCountryLabel(layer)) {
            this.updateEnvironment(env, "country_label");
        }
        else if (this.isCountyLabel(layer)) {
            this.updateEnvironment(env, "county_label");
        }
        else if (this.isRegionLabel(layer)) {
            this.updateEnvironment(env, "region_label");
        }
        else if (this.isStateLabel(layer)) {
            this.updateEnvironment(env, "state_label");
        }
        else if (this.isPlaceLabel(layer)) {
            this.updateEnvironment(env, "place_label");
        }
        else if (this.isWaterLabel(layer)) {
            this.updateEnvironment(env, "water_label");
        }
        else if (this.isMarineLabel(layer)) {
            this.updateEnvironment(env, "marine_label");
        }
        else if (this.isPoiLabel(layer)) {
            this.updateEnvironment(env, "poi_label");
            // Rewriting building layer
        }
        else if (this.isBuilding(layer)) {
            this.updateEnvironment(env, "building");
            env.entries.color = DEFAULT_BUILDING_COLOR;
            env.entries.extrude = DEFAULT_DO_EXTRUDE_BUILDINGS;
            env.entries.min_height = DEFAULT_BUILDING_MIN_HEIGHT;
            env.entries.height = DEFAULT_BUILDING_HEIGHT;
        }
        else {
            logger.info(`Not yet rewritten layer: ##${env.entries.$layer}## `);
        }
        // Add tunnel structure if its a tunnel
        if (this.isTunnel(layer)) {
            env.entries.structure = "tunnel";
        }
        //Add bridge structure if its a bridge
        if (this.isBridge(layer)) {
            env.entries.structure = "bridge";
        }
    }
    updateEnvironment(env, layer, newClass, structure) {
        env.entries.$layer = layer;
        if (newClass !== undefined) {
            env.entries.class = newClass;
        }
        if (structure !== undefined) {
            env.entries.structure = structure;
        }
    }
    isWood(layer) {
        return layer === "Woodland" || layer === "Moor or heathland";
    }
    isHospital(layer) {
        return layer === "Hospital";
    }
    isCemetery(layer) {
        return layer === "Cemetery";
    }
    isIndustrial(layer) {
        return layer.indexOf("Industrial") >= 0 || layer === "Airport";
    }
    isPark(layer) {
        return (layer === "Park" ||
            layer === "City park" ||
            layer === "National park" ||
            layer === "Regional park" ||
            layer.indexOf("grass") >= 0 ||
            layer.indexOf("greens") >= 0);
    }
    isBuiltup(layer) {
        return (layer === "Built-up area" ||
            layer === "Town paved area" ||
            layer === "Shopping" ||
            layer === "University" ||
            layer === "Stadium" ||
            layer.indexOf("ground") > 0);
    }
    isWater(layer) {
        return (layer === "Other water" ||
            layer === "Ocean or sea" ||
            layer === "Ocean" ||
            layer === "Lake" ||
            layer === "Sea" ||
            layer === "Town swimming pool" ||
            layer === "River");
    }
    isRoadLabel(layer) {
        return layer.indexOf("road label") >= 0;
    }
    isRoadPath(layer) {
        return (layer.indexOf("path") > 0 ||
            layer === "Parking road" ||
            layer === "Town walkway" ||
            layer === "Pedestrian road" ||
            layer === "Walkway road" ||
            layer === "Town carriageway divider" ||
            layer === "Runway" ||
            layer === "Non public road");
    }
    isRoadStreet(layer) {
        return (layer.indexOf("Minor local road") >= 0 ||
            layer.indexOf("minor local road") >= 0 ||
            layer.indexOf("Toll local road") >= 0 ||
            layer.indexOf("Local road") >= 0);
    }
    isRoadPrimary(layer) {
        return (layer.indexOf("Major local road") >= 0 ||
            layer.indexOf("Major road") >= 0 ||
            layer.indexOf("major road") >= 0 ||
            layer.indexOf("Motorway") >= 0 ||
            layer.indexOf("motorway") >= 0 ||
            layer.indexOf("International road") >= 0 ||
            layer.indexOf("international road") >= 0);
    }
    isRoadSecondary(layer) {
        return (layer.indexOf("connecting road") >= 0 ||
            layer.indexOf("Connecting road") >= 0 ||
            layer.indexOf("secondary road") >= 0 ||
            layer.indexOf("Secondary road") >= 0);
    }
    isRailway(layer) {
        return layer === "Railway";
    }
    isFerry(layer) {
        return layer === "Ferry road";
    }
    isBorder(layer) {
        return layer.indexOf("border") > 0;
    }
    isCountryLabel(layer) {
        return layer === "Country name" || layer === "Country label";
    }
    isStateLabel(layer) {
        return layer === "City" || layer.indexOf("city") > 0;
    }
    isRegionLabel(layer) {
        return layer === "Town";
    }
    isCountyLabel(layer) {
        return layer === "Village";
    }
    isPlaceLabel(layer) {
        return (layer === "Park" ||
            layer === "Railway station" ||
            layer === "Airport POI" ||
            layer === "Town greens");
    }
    isWaterLabel(layer) {
        return (layer === "Ocean name" || layer === "River label" || layer.indexOf("water label") > 0);
    }
    isMarineLabel(layer) {
        return layer.indexOf("water label") > 0;
    }
    isPoiLabel(layer) {
        return (layer === "National park name" ||
            layer === "Landmark label" ||
            layer.indexOf("label") >= 0);
    }
    isAeroway(layer) {
        return layer === "Airport";
    }
    isBuilding(layer) {
        return layer.indexOf("building") >= 0;
    }
    isTunnel(layer) {
        return layer.indexOf("tunnel") >= 0;
    }
    isBridge(layer) {
        return layer.indexOf("bridge") >= 0;
    }
}
exports.OmvTomTomFeatureModifier = OmvTomTomFeatureModifier;


/***/ }),

/***/ "../harp-omv-datasource/lib/OmvUtils.ts":
/*!**********************************************!*\
  !*** ../harp-omv-datasource/lib/OmvUtils.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const THREE = __webpack_require__(/*! three */ "three");
const VTJsonDataAdapter_1 = __webpack_require__(/*! ./VTJsonDataAdapter */ "../harp-omv-datasource/lib/VTJsonDataAdapter.ts");
/**
 * @hidden
 */
function isArrayBufferLike(data) {
    if (typeof SharedArrayBuffer !== "undefined") {
        return data instanceof ArrayBuffer || data instanceof SharedArrayBuffer;
    }
    else {
        return data instanceof ArrayBuffer;
    }
}
exports.isArrayBufferLike = isArrayBufferLike;
/**
 * @hidden
 */
function lat2tile(lat, zoom, func = Math.floor) {
    return func(((1 -
        Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) /
            Math.PI) /
        2) *
        Math.pow(2, zoom));
}
exports.lat2tile = lat2tile;
/**
 * @hidden
 */
function tile2lat(y, level) {
    const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, level);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}
exports.tile2lat = tile2lat;
function createWorldTileTransformationCookie(extents, decodeInfo) {
    const { north, west } = decodeInfo.geoBox;
    const N = Math.log2(extents);
    const scale = Math.pow(2, decodeInfo.tileKey.level + N);
    return {
        extents,
        scale,
        top: lat2tile(north, decodeInfo.tileKey.level + N, decodeInfo.adapterId === VTJsonDataAdapter_1.VTJsonDataAdapterId ? Math.round : Math.floor),
        left: ((west + 180) / 360) * scale
    };
}
exports.createWorldTileTransformationCookie = createWorldTileTransformationCookie;
/**
 * @hidden
 */
function tile2world(extents, decodeInfo, position, flipY = false, target) {
    if (decodeInfo.worldTileProjectionCookie === undefined ||
        decodeInfo.worldTileProjectionCookie.extents !== extents) {
        decodeInfo.worldTileProjectionCookie = createWorldTileTransformationCookie(extents, decodeInfo);
    }
    const { top, left, scale } = decodeInfo.worldTileProjectionCookie;
    const R = harp_geoutils_1.EarthConstants.EQUATORIAL_CIRCUMFERENCE;
    return target.set(((left + position.x) / scale) * R, ((top + (flipY ? -position.y : position.y)) / scale) * R);
}
exports.tile2world = tile2world;
/**
 * @hidden
 */
function world2tile(extents, decodeInfo, position, flipY = false, target) {
    if (decodeInfo.worldTileProjectionCookie === undefined ||
        decodeInfo.worldTileProjectionCookie.extents !== extents) {
        decodeInfo.worldTileProjectionCookie = createWorldTileTransformationCookie(extents, decodeInfo);
    }
    const { top, left, scale } = decodeInfo.worldTileProjectionCookie;
    const R = harp_geoutils_1.EarthConstants.EQUATORIAL_CIRCUMFERENCE;
    return target.set((position.x / R) * scale - left, (flipY ? -1 : 1) * ((position.y / R) * scale - top));
}
exports.world2tile = world2tile;
const tempWorldPos = new THREE.Vector2();
function webMercatorTile2TargetWorld(extents, decodeInfo, position, target, flipY = false) {
    const worldPos = tile2world(extents, decodeInfo, position, flipY, tempWorldPos);
    target.set(worldPos.x, worldPos.y, 0);
    decodeInfo.targetProjection.reprojectPoint(harp_geoutils_1.webMercatorProjection, target, target);
}
exports.webMercatorTile2TargetWorld = webMercatorTile2TargetWorld;
function webMercatorTile2TargetTile(extents, decodeInfo, position, target, flipY = false) {
    webMercatorTile2TargetWorld(extents, decodeInfo, position, target, flipY);
    target.sub(decodeInfo.center);
}
exports.webMercatorTile2TargetTile = webMercatorTile2TargetTile;


/***/ }),

/***/ "../harp-omv-datasource/lib/StyleSetDataFilter.ts":
/*!********************************************************!*\
  !*** ../harp-omv-datasource/lib/StyleSetDataFilter.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An [[OmvFeatureFilter]] implementation that queries [[StyleSetEvaluator]]
 * if given layers/features should be processed.
 *
 * Used in [[OmvDecoder]] to skip processing of layers/features that doesn't
 * have associated rules in style.
 *
 * @see [[StyleSetEvaluator.wantsFeature]]
 * @see [[StyleSetEvaluator.wantsLayer]]
 */
class StyleSetDataFilter {
    constructor(styleSetEvaluator) {
        this.styleSetEvaluator = styleSetEvaluator;
        this.hasKindFilter = false;
    }
    wantsLayer(layer, level) {
        return this.styleSetEvaluator.wantsLayer(layer);
    }
    wantsPointFeature(layer) {
        return this.styleSetEvaluator.wantsFeature(layer, "point");
    }
    wantsLineFeature(layer) {
        return this.styleSetEvaluator.wantsFeature(layer, "line");
    }
    wantsPolygonFeature(layer) {
        return this.styleSetEvaluator.wantsFeature(layer, "polygon");
    }
    wantsKind() {
        return true;
    }
}
exports.StyleSetDataFilter = StyleSetDataFilter;


/***/ }),

/***/ "../harp-omv-datasource/lib/VTJsonDataAdapter.ts":
/*!*******************************************************!*\
  !*** ../harp-omv-datasource/lib/VTJsonDataAdapter.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_decoder_1 = __webpack_require__(/*! @here/harp-datasource-protocol/index-decoder */ "../harp-datasource-protocol/index-decoder.ts");
const harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ "../harp-geoutils/index.ts");
const three_1 = __webpack_require__(/*! three */ "three");
const OmvUtils_1 = __webpack_require__(/*! ./OmvUtils */ "../harp-omv-datasource/lib/OmvUtils.ts");
const VT_JSON_EXTENTS = 4096;
var VTJsonGeometryType;
(function (VTJsonGeometryType) {
    VTJsonGeometryType[VTJsonGeometryType["Unknown"] = 0] = "Unknown";
    VTJsonGeometryType[VTJsonGeometryType["Point"] = 1] = "Point";
    VTJsonGeometryType[VTJsonGeometryType["LineString"] = 2] = "LineString";
    VTJsonGeometryType[VTJsonGeometryType["Polygon"] = 3] = "Polygon";
})(VTJsonGeometryType || (VTJsonGeometryType = {}));
/**
 * [[OmvDataAdapter]] id for [[VTJsonDataAdapter]].
 */
exports.VTJsonDataAdapterId = "vt-json";
/**
 * The class [[VTJsonDataAdapter]] converts VT-json data to geometries for the given
 * [[IGeometryProcessor]].
 */
class VTJsonDataAdapter {
    constructor(m_processor, m_dataFilter, m_logger) {
        this.m_processor = m_processor;
        this.m_dataFilter = m_dataFilter;
        this.m_logger = m_logger;
        this.id = exports.VTJsonDataAdapterId;
    }
    get dataFilter() {
        return this.m_dataFilter;
    }
    set dataFilter(dataFilter) {
        this.m_dataFilter = dataFilter;
    }
    canProcess(data) {
        if (OmvUtils_1.isArrayBufferLike(data)) {
            return false;
        }
        const tile = data;
        if (tile.features === undefined ||
            tile.source === undefined ||
            tile.x === undefined ||
            tile.y === undefined ||
            tile.z === undefined) {
            return false;
        }
        return true;
    }
    process(tile, tileKey, geoBox) {
        for (const feature of tile.features) {
            const env = new index_decoder_1.MapEnv(Object.assign({ $layer: tile.layer, $geometryType: this.convertGeometryType(feature.type), $level: tileKey.level, $zoom: Math.max(0, tileKey.level - (this.m_processor.storageLevelOffset || 0)), $id: feature.id }, feature.tags));
            switch (feature.type) {
                case VTJsonGeometryType.Point: {
                    for (const pointGeometry of feature.geometry) {
                        const x = pointGeometry[0];
                        const y = pointGeometry[1];
                        const position = new three_1.Vector2(x, y);
                        this.m_processor.processPointFeature(tile.layer, VT_JSON_EXTENTS, [position], env, tileKey.level);
                    }
                    break;
                }
                case VTJsonGeometryType.LineString: {
                    let untiledPositions;
                    if (feature.originalGeometry.type === "LineString") {
                        untiledPositions = [];
                        for (const [x, y] of feature.originalGeometry.coordinates) {
                            untiledPositions.push(new harp_geoutils_1.GeoCoordinates(y, x));
                        }
                    }
                    else if (feature.originalGeometry.type === "MultiLineString") {
                        untiledPositions = [];
                        for (const lineGeometry of feature.originalGeometry
                            .coordinates) {
                            for (const [x, y] of lineGeometry) {
                                untiledPositions.push(new harp_geoutils_1.GeoCoordinates(y, x));
                            }
                        }
                    }
                    for (const lineGeometry of feature.geometry) {
                        const line = { positions: [], untiledPositions };
                        for (const [x, y] of lineGeometry) {
                            const position = new three_1.Vector2(x, y);
                            line.positions.push(position);
                        }
                        this.m_processor.processLineFeature(tile.layer, VT_JSON_EXTENTS, [line], env, tileKey.level);
                    }
                    break;
                }
                case VTJsonGeometryType.Polygon: {
                    const polygon = { rings: [] };
                    for (const outline of feature.geometry) {
                        const ring = [];
                        for (const [currX, currY] of outline) {
                            const position = new three_1.Vector2(currX, currY);
                            ring.push(position);
                        }
                        polygon.rings.push(ring);
                    }
                    this.m_processor.processPolygonFeature(tile.layer, VT_JSON_EXTENTS, [polygon], env, tileKey.level);
                    break;
                }
                case VTJsonGeometryType.Unknown: {
                    break;
                }
            }
        }
    }
    convertGeometryType(type) {
        switch (type) {
            case VTJsonGeometryType.Point:
                return "point";
            case VTJsonGeometryType.LineString:
                return "line";
            case VTJsonGeometryType.Polygon:
                return "polygon";
            default:
                return "unknown";
        }
    }
}
exports.VTJsonDataAdapter = VTJsonDataAdapter;


/***/ }),

/***/ "../harp-omv-datasource/lib/clipPolygon.ts":
/*!*************************************************!*\
  !*** ../harp-omv-datasource/lib/clipPolygon.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = __webpack_require__(/*! three */ "three");
const tmpBA = new three_1.Vector2();
const tmpQP = new three_1.Vector2();
const tmpA = new three_1.Vector2();
const tmpB = new three_1.Vector2();
/**
 * Clip the given polygon using the Sutherland-Hodgman algorithm.
 */
function clipPolygon(polygon, clip) {
    if (polygon.length === 0) {
        return polygon;
    }
    if (!polygon[0].equals(polygon[polygon.length - 1])) {
        // close the polygon if needed.
        polygon = [...polygon, polygon[0]];
    }
    let outputList = polygon;
    for (let e = 0; e < clip.length; ++e) {
        const p = clip[e];
        const q = clip[(e + 1) % clip.length];
        const inputList = outputList;
        outputList = [];
        for (let i = 0; i < inputList.length; ++i) {
            const currentPoint = inputList[i];
            const prevPoint = inputList[(i + inputList.length - 1) % inputList.length];
            if (inside(currentPoint, p, q)) {
                if (!inside(prevPoint, p, q)) {
                    outputList.push(computeIntersection(prevPoint, currentPoint, p, q));
                }
                outputList.push(currentPoint);
            }
            else if (inside(prevPoint, p, q)) {
                outputList.push(computeIntersection(prevPoint, currentPoint, p, q));
            }
        }
    }
    return outputList;
}
exports.clipPolygon = clipPolygon;
function computeIntersection(a, b, p, q, result = new three_1.Vector2()) {
    tmpBA.subVectors(b, a);
    tmpQP.subVectors(q, p);
    const c1 = a.cross(tmpBA);
    const c2 = p.cross(tmpQP);
    const D = tmpBA.cross(tmpQP);
    const x = (tmpBA.x * c2 - tmpQP.x * c1) / D;
    const y = (tmpBA.y * c2 - tmpQP.y * c1) / D;
    return result.set(x, y).round();
}
function inside(point, p, q) {
    tmpA.subVectors(q, p);
    tmpB.subVectors(point, p);
    return tmpA.cross(tmpB) > 0;
}


/***/ }),

/***/ "../harp-omv-datasource/lib/proto/vector_tile.js":
/*!*******************************************************!*\
  !*** ../harp-omv-datasource/lib/proto/vector_tile.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/


var $protobuf = __webpack_require__(/*! protobufjs/minimal */ "../../node_modules/protobufjs/minimal.js");

// Common aliases
var $Reader = $protobuf.Reader, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.com = (function() {

    /**
     * Namespace com.
     * @exports com
     * @namespace
     */
    var com = {};

    com.mapbox = (function() {

        /**
         * Namespace mapbox.
         * @memberof com
         * @namespace
         */
        var mapbox = {};

        mapbox.pb = (function() {

            /**
             * Namespace pb.
             * @memberof com.mapbox
             * @namespace
             */
            var pb = {};

            pb.Tile = (function() {

                /**
                 * Properties of a Tile.
                 * @memberof com.mapbox.pb
                 * @interface ITile
                 * @property {Array.<com.mapbox.pb.Tile.ILayer>|null} [layers] Tile layers
                 */

                /**
                 * Constructs a new Tile.
                 * @memberof com.mapbox.pb
                 * @classdesc Represents a Tile.
                 * @implements ITile
                 * @constructor
                 * @param {com.mapbox.pb.ITile=} [properties] Properties to set
                 */
                function Tile(properties) {
                    this.layers = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Tile layers.
                 * @member {Array.<com.mapbox.pb.Tile.ILayer>} layers
                 * @memberof com.mapbox.pb.Tile
                 * @instance
                 */
                Tile.prototype.layers = $util.emptyArray;

                /**
                 * Decodes a Tile message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.mapbox.pb.Tile
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.mapbox.pb.Tile} Tile
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tile.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.mapbox.pb.Tile();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 3:
                            if (!(message.layers && message.layers.length))
                                message.layers = [];
                            message.layers.push($root.com.mapbox.pb.Tile.Layer.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Tile message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.mapbox.pb.Tile
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.mapbox.pb.Tile} Tile
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tile.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Creates a Tile message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.mapbox.pb.Tile
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.mapbox.pb.Tile} Tile
                 */
                Tile.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.mapbox.pb.Tile)
                        return object;
                    var message = new $root.com.mapbox.pb.Tile();
                    if (object.layers) {
                        if (!Array.isArray(object.layers))
                            throw TypeError(".com.mapbox.pb.Tile.layers: array expected");
                        message.layers = [];
                        for (var i = 0; i < object.layers.length; ++i) {
                            if (typeof object.layers[i] !== "object")
                                throw TypeError(".com.mapbox.pb.Tile.layers: object expected");
                            message.layers[i] = $root.com.mapbox.pb.Tile.Layer.fromObject(object.layers[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Tile message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.mapbox.pb.Tile
                 * @static
                 * @param {com.mapbox.pb.Tile} message Tile
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Tile.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.layers = [];
                    if (message.layers && message.layers.length) {
                        object.layers = [];
                        for (var j = 0; j < message.layers.length; ++j)
                            object.layers[j] = $root.com.mapbox.pb.Tile.Layer.toObject(message.layers[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this Tile to JSON.
                 * @function toJSON
                 * @memberof com.mapbox.pb.Tile
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Tile.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * GeomType enum.
                 * @name com.mapbox.pb.Tile.GeomType
                 * @enum {string}
                 * @property {number} UNKNOWN=0 UNKNOWN value
                 * @property {number} POINT=1 POINT value
                 * @property {number} LINESTRING=2 LINESTRING value
                 * @property {number} POLYGON=3 POLYGON value
                 */
                Tile.GeomType = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "UNKNOWN"] = 0;
                    values[valuesById[1] = "POINT"] = 1;
                    values[valuesById[2] = "LINESTRING"] = 2;
                    values[valuesById[3] = "POLYGON"] = 3;
                    return values;
                })();

                Tile.Value = (function() {

                    /**
                     * Properties of a Value.
                     * @memberof com.mapbox.pb.Tile
                     * @interface IValue
                     * @property {string|null} [stringValue] Value stringValue
                     * @property {number|null} [floatValue] Value floatValue
                     * @property {number|null} [doubleValue] Value doubleValue
                     * @property {number|Long|null} [intValue] Value intValue
                     * @property {number|Long|null} [uintValue] Value uintValue
                     * @property {number|Long|null} [sintValue] Value sintValue
                     * @property {boolean|null} [boolValue] Value boolValue
                     */

                    /**
                     * Constructs a new Value.
                     * @memberof com.mapbox.pb.Tile
                     * @classdesc Represents a Value.
                     * @implements IValue
                     * @constructor
                     * @param {com.mapbox.pb.Tile.IValue=} [properties] Properties to set
                     */
                    function Value(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Value stringValue.
                     * @member {string} stringValue
                     * @memberof com.mapbox.pb.Tile.Value
                     * @instance
                     */
                    Value.prototype.stringValue = "";

                    /**
                     * Value floatValue.
                     * @member {number} floatValue
                     * @memberof com.mapbox.pb.Tile.Value
                     * @instance
                     */
                    Value.prototype.floatValue = 0;

                    /**
                     * Value doubleValue.
                     * @member {number} doubleValue
                     * @memberof com.mapbox.pb.Tile.Value
                     * @instance
                     */
                    Value.prototype.doubleValue = 0;

                    /**
                     * Value intValue.
                     * @member {number|Long} intValue
                     * @memberof com.mapbox.pb.Tile.Value
                     * @instance
                     */
                    Value.prototype.intValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                    /**
                     * Value uintValue.
                     * @member {number|Long} uintValue
                     * @memberof com.mapbox.pb.Tile.Value
                     * @instance
                     */
                    Value.prototype.uintValue = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Value sintValue.
                     * @member {number|Long} sintValue
                     * @memberof com.mapbox.pb.Tile.Value
                     * @instance
                     */
                    Value.prototype.sintValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                    /**
                     * Value boolValue.
                     * @member {boolean} boolValue
                     * @memberof com.mapbox.pb.Tile.Value
                     * @instance
                     */
                    Value.prototype.boolValue = false;

                    /**
                     * Decodes a Value message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.mapbox.pb.Tile.Value
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.mapbox.pb.Tile.Value} Value
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Value.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.mapbox.pb.Tile.Value();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.stringValue = reader.string();
                                break;
                            case 2:
                                message.floatValue = reader.float();
                                break;
                            case 3:
                                message.doubleValue = reader.double();
                                break;
                            case 4:
                                message.intValue = reader.int64();
                                break;
                            case 5:
                                message.uintValue = reader.uint64();
                                break;
                            case 6:
                                message.sintValue = reader.sint64();
                                break;
                            case 7:
                                message.boolValue = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Value message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.mapbox.pb.Tile.Value
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.mapbox.pb.Tile.Value} Value
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Value.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Creates a Value message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.mapbox.pb.Tile.Value
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.mapbox.pb.Tile.Value} Value
                     */
                    Value.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.mapbox.pb.Tile.Value)
                            return object;
                        var message = new $root.com.mapbox.pb.Tile.Value();
                        if (object.stringValue != null)
                            message.stringValue = String(object.stringValue);
                        if (object.floatValue != null)
                            message.floatValue = Number(object.floatValue);
                        if (object.doubleValue != null)
                            message.doubleValue = Number(object.doubleValue);
                        if (object.intValue != null)
                            if ($util.Long)
                                (message.intValue = $util.Long.fromValue(object.intValue)).unsigned = false;
                            else if (typeof object.intValue === "string")
                                message.intValue = parseInt(object.intValue, 10);
                            else if (typeof object.intValue === "number")
                                message.intValue = object.intValue;
                            else if (typeof object.intValue === "object")
                                message.intValue = new $util.LongBits(object.intValue.low >>> 0, object.intValue.high >>> 0).toNumber();
                        if (object.uintValue != null)
                            if ($util.Long)
                                (message.uintValue = $util.Long.fromValue(object.uintValue)).unsigned = true;
                            else if (typeof object.uintValue === "string")
                                message.uintValue = parseInt(object.uintValue, 10);
                            else if (typeof object.uintValue === "number")
                                message.uintValue = object.uintValue;
                            else if (typeof object.uintValue === "object")
                                message.uintValue = new $util.LongBits(object.uintValue.low >>> 0, object.uintValue.high >>> 0).toNumber(true);
                        if (object.sintValue != null)
                            if ($util.Long)
                                (message.sintValue = $util.Long.fromValue(object.sintValue)).unsigned = false;
                            else if (typeof object.sintValue === "string")
                                message.sintValue = parseInt(object.sintValue, 10);
                            else if (typeof object.sintValue === "number")
                                message.sintValue = object.sintValue;
                            else if (typeof object.sintValue === "object")
                                message.sintValue = new $util.LongBits(object.sintValue.low >>> 0, object.sintValue.high >>> 0).toNumber();
                        if (object.boolValue != null)
                            message.boolValue = Boolean(object.boolValue);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Value message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.mapbox.pb.Tile.Value
                     * @static
                     * @param {com.mapbox.pb.Tile.Value} message Value
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Value.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.stringValue = "";
                            object.floatValue = 0;
                            object.doubleValue = 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, false);
                                object.intValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.intValue = options.longs === String ? "0" : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.uintValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.uintValue = options.longs === String ? "0" : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, false);
                                object.sintValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.sintValue = options.longs === String ? "0" : 0;
                            object.boolValue = false;
                        }
                        if (message.stringValue != null && message.hasOwnProperty("stringValue"))
                            object.stringValue = message.stringValue;
                        if (message.floatValue != null && message.hasOwnProperty("floatValue"))
                            object.floatValue = options.json && !isFinite(message.floatValue) ? String(message.floatValue) : message.floatValue;
                        if (message.doubleValue != null && message.hasOwnProperty("doubleValue"))
                            object.doubleValue = options.json && !isFinite(message.doubleValue) ? String(message.doubleValue) : message.doubleValue;
                        if (message.intValue != null && message.hasOwnProperty("intValue"))
                            if (typeof message.intValue === "number")
                                object.intValue = options.longs === String ? String(message.intValue) : message.intValue;
                            else
                                object.intValue = options.longs === String ? $util.Long.prototype.toString.call(message.intValue) : options.longs === Number ? new $util.LongBits(message.intValue.low >>> 0, message.intValue.high >>> 0).toNumber() : message.intValue;
                        if (message.uintValue != null && message.hasOwnProperty("uintValue"))
                            if (typeof message.uintValue === "number")
                                object.uintValue = options.longs === String ? String(message.uintValue) : message.uintValue;
                            else
                                object.uintValue = options.longs === String ? $util.Long.prototype.toString.call(message.uintValue) : options.longs === Number ? new $util.LongBits(message.uintValue.low >>> 0, message.uintValue.high >>> 0).toNumber(true) : message.uintValue;
                        if (message.sintValue != null && message.hasOwnProperty("sintValue"))
                            if (typeof message.sintValue === "number")
                                object.sintValue = options.longs === String ? String(message.sintValue) : message.sintValue;
                            else
                                object.sintValue = options.longs === String ? $util.Long.prototype.toString.call(message.sintValue) : options.longs === Number ? new $util.LongBits(message.sintValue.low >>> 0, message.sintValue.high >>> 0).toNumber() : message.sintValue;
                        if (message.boolValue != null && message.hasOwnProperty("boolValue"))
                            object.boolValue = message.boolValue;
                        return object;
                    };

                    /**
                     * Converts this Value to JSON.
                     * @function toJSON
                     * @memberof com.mapbox.pb.Tile.Value
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Value.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Value;
                })();

                Tile.Feature = (function() {

                    /**
                     * Properties of a Feature.
                     * @memberof com.mapbox.pb.Tile
                     * @interface IFeature
                     * @property {number|Long|null} [id] Feature id
                     * @property {Array.<number>|null} [tags] Feature tags
                     * @property {com.mapbox.pb.Tile.GeomType|null} [type] Feature type
                     * @property {Array.<number>|null} [geometry] Feature geometry
                     */

                    /**
                     * Constructs a new Feature.
                     * @memberof com.mapbox.pb.Tile
                     * @classdesc Represents a Feature.
                     * @implements IFeature
                     * @constructor
                     * @param {com.mapbox.pb.Tile.IFeature=} [properties] Properties to set
                     */
                    function Feature(properties) {
                        this.tags = [];
                        this.geometry = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Feature id.
                     * @member {number|Long} id
                     * @memberof com.mapbox.pb.Tile.Feature
                     * @instance
                     */
                    Feature.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Feature tags.
                     * @member {Array.<number>} tags
                     * @memberof com.mapbox.pb.Tile.Feature
                     * @instance
                     */
                    Feature.prototype.tags = $util.emptyArray;

                    /**
                     * Feature type.
                     * @member {com.mapbox.pb.Tile.GeomType} type
                     * @memberof com.mapbox.pb.Tile.Feature
                     * @instance
                     */
                    Feature.prototype.type = 0;

                    /**
                     * Feature geometry.
                     * @member {Array.<number>} geometry
                     * @memberof com.mapbox.pb.Tile.Feature
                     * @instance
                     */
                    Feature.prototype.geometry = $util.emptyArray;

                    /**
                     * Decodes a Feature message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.mapbox.pb.Tile.Feature
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.mapbox.pb.Tile.Feature} Feature
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Feature.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.mapbox.pb.Tile.Feature();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.uint64();
                                break;
                            case 2:
                                if (!(message.tags && message.tags.length))
                                    message.tags = [];
                                if ((tag & 7) === 2) {
                                    var end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2)
                                        message.tags.push(reader.uint32());
                                } else
                                    message.tags.push(reader.uint32());
                                break;
                            case 3:
                                message.type = reader.int32();
                                break;
                            case 4:
                                if (!(message.geometry && message.geometry.length))
                                    message.geometry = [];
                                if ((tag & 7) === 2) {
                                    var end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2)
                                        message.geometry.push(reader.uint32());
                                } else
                                    message.geometry.push(reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Feature message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.mapbox.pb.Tile.Feature
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.mapbox.pb.Tile.Feature} Feature
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Feature.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Creates a Feature message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.mapbox.pb.Tile.Feature
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.mapbox.pb.Tile.Feature} Feature
                     */
                    Feature.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.mapbox.pb.Tile.Feature)
                            return object;
                        var message = new $root.com.mapbox.pb.Tile.Feature();
                        if (object.id != null)
                            if ($util.Long)
                                (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                            else if (typeof object.id === "string")
                                message.id = parseInt(object.id, 10);
                            else if (typeof object.id === "number")
                                message.id = object.id;
                            else if (typeof object.id === "object")
                                message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
                        if (object.tags) {
                            if (!Array.isArray(object.tags))
                                throw TypeError(".com.mapbox.pb.Tile.Feature.tags: array expected");
                            message.tags = [];
                            for (var i = 0; i < object.tags.length; ++i)
                                message.tags[i] = object.tags[i] >>> 0;
                        }
                        switch (object.type) {
                        case "UNKNOWN":
                        case 0:
                            message.type = 0;
                            break;
                        case "POINT":
                        case 1:
                            message.type = 1;
                            break;
                        case "LINESTRING":
                        case 2:
                            message.type = 2;
                            break;
                        case "POLYGON":
                        case 3:
                            message.type = 3;
                            break;
                        }
                        if (object.geometry) {
                            if (!Array.isArray(object.geometry))
                                throw TypeError(".com.mapbox.pb.Tile.Feature.geometry: array expected");
                            message.geometry = [];
                            for (var i = 0; i < object.geometry.length; ++i)
                                message.geometry[i] = object.geometry[i] >>> 0;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Feature message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.mapbox.pb.Tile.Feature
                     * @static
                     * @param {com.mapbox.pb.Tile.Feature} message Feature
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Feature.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.tags = [];
                            object.geometry = [];
                        }
                        if (options.defaults) {
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.id = options.longs === String ? "0" : 0;
                            object.type = options.enums === String ? "UNKNOWN" : 0;
                        }
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (typeof message.id === "number")
                                object.id = options.longs === String ? String(message.id) : message.id;
                            else
                                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
                        if (message.tags && message.tags.length) {
                            object.tags = [];
                            for (var j = 0; j < message.tags.length; ++j)
                                object.tags[j] = message.tags[j];
                        }
                        if (message.type != null && message.hasOwnProperty("type"))
                            object.type = options.enums === String ? $root.com.mapbox.pb.Tile.GeomType[message.type] : message.type;
                        if (message.geometry && message.geometry.length) {
                            object.geometry = [];
                            for (var j = 0; j < message.geometry.length; ++j)
                                object.geometry[j] = message.geometry[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this Feature to JSON.
                     * @function toJSON
                     * @memberof com.mapbox.pb.Tile.Feature
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Feature.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Feature;
                })();

                Tile.Layer = (function() {

                    /**
                     * Properties of a Layer.
                     * @memberof com.mapbox.pb.Tile
                     * @interface ILayer
                     * @property {number} version Layer version
                     * @property {string} name Layer name
                     * @property {Array.<com.mapbox.pb.Tile.IFeature>|null} [features] Layer features
                     * @property {Array.<string>|null} [keys] Layer keys
                     * @property {Array.<com.mapbox.pb.Tile.IValue>|null} [values] Layer values
                     * @property {number|null} [extent] Layer extent
                     */

                    /**
                     * Constructs a new Layer.
                     * @memberof com.mapbox.pb.Tile
                     * @classdesc Represents a Layer.
                     * @implements ILayer
                     * @constructor
                     * @param {com.mapbox.pb.Tile.ILayer=} [properties] Properties to set
                     */
                    function Layer(properties) {
                        this.features = [];
                        this.keys = [];
                        this.values = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Layer version.
                     * @member {number} version
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @instance
                     */
                    Layer.prototype.version = 1;

                    /**
                     * Layer name.
                     * @member {string} name
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @instance
                     */
                    Layer.prototype.name = "";

                    /**
                     * Layer features.
                     * @member {Array.<com.mapbox.pb.Tile.IFeature>} features
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @instance
                     */
                    Layer.prototype.features = $util.emptyArray;

                    /**
                     * Layer keys.
                     * @member {Array.<string>} keys
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @instance
                     */
                    Layer.prototype.keys = $util.emptyArray;

                    /**
                     * Layer values.
                     * @member {Array.<com.mapbox.pb.Tile.IValue>} values
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @instance
                     */
                    Layer.prototype.values = $util.emptyArray;

                    /**
                     * Layer extent.
                     * @member {number} extent
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @instance
                     */
                    Layer.prototype.extent = 4096;

                    /**
                     * Decodes a Layer message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.mapbox.pb.Tile.Layer} Layer
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Layer.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.mapbox.pb.Tile.Layer();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 15:
                                message.version = reader.uint32();
                                break;
                            case 1:
                                message.name = reader.string();
                                break;
                            case 2:
                                if (!(message.features && message.features.length))
                                    message.features = [];
                                message.features.push($root.com.mapbox.pb.Tile.Feature.decode(reader, reader.uint32()));
                                break;
                            case 3:
                                if (!(message.keys && message.keys.length))
                                    message.keys = [];
                                message.keys.push(reader.string());
                                break;
                            case 4:
                                if (!(message.values && message.values.length))
                                    message.values = [];
                                message.values.push($root.com.mapbox.pb.Tile.Value.decode(reader, reader.uint32()));
                                break;
                            case 5:
                                message.extent = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        if (!message.hasOwnProperty("version"))
                            throw $util.ProtocolError("missing required 'version'", { instance: message });
                        if (!message.hasOwnProperty("name"))
                            throw $util.ProtocolError("missing required 'name'", { instance: message });
                        return message;
                    };

                    /**
                     * Decodes a Layer message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.mapbox.pb.Tile.Layer} Layer
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Layer.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Creates a Layer message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.mapbox.pb.Tile.Layer} Layer
                     */
                    Layer.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.mapbox.pb.Tile.Layer)
                            return object;
                        var message = new $root.com.mapbox.pb.Tile.Layer();
                        if (object.version != null)
                            message.version = object.version >>> 0;
                        if (object.name != null)
                            message.name = String(object.name);
                        if (object.features) {
                            if (!Array.isArray(object.features))
                                throw TypeError(".com.mapbox.pb.Tile.Layer.features: array expected");
                            message.features = [];
                            for (var i = 0; i < object.features.length; ++i) {
                                if (typeof object.features[i] !== "object")
                                    throw TypeError(".com.mapbox.pb.Tile.Layer.features: object expected");
                                message.features[i] = $root.com.mapbox.pb.Tile.Feature.fromObject(object.features[i]);
                            }
                        }
                        if (object.keys) {
                            if (!Array.isArray(object.keys))
                                throw TypeError(".com.mapbox.pb.Tile.Layer.keys: array expected");
                            message.keys = [];
                            for (var i = 0; i < object.keys.length; ++i)
                                message.keys[i] = String(object.keys[i]);
                        }
                        if (object.values) {
                            if (!Array.isArray(object.values))
                                throw TypeError(".com.mapbox.pb.Tile.Layer.values: array expected");
                            message.values = [];
                            for (var i = 0; i < object.values.length; ++i) {
                                if (typeof object.values[i] !== "object")
                                    throw TypeError(".com.mapbox.pb.Tile.Layer.values: object expected");
                                message.values[i] = $root.com.mapbox.pb.Tile.Value.fromObject(object.values[i]);
                            }
                        }
                        if (object.extent != null)
                            message.extent = object.extent >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a Layer message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @static
                     * @param {com.mapbox.pb.Tile.Layer} message Layer
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Layer.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.features = [];
                            object.keys = [];
                            object.values = [];
                        }
                        if (options.defaults) {
                            object.name = "";
                            object.extent = 4096;
                            object.version = 1;
                        }
                        if (message.name != null && message.hasOwnProperty("name"))
                            object.name = message.name;
                        if (message.features && message.features.length) {
                            object.features = [];
                            for (var j = 0; j < message.features.length; ++j)
                                object.features[j] = $root.com.mapbox.pb.Tile.Feature.toObject(message.features[j], options);
                        }
                        if (message.keys && message.keys.length) {
                            object.keys = [];
                            for (var j = 0; j < message.keys.length; ++j)
                                object.keys[j] = message.keys[j];
                        }
                        if (message.values && message.values.length) {
                            object.values = [];
                            for (var j = 0; j < message.values.length; ++j)
                                object.values[j] = $root.com.mapbox.pb.Tile.Value.toObject(message.values[j], options);
                        }
                        if (message.extent != null && message.hasOwnProperty("extent"))
                            object.extent = message.extent;
                        if (message.version != null && message.hasOwnProperty("version"))
                            object.version = message.version;
                        return object;
                    };

                    /**
                     * Converts this Layer to JSON.
                     * @function toJSON
                     * @memberof com.mapbox.pb.Tile.Layer
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Layer.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Layer;
                })();

                return Tile;
            })();

            return pb;
        })();

        return mapbox;
    })();

    return com;
})();

module.exports = $root;


/***/ }),

/***/ "../harp-utils/index-common.ts":
/*!*************************************!*\
  !*** ../harp-utils/index-common.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./lib/GroupedPriorityList */ "../harp-utils/lib/GroupedPriorityList.ts"));
__export(__webpack_require__(/*! ./lib/Logger */ "../harp-utils/lib/Logger/index.ts"));
__export(__webpack_require__(/*! ./lib/Math2D */ "../harp-utils/lib/Math2D.ts"));
__export(__webpack_require__(/*! ./lib/MathUtils */ "../harp-utils/lib/MathUtils.ts"));
__export(__webpack_require__(/*! ./lib/Mixins */ "../harp-utils/lib/Mixins.ts"));
__export(__webpack_require__(/*! ./lib/assert */ "../harp-utils/lib/assert.ts"));
__export(__webpack_require__(/*! ./lib/ContextLogger */ "../harp-utils/lib/ContextLogger.ts"));
__export(__webpack_require__(/*! ./lib/PerformanceTimer */ "../harp-utils/lib/PerformanceTimer.ts"));
__export(__webpack_require__(/*! ./lib/ObjectUtils */ "../harp-utils/lib/ObjectUtils.ts"));
__export(__webpack_require__(/*! ./lib/OptionsUtils */ "../harp-utils/lib/OptionsUtils.ts"));
__export(__webpack_require__(/*! ./lib/UriResolver */ "../harp-utils/lib/UriResolver.ts"));
__export(__webpack_require__(/*! ./lib/UrlUtils */ "../harp-utils/lib/UrlUtils.ts"));
__export(__webpack_require__(/*! ./lib/Functions */ "../harp-utils/lib/Functions.ts"));


/***/ }),

/***/ "../harp-utils/index.web.ts":
/*!**********************************!*\
  !*** ../harp-utils/index.web.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./index-common */ "../harp-utils/index-common.ts"));
__export(__webpack_require__(/*! ./lib/UrlPlatformUtils.web */ "../harp-utils/lib/UrlPlatformUtils.web.ts"));


/***/ }),

/***/ "../harp-utils/lib/ContextLogger.ts":
/*!******************************************!*\
  !*** ../harp-utils/lib/ContextLogger.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Context-aware logger that decorates log message with stack-based prefix, emits `headerMessage`
 * before first actual log message.
 */
class ContextLogger {
    /**
     * Construct a context-aware logger that logs to `m_logger`.
     */
    constructor(m_logger, headerMessage) {
        this.m_logger = m_logger;
        this.headerMessage = headerMessage;
        this.context = [];
        this.m_headerLogged = false;
        // They, are public member functions it's just tslint who doesn't understand this.
        // tslint:disable:member-ordering
        this.warn = this.createLogMethod("warn");
        this.info = this.createLogMethod("info");
        this.error = this.createLogMethod("error");
    }
    /**
     * Push "attribute-like" context.
     *
     * Following log messages will be prefixed with `name` or `.name` depending on current context.
     */
    pushAttr(name) {
        this.context.push(`${this.context.length > 0 ? "." : ""}${name}`);
    }
    /**
     * Push "index-like" context.
     *
     * Following log messages will be prefixed with `[index]`.
     */
    pushIndex(index) {
        this.context.push(`[${index}]`);
    }
    pop() {
        this.context.pop();
    }
    // tslint:enable:member-ordering
    createLogMethod(severity) {
        return (message, ...rest) => {
            if (!this.m_headerLogged) {
                this.m_logger.info(this.headerMessage);
                this.m_headerLogged = true;
            }
            this.m_logger[severity](`${this.context.join("")}: ${message}`, ...rest);
        };
    }
}
exports.ContextLogger = ContextLogger;


/***/ }),

/***/ "../harp-utils/lib/Functions.ts":
/*!**************************************!*\
  !*** ../harp-utils/lib/Functions.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Chains two functions for further assigning as one wrapped callback function
 */
function chainCallbacks(f1, f2) {
    return function (...args) {
        if (f1) {
            f1.apply(this, args);
        }
        return f2.apply(this, args);
    };
}
exports.chainCallbacks = chainCallbacks;


/***/ }),

/***/ "../harp-utils/lib/GroupedPriorityList.ts":
/*!************************************************!*\
  !*** ../harp-utils/lib/GroupedPriorityList.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The `PriorityListGroup` contains a list of [[PriorityListElement]]s that all have the same
 * (integer) priority.
 */
class PriorityListGroup {
    constructor(priority, elements = new Array()) {
        this.priority = priority;
        this.elements = elements;
    }
    /**
     * Create and return a deep copy of the `PriorityListGroup<T>`.
     *
     * @returns A clone of the `PriorityListGroup<T>`.
     */
    clone() {
        return new PriorityListGroup(this.priority, this.elements.slice());
    }
}
exports.PriorityListGroup = PriorityListGroup;
/**
 * The `GroupedPriorityList` contains a [[PriorityListGroupMap]] to manage a larger number of items
 * in priority groups.
 */
class GroupedPriorityList {
    constructor() {
        this.groups = new Map();
    }
    /**
     * Add an element to the `GroupedPriorityList`. Selects group based on the elements priority.
     *
     * @param element Element to be added.
     */
    add(element) {
        this.getGroup(element.priority).elements.push(element);
    }
    /**
     * Remove an element from the `GroupedPriorityList`.
     *
     * Note: It is required that the priority is the same as it was when the element has been added.
     * Otherwise, the removal will fail.
     *
     * @param element Element to be removed.
     * @returns `True` if the element was removed, `false` otherwise.
     */
    remove(element) {
        const group = this.getGroup(element.priority);
        if (group !== undefined) {
            const foundIndex = group.elements.indexOf(element);
            if (foundIndex >= 0) {
                group.elements.splice(foundIndex, 1);
                if (group.elements.length === 0) {
                    const normalizedPriority = Math.floor(element.priority);
                    this.groups.delete(normalizedPriority);
                    if (this.m_sortedGroups) {
                        this.m_sortedGroups = [];
                    }
                }
                return true;
            }
        }
        return false;
    }
    /**
     * Remove all internal [[PriorityListGroup]]s.
     */
    clear() {
        this.groups.clear();
        if (this.m_sortedGroups) {
            this.m_sortedGroups = [];
        }
    }
    /**
     * Merge another [[GroupedPriorityList]] into this one.
     *
     * @param other Other group to merge.
     */
    merge(other) {
        for (const otherGroup of other.groups) {
            const group = this.findGroup(otherGroup[1].priority);
            if (group === undefined) {
                this.groups.set(Math.floor(otherGroup[1].priority), otherGroup[1].clone());
                if (this.m_sortedGroups) {
                    this.m_sortedGroups = [];
                }
                continue;
            }
            group.elements = group.elements.concat(otherGroup[1].elements);
        }
        return this;
    }
    /**
     * Return a sorted list of [[PriorityListGroup]]s.
     */
    get sortedGroups() {
        if (this.m_sortedGroups && this.m_sortedGroups.length > 0) {
            return this.m_sortedGroups;
        }
        if (!this.m_sortedGroups) {
            this.m_sortedGroups = [];
        }
        for (const priorityList of this.groups) {
            this.m_sortedGroups.push(priorityList[1]);
        }
        this.m_sortedGroups.sort((a, b) => {
            return b.priority - a.priority;
        });
        return this.m_sortedGroups;
    }
    /**
     * Apply function to all elements in this `GroupedPriorityList`.
     *
     * @param {(element: T) => void} fun Function to apply.
     */
    forEach(fun) {
        for (const group of this.groups) {
            group[1].elements.forEach(fun);
        }
    }
    /**
     * Count the number of elements in this `GroupedPriorityList`.
     */
    count() {
        let n = 0;
        for (const group of this.groups) {
            n += group[1].elements.length;
        }
        return n;
    }
    /**
     * Get group of elements that have the same (integer) priority.
     *
     * @param priority The priority to retrieve all elements from.
     */
    findGroup(priority) {
        const normalizedPriority = Math.floor(priority);
        const group = this.groups.get(normalizedPriority);
        return group;
    }
    /**
     * Get group of elements that have the same (integer) priority.
     *
     * @param priority The priority to retrieve all elements from.
     */
    getGroup(priority) {
        let group = this.findGroup(priority);
        if (group === undefined) {
            const normalizedPriority = Math.floor(priority);
            group = new PriorityListGroup(normalizedPriority);
            this.groups.set(normalizedPriority, group);
            if (this.m_sortedGroups) {
                this.m_sortedGroups = [];
            }
        }
        return group;
    }
}
exports.GroupedPriorityList = GroupedPriorityList;


/***/ }),

/***/ "../harp-utils/lib/Logger/ConsoleChannel.ts":
/*!**************************************************!*\
  !*** ../harp-utils/lib/Logger/ConsoleChannel.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for the default console channel.
 */
class ConsoleChannel {
    error(message, ...optionalParams) {
        // tslint:disable-next-line:no-console
        console.error(message, ...optionalParams);
    }
    debug(message, ...optionalParams) {
        // tslint:disable-next-line:no-console
        console.debug(message, ...optionalParams);
    }
    info(message, ...optionalParams) {
        // tslint:disable-next-line:no-console
        console.info(message, ...optionalParams);
    }
    log(message, ...optionalParams) {
        // tslint:disable-next-line:no-console
        console.log(message, ...optionalParams);
    }
    trace(message, ...optionalParams) {
        // tslint:disable-next-line:no-console
        console.trace(message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        // tslint:disable-next-line:no-console
        console.warn(message, ...optionalParams);
    }
}
exports.ConsoleChannel = ConsoleChannel;


/***/ }),

/***/ "../harp-utils/lib/Logger/ILogger.ts":
/*!*******************************************!*\
  !*** ../harp-utils/lib/Logger/ILogger.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum log levels
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    LogLevel[LogLevel["Log"] = 2] = "Log";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Warn"] = 4] = "Warn";
    LogLevel[LogLevel["Error"] = 5] = "Error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/**
 * Logger options to configure logger
 */
class LoggerOptions {
}
exports.LoggerOptions = LoggerOptions;


/***/ }),

/***/ "../harp-utils/lib/Logger/Logger.ts":
/*!******************************************!*\
  !*** ../harp-utils/lib/Logger/Logger.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ILogger_1 = __webpack_require__(/*! ./ILogger */ "../harp-utils/lib/Logger/ILogger.ts");
/**
 * Logger class.
 */
class Logger {
    constructor(name, m_channel, options) {
        this.name = name;
        this.m_channel = m_channel;
        this.enabled = true;
        this.level = ILogger_1.LogLevel.Trace;
        if (options !== undefined) {
            this.update(options);
        }
    }
    error(message, ...optionalParams) {
        if (this.enabled && this.level <= ILogger_1.LogLevel.Error) {
            this.m_channel.error(this.prefix, message, ...optionalParams);
        }
    }
    debug(message, ...optionalParams) {
        if (this.enabled && this.level <= ILogger_1.LogLevel.Debug) {
            this.m_channel.debug(this.prefix, message, ...optionalParams);
        }
    }
    info(message, ...optionalParams) {
        if (this.enabled && this.level <= ILogger_1.LogLevel.Info) {
            this.m_channel.info(this.prefix, message, ...optionalParams);
        }
    }
    log(message, ...optionalParams) {
        if (this.enabled && this.level <= ILogger_1.LogLevel.Log) {
            this.m_channel.log(this.prefix, message, ...optionalParams);
        }
    }
    trace(message, ...optionalParams) {
        if (this.enabled && this.level <= ILogger_1.LogLevel.Trace) {
            this.m_channel.trace(this.prefix, message, ...optionalParams);
        }
    }
    warn(message, ...optionalParams) {
        if (this.enabled && this.level <= ILogger_1.LogLevel.Warn) {
            this.m_channel.warn(this.prefix, message, ...optionalParams);
        }
    }
    update(options) {
        this.enabled = options.enabled === undefined ? this.enabled : options.enabled;
        this.level = options.level === undefined ? this.level : options.level;
    }
    get prefix() {
        return this.name + ":";
    }
}
exports.Logger = Logger;


/***/ }),

/***/ "../harp-utils/lib/Logger/LoggerManager.ts":
/*!*************************************************!*\
  !*** ../harp-utils/lib/Logger/LoggerManager.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManagerImpl_1 = __webpack_require__(/*! ./LoggerManagerImpl */ "../harp-utils/lib/Logger/LoggerManagerImpl.ts");
/**
 * The LoggerManager class implements a singleton object that handles logging.
 *
 * Example:
 *
 * ```typescript
 *
 * const logger = LoggerManager.instance.create("MyFontLoaderClass");
 * if (missingFonts.length > 0) {
 *     logger.error("These fonts can not be loaded: ", missingFonts);
 * } else {
 *     logger.log("All fonts have been loaded.");
 * }
 * ```
 */
class LoggerManager {
    static get instance() {
        return this.m_instance || (this.m_instance = new LoggerManagerImpl_1.LoggerManagerImpl());
    }
}
exports.LoggerManager = LoggerManager;


/***/ }),

/***/ "../harp-utils/lib/Logger/LoggerManagerImpl.ts":
/*!*****************************************************!*\
  !*** ../harp-utils/lib/Logger/LoggerManagerImpl.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleChannel_1 = __webpack_require__(/*! ./ConsoleChannel */ "../harp-utils/lib/Logger/ConsoleChannel.ts");
const Logger_1 = __webpack_require__(/*! ./Logger */ "../harp-utils/lib/Logger/Logger.ts");
const WorkerChannel_1 = __webpack_require__(/*! ./WorkerChannel */ "../harp-utils/lib/Logger/WorkerChannel.ts");
/**
 * LoggerManagerImpl is the class for the singleton instance of the logger manager.
 * It handles channels and loggers.
 */
class LoggerManagerImpl {
    constructor() {
        this.m_loggers = [];
        this.channel =
            typeof self === "undefined" || typeof self.document !== "undefined"
                ? new ConsoleChannel_1.ConsoleChannel()
                : new WorkerChannel_1.WorkerChannel();
    }
    getLoggerNames() {
        return this.m_loggers.map(logger => logger.name);
    }
    getLogger(name) {
        return this.m_loggers.find(logger => logger.name === name);
    }
    create(loggerName, options = {}) {
        if (this.m_levelSetForAll !== undefined &&
            (options.level === undefined || options.level < this.m_levelSetForAll)) {
            options.level = this.m_levelSetForAll;
        }
        const logger = new Logger_1.Logger(loggerName, this.channel, options);
        this.m_loggers.push(logger);
        return logger;
    }
    dispose(logger) {
        const found = this.m_loggers.indexOf(logger);
        if (found < 0) {
            throw new Error(`Cannot unregister "${logger}" : no such logger registered.`);
        }
        this.m_loggers.splice(found, 1);
    }
    updateAll(options) {
        for (const logger of this.m_loggers) {
            logger.update(options);
        }
    }
    update(loggerName, config) {
        for (const logger of this.m_loggers) {
            if (logger.name === loggerName) {
                logger.update(config);
            }
        }
    }
    enableAll(enabled) {
        for (const logger of this.m_loggers) {
            logger.enabled = enabled;
        }
    }
    enable(loggerName, value) {
        this.update(loggerName, { enabled: value });
    }
    setLogLevelForAll(level) {
        this.m_levelSetForAll = level;
        for (const logger of this.m_loggers) {
            logger.level = level;
        }
    }
    setLogLevel(loggerName, level) {
        this.update(loggerName, { level });
    }
    setChannel(channel) {
        this.channel = channel;
    }
}
exports.LoggerManagerImpl = LoggerManagerImpl;


/***/ }),

/***/ "../harp-utils/lib/Logger/MultiChannel.ts":
/*!************************************************!*\
  !*** ../harp-utils/lib/Logger/MultiChannel.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class allowing mixing several channels.
 */
class MultiChannel {
    constructor(...channels) {
        this.channels = [];
        this.channels = channels;
    }
    error(message, ...optionalParams) {
        for (const channel of this.channels) {
            channel.error(message, ...optionalParams);
        }
    }
    debug(message, ...optionalParams) {
        for (const channel of this.channels) {
            channel.debug(message, ...optionalParams);
        }
    }
    info(message, ...optionalParams) {
        for (const channel of this.channels) {
            channel.info(message, ...optionalParams);
        }
    }
    log(message, ...optionalParams) {
        for (const channel of this.channels) {
            channel.log(message, ...optionalParams);
        }
    }
    trace(message, ...optionalParams) {
        for (const channel of this.channels) {
            channel.trace(message, ...optionalParams);
        }
    }
    warn(message, ...optionalParams) {
        for (const channel of this.channels) {
            channel.warn(message, ...optionalParams);
        }
    }
}
exports.MultiChannel = MultiChannel;


/***/ }),

/***/ "../harp-utils/lib/Logger/WorkerChannel.ts":
/*!*************************************************!*\
  !*** ../harp-utils/lib/Logger/WorkerChannel.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ILogger_1 = __webpack_require__(/*! ./ILogger */ "../harp-utils/lib/Logger/ILogger.ts");
exports.WORKERCHANNEL_MSG_TYPE = "worker-channel-message";
/**
 * The class for the worker channel.
 */
class WorkerChannel {
    error(message, ...optionalParams) {
        const workerMessage = {
            message: [message, ...optionalParams],
            type: exports.WORKERCHANNEL_MSG_TYPE,
            level: ILogger_1.LogLevel.Error
        };
        self.postMessage(workerMessage);
    }
    debug(message, ...optionalParams) {
        const workerMessage = {
            message: [message, ...optionalParams],
            type: exports.WORKERCHANNEL_MSG_TYPE,
            level: ILogger_1.LogLevel.Debug
        };
        self.postMessage(workerMessage);
    }
    info(message, ...optionalParams) {
        const workerMessage = {
            message: [message, ...optionalParams],
            type: exports.WORKERCHANNEL_MSG_TYPE,
            level: ILogger_1.LogLevel.Info
        };
        self.postMessage(workerMessage);
    }
    log(message, ...optionalParams) {
        const workerMessage = {
            message: [message, ...optionalParams],
            type: exports.WORKERCHANNEL_MSG_TYPE,
            level: ILogger_1.LogLevel.Log
        };
        self.postMessage(workerMessage);
    }
    trace(message, ...optionalParams) {
        const workerMessage = {
            message: [message, ...optionalParams],
            type: exports.WORKERCHANNEL_MSG_TYPE,
            level: ILogger_1.LogLevel.Trace
        };
        self.postMessage(workerMessage);
    }
    warn(message, ...optionalParams) {
        const workerMessage = {
            message: [message, ...optionalParams],
            type: exports.WORKERCHANNEL_MSG_TYPE,
            level: ILogger_1.LogLevel.Warn
        };
        self.postMessage(workerMessage);
    }
}
exports.WorkerChannel = WorkerChannel;


/***/ }),

/***/ "../harp-utils/lib/Logger/index.ts":
/*!*****************************************!*\
  !*** ../harp-utils/lib/Logger/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./ConsoleChannel */ "../harp-utils/lib/Logger/ConsoleChannel.ts"));
__export(__webpack_require__(/*! ./ILogger */ "../harp-utils/lib/Logger/ILogger.ts"));
__export(__webpack_require__(/*! ./Logger */ "../harp-utils/lib/Logger/Logger.ts"));
__export(__webpack_require__(/*! ./LoggerManager */ "../harp-utils/lib/Logger/LoggerManager.ts"));
__export(__webpack_require__(/*! ./MultiChannel */ "../harp-utils/lib/Logger/MultiChannel.ts"));
__export(__webpack_require__(/*! ./WorkerChannel */ "../harp-utils/lib/Logger/WorkerChannel.ts"));


/***/ }),

/***/ "../harp-utils/lib/Math2D.ts":
/*!***********************************!*\
  !*** ../harp-utils/lib/Math2D.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Math2D;
(function (Math2D) {
    /**
     * Alternative 2D box object with less memory impact (four numbers instead of two min/max
     * objects with two numbers each). Should be faster.
     */
    class Box {
        /**
         * Alternative 2D box object with less memory impact (four numbers instead of two min/max
         * objects with two numbers each). Should be faster.
         *
         * @param x New X value.
         * @param y New y value.
         * @param w New w value.
         * @param h New h value.
         */
        constructor(x = 0, y = 0, w = 0, h = 0) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        /**
         * Set new values to all properties of the box.
         *
         * @param x New X value.
         * @param y New y value.
         * @param w New w value.
         * @param h New h value.
         */
        set(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        /**
         * Test box for inclusion of point.
         *
         * @param x X coordinate of point.
         * @param y Y coordinate of point.
         */
        contains(x, y) {
            return this.x <= x && this.x + this.w >= x && this.y <= y && this.y + this.h >= y;
        }
        /**
         * Test box for inclusion of another box.
         *
         * @param other Box 2 to test for inclusion.
         */
        containsBox(other) {
            const xmax = other.x + other.w;
            const ymax = other.y + other.h;
            return (this.contains(other.x, other.y) &&
                this.contains(xmax, other.y) &&
                this.contains(other.x, ymax) &&
                this.contains(xmax, ymax));
        }
        /**
         * Test two boxes for intersection.
         *
         * @param other Box 2 to test for intersection.
         */
        intersects(other) {
            return (this.x <= other.x + other.w &&
                this.x + this.w >= other.x &&
                this.y <= other.y + other.h &&
                this.y + this.h >= other.y);
        }
    }
    Math2D.Box = Box;
    /**
     * Compute squared distance between two 2D points `a` and `b`.
     *
     * @param ax Point a.x
     * @param ay Point a.y
     * @param bx Point b.x
     * @param by Point b.y
     * @returns Squared distance between the two points
     */
    function distSquared(ax, ay, bx, by) {
        return (ax - bx) * (ax - bx) + (ay - by) * (ay - by);
    }
    Math2D.distSquared = distSquared;
    /**
     * Computes the squared length of a line.
     *
     * @param line An array of that forms a line via [x,y,z,x,y,z,...] tuples.
     */
    function computeSquaredLineLength(line) {
        let squaredLineLength = 0;
        const length = line.length - 4;
        for (let i = 0; i < length; i += 3) {
            const xDiff = line[i + 3] - line[i];
            const yDiff = line[i + 4] - line[i + 1];
            squaredLineLength += xDiff * xDiff + yDiff * yDiff;
        }
        return squaredLineLength;
    }
    Math2D.computeSquaredLineLength = computeSquaredLineLength;
    /**
     * Compute squared distance between a 2D point and a 2D line segment.
     *
     * @param px Test point X
     * @param py Test point y
     * @param l0x Line segment start X
     * @param l0y Line segment start Y
     * @param l1x Line segment end X
     * @param l1y Line segment end Y
     * @returns Squared distance between point and line segment
     */
    function distToSegmentSquared(px, py, l0x, l0y, l1x, l1y) {
        const lineLengthSuared = distSquared(l0x, l0y, l1x, l1y);
        if (lineLengthSuared === 0) {
            return distSquared(px, py, l0x, l0y);
        }
        let t = ((px - l0x) * (l1x - l0x) + (py - l0y) * (l1y - l0y)) / lineLengthSuared;
        t = Math.max(0, Math.min(1, t));
        return distSquared(px, py, l0x + t * (l1x - l0x), l0y + t * (l1y - l0y));
    }
    Math2D.distToSegmentSquared = distToSegmentSquared;
})(Math2D = exports.Math2D || (exports.Math2D = {}));


/***/ }),

/***/ "../harp-utils/lib/MathUtils.ts":
/*!**************************************!*\
  !*** ../harp-utils/lib/MathUtils.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var MathUtils;
(function (MathUtils) {
    /**
     * Ensures that input value fits in a given range.
     *
     * @param value The value to be clamped.
     * @param min Minimum value.
     * @param max Maximum value.
     *
     * @returns Clamped value.
     */
    function clamp(value, min, max) {
        return value < min ? min : value > max ? max : value;
    }
    MathUtils.clamp = clamp;
    /**
     * Returns a linear interpolation between the values of edge0 and edge1 based on the factor.
     *
     * Given two known points the linear interpolant between these points may be presented as
     * straight line. This means that for given factor change the resulting change of return
     * value is always const.
     * @see https://en.wikipedia.org/wiki/Linear_interpolation
     *
     * @param edge0
     * @param edge1
     * @param factor Interpolation factor that ranges between: 0 <= x <= 1.
     */
    function lerp(edge0, edge1, factor) {
        return edge0 * (1 - factor) + edge1 * factor;
    }
    MathUtils.lerp = lerp;
    /**
     * Returns a smooth interpolation between the values edge0 and edge1 based on the interpolation
     * factor x. `0 <= x <= 1`.
     * @see https://en.wikipedia.org/wiki/Smoothstep
     *
     * @param edge0
     * @param edge1
     * @param x
     */
    function smoothStep(edge0, edge1, x) {
        // Scale, bias and saturate x to 0..1 range
        x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
        // Evaluate polynomial
        return x * x * (3 - 2 * x);
    }
    MathUtils.smoothStep = smoothStep;
    /**
     * Returns a smooth interpolation between the values edge0 and edge1 based on the interpolation
     * factor x. `0 <= x <= 1`.
     *
     * Improved version by Ken Perlin, which has zero 1st- and 2nd-order derivatives at `x = 0` and
     * `x = 1`:
     *
     * @see https://en.wikipedia.org/wiki/Smoothstep
     *
     * @param edge0
     * @param edge1
     * @param x
     */
    function smootherStep(edge0, edge1, x) {
        // Scale, and clamp x to 0..1 range
        x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
        // Evaluate polynomial
        return x * x * x * (x * (x * 6 - 15) + 10);
    }
    MathUtils.smootherStep = smootherStep;
    /**
     * Maps a number from one range to another.
     *
     * @param val The incoming value to be converted.
     * @param inMin Lower bound of the value's current range.
     * @param inMax Upper bound of the value's current range.
     * @param outMin Lower bound of the value's target range.
     * @param outMax Upper bound of the value's target range.
     */
    function map(val, inMin, inMax, outMin, outMax) {
        return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }
    MathUtils.map = map;
    /**
     * Returns the smaller of the two given numbers. Both numbers may be undefined, in which case
     * the result is undefined. If only one of the numbers is undefined, the other number is
     * returned.
     *
     * @param a First number.
     * @param b Second number.
     */
    function min2(a, b) {
        let result;
        if (a !== undefined) {
            result = a;
        }
        if (b !== undefined) {
            result = result === undefined ? b : Math.min(result, b);
        }
        return result;
    }
    MathUtils.min2 = min2;
    /**
     * Returns the larger of the two given numbers. Both numbers may be undefined, in which case
     * the result is undefined. If only one of the numbers is undefined, the other number is
     * returned.
     *
     * @param a First number.
     * @param b Second number.
     */
    function max2(a, b) {
        let result;
        if (a !== undefined) {
            result = a;
        }
        if (b !== undefined) {
            result = result === undefined ? b : Math.max(result, b);
        }
        return result;
    }
    MathUtils.max2 = max2;
    /**
     * Checks if the value of a given number is inside an upper or lower bound. The bounds may be
     * undefined, in which case their value is ignored.
     *
     * @param value Value to check.
     * @param lowerBound The lower bound to check the value against.
     * @param upperBound The upper bound to check the value against.
     *
     * @returns `true` if value is inside the bounds or if the bounds are `undefined`, `false`
     *          otherwise.
     */
    function isClamped(value, lowerBound, upperBound) {
        if (lowerBound !== undefined && value < lowerBound) {
            return false;
        }
        if (upperBound !== undefined && value > upperBound) {
            return false;
        }
        return true;
    }
    MathUtils.isClamped = isClamped;
    /**
     * Smoothly interpolates between two values using cubic formula
     *
     * @param startValue
     * @param endValue
     * @param time
     * @returns Result of the interpolation within the range of `[startValue, endValue]`
     */
    function easeInOutCubic(startValue, endValue, time) {
        const timeValue = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
        return startValue + (endValue - startValue) * timeValue;
    }
    MathUtils.easeInOutCubic = easeInOutCubic;
})(MathUtils = exports.MathUtils || (exports.MathUtils = {}));


/***/ }),

/***/ "../harp-utils/lib/Mixins.ts":
/*!***********************************!*\
  !*** ../harp-utils/lib/Mixins.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copy methods and properties from one prototype into another.
 *
 * @see https://www.typescriptlang.org/docs/handbook/mixins.html
 *
 * @param derivedCtor Class to mix methods and properties into.
 * @param baseCtors Class to take all methods and properties from.
 */
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
exports.applyMixins = applyMixins;
/**
 * Copy methods from one prototype into another.
 *
 * @see https://www.typescriptlang.org/docs/handbook/mixins.html
 *
 * @param derivedCtor Class to mix methods into.
 * @param baseCtors Class to take all methods from.
 */
function applyMixinsWithoutProperties(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            const descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
            if (descriptor !== undefined &&
                descriptor.get === undefined &&
                name !== "constructor") {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}
exports.applyMixinsWithoutProperties = applyMixinsWithoutProperties;


/***/ }),

/***/ "../harp-utils/lib/ObjectUtils.ts":
/*!****************************************!*\
  !*** ../harp-utils/lib/ObjectUtils.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Deep clone of object.
 *
 * Like `JSON.parse(JSON.stringify(obj))`, but supports basic javascript types (string, number,
 * object), `Date` and `RegExp`s and cycles.
 *
 * Throws error if enounters object with `prototype` assuming that in general class instances
 * cannot be reliably cloned by generic algorithm.
 */
function cloneDeep(obj) {
    const cache = new Map();
    function cloneInternal(src) {
        if (src === null) {
            return null;
        }
        else if (typeof src === "object") {
            const cached = cache.get(src);
            if (cached !== undefined) {
                return cached;
            }
            if (Array.isArray(src)) {
                const result = [];
                cache.set(src, result);
                result.length = src.length;
                for (let i = 0; i < result.length; ++i) {
                    result[i] = cloneInternal(src[i]);
                }
                return result;
            }
            else if (src instanceof Date) {
                const result = new Date(src.getTime());
                cache.set(src, result);
                return result;
            }
            else if (src instanceof RegExp) {
                const result = new RegExp(src.source, src.flags);
                cache.set(src, result);
                return result;
            }
            else if (src.constructor !== Object) {
                throw new Error("cloneDeep doesn't support objects with custom prototypes");
            }
            else {
                const result = {};
                cache.set(src, result);
                for (const key in src) {
                    if (src.hasOwnProperty(key)) {
                        result[key] = cloneInternal(src[key]);
                    }
                }
                return result;
            }
        }
        else {
            // string, number, boolean, undefined and functions are returned as is
            return src;
        }
    }
    const r = cloneInternal(obj);
    cache.clear();
    return r;
}
exports.cloneDeep = cloneDeep;


/***/ }),

/***/ "../harp-utils/lib/OptionsUtils.ts":
/*!*****************************************!*\
  !*** ../harp-utils/lib/OptionsUtils.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
function getOptionValue(...values) {
    for (const candidate of values) {
        if (candidate !== undefined && candidate !== null) {
            return candidate;
        }
    }
    return undefined;
}
exports.getOptionValue = getOptionValue;
/**
 * Merge options into existing parameters object.
 *
 * Convenience helper with _similar_ semantics as:
 *
 *     const finalParams1 = { ...defaults, ... options };
 *     const finalParams2 = Object.assign({}, defaults, options);
 *
 * This function doesn't copy _extra_ properties of `options` that doesn't exist in `defaults`.
 * `defaults` is used as _parameters_ template.
 *
 * This doc uses following notion of `option` and `parameter` terms:
 * * `parameter` is a variable, or 'almost constant' of procedure/function/algorith/object
 *    * `parameter` usually have sensible and usually used default
 *    * `parameter` is always defined (no `undefined`, `null` or `?` in type)
 *    * `parameter` can be overriden by specyfying `option` with same name
 * * `option` means value that may be passed optionally, overrides `parameter` value with same name
 *
 * Usage:
 *
 *     interface FooParams {
 *         useTextures: boolean;
 *         opacity: number;
 *     }
 *
 *     const FOO_DEFAULTS: FooParams = {
 *         useTextures: true,
 *         opacity: 0.8
 *     };
 *
 *     type FooOptions = Partial<FooParams>;
 *
 *     function doSomething(options: FooOptions) {
 *         const params = mergeWithOptions(FOO_DEFAULTS, options);
 *             // typeof params === FooParams
 *             // params.opacity = 0.5
 *             // params.useTextures = true
 *             // params.someOtherOptionFromOtherApi is not defined
 *     }
 *     const opt = {opacity: 0.5, someOtherOptionFromOtherApi: 'aaa'};
 *     doSomething(opt);
 *
 * Rationale:
 *   * both `Object.assign` and spread operator copy extra options
 *   * `Object.assign` & `spread operator` may copy `undefined` and `null`s if they really exist
 *     in options object
 *
 * @param parameters parmeters template object holding all expected parameters
 * @param options options object
 * @returns new object with `parameters` overriden by values from `options`
 */
function mergeWithOptions(parameters, options) {
    // NOTE: `as object` needed due to TypeScript bug:
    //       https://github.com/Microsoft/TypeScript/issues/14409
    // tslint:disable-next-line:no-object-literal-type-assertion
    const result = Object.assign({}, parameters);
    if (options === undefined || options === null) {
        return result;
    }
    for (const prop in parameters) {
        if (parameters.hasOwnProperty(prop)) {
            const optionValue = options[prop];
            if (optionValue !== undefined && optionValue !== null) {
                result[prop] = optionValue;
            }
        }
    }
    return result;
}
exports.mergeWithOptions = mergeWithOptions;


/***/ }),

/***/ "../harp-utils/lib/PerformanceTimer.ts":
/*!*********************************************!*\
  !*** ../harp-utils/lib/PerformanceTimer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:max-line-length */
/**
 * See:
 * https://developers.google.com/web/updates/2012/08/When-milliseconds-are-not-enough-performance-now
 */
/* tslint:ensable:max-line-length */
class PerformanceTimer {
    /**
     * Returns timestamp in milliseconds since page load.
     *
     * If the [[DOMHighResTimeStamp]] is supported, the resolution is up to 5 microseconds,
     * otherwise it is in milliseconds. Timespans are computed by taking the difference between two
     * samples.
     *
     * Example:
     * ```typescript
     * const now = PerformanceTimer.now();
     * // call some expensive function for which you want to check the duration.
     * const end = PerformanceTimer.now();
     * const elapsedTime = end - now;
     * ```
     */
    static now() {
        return PerformanceTimer.nowFunc();
    }
    static getNowFunc() {
        if (typeof performance !== "undefined" && typeof performance.now !== "undefined") {
            return () => performance.now();
        }
        // fall back to Date.getTime()
        return () => {
            return new Date().getTime();
        };
    }
}
exports.PerformanceTimer = PerformanceTimer;
// tslint:disable-next-line:no-unused-variable
PerformanceTimer.instance = new PerformanceTimer();
PerformanceTimer.nowFunc = PerformanceTimer.getNowFunc();


/***/ }),

/***/ "../harp-utils/lib/UriResolver.ts":
/*!****************************************!*\
  !*** ../harp-utils/lib/UriResolver.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const UrlUtils_1 = __webpack_require__(/*! ./UrlUtils */ "../harp-utils/lib/UrlUtils.ts");
/**
 * Basic, import-map like [[UriResolver]].
 *
 * Resolves `uris` basing on exact or prefix match of `key` from `definitions`.
 *
 * In definitions, `key` is matched against input uri with following strategy:
 *  - `key` without trailing `/` -> `key` and input `uri` must be identical
 *  - `key` with trailing `/`, -> `key` is treated as "package prefix", so `uri` must start with
 *    `key`
 *
 * Example:
 * ```
 * {
 *     "local://poiMasterList": "/assets/poiMasterList.json"
 *        // will match only 'local://poiMasterList' and resolve `/assets/poiMasterList.json`
 *     "local://icons/": "/assets/icons/"
 *        // will match only 'local://icons/ANYPATH' (and similar) and resolve to
 *        // `/assets/icons/ANYPATH
 * }
 * ```
 * Inspired by [`WICG` import maps proposal](https://github.com/WICG/import-maps#the-import-map).
 */
class PrefixMapUriResolver {
    constructor(definitions) {
        this.definitions = definitions;
    }
    resolveUri(uri) {
        return Object.keys(this.definitions).reduce((r, key) => {
            if (key.endsWith("/") && r.startsWith(key)) {
                const newPrefix = this.definitions[key];
                return newPrefix + r.substr(key.length);
            }
            else if (r === key) {
                return this.definitions[key];
            }
            return r;
        }, uri);
    }
}
exports.PrefixMapUriResolver = PrefixMapUriResolver;
/**
 * [UriResolver] that resolve relative `uri`s against to parent resource `uri`.
 */
class RelativeUriResolver {
    constructor(parentUri) {
        this.parentUri = parentUri;
    }
    resolveUri(uri) {
        return UrlUtils_1.resolveReferenceUri(this.parentUri, uri);
    }
}
exports.RelativeUriResolver = RelativeUriResolver;
/**
 * Compose URI resolvers.
 *
 * Creates new [[UriResolver]] that applies resolvers in orders or arguments.
 *
 * Example:
 *
 *     const themeUrl = ...; // url of parent object
 *     const childUrlResolver = composeUrlResolvers(
 *           new RelativeUriResolver(themeUrl),
 *           defaultUrlResolver
 *     );
 */
function composeUriResolvers(...resolvers) {
    return {
        resolveUri(originalUrl) {
            return resolvers.reduce((url, resolver) => {
                if (resolver !== undefined) {
                    return resolver.resolveUri(url);
                }
                else {
                    return url;
                }
            }, originalUrl);
        }
    };
}
exports.composeUriResolvers = composeUriResolvers;


/***/ }),

/***/ "../harp-utils/lib/UrlPlatformUtils.web.ts":
/*!*************************************************!*\
  !*** ../harp-utils/lib/UrlPlatformUtils.web.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const UrlUtils_1 = __webpack_require__(/*! ./UrlUtils */ "../harp-utils/lib/UrlUtils.ts");
/**
 * Get base URL for from where relative URLs will be loaded.
 *
 * * In browser, it resolves to `baseUrl(location.href)` i.e document's base URL
 * (see: https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2).
 *
 * * In node, it resolves to `file://${process.cwd()}`.
 */
function getAppBaseUrl() {
    return UrlUtils_1.baseUrl(window.location.href);
}
exports.getAppBaseUrl = getAppBaseUrl;


/***/ }),

/***/ "../harp-utils/lib/UrlUtils.ts":
/*!*************************************!*\
  !*** ../harp-utils/lib/UrlUtils.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Resolve URI of referenced object w.r.t parent URI.
 *
 * Resolves `childUri` as it would be loaded from location specified by `parentUri`.
 *
 * If `childUri` is absolute, then it is returned unchanged.
 * If `childUri` is origin-absolute path, then only origin path is taken from `parentUri`.
 *
 * See [[baseUri]] for reference how base URL of `parentUri` is determined.
 *
 * Examples:
 *
 *     // normal case, child is sibling
 *     https://foo.com/themes/day.json + images/foo.png -> https://foo.com/themes/images/foo.png
 *
 *     // parent is "folder", so child is just located in this folder
 *     https://foo.com/themes/ + images/foo.png -> https://foo.com/themes/images/foo.png
 *
 *     // parent looks like leaf, so last component is stripped
 *     https://foo.com/themes + images/foo.png -> https://foo.com/images/foo.png
 *
 *     // origin-absolute URL, takes only origin from parent
 *     https://foo.com/themes/day.json + /fonts/foo.json -> https://foo.com/fonts/foo.json
 *
 * @param parentUri URI of parent resource
 * @param childUri URI of child as referenced from parent resource
 * @return `childUrl` as if anchored in location of `parentUrl`
 */
function resolveReferenceUri(parentUri, childUri) {
    if (absoluteUrlWithOriginRe.test(childUri)) {
        return childUri;
    }
    else if (childUri.startsWith("/")) {
        const origin = getUrlOrigin(parentUri);
        return origin + childUri;
    }
    else {
        if (childUri.startsWith("./")) {
            childUri = childUri.substr(2);
        }
        const parentBaseUrl = baseUrl(parentUri);
        return parentBaseUrl + childUri;
    }
}
exports.resolveReferenceUri = resolveReferenceUri;
const absoluteUrlWithOriginRe = new RegExp("^(?:[a-z]+:)?//", "i");
/**
 * Returns base URL of given resource URL.
 *
 * `Url` with trailing slash are considered genuine 'locations', they are returned as is, however if
 * `url` ends with name component it is treated as "leaf", so last path component is removed.
 *
 * Standalone files (without any folder structure) are considered relative to `./`.
 *
 * Examples:
 * ```
 *     https://foo.com/themes/a.json -> https://foo.com/themes/
 *     https://foo.com/themes/ -> https://foo.com/themes/
 *     https://foo.com/themes -> https://foo.com/ // note, themes is treated as leaf
 *     themes/day.json -> themes/
 *     themes -> ./
 * ```
 */
function baseUrl(url) {
    if (url === undefined) {
        return "./";
    }
    let idx = url.indexOf("#");
    if (idx !== -1) {
        url = url.slice(0, idx);
    }
    idx = url.indexOf("?");
    if (idx !== -1) {
        url = url.slice(0, idx);
    }
    idx = url.lastIndexOf("/");
    if (idx === -1) {
        return "./";
    }
    else {
        return url.substring(0, idx + 1);
    }
}
exports.baseUrl = baseUrl;
/**
 * Get `origin` part of URL.
 *
 * @example
 *    https://example.com/foo -> https://example.com
 *    //example.com:8080/ -> //example.com:8080
 *    file:///etc/hosts ->
 *
 * @param url input URL
 * @return origin of given URL
 */
function getUrlOrigin(url) {
    if (url === undefined) {
        return "";
    }
    const parsed = getUrlHostAndProtocol(url);
    if (parsed.protocol === "file:") {
        return "file://";
    }
    else if (parsed.host && parsed.protocol) {
        return parsed.protocol + "//" + parsed.host;
    }
    else if (parsed.host) {
        return "//" + parsed.host;
    }
    else if (parsed.protocol) {
        return parsed.protocol + "//";
    }
    else {
        return "";
    }
}
exports.getUrlOrigin = getUrlOrigin;
/**
 * Parse `host` and `protocol` part from URL.
 */
function getUrlHostAndProtocol(url) {
    const urlOriginRe = new RegExp(/^(?:([a-z]+:))?\/\/([^\/]*)/, "i");
    const match = url.match(urlOriginRe);
    if (!match) {
        throw new Error(`getUrlHostAndProtocol: unable to parse URL '${url}'`);
    }
    return {
        protocol: match[1],
        host: match[2]
    };
}
exports.getUrlHostAndProtocol = getUrlHostAndProtocol;


/***/ }),

/***/ "../harp-utils/lib/assert.ts":
/*!***********************************!*\
  !*** ../harp-utils/lib/assert.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
// cache value, because access to process.env.NODE_ENV is SLOW!
const isProduction = "development" === "production";
//TODO: Make assertHandler configurable
/**
 * Implementation of assert as a development help
 *
 * Note - this is deliberately a global function so that minimizers remove the
 * entire call when building for production.
 *
 * @hidden
 * @param condition Condition to match, if false, throws an Error(message)
 * @param message Optional message, defaults to "ASSERTION failed"
 */
function assert(condition, message) {
    if (!isProduction) {
        if (!condition) {
            throw new Error(message !== undefined ? message : "ASSERTION failed");
        }
    }
}
exports.assert = assert;
function assertExists(element, message) {
    if (!isProduction) {
        if (element === undefined || element === null) {
            throw new Error(message !== undefined ? message : "ASSERTION failed: Element is undefined or null");
        }
    }
    return element;
}
exports.assertExists = assertExists;


/***/ }),

/***/ "./lib/DecoderBootstrap.ts":
/*!*********************************!*\
  !*** ./lib/DecoderBootstrap.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const WorkerBootstrapDefs_1 = __webpack_require__(/*! @here/harp-mapview/lib/workers/WorkerBootstrapDefs */ "../harp-mapview/lib/workers/WorkerBootstrapDefs.ts");
/**
 * Async bootstrap using "worker bootstrap protocol" defined in [[WorkerBootstrapDefs]] and
 * supported by `WorkerLoader`
 *
 * Resolves, when all the dependencies are loaded.
 * Rejects after timeout (1000ms) and in case error while loading dependencies.
 */
function asyncWorkerBootstrap(dependencies) {
    return new Promise((resolve, reject) => {
        self.postMessage({
            type: "worker-bootstrap-request",
            dependencies
        });
        let timeoutHit = false;
        const warnTimeout = setTimeout(() => {
            // tslint:disable-next-line:no-console
            timeoutHit = true;
            reject(new Error("#asyncWorkerBootstrap: Timeout waiting for `worker-bootstrap-response`."));
        }, 1000);
        function bootstrapEventHandler(event) {
            if (timeoutHit) {
                return;
            }
            try {
                const message = event.data;
                if (WorkerBootstrapDefs_1.isWorkerBootstrapResponse(message)) {
                    clearTimeout(warnTimeout);
                    self.removeEventListener("message", bootstrapEventHandler);
                    const resolvedDependencies = message.resolvedDependencies;
                    for (const initScript of resolvedDependencies) {
                        self.importScripts(initScript);
                    }
                    resolve();
                }
            }
            catch (error) {
                reject(error);
            }
        }
        self.addEventListener("message", bootstrapEventHandler);
    });
}
if (self.THREE) {
    Promise.resolve().then(() => __webpack_require__(/*! ./DecoderBundleMain */ "./lib/DecoderBundleMain.ts"));
}
else {
    asyncWorkerBootstrap(["three"])
        .then(() => {
        Promise.resolve().then(() => __webpack_require__(/*! ./DecoderBundleMain */ "./lib/DecoderBundleMain.ts"));
    })
        .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(`harp-decoders.js: failed to bootstrap: ${error}`, error);
    });
}


/***/ }),

/***/ "./lib/DecoderBundleMain.ts":
/*!**********************************!*\
  !*** ./lib/DecoderBundleMain.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
if (!self.THREE) {
    // tslint:disable-next-line:no-console
    console.warn("harp-decoders.js: It looks like 'Three.js' is not loaded. This script requires 'THREE' " +
        "object to be defined. See https://github.com/heremaps/harp.gl/@here/harp.gl.");
}
const index_worker_1 = __webpack_require__(/*! @here/harp-geojson-datasource/index-worker */ "../harp-geojson-datasource/index-worker.ts");
const index_worker_2 = __webpack_require__(/*! @here/harp-omv-datasource/index-worker */ "../harp-omv-datasource/index-worker.ts");
index_worker_2.OmvTilerService.start();
index_worker_2.OmvTileDecoderService.start();
index_worker_1.GeoJsonTileDecoderService.start();


/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "THREE" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ })

/******/ });
//# sourceMappingURL=harp-decoders.js.map