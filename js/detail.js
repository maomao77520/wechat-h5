var css = require('../css/detail.scss');
var com = require('./common.js');

$(document).on('ready', function () {
    var search = window.location.search.substring(1);
    var id = search.split('=')[1];
    $.ajax({
        url: '/charger/getslotcharging',
        type: 'post',
        data: JSON.stringify({
            accesstoken: 'asdasdwedf565665',
            deviceId: id
        }),
        contentType: 'application/json',
        success: function (res) {
            if (res.status == 0) {
                var tpl1 = doT.template($('#J_detail_top_template').html())(res.data);
                $('#J_detail_info').html(tpl1);

                var tpl2 = doT.template($('#J_detail_list_template').html())(res.data);
                $('#J_detail_list').html(tpl2);
            }
        },
        error: function (err) {

        }
    });
    
    com.getWxConfig().done(function () {
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

});