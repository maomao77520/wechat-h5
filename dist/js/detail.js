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
/******/ 	__webpack_require__.p = "../";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var css = __webpack_require__(4);

$(document).on('ready', function () {

    // $.ajax({
    //     url: '',
    //     type: 'get',
    //     success: function (res) {
            res = {
                status: 0,
                content: {
                    slot: [{
                        slotId: '01',
                        slotStatus: 1,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '02',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '03',
                        slotStatus: 1,
                        leftTime: '02:00:00'
                    }, {
                        slotId: '04',
                        slotStatus: 1,
                        leftTime: '00:38:29'
                    }, {
                        slotId: '05',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '06',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '07',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '08',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '09',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '10',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }]
                }
            }
            var tpl = doT.template($('#detail-list-template').html())(res.content);
            $('#J_detail-list').html(tpl);

    //     }
    // });
    

});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);