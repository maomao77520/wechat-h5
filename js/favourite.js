var css = require('../css/index.scss');
var com = require('./common.js');

$(document).on('ready', function () {

    $.ajax({
        url: '/charger/getcollectioncharging',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            accesstoken: 'asdasdwedf565665',
            openId: localStorage.getItem('openId')
        }),
        success: function (res) {
            if (res.status == 0 && res.data && res.data.content) {
                var tpl = doT.template($('#list-template').html())(res.data.content);
                $('#J_favourite-list').html(tpl);
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