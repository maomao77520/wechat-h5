
var com = require('./common.js');
module.exports = {
    init: function(adPosId) {
        var openId = com.parseQuery('openId');
        __anbo_adv_sdk__.init({
            appid: 'abN4i04b19Na3gg089', // 接入key（必填）
            adPosId: adPosId || 3, // 广告位置 3:输入车牌页面广告、 4:收银台广告、5:支付后广告（必填）
            parkId: "450100202106089424",
            wxAppid: 'wxe9999a08364e91f5', // 微信公众号appid （必填）
            wxOpenid: openId // 微信公众号openid （必填）
        });
    }
};