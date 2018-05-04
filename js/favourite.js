var css = require('../css/index.scss');

$(document).on('ready', function () {

    $.ajax({
        url: '/charger/getcollectioncharging',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            accesstoken: 'asdasdwedf565665',
            userId: 'asdasd',
        }),
        success: function (res) {
            if (res.status == 0 && res.data && res.data.content) {
                var tpl = doT.template($('#list-template').html())(res.data.content);
                $('#J_favourite-list').html(tpl);
            }

        }
    });
            

    
    

});