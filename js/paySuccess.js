var css = require('../css/paySuccess.scss');
var com = require('./common.js');
var initAn = require('./initAnboadv.js');

$(document).ready(function() {
    var deviceId = com.parseQuery('deviceId');
    var slotIndex = com.parseQuery('slotIndex');
    var outTradeNo = com.parseQuery('outTradeNo');
    var openId = com.parseQuery('openId');

    var url = '/charger/getChargingProgress';
    var params = {
        accesstoken: 'asdasdwedf565665',
        deviceId: deviceId,
        slotIndex: slotIndex,
        outTradeNo: outTradeNo
    };
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(params),
        contentType: 'application/json',
        success: function (res) {
            if (res.status == 0) {
                var tpl = doT.template($('#J_top_detail_template').html())(res.data);
                $('#J_top_detail').html(tpl);

                var detailTpl = doT.template($('#J_template').html())(res.data);
                $('#J_detail').html(detailTpl);
            }
            else {
                com.showToast();
            }
        },
        fail: function (err) {
            com.showToast();
        }
    });

    // 广告
    initAn.init(5);

    $('.pay-finish-btn').on('click', function(e) {
        window.location.href = com.host + "dist/page/progress.html?deviceId="
            + deviceId + '&slotIndex=' + slotIndex + '&outTradeNo=' + outTradeNo
            + '&openId=' + openId;
    });

    $('.order-btn').on('click', function(e) {
        window.location.href = com.host + "dist/page/finish.html?deviceId="
            + deviceId + '&slotIndex=' + slotIndex + '&outTradeNo=' + outTradeNo;
    });
});