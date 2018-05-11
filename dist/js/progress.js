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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

var Common = {
    getWxConfig: function (cb) {
        $.ajax({
            url: '/charger/config',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({url: window.location.href}),
            success: function (res) {
                // if (res.status == 0) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.appId, // 必填，公众号的唯一标识
                        timestamp: res.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.nonceStr, // 必填，生成签名的随机串
                        signature: res.signature,// 必填，签名
                        jsApiList: [
                            'checkJsApi',
                            'openLocation',
                            'getLocation',
                            'scanQRCode',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                        ] // 必填，需要使用的JS接口列表
                    });

                // }
            },
            error: function (err) {}
        });
    },


    openMap: function(name, addr, latitude, longitude) {
        wx.openLocation({
            latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
            name: name, // 位置名
            address: addr, // 地址详情说明
            scale: 10, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
    },

    convert: function (lat, lng) {
        var url = '/ws/geocoder/v1/?location='
        return $.ajax({
            url: url + lat + ',' + lng
            + '&key=C5YBZ-MJ4C6-HXBSF-MJ6LD-OYABF-N6FNI',
            success: function (res) {
                return res;
            }
        });
    },

    parseQuery: function (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
        
        var r = decodeURIComponent(window.location.search).substr(1).match(reg);  
        if (r != null) {
            return unescape(r[2]);
        } 
        return null; 
    },

    timer: function (fun, timeout, debounce, context) {
        var running;
        return function() {
            var args = arguments;
            context = context || this;
            if (debounce && running) {
                running = clearTimeout(running);
            }
            running = running || setTimeout(function() {
                running = null;
                fun.apply(context, args);
            }, timeout);
        };
    },
    debounce: function(fun, timeout, context) {
        console.log('debounce')
        return this.timer(fun, timeout, true, context);
    },

    sendMsg: function () {
        $.ajax({
            url: 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=ACCESS_TOKEN',
            type: 'post',
            data: {
                "touser": "OPENID", // 发送对象openId
                "template_id": "ngqIpbwh8bUfcSsECmogfXcV14J0tQlEpBO27izEYtY",
                "url": "",   // 跳转url          
                "data":{
                    "first": {
                        "value":"恭喜你购买成功！",
                        "color":"#173177"
                    },
                    "keyword1":{
                        "value":"巧克力",
                        "color":"#173177"
                    },
                    "keyword2": {
                        "value":"39.8元",
                        "color":"#173177"
                    },
                    "keyword3": {
                        "value":"2014年9月22日",
                        "color":"#173177"
                    },
                    "remark":{
                        "value":"欢迎再次购买！",
                        "color":"#173177"
                    }
                }
            },
            success: function (res) {},
            error: function (err) {}
        }); 
    },
    showToast: function () {
        var $toast = $('#toast');
        if ($toast.css('display') != 'none') {
            return;
        }
        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
        }, 2000);
    }
};

module.exports = Common;

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var css = __webpack_require__(16);
var com = __webpack_require__(0);

$(document).ready(function () {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    $('body').height(winHeight);
    $('body').width(winWidth);

    $('.left-time-text').css({
        'padding-left': $('.top-num-wrap .hour').position().left
    });

    $('#J_question_icon').on('click', function (e) {
        $('#iosDialog2').fadeIn(200);
    });

    $('#J_close_dialog').on('click', function (e) {
        $('#iosDialog2').fadeOut(200);
    });

    var deviceId = com.parseQuery('deviceId');
    var slotIndex = com.parseQuery('slotIndex');

    var url = '/charger/getChargingProgress';
    var params = {
        accesstoken: 'asdasdwedf565665',
        deviceId: deviceId,
        slotIndex: slotIndex
    }

    if (!deviceId || !slotIndex) {
        url = '/charger/getmycharging';
        params = {
            accesstoken: 'asdasdwedf565665',
            userId: localStorage.getItem('openId')
        }
    }

    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(params),
        contentType: 'application/json',
        success: function (res) {
            if (res.status == 0 && res.data) {
                countDown(res.data.totalTime);
                var endTime = new Date(getEndTime(res.data.startTime, res.data.totalTime));
                var year = endTime.getFullYear();
                var month = endTime.getMonth() + 1;
                var date = endTime.getDate();
                var hour = endTime.getHours();
                var minite = endTime.getMinutes();
                var second = endTime.getSeconds();

                res.data.endDateStr = year + '.' + (month >= 10 ? month : '0' + month)
                    + '.' + (date >= 10 ? date : '0' + date);
                res.data.endTimeStr = (hour >= 10 ? hour : '0' + hour)
                    + ':' + (minite >= 10 ? minite : '0' + minite)
                    + ':' + (second >= 10 ? second : '0' + second);


                var startTime = res.data.startTime.split(' ');
                res.data.startDateStr = startTime[0].replace(/-/g, '.');
                res.data.startTimeStr = startTime[1];

                var progress = res.data.progress;
                var top = winHeight - 25;
                if (progress == 100) {
                    top = -100;
                    $('.wave').css({
                        'background-size': '50% 120%'
                    });
                }
                else if (progress / 100 * winHeight > 25) {
                    top = (100 - progress) / 100 * winHeight;
                }
                $('.wave').css({
                    'background-position': '0 ' + top + 'px'
                });

                var tpl = doT.template($('#J_progress_template').html())(res.data);
                $('#J_progress_detail').html(tpl);

            }
            else {
                com.showToast();
            }
        },
        error: function (error) {
            com.showToast();
        }
    });



    function countDown(time) {
        time = (time-1) >= 10 ? (time-1) : '0' + (time-1);
        console.log(time)
        var leftTime = {
            hour: time,
            minite: '59',
            second: '59'
        }
        console.log(leftTime)
        $('.top-num-wrap .hour').text(leftTime.hour);
        $('.top-num-wrap .minite').text(leftTime.minite);
        $('.top-num-wrap .second').text(leftTime.second);
        setInterval(function () {
            leftTime.second--;
            leftTime.second = leftTime.second >= 10 ? leftTime.second : ('0' + leftTime.second);
            $('.top-num-wrap .second').text(leftTime.second);
            if (leftTime.second == '00') {
                leftTime.second = 60;
                
            }
            else if (leftTime.second == '59') {
                leftTime.minite--;
                leftTime.minite = leftTime.minite >= 10 ? leftTime.minite : ('0' + leftTime.minite);
                $('.top-num-wrap .minite').text(leftTime.minite);
            }
            if (leftTime.minite == '00') {
                leftTime.minite = 60;
            }
            else if (leftTime.minite == '59' && leftTime.second == '59') {
                leftTime.hour--;
                leftTime.hour = leftTime.hour >= 10 ? leftTime.hour : ('0' + leftTime.hour);
                $('.top-num-wrap .hour').text(leftTime.hour);
            }
        }, 1000);
    }

    function getEndTime(startTime, totalTime) {
        var arr = startTime.split(' ');
        var date = arr[0].split('-');
        var time = arr[1].split(':');
        var start = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]).getTime();
        return start + totalTime * 60 * 60 * 1000;
    }
    
});

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });