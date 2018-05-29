var css = require('../css/error.scss');
var com = require('./common.js');

var deviceId = com.parseQuery('deviceId');
var slotIndex = com.parseQuery('slotIndex');
var errorCode = com.parseQuery('errorCode');

var map = {
    1001: '设备故障'
}

$(document).ready(function () {
    $('.error-text').text(map[errorCode]);
    $('.error-deviceId').text(deviceId);
    $('.error-slotIndex').text(slotIndex);
    com.getWxConfig();  
    wx.ready(function () {
        $('.retry-btn').on('click', function () {
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            });
        });
    });
})

