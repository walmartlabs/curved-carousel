(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["CurvedCarousel"] = factory(require("react"));
	else
		root["CurvedCarousel"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	  CurvedCarousel: __webpack_require__(1)
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* eslint no-unused-lets:0 */
	/*global window, requestAnimationFrame*/
	
	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	_react2['default'].initializeTouchEvents(true);
	
	var CurvedCarousel = (function (_React$Component) {
	  _inherits(CurvedCarousel, _React$Component);
	
	  function CurvedCarousel(props) {
	    _classCallCheck(this, CurvedCarousel);
	
	    _get(Object.getPrototypeOf(CurvedCarousel.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      dragging: false,
	      left: this.props.children.length * -1 * (this.props.childWidth + this.props.spacing),
	      top: 0,
	      velocity: 0,
	      accel: 0,
	      containerWidth: 0
	    };
	    this.touchObject = {};
	    this.clickSafe = true;
	    this._getMouseEvents = this._getMouseEvents.bind(this);
	    this._rafCb = this._rafCb.bind(this);
	    this._setPosition = this._setPosition.bind(this);
	  }
	
	  _createClass(CurvedCarousel, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._startRaf();
	      this._setPosition();
	      window.addEventListener('load', this._setPosition);
	      window.addEventListener('resize', this._setPosition);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        _extends({
	          className: 'infinite-scroll'
	        }, this._getMouseEvents(), {
	          ref: 'container'
	        }, this.props),
	        _react2['default'].createElement(
	          'div',
	          { style: { position: 'relative', height: '100%', width: '100%', overflow: 'hidden' } },
	          this._childrenWithPositions()
	        )
	      );
	    }
	  }, {
	    key: '_setPosition',
	    value: function _setPosition() {
	      this.setState({
	        containerWidth: _react2['default'].findDOMNode(this.refs.container).offsetWidth
	      });
	    }
	  }, {
	    key: '_onSelect',
	    value: function _onSelect(index) {
	      if (Math.abs(this.state.velocity) < 0.5) {
	        this.props.onSelect && this.props.onSelect.call(null, this.currentChildren[index].props.originalIndex);
	      }
	    }
	  }, {
	    key: '_childrenWithPositions',
	    value: function _childrenWithPositions() {
	      var _this = this;
	
	      var children = Array.prototype.slice.call(this.props.children, 0);
	      var returnChildren = [];
	      Array.prototype.slice.call(this.props.children, 0, this.props.children.length).reverse().forEach(function (child, index) {
	        children.unshift(_react2['default'].addons.cloneWithProps(child, { key: 'clone' + (children.length - index) }));
	      });
	      Array.prototype.slice.call(this.props.children, 0, this.props.children.length).forEach(function (child, index) {
	        children.push(_react2['default'].addons.cloneWithProps(child, { key: 'clone' + index }));
	      });
	      children.forEach(function (child, index) {
	        var left = _this.state.left + index * (_this.props.childWidth + _this.props.spacing);
	
	        var alpha = 360 / _this.state.containerWidth * (_this.state.containerWidth / 2);
	
	        var R = _this.state.containerWidth;
	
	        var y = left * Math.cos(1);
	
	        var degrees = y / Math.PI * (_this.props.curve / 100);
	
	        var top = Math.abs(y) * (_this.props.curve / 100) / Math.SQRT1_2;
	
	        var exp = left / (_this.props.childWidth + _this.props.spacing);
	
	        top = top * Math.abs(exp) * (Math.LN10 / 10);
	
	        if (_this.props.rotation === false) {
	          degrees = 0;
	        }
	
	        var style = {
	          position: 'absolute',
	          left: left + _this.state.containerWidth / 2 - _this.props.childWidth / 2,
	          transform: 'rotate(' + degrees + 'deg)',
	          transformOrigin: 'bottom center',
	          top: top,
	          width: _this.props.childWidth
	        };
	        returnChildren.push(_react2['default'].addons.cloneWithProps(child, { style: style, key: index, onClick: _this._onSelect.bind(_this, index) }));
	      });
	
	      this.currentChildren = returnChildren;
	
	      return returnChildren;
	    }
	  }, {
	    key: '_getMouseEvents',
	    value: function _getMouseEvents() {
	      var self = this;
	
	      if (this.props.dragging === false) {
	        return null;
	      }
	
	      return {
	        onMouseDown: function onMouseDown(e) {
	          self.touchObject = {
	            startX: e.pageX,
	            startY: e.pageY,
	            prevX: e.pageX,
	            prevY: e.pageY,
	            endX: e.pageX,
	            endY: e.pageY,
	            previousTime: new Date(),
	            currentTime: new Date()
	          };
	
	          self.setState({
	            dragging: true,
	            velocity: 0
	          });
	        },
	        onMouseMove: function onMouseMove(e) {
	          if (!self.state.dragging) {
	            return;
	          }
	
	          if (!self.touchObject) {
	            return;
	          }
	
	          var direction = self._swipeDirection(self.touchObject.startX, e.clientX, self.touchObject.startY, e.clientY);
	
	          if (direction !== 0) {
	            e.preventDefault();
	          }
	
	          var length = self.props.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - self.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.clientX - self.touchObject.startX, 2)));
	
	          self.touchObject = {
	            startX: self.touchObject.startX,
	            startY: self.touchObject.startY,
	            previousTime: self.touchObject.currentTime,
	            currentTime: new Date(),
	            prevX: self.touchObject.endX,
	            prevY: self.touchObject.endY,
	            endX: e.pageX,
	            endY: e.pageY,
	            length: length,
	            direction: direction
	          };
	
	          var left = self.state.left + (e.clientX - self.touchObject.prevX);
	
	          if (left < self.props.children.length * -2 * (self.props.childWidth + self.props.spacing)) {
	            left = self.props.children.length * -1 * (self.props.childWidth + self.props.spacing);
	          }
	
	          if (left > self.props.children.length * -1 * (self.props.childWidth + self.props.spacing)) {
	            left = self.props.children.length * -2 * (self.props.childWidth + self.props.spacing);
	          }
	
	          self.setState({
	            left: left
	          });
	        },
	        onMouseUp: function onMouseUp(e) {
	          if (!self.state.dragging) {
	            return;
	          }
	
	          if (!self.touchObject) {
	            return;
	          }
	
	          var velocity = self.touchObject.prevX - self.touchObject.endX !== 0 ? (self.touchObject.prevX - self.touchObject.endX) / (self.touchObject.currentTime - self.touchObject.previousTime) * 12 : 0;
	
	          self.setState({
	            dragging: false,
	            velocity: velocity
	          }, function () {
	            self._handleSwipe(e);
	          });
	        },
	        onMouseLeave: function onMouseLeave(e) {
	          if (!self.state.dragging) {
	            return;
	          }
	
	          if (!self.touchObject) {
	            return;
	          }
	
	          var velocity = self.touchObject.prevX - self.touchObject.endX !== 0 ? (self.touchObject.prevX - self.touchObject.endX) / (self.touchObject.currentTime - self.touchObject.previousTime) * 17 : 0;
	
	          self.setState({
	            dragging: false,
	            velocity: velocity
	          }, function () {
	            self._handleSwipe(e);
	          });
	        }
	      };
	    }
	  }, {
	    key: '_handleClick',
	    value: function _handleClick(e) {
	      if (this.clickSafe === true) {
	        e.preventDefault();
	        e.stopPropagation();
	        e.nativeEvent.stopPropagation();
	      }
	    }
	  }, {
	    key: '_handleSwipe',
	    value: function _handleSwipe() {
	      this.touchObject = null;
	      this._startRaf();
	    }
	  }, {
	    key: '_swipeDirection',
	    value: function _swipeDirection(x1, x2, y1, y2) {
	
	      var xDist, yDist, r, swipeAngle;
	
	      xDist = x1 - x2;
	      yDist = y1 - y2;
	      r = Math.atan2(yDist, xDist);
	
	      swipeAngle = Math.round(r * 180 / Math.PI);
	      if (swipeAngle < 0) {
	        swipeAngle = 360 - Math.abs(swipeAngle);
	      }
	      if (swipeAngle <= 45 && swipeAngle >= 0) {
	        return 1;
	      }
	      if (swipeAngle <= 360 && swipeAngle >= 315) {
	        return 1;
	      }
	      if (swipeAngle >= 135 && swipeAngle <= 225) {
	        return -1;
	      }
	      if (this.props.vertical === true) {
	        if (swipeAngle >= 35 && swipeAngle <= 135) {
	          return 1;
	        } else {
	          return -1;
	        }
	      }
	      return 0;
	    }
	  }, {
	    key: '_rafCb',
	    value: function _rafCb() {
	
	      if (this.state.dragging) {
	        return;
	      }
	
	      var vel = this.state.velocity.toFixed(2) * this.props.friction;
	
	      if (Math.abs(vel) < 0.1) {
	        return;
	      }
	
	      var left = this.state.left - vel;
	
	      if (left < this.props.children.length * -2 * (this.props.childWidth + this.props.spacing)) {
	        left = this.props.children.length * -1 * (this.props.childWidth + this.props.spacing);
	      }
	
	      if (left > this.props.children.length * -1 * (this.props.childWidth + this.props.spacing)) {
	        left = this.props.children.length * -2 * (this.props.childWidth + this.props.spacing);
	      }
	
	      this.setState({
	        velocity: vel,
	        left: left
	      });
	
	      requestAnimationFrame(this._rafCb);
	    }
	  }, {
	    key: '_startRaf',
	    value: function _startRaf() {
	      requestAnimationFrame(this._rafCb);
	    }
	  }]);
	
	  return CurvedCarousel;
	})(_react2['default'].Component);
	
	CurvedCarousel.displayName = 'CurvedCarousel';
	
	CurvedCarousel.propTypes = {
	  childWidth: _react2['default'].PropTypes.number,
	  curve: _react2['default'].PropTypes.number,
	  spacing: _react2['default'].PropTypes.number,
	  rotation: _react2['default'].PropTypes.bool,
	  friction: _react2['default'].PropTypes.number
	};
	
	CurvedCarousel.defaultProps = {
	  childWidth: 180,
	  curve: 50,
	  spacing: 40,
	  rotation: true,
	  friction: 0.95
	};
	
	module.exports = CurvedCarousel;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=curved-carousel.js.map