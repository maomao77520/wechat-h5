var css = require('../css/progress.scss');
var com = require('./common.js');
var countDown = require('./countDown.js');

$(document).ready(function () {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    $('body').height(winHeight);
    $('body').width(winWidth);

    $('#loadingToast').fadeIn(100);

    $('.left-time-text').css({
        'padding-left': $('.top-num-wrap .hour').position().left
    });

    $('#J_question_icon').on('click', function (e) {
        $('#iosDialog2').fadeIn(200);
    });

    $('#J_close_dialog').on('click', function (e) {
        $('#iosDialog2').fadeOut(200);
    });

    var deviceId = com.parseQuery('deviceId');
    var slotIndex = com.parseQuery('slotIndex');

    var url = '/charger/getChargingProgress';
    var params = {
        accesstoken: 'asdasdwedf565665',
        deviceId: deviceId,
        slotIndex: slotIndex
    }

    if (!deviceId || !slotIndex) {
        url = '/charger/getmycharging';
        params = {
            accesstoken: 'asdasdwedf565665',
            userId: localStorage.getItem('openId')
        }
    }

    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(params),
        contentType: 'application/json',
        success: function (res) {
            $('#loadingToast').fadeOut(100);
            if (res.status == 0 && res.data) {
                $('.progress-wrap').show();
                var endTime = new Date(getEndTime(res.data.startTime, res.data.totalTime));
      
                var count = new countDown(endTime, $('.top-num-wrap'));
                var year = endTime.getFullYear();
                var month = endTime.getMonth() + 1;
                var date = endTime.getDate();
                var hour = endTime.getHours();
                var minite = endTime.getMinutes();
                var second = endTime.getSeconds();

                res.data.endDateStr = year + '.' + (month >= 10 ? month : '0' + month)
                    + '.' + (date >= 10 ? date : '0' + date);
                res.data.endTimeStr = (hour >= 10 ? hour : '0' + hour)
                    + ':' + (minite >= 10 ? minite : '0' + minite)
                    + ':' + (second >= 10 ? second : '0' + second);


                var startTime = res.data.startTime.split(' ');
                res.data.startDateStr = startTime[0];
                res.data.startTimeStr = startTime[1];

                var progress = res.data.progress;
                var top = winHeight - 25;
                if (progress == 100) {
                    top = -100;
                    $('.wave').css({
                        'background-size': '50% 120%'
                    });
                }
                else if (progress / 100 * winHeight > 25) {
                    top = (100 - progress) / 100 * winHeight;
                }
                $('.wave').css({
                    'background-position': '0 ' + top + 'px'
                });

                var tpl = doT.template($('#J_progress_template').html())(res.data);
                $('#J_progress_detail').html(tpl);

            }
            else if (res.status == 1) {
                $('body').html('<div class="list-empty">没有正在充电哦~</div>');
            }
            else {
                com.showToast();
            }
        },
        error: function (error) {
            $('#loadingToast').fadeOut(100);
            com.showToast();
        }
    });



    function getEndTime(startTime, totalTime) {
        var arr = startTime.split(' ');
        var date = arr[0].split('.');
        var time = arr[1].split(':');
        var start = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]).getTime();
        return start + totalTime * 60 * 60 * 1000;
    }
    
});