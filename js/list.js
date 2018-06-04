var css = require('../css/list.scss');
var com = require('./common.js');

$(document).ready(function () {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    $('body').height(winHeight);
    $('body').width(winWidth);
    var locationId = com.parseQuery('locationId');
    var lat = com.parseQuery('lat');
    var lng = com.parseQuery('lng');
    var id = com.parseQuery('id');

    $('#loadingToast').fadeIn(100);

    getList();
    function getList() {
        $.ajax({
            url: '/charger/getcharging',
            type: 'post',
            data: JSON.stringify({
                accesstoken: 'asdasdwedf565665',
                locationId: locationId,
                lat: lat,
                lng: lng
            }),
            contentType: 'application/json',
            success: function (res) {
                $('#loadingToast').fadeOut(100);
                if (res.status == 0) {
                    res.data.userLat = lat;
                    res.data.userLng = lng;
                    var tpl = doT.template($('#second-list-template').html())(res.data);
                    $('#J_second-list').html(tpl);
                }
                else {
                    com.showToast();
                }

                initEvent();
            },
            error: function (err) {
                $('#loadingToast').fadeOut(100);
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

