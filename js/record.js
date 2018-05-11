var css = require('../css/record.scss');
var com = require('./common.js');

$(document).ready(function () {
    $.ajax({
        url: '/charger/getrecordcharging',
        type: 'post',
        data: JSON.stringify({
            accessToken: 'asdasdwedf565665',
            userId: localStorage.getItem('openId')
        }),
        contentType: 'application/json',
        success: function (res) {
            if (res.status == 0) {
                var tpl = doT.template($('#J_record_template').html())(res.data);
                $('#J_record_wrap').html(tpl);
            }
            else {
                com.showToast();
            }
        },
        fail: function () {
            com.showToast();
        }
    });
});