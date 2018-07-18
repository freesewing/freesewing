var freesewing_theme_designer =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, unpkg, scripts, repository, author, license, bugs, devDependencies, homepage, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"@freesewing/theme-designer\",\"version\":\"0.0.2\",\"description\":\"The designer theme for freesewing\",\"main\":\"dist/node/index.js\",\"unpkg\":\"dist/browser/bundle.js\",\"scripts\":{\"test\":\"echo \\\"Error: no test specified\\\" && exit 1\",\"clean\":\"rimraf dist\",\"nodebuild\":\"babel src -d dist/node\",\"browserbuild\":\"npx webpack-cli --config webpack.config.js\",\"build\":\"npm run clean && npm run nodebuild && npm run browserbuild\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/joostdecock/theme-designer.git\"},\"author\":\"Joost De Cock <joost@decock.org> (https://twitter.com/j__st)\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/joostdecock/theme-designer/issues\"},\"devDependencies\":{\"@babel/core\":\"7.0.0-beta.53\",\"@babel/preset-env\":\"7.0.0-beta.53\",\"rimraf\":\"^2.6.2\",\"babel-cli\":\"6.26.0\",\"babel-loader\":\"8.0.0-beta.4\",\"babel-preset-env\":\"1.7.0\",\"babel-watch\":\"2.0.7\",\"raw-loader\":\"^0.5.1\",\"webpack\":\"4.16.0\",\"webpack-cli\":\"3.0.8\"},\"homepage\":\"https://github.com/joostdecock/theme-designer#readme\"};\n\n//# sourceURL=webpack://freesewing_theme_designer/./package.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _script = _interopRequireDefault(__webpack_require__(/*! ./lib/script */ \"./src/lib/script.js\"));\n\nvar _style = _interopRequireDefault(__webpack_require__(/*! ./lib/style */ \"./src/lib/style.js\"));\n\nvar _snippets = _interopRequireDefault(__webpack_require__(/*! ./lib/snippets */ \"./src/lib/snippets.js\"));\n\nvar _package = _interopRequireDefault(__webpack_require__(/*! ../package.json */ \"./package.json\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nmodule.exports = {\n  preRenderSvg: function preRenderSvg(next) {\n    // Add style, script and snippets\n    this.style += _style.default;\n    this.script += _script.default;\n    this.defs += _snippets.default; // Add SVG attributes\n\n    this.attributes.add(\"xmlns:freesewing\", \"http://freesewing.org/namespaces/freesewing\");\n    this.attributes.add(\"freesewing:theme-designer\", _package.default.version);\n    this.attributes.add(\"viewBox\", \"-10 -10 300 500\");\n    /** Decorares points with extra info */\n\n    var decoratePoints = function decoratePoints(svg) {\n      for (var partId in svg.pattern.parts) {\n        var part = svg.pattern.parts[partId];\n\n        if (part.render) {\n          for (var pointId in part.points) {\n            var point = part.points[pointId];\n            point.attributes.add('id', svg.getUid());\n            point.attributes.add('data-point', pointId);\n            point.attributes.add('data-part', partId);\n          }\n        }\n      }\n    };\n    /** Decorares path points with extra info */\n\n\n    var decoratePathPoint = function decoratePathPoint(id, Snippet, snippets, point, type, pathId) {\n      snippets[id] = new Snippet(point, \"path-\".concat(type, \"-point\"), \"Path \".concat(pathId, \": \").concat(type));\n      snippets[id].attributes.add('onmouseover', 'pointHover(evt)');\n      snippets[id].attributes.add('id', id);\n    };\n    /** Draws curve control handles */\n\n\n    var decorateCurveHandles = function decorateCurveHandles(id, Path, paths, from, to) {\n      var path = new Path().move(from).line(to);\n      path.attributes.add('class', 'curve-control');\n      path.attributes.add('id', id);\n      paths[id] = path;\n    };\n    /** Decorares paths with extra info */\n\n\n    var decoratePaths = function decoratePaths(svg) {\n      for (var partId in svg.pattern.parts) {\n        var part = svg.pattern.parts[partId];\n\n        if (part.render) {\n          for (var pathId in part.paths) {\n            var path = part.paths[pathId];\n            if (!path.render) return false;\n            var id = void 0;\n            var _iteratorNormalCompletion = true;\n            var _didIteratorError = false;\n            var _iteratorError = undefined;\n\n            try {\n              for (var _iterator = path.ops[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n                var op = _step.value;\n\n                if (op.type !== 'close') {\n                  decoratePathPoint(svg.getUid(), svg.pattern.snippet, part.snippets, op.to, op.type, pathId);\n                }\n\n                if (op.type === 'curve') {\n                  decoratePathPoint(svg.getUid(), svg.pattern.snippet, part.snippets, op.cp1, 'handle', pathId);\n                  decoratePathPoint(svg.getUid(), svg.pattern.snippet, part.snippets, op.cp2, 'handle', pathId);\n                  decorateCurveHandles(svg.getUid(), svg.pattern.path, part.paths, current, op.cp1);\n                  decorateCurveHandles(svg.getUid(), svg.pattern.path, part.paths, op.to, op.cp2);\n                }\n\n                var current = op.to;\n              }\n            } catch (err) {\n              _didIteratorError = true;\n              _iteratorError = err;\n            } finally {\n              try {\n                if (!_iteratorNormalCompletion && _iterator.return != null) {\n                  _iterator.return();\n                }\n              } finally {\n                if (_didIteratorError) {\n                  throw _iteratorError;\n                }\n              }\n            }\n          }\n        }\n      }\n    }; // Decorate pattern\n\n\n    decoratePoints(this);\n    decoratePaths(this);\n    next();\n  }\n};\n\n//# sourceURL=webpack://freesewing_theme_designer/./src/index.js?");

/***/ }),

/***/ "./src/lib/script.js":
/*!***************************!*\
  !*** ./src/lib/script.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = \"\\nfunction pointHover(evt) {\\n  var point = evt.target;\\n  var id = point.id;\\n  var cx = point.getAttribute('x');\\n  var cy = point.getAttribute('y');\\n  console.log('Point '+id+' ( '+cx+' , '+cy+' )');\\n  var scale = 2;\\n  cx = cx-scale*cx;\\n  cy = cy-scale*cy;\\n  point.setAttribute(\\\"transform\\\", 'matrix('+scale+', 0, 0, '+scale+', '+cx+', '+cy+')');\\n  setTimeout(function(){\\n    var point = document.getElementById(evt.target.id);\\n    point.removeAttribute(\\\"transform\\\", '');\\n  }, 1000);\\n}\\n\";\n\n//# sourceURL=webpack://freesewing_theme_designer/./src/lib/script.js?");

/***/ }),

/***/ "./src/lib/snippets.js":
/*!*****************************!*\
  !*** ./src/lib/snippets.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = \"\\n<g id=\\\"point\\\">\\n  <circle cy=\\\"0\\\" cx=\\\"0\\\" r=\\\"2\\\" class=\\\"stroke-hint stroke-sm\\\" />\\n  <circle cy=\\\"0\\\" cx=\\\"0\\\" r=\\\"0.8\\\" class=\\\"fill-hint\\\" />\\n</g>\\n<g id=\\\"point-hidden\\\">\\n  <circle cy=\\\"0\\\" cx=\\\"0\\\" r=\\\"1\\\" class=\\\"stroke-canvas stroke-xs\\\" />\\n  <path d=\\\"M -0.5,-0.5 L 0.5,0.5 M 0.5,-0.5 L -0.5,0.5\\\" class=\\\"stroke-canvas stroke-sm\\\" />\\n</g>\\n<g id=\\\"path-move-point\\\">\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"2\\\"  class=\\\"stroke-canvas stroke-lg\\\" />\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"0.8\\\" class=\\\"fill-canvas\\\" />\\n</g>\\n<g id=\\\"path-line-point\\\">\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"2\\\"  class=\\\"stroke-note stroke-lg\\\" />\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"0.8\\\" class=\\\"fill-note\\\" />\\n</g>\\n<g id=\\\"path-curve-point\\\"> <use xlink:href = \\\"#path-line-point\\\"/> </g>\\n<g id=\\\"path-handle-point\\\">\\n  <circle cy=\\\"0\\\" cx=\\\"0\\\" r=\\\"2\\\" class=\\\"stroke-mark stroke-lg no-fill\\\" />\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"0.8\\\" class=\\\"fill-mark\\\" />\\n</g>\\n<g id=\\\"point-focus\\\">\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"2\\\"  class=\\\"stroke-mark stroke-lg\\\" />\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"0.8\\\" class=\\\"fill-fabric\\\" />\\n</g>\\n<g id=\\\"marked-point\\\">\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"3.6\\\"  class=\\\"stroke-hint stroke-sm\\\" />\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"2.8\\\"  class=\\\"stroke-hint stroke-sm\\\" />\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"2.0\\\"  class=\\\"stroke-hint stroke-sm\\\" />\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"1.2\\\"  class=\\\"stroke-hint stroke-sm\\\" />\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"0.8\\\"  class=\\\"stroke-hint stroke-sm\\\" />\\n  <circle cx=\\\"0\\\" cy=\\\"0\\\" r=\\\"0.4\\\" class=\\\"fill-hint\\\" />\\n</g>\\n\";\n\n//# sourceURL=webpack://freesewing_theme_designer/./src/lib/snippets.js?");

/***/ }),

/***/ "./src/lib/style.js":
/*!**************************!*\
  !*** ./src/lib/style.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = \"\\npath.curve-control{stroke:#f0ad4e;stroke-width: 0.2;}\\npath.debug{stroke:#d9534f;stroke-opacity:0.4;stroke-width:2;}\\n.point{fill:none;stroke-width:0.6;stroke:#f0ad4e;}\\ntext.tooltip{font-size:3px;}\\n\";\n\n//# sourceURL=webpack://freesewing_theme_designer/./src/lib/style.js?");

/***/ })

/******/ });