var css = require('../css/list.scss');
var com = require('./common.js');

$(document).ready(function () {
 
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
                    var tpl = doT.template($('#second-list-template').html())(res.data);
                    $('#J_second-list').html(tpl);
                }
                else {
                    com.showToast();
                }

                initEvent();
            },
            error: function (err) {
                com.showToast();
            }
        });
    }  

    function initEvent() {
        com.getWxConfig();
        wx.ready(function () {
            $('.J_Navigation').on('click', function () {
                var location = $(this).data('location');
                var addr = $(this).data('addr');
                var lat = $(this).data('lat');
                var lng = $(this).data('lng');
                com.convert(lat, lng).done(function (res) {
                    com.openMap(location, addr, res.locations[0].lat, res.locations[0].lng);
                });
            });
        });
    }
});

