var css = require('../css/charge.scss');
var com = require('./common.js');

$(document).ready(function () {
    var deviceId = com.parseQuery('deviceId');
    var slotIndex = com.parseQuery('slotIndex');
    var openId = com.parseQuery('openid');

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
            if (res.status == 0) {
                var tpl = doT.template($('#J_top_detail_template').html())(res.data);
                $('#J_top_detail').html(tpl);
            }
            else {
                com.showToast();
            }
        },
        fail: function (err) {
            com.showToast();
        }
    })
    

    var tpl = doT.template($('#J_top_detail_template').html())({
        deviceId: deviceId,
        slotIndex: slotIndex
    });
    $('#J_top_detail').html(tpl);

    var price = $('.active-btn').data('price');
    var time = $('.active-btn').data('time');

    $('.price-btn').on('click', function (e) {
        $('.price-btn').removeClass('active-btn');
        $(this).addClass('active-btn');
        price = $(this).data('price');
    });


    $('#J_top_detail').on('click', '#J_open_dialog', function (e) {
        $('#iosDialog2').fadeIn(200);
    });

    $('#J_close_dialog').on('click', function (e) {
        $('#iosDialog2').fadeOut(200);
    });

    var lock = false;
    $('.charge-btn').on('click', function (e) {
        if (lock) {
            return;
        }
        lock = true;
        $.ajax({
            url: '/charger/createOrder',
            type: 'post',
            data: JSON.stringify({
                accesstoken: 'asdasdwedf565665',
                payment: price * 100,
                payHours: time,
                openId: openId,
                deviceId: deviceId,
                slotIndex: slotIndex
            }),
            contentType: 'application/json',
            success: function (res) {
                lock = false;
                if (res.status == 0 && res.data) {
                    var d = res.data;
                    onBridgeReady(d.appid, d.timeStamp, d.nonce_str, d.prepay_id, d.sign, d.out_trade_no);
                }
                else if (res.status == 1 && res.data) { // errorCode=1002, 插座被占用
                    window.location.href = './error.html?deviceId='
                    + deviceId + '&slotIndex=' + slotIndex + '&errorCode=' + res.data.errorCode;
                }
            },
            error: function (err) {
                lock = false;
            }
        });
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
                        + deviceId + '&slotIndex=' + slotIndex + '&outTradeNo=' + out_trade_no;
                    }
                    else if (res.err_msg == "get_brand_wcpay_request:cancel") {  
                        // alert("取消支付!");
                    }
                    else {  
                        // alert("支付失败!");
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
    

});

