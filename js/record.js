var css = require('../css/record.scss');

$(document).ready(function () {
    $.ajax({
        url: '/charger/getrecordcharging',
        type: 'post',
        data: JSON.stringify({
            accessToken: 'asdasdwedf565665',
            userId: '565656'
        }),
        contentType: 'application/json',
        success: function (res) {
            if (res.status == 0) {
                var tpl = doT.template($('#J_record_template').html())(res);
                $('#J_record_wrap').html(tpl);
            }
        }
    });
});