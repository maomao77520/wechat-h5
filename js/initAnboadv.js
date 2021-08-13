
var com = require('./common.js');
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