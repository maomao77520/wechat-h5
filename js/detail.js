var css = require('../css/detail.scss');

$(document).on('ready', function () {

    // $.ajax({
    //     url: '',
    //     type: 'get',
    //     success: function (res) {
            res = {
                status: 0,
                content: {
                    slot: [{
                        slotId: '01',
                        slotStatus: 1,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '02',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '03',
                        slotStatus: 1,
                        leftTime: '02:00:00'
                    }, {
                        slotId: '04',
                        slotStatus: 1,
                        leftTime: '00:38:29'
                    }, {
                        slotId: '05',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '06',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '07',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '08',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '09',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }, {
                        slotId: '10',
                        slotStatus: 0,
                        leftTime: '03:00:00'
                    }]
                }
            }
            var tpl = doT.template($('#detail-list-template').html())(res.content);
            $('#J_detail-list').html(tpl);

    //     }
    // });
    

});