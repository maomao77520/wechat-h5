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
    host: (function() {
        return 'http://' + window.location.host + '/';
    })(),
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

    translateLocation: function (lat, lng) {
        var url = '/ws/coord/v1/translate?type=1&locations='
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
    },

    formatTime: function (timestamp) {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var d = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var second = date.getSeconds();
        month = month >= 10 ? month : '0' + month;
        d = d >= 10 ? d : '0' + d;
        hour = hour >= 10 ? hour : '0' + hour;
        min = min >= 10 ? min : '0' + min;
        second = second >= 10 ? second : '0' + second;
        return year + '-' + month + '-' + d + ' ' + hour + ':' + min + ':' + second;
    },
    errorMap: {
        101: '电流过小',
        102: '电流过大',
        103: '未检测到充电器',
        '-1': '设备故障'
    },
};

module.exports = Common;

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {


var com = __webpack_require__(0);
module.exports = {
    init: function({ios, android, c}) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = isAndroid
            ? `http://x5ad.dearclick.com/cdn/h5ad.core.js?c=${c}`
            : 'https://sdk.anbokeji.net/adv/index.js';
        document.getElementsByTagName('head').item(0).appendChild(s);
        s.onload = function() {
            if (isAndroid) {
                if (window.location.search.indexOf('isAndroid') > -1) {
                    var vConsole = new VConsole();
                    console.log('Hello world'); 
                    console.log(android, c)
                }
                new H5AD_CORE({
                    'advDom': "J_ad_dom", // ad-test-2为页面中需要加载广告的dom元素的id
                    'advType': android, //  9:大图广告  ~~10：图文广告~~  11：视频广告 12：左文右图  13：左图右文
                    'autoShow': true, // 是否自动显示广告
                    'advShow': function() { // 广告渲染后回调事件
                        console.log(`广告${android}已展示`);
                    },
                    // 'advClick': function() { // 广告点击后回调事件
                    //     console.log("广告2已点击");
                    // },
                    'advError': function() { // 广告加载失败回调事件
                        console.log(`广告${android}加载失败`)
                    },
                    // 'handleAdEventName': "handleAdEventName2", //广告回调事件名称，可不传
                    // 'handleAdErrorName': "handleadErrorName2" //广告加载出错事件名称，可不传
                });
            } else {
                var openId = com.parseQuery('openId');
                __anbo_adv_sdk__.init({
                    appid: 'abN4i04b19Na3gg089', // 接入key（必填）
                    adPosId: ios || 3, // 广告位置 3:输入车牌页面广告、 4:收银台广告、5:支付后广告（必填）
                    parkId: "450100202106089424",
                    wxAppid: 'wxe9999a08364e91f5', // 微信公众号appid （必填）
                    wxOpenid: openId // 微信公众号openid （必填）
                });
            }
        }
        
        
    }
};

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var css = __webpack_require__(16);
var com = __webpack_require__(0);
var countDown = __webpack_require__(4);
var initAn = __webpack_require__(1);

$(document).ready(function () {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    $('body').height(winHeight);
    $('body').width(winWidth);

    $('#loadingToast').fadeIn(100);

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
    var outTradeNo = com.parseQuery('outTradeNo');

    var url = '/charger/getChargingProgress';
    var params = {
        accesstoken: 'asdasdwedf565665',
        deviceId: deviceId,
        slotIndex: slotIndex,
        outTradeNo: outTradeNo
    }

    if (!deviceId || !slotIndex) {
        url = '/charger/getmycharging';
        params = {
            accesstoken: 'asdasdwedf565665'
        }
    }

    getData(url, params);
    var interval = setInterval(function () {
        getData(url, params);  
    }, 1000);

    // 广告
    initAn.init({ios: 4, android: 12, c: 'xtycdzzzcd'});

    function getData(url, params) {
        $.ajax({
            url: url,
            type: 'post',
            data: JSON.stringify(params),
            contentType: 'application/json',
            success: function (res) {
// res = {
//     status: 0,
//     "data": {
//         "deviceId": "2112018020700123",
//         "slotIndex": 3,
//         "location": "仙葫管委会",
//         "locationDetail": "仙葫荣沫大道",
//         "electricityMa": 0,
//         "paymentSeconds": 960,
//         "beginTimeSeconds": 1528089760,
//         "endChargeTime": 0,
//         "payment": 2,
//         "refundAmount": 0,
//         "slotStatus": 97,
//         "slotSN": "211201802070012303",
//         "startTime": "2018.06.04 13:22:40",
//         "time": "00:15:57",
//         "chargingTime": "00:00:03",
//         "totalTime": "8",
//         "progress": 0,
//         "chargerIndex": 1
//     }
// }

                
                if (res.status == 0 && res.data) {
                    if (res.data.slotStatus == 1) { // 打开插座成功
                        // $('#loadingToast').fadeIn(100);
                    }
                    else if (res.data.slotStatus == 97) { // 正在充电
                        $('#loadingToast').fadeOut(100);
                        clearInterval(interval);
                        $('.progress-wrap').show();
                        var endTimeStp = (res.data.beginTimeSeconds + res.data.paymentSeconds) * 1000;
                        var endTime = new Date(endTimeStp);
                        var count = new countDown(endTime, $('.top-num-wrap'));
                        var endTimeStr = com.formatTime(endTimeStp).replace(/-/g, '.');
                        var endTmp= endTimeStr.split(' ');
                        res.data.endDateStr = endTmp[0];
                        res.data.endTimeStr = endTmp[1];     

                        var startTime = com.formatTime(res.data.beginTimeSeconds * 1000).replace(/-/g, '.').split(' ');
                        res.data.startDateStr = startTime[0];
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
                    else if (res.data.slotStatus == -1 || res.data.slotStatus == 101 || res.data.slotStatus == 102) {  // 插座错误
                        $('#loadingToast').fadeOut(100);
                        clearInterval(interval);
                        window.location.href = './finish.html?deviceId=' + res.data.deviceId + '&slotIndex=' + res.data.slotIndex + '&outTradeNo=' + res.data.outTradeNo;
                    }
                    else if (res.data.slotStatus == 98 || res.data.slotStatus == 99) { // 正常结束
                        $('#loadingToast').fadeOut(100);
                        clearInterval(interval);
                        window.location.href = './finish.html?deviceId=' + res.data.deviceId + '&slotIndex=' + res.data.slotIndex + '&outTradeNo=' + res.data.outTradeNo;
                    }
                }
                else if (res.status == 1 || (res.status == 2 && !res.data)) {
                    $('#loadingToast').fadeOut(100);
                    clearInterval(interval);
                    $('body').html('<div class="list-empty">没有正在充电的订单哦~</div>'
                        + '<div class="detail-btn-wrap">'
                            + '<a href="javascript:;" class="weui-btn weui-btn_primary detail-bottom-btn">'
                                + '<i></i>'
                                + '<span>扫码充电</span>'
                            + '</a>'
                        + '</div>');
                    initEvent();
                }
                else {
                    $('#loadingToast').fadeOut(100);
                    clearInterval(interval);
                    com.showToast();
                }
            },
            error: function (error) {
                $('#loadingToast').fadeOut(100);
                clearInterval(interval);
                com.showToast();
            }
        });
    }

    function initEvent() {
        com.getWxConfig();
        wx.ready(function () {
            $('.detail-bottom-btn').on('click', function () {
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    }
                });
            });
        });
        wx.error(function (err) {
            console.log('wx.error: ', err);
        });
    }
    
});

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

function CountDown(deadline, $ele) {
    this.count(deadline, $ele);
}

CountDown.prototype = {
    count: function (deadline, $ele) {
        var now = new Date().getTime();
        this.$ele = $ele;
        var me = this;
        if (deadline.getTime() - now <= 0) {
            clearInterval(this.interval);
            $ele.find('.hour').text('00');
            $ele.find('.minite').text('00');
            $ele.find('.second').text('00');
        }
        else {
            this.init(deadline);
            this.interval = setInterval(function () {
                me.init(deadline)
            }, 1000);
        }
    },

    init: function (deadline) {
        var now = new Date().getTime();
        if (deadline - now <= 0) {
            clearInterval(this.interval);
            this.$ele.find('.hour').text('00');
            this.$ele.find('.minite').text('00');
            this.$ele.find('.second').text('00');
        }
        else {
            this.getNum(deadline);
        }
    },

    getNum: function (deadline) {
        var now = new Date().getTime();
        var time = deadline.getTime() - now;
        var hour = this.formatNum(Math.floor(time / 1000 / 60 / 60 % 24));
        var minite = this.formatNum(Math.floor(time / 1000 / 60 % 60));
        var second = this.formatNum(Math.floor(time / 1000 % 60));
        this.$ele.find('.hour').text(hour);
        this.$ele.find('.minite').text(minite);
        this.$ele.find('.second').text(second);
    },

    formatNum: function (num) {
        return num >= 10 ? num : '0' + num;
    }
};

module.exports = CountDown;

/***/ })

/******/ });