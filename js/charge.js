var css = require('../css/charge.scss');
var com = require('./common.js');

$(document).ready(function () {

    var deviceId = com.parseQuery('deviceId');
    var slotIndex = com.parseQuery('slotIndex');
    var openId = com.parseQuery('openid');

    localStorage.setItem('openId', openId);

    console.log('>>',localStorage.getItem('openId'))

    $.ajax({
        url: '/charger/getpaycharging',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            accessToken: 'asdasdwedf565665',
            deviceId: deviceId,
            slotIndex: slotIndex
        }),
        success: function (res) {
            var tpl = doT.template($('#J_top_detail_template').html())(res.data);
            $('#J_top_detail').html(tpl);
        }
    })
    

    var tpl = doT.template($('#J_top_detail_template').html())({
        deviceId: deviceId,
        slotIndex: slotIndex
    });
    $('#J_top_detail').html(tpl);

    var price = $('.active-btn').data('price');
    $('.price-btn').on('click', function (e) {
        $('.price-btn').removeClass('active-btn');
        $(this).addClass('active-btn');
        price = $(this).data('price');
    });

    $('#J_open_dialog').on('click', function (e) {
        $('#iosDialog2').fadeIn(200);
    });

    $('#J_close_dialog').on('click', function (e) {
        $('#iosDialog2').fadeOut(200);
    });

    $('.charge-btn').on('click', function (e) {
        $.ajax({
            url: '/charger/createOrder',
            type: 'post',
            data: JSON.stringify({
                accesstoken: 'asdasdwedf565665',
                payment: price * 100,
                openId: openId,
                deviceId: deviceId,
                slotIndex: slotIndex
            }),
            contentType: 'application/json',
            success: function (res) {
                var d = res.data;
                onBridgeReady(d.appid, d.timeStamp, d.nonce_str, d.prepay_id, d.sign, d.out_trade_no);
            },
            error: function (err) {
            }
        });
    })
    

});
function onBridgeReady(appId, timeStamp, nonceStr, prepay_id, paySign, out_trade_no){
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
           document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
           document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
           document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    }else{
        WeixinJSBridge.invoke(
           'getBrandWCPayRequest', {
               "appId": appId,     //公众号名称，由商户传入     
               "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数     
               "nonceStr": nonceStr, //随机串     
               "package": "prepay_id=" + prepay_id,     
               "signType": "MD5",         //微信签名方式：     
               "paySign": paySign //微信签名 
            }, function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {  
                    window.location.href = "http://www.shouyifenxi.com/dist/page/progress.html?deviceId="
                    + deviceId + '&slotIndex=' + slotIndex;
                }
                else if (res.err_msg == "get_brand_wcpay_request:cancel") {  
                    alert("取消支付!");
                }
                else {  
                    alert("支付失败!");
                }  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
            }
        ); 
    }
}

function checkOrderStatus(out_trade_no, cb) {
    $.ajax({
        url: '/charger/getPayStatus',
        type: 'post',
        data: JSON.stringify({
            out_trade_no: out_trade_no
        }),
        success: function (res) {
            if (res.status) {
                cb && cb(res);
            }
        }
    });
}
