var css = require('../css/list.scss');
var com = require('./common.js');

$(document).ready(function () {

    // $.ajax({
    //     url: '',
    //     type: 'get',
    //     success: function (res) {
            res = {
                status: 0,
                location: '厢竹海鲜市场',
                locationDetail: '厢竹大道14号',
                lat: '22.819330',
                lng: '108.380310',
                distance: 435,
                content: [{
                    deviceId: 1,
                    usedCount: 20,
                    availableCount: 10
                    
                }, {
                    deviceId: 2,
                    usedCount: 18,
                    availableCount: 12
                }, {
                    deviceId: 3,
                    usedCount: 5,
                    availableCount: 15
                }, {
                    deviceId: 4,
                    usedCount: 10,
                    availableCount: 10
                }, {
                    deviceId: 5,
                    usedCount: 2,
                    availableCount: 10
                }]
            }
            var tpl = doT.template($('#second-list-template').html())(res);
            $('#J_second-list').html(tpl);

    //     }
    // });


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