var css = require('../css/index.scss');

$(document).on('ready', function () {

    // $.ajax({
    //     url: '',
    //     type: 'get',
    //     success: function (res) {
            res = {
                status: 0,
                content: [{
                    deviceId: 1,
                    location: '厢竹海鲜市场',
                    locationDetail: '厢竹大道14号',
                    usedCount: 20,
                    availableCount: 10,
                    distance: 435
                }, {
                    deviceId: 2,
                    location: '厢竹海鲜市场',
                    locationDetail: '厢竹大道14号',
                    usedCount: 20,
                    availableCount: 10,
                    distance: 2897
                }]
            }
            var tpl = doT.template($('#list-template').html())(res.content);
            $('#J_favourite-list').html(tpl);

    //     }
    // });
    

});