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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

var Common = {
    getWxConfig: function () {
        return $.ajax({
            url: '/config',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({url: window.location.href}),
            success: function (res) {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名
                    jsApiList: [
                        'checkJsApi',
                        'openLocation',
                        'getLocation',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ] // 必填，需要使用的JS接口列表
                });
            }
        });
    },

    openMap: function(name, addr, latitude, longitude) {
        this.getWxConfig().done(function () {
            wx.openLocation({
                latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                name: name, // 位置名
                address: addr, // 地址详情说明
                scale: 10, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        });
    },

    convert: function (lat, lng) {
        return $.ajax({
            url: '/ws/coord/v1/translate?locations=' + lat + ',' + lng
            + '&type=1&key=C5YBZ-MJ4C6-HXBSF-MJ6LD-OYABF-N6FNI',
            success: function (res) {
                return res.locations;
                // openMap(location, addr, res.locations[0].lat, res.locations[0].lng);
            }
        });
    }
};

module.exports = Common;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var css = __webpack_require__(6);
var com = __webpack_require__(2);

$(document).ready(function () {

    // $.ajax({
    //     url: '',
    //     type: 'get',
    //     success: function (res) {
            res = {
                status: 0,
                location: '厢竹海鲜市场',
                locationDetail: '厢竹大道14号',
                lat: '22.819330',
                lng: '108.380310',
                distance: 435,
                content: [{
                    deviceId: 1,
                    usedCount: 20,
                    availableCount: 10
                    
                }, {
                    deviceId: 2,
                    usedCount: 18,
                    availableCount: 12
                }, {
                    deviceId: 3,
                    usedCount: 5,
                    availableCount: 15
                }, {
                    deviceId: 4,
                    usedCount: 10,
                    availableCount: 10
                }, {
                    deviceId: 5,
                    usedCount: 2,
                    availableCount: 10
                }]
            }
            var tpl = doT.template($('#second-list-template').html())(res);
            $('#J_second-list').html(tpl);

    //     }
    // });


    $('.J_Navigation').on('click', function () {
        var location = $(this).data('location');
        var addr = $(this).data('addr');
        var lat = $(this).data('lat');
        var lng = $(this).data('lng');
        com.convert(lat, lng).done(function (res) {
            com.openMap(location, addr, res.locations[0].lat, res.locations[0].lng);
        });
    });

});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);