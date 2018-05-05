var css = require('../css/progress.scss');
var com = require('./common.js');

$(document).ready(function () {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    $('body').height(winHeight);
    $('body').width(winWidth);

    var deviceId = com.parseQuery('deviceId')
    var slotIndex = com.parseQuery('slotIndex')


    // $.ajax({
    //     url: '/charger/getnowcharging',
    //     type: 'post',
    //     data: JSON.stringify({
    //         accessToken: 'asdasdwedf565665',
    //         deviceId: deviceId,
    //         slotIndex: slotIndex
    //     }),
    //     success: function (res) {
    //         if (res.status == 0) {
    //             var progress = res.data.progress;
    var progress = 80;
                var top = winHeight - 25;
                $('.top-num-wrap .num').text(progress);
                if (progress == 100) {
                    top = -100;
                    $('.wave').css({
                        'background-size': '50% 150%'
                    });
                }
                else if (progress / 100 * winHeight > 25) {
                    top = (100 - progress) / 100 * winHeight;
                }
                $('.wave').css({
                    'background-position': '0 ' + top + 'px'
                });
            // }
    //     },
    //     error: function (error) {}
    // });
    
});