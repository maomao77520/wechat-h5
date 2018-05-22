var css = require('../css/detail.scss');
var com = require('./common.js');

$(document).on('ready', function () {
    $('#loadingToast').fadeIn(100);
    
    var lat = com.parseQuery('lat');
    var lng = com.parseQuery('lng');
    var id = com.parseQuery('id');

    var targetLat, targetLng, currentLat, currentLng, location, addr;
    $.ajax({
        url: '/charger/getslotcharging',
        type: 'post',
        data: JSON.stringify({
            accesstoken: 'asdasdwedf565665',
            deviceId: id,
            lat: lat,
            lng: lng
        }),
        contentType: 'application/json',
        success: function (res) {
            $('#loadingToast').fadeOut(100);
            targetLat = res.data.lat;
            targetLng = res.data.lng;
            location = res.data.location;
            addr = res.data.locationDetail;
            if (res.status == 0) {
                var tpl1 = doT.template($('#J_detail_top_template').html())(res.data);
                $('#J_detail_info').html(tpl1);

                var tpl2 = doT.template($('#J_detail_list_template').html())(res.data);
                $('#J_detail_list').html(tpl2);

                initEvent();
            }
            else {
                com.showToast();
            }
        },
        error: function (err) {
            $('#loadingToast').fadeOut(100);
            com.showToast();
        }
    });
    


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

            // 打开导航
            $('#J_detail_info').on('click', '.J_Navigation', function (e) {
                var location = $(this).data('location');
                var addr = $(this).data('addr');
                var lat = $(this).data('lat');
                var lng = $(this).data('lng');
                com.translateLocation(lat, lng).done(function (res) {
                    com.openMap(location, addr, res.locations[0].lat, res.locations[0].lng);
                });
                
            });
        });
    }

});