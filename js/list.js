var css = require('../css/list.scss');
var com = require('./common.js');

$(document).ready(function () {
 
    getList();   


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

function getList() {
    var search = window.location.search.substring(1);
    var id = search.split('=')[1];
    $.ajax({
        url: '/charger/getcharging',
        type: 'post',
        data: JSON.stringify({
            accesstoken: 'asdasdwedf565665',
            locationId: id
        }),
        contentType: 'application/json',
        success: function (res) {
            if (res.status == 0) {
                var tpl = doT.template($('#second-list-template').html())(res.data);
                $('#J_second-list').html(tpl);
            }
        },
        error: function (err) {

        }
    });
}