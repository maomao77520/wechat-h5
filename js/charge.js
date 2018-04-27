var css = require('../css/charge.scss');
var com = require('./common.js');

$(document).ready(function () {
    com.getWxConfig().done(function () {
        $('.charge-btn').on('click', function () {
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            });
        });
    });

    $('.price-btn').on('click', function (e) {
        $('.price-btn').removeClass('active-btn');
        $(this).addClass('active-btn');
    });

    $('#J_open_dialog').on('click', function (e) {
        $('#iosDialog2').fadeIn(200);
    });

    $('#J_close_dialog').on('click', function (e) {
        $('#iosDialog2').fadeOut(200);
    });


    

});