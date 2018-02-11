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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
};

exports.default = Point;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawLine = drawLine;
exports.arraysAreEqual = arraysAreEqual;
exports.isTouchDevice = isTouchDevice;
/**
 * Draw line
 * @param {Context} context Context where to draw on
 * @param {Point} from Start line point
 * @param {Point} to End line Point
 */
function drawLine(context, from, to) {
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();
}

/**
 * Check if arrays are equal
 * @param {[]} a First array
 * @param {[]} b Second array
 * @returns {Boolean} Returns true if arrays are equal, otherwise - returns false
 */
function arraysAreEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Check if user is using touch device
*/
function isTouchDevice() {
  return 'ontouchstart' in document.documentElement;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ScreenLocker = __webpack_require__(4);

var _ScreenLocker2 = _interopRequireDefault(_ScreenLocker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var screenLocker = new _ScreenLocker2.default();
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _KeepersController = __webpack_require__(5);

var _KeepersController2 = _interopRequireDefault(_KeepersController);

var _Point = __webpack_require__(0);

var _Point2 = _interopRequireDefault(_Point);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pointerPressed = false;

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.canvas = document.querySelector('#canvas');
        this.context = this.canvas.getContext('2d');

        this.resizeCanvas = this.resizeCanvas.bind(this);

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Initialize keepers
        this.keepersController = new _KeepersController2.default(this.context, { rows: 3, columns: 3 });

        this.initListeners();
    }

    _createClass(_class, [{
        key: "initListeners",
        value: function initListeners() {
            var _this = this;

            window.addEventListener('resize', this.resizeCanvas, false);

            if ((0, _utils.isTouchDevice)()) {
                this.canvas.ontouchstart = function (e) {
                    return _this.pointerClick(e.touches[0]);
                };
                this.canvas.ontouchmove = function (e) {
                    return _this.pointerMove(e.touches[0]);
                };
                this.canvas.ontouchend = function () {
                    return _this.pointerLeave();
                };
                this.canvas.ontouchcancel = function () {
                    return _this.pointerLeave();
                };
            } else {
                this.canvas.onmousedown = function (e) {
                    return _this.pointerClick(e);
                };
                this.canvas.onmousemove = function (e) {
                    return _this.pointerMove(e);
                };
                this.canvas.onmouseup = function () {
                    return _this.pointerLeave();
                };
                this.canvas.onmouseleave = function () {
                    return _this.pointerLeave();
                };
            }
        }
    }, {
        key: "pointerClick",
        value: function pointerClick(event) {
            // Redraw canvas
            this.draw();
            pointerPressed = true;
            var mousePos = new _Point2.default(event.clientX, event.clientY);
            // Check intersection in keepers
            this.keepersController.startTyping(mousePos);
        }
    }, {
        key: "pointerMove",
        value: function pointerMove(event) {
            var _this2 = this;

            if (pointerPressed) {
                var mousePos = new _Point2.default(event.clientX, event.clientY);
                // Check intersection in keepers
                this.keepersController.moveLine(mousePos, function () {
                    return _this2.draw();
                });
            }
        }
    }, {
        key: "pointerLeave",
        value: function pointerLeave() {
            pointerPressed = false;
            if (this.keepersController.passEntered()) {
                var bgColor = this.keepersController.submitPass() ? 'rgba(0,150,0,0.5)' : 'rgba(150,0,0,0.7)';
                // Redraw full canvas
                this.draw(bgColor);
            } else {
                this.draw();
            }
        }
    }, {
        key: "resizeCanvas",
        value: function resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            this.draw();
        }
    }, {
        key: "draw",
        value: function draw() {
            var bg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(200, 200, 200)';

            // Clear canvas
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Fill canvas with bg color
            this.context.fillStyle = bg;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw keepers
            this.keepersController.draw();
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PASS = exports.OFFSET_BETWEEN_CIRCLES = exports.RADIUS = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Keeper = __webpack_require__(6);

var _Keeper2 = _interopRequireDefault(_Keeper);

var _Point = __webpack_require__(0);

var _Point2 = _interopRequireDefault(_Point);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RADIUS = exports.RADIUS = 20;
var OFFSET_BETWEEN_CIRCLES = exports.OFFSET_BETWEEN_CIRCLES = 20;

var PASS = exports.PASS = [7, 3, 1, 5, 4, 8];

var STATES = {
    IDLE: 'IDLE',
    PICKING: 'PICKING',
    DO_NOTHING: 'DO_NOTHING'
};

var KeepersController = function () {
    function KeepersController(context, props) {
        _classCallCheck(this, KeepersController);

        this.context = context;

        this.rows = props.rows;
        this.columns = props.columns;

        this.STATE = STATES.IDLE;

        this.keepers = [];
        this.lockpath = [];

        this.initializeKeepers();
    }

    _createClass(KeepersController, [{
        key: "initializeKeepers",
        value: function initializeKeepers() {
            // Initialize keepres
            for (var i = 0; i < this.rows; i++) {
                var topOffset = this.context.canvas.height / 2 - this.columns * RADIUS;
                var keeperY = topOffset + i * (RADIUS * 2 + OFFSET_BETWEEN_CIRCLES);

                for (var j = 0; j < this.columns; j++) {
                    var leftOffset = this.context.canvas.width / 2 - this.rows * RADIUS;
                    var keeperX = leftOffset + j * (RADIUS * 2 + OFFSET_BETWEEN_CIRCLES);

                    // Add new keeper to row
                    this.keepers.push(new _Keeper2.default(this.context, {
                        id: this.keepers.length,
                        pos: new _Point2.default(keeperX, keeperY),
                        radius: RADIUS,
                        color: 'rgb(153,21,242)'
                    }));
                }
            }
        }
    }, {
        key: "draw",
        value: function draw() {
            this.keepers.forEach(function (keeper) {
                return keeper.draw();
            });
        }
    }, {
        key: "drawLockPath",
        value: function drawLockPath() {
            var _this = this;

            this.lockpath.reduce(function (curr, next) {
                (0, _utils.drawLine)(_this.context, curr.center, next.center);
                return next;
            });
        }
    }, {
        key: "checkIntersection",
        value: function checkIntersection(point, intersectionWithKeeper) {
            var _this2 = this;

            this.keepers.forEach(function (keeper, index) {
                if (keeper.isIntersect(point)) {
                    intersectionWithKeeper(_this2.keepers[index]);
                }
            });
        }
    }, {
        key: "startTyping",
        value: function startTyping(point) {
            var _this3 = this;

            this.checkIntersection(point, function (keeper) {
                // Add starting keeper to lockpath
                _this3.lockpath.push(keeper);
                // Set state to PICKING
                _this3.STATE = STATES.PICKING;
            });
        }
    }, {
        key: "passEntered",
        value: function passEntered() {
            return this.lockpath.length !== 0;
        }
    }, {
        key: "submitPass",
        value: function submitPass() {
            if (this.passEntered()) {
                // Set state to IDLE
                this.STATE = STATES.IDLE;

                // Get current lock path password
                var enteredPass = this.lockpath.map(function (k) {
                    return k.id;
                });

                // Clear lockpath
                this.lockpath = [];

                // Check pass
                return (0, _utils.arraysAreEqual)(enteredPass, PASS);
            } else {
                return false;
            }
        }
    }, {
        key: "moveLine",
        value: function moveLine(point, redrawCanvas) {
            var _this4 = this;

            switch (this.STATE) {
                case STATES.PICKING:
                    {
                        // If all keeper has been picked
                        if (this.lockpath.length === this.rows * this.columns) {
                            // Redraw whole canvas
                            redrawCanvas();
                            // Draw path between all lockpath keepers
                            this.drawLockPath();
                            // Set state to DO_NOTHING
                            // to disable useless re-rendering
                            this.STATE = STATES.DO_NOTHING;
                        } else if (this.lockpath.length !== 0) {
                            // If there is at least one keeper in the path
                            // Check if mouse has entered in a new keeper
                            this.checkIntersection(point, function (keeper) {
                                // Add only uniqe keepers to lock path
                                if (!_this4.lockpath.find(function (inPathKeeper) {
                                    return inPathKeeper === keeper;
                                })) {
                                    // Add new picked keeper to lockpath
                                    _this4.lockpath.push(keeper);
                                }
                            });

                            // Redraw whole canvas
                            redrawCanvas();
                            // Draw path between all lockpath keepers
                            this.drawLockPath();
                            // Draw line between current holded keeper and mouse
                            (0, _utils.drawLine)(this.context, this.lockpath[this.lockpath.length - 1].center, point);
                        }
                        break;
                    }
                case STATES.IDLE:
                case STATES.DO_NOTHING:
                    {
                        break;
                    }
                default:
                    {
                        console.warn("Unhandeled KeepersContorller state: " + this.STATE);
                    }
            }
        }
    }]);

    return KeepersController;
}();

exports.default = KeepersController;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keeper = function () {
    function Keeper(context, props) {
        _classCallCheck(this, Keeper);

        this.context = context;

        this.id = props.id;
        this.center = props.pos;
        this.color = props.color;
        this.radius = props.radius;
    }

    _createClass(Keeper, [{
        key: "draw",
        value: function draw() {
            this.context.beginPath();
            this.context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.stroke();
        }

        /**
         * Check the intersection of object and given point
         * @param {Point} point Point to check for intersection
         * @returns Returns true if there is intersection, otherwise - returns false
         */

    }, {
        key: "isIntersect",
        value: function isIntersect(point) {
            // Get distance between point and center of keeper
            var d = Math.sqrt(Math.pow(point.x - this.center.x, 2) + Math.pow(point.y - this.center.y, 2));
            // Return true if distance is lower that radius
            // otherwise - return false
            return d < this.radius;
        }
    }]);

    return Keeper;
}();

exports.default = Keeper;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map