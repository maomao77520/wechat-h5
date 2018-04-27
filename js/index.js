var css = require('../css/index.scss');
var com = require('./common.js');

$(document).on('ready', function () {
    // 地点下拉框
    $('.city-select').width($('.select-text').width());
    $('.city-select').on('change', function (e) {
        var text = $(this).find('option:selected').text();
        $('.select-text span').text(text);
    });

    // $.ajax({
    //     url: '',
    //     type: 'get',
    //     success: function (res) {
            res = {
                status: 0,
                content: [{
                    deviceId: 1,
                    location: '南宁市厢竹海鲜市场',
                    locationDetail: '南宁市厢竹大道14号',
                    lat: '22.819330',
                    lng: '108.380310',
                    usedCount: 20,
                    availableCount: 10,
                    distance: 435
                }, {
                    deviceId: 2,
                    location: '秀竹苑小区',
                    locationDetail: '南宁市新竹街道办',
                    usedCount: 20,
                    availableCount: 10,
                    distance: 2897
                }, {
                    deviceId: 3,
                    location: '厢竹海鲜市场',
                    locationDetail: '南宁市厢竹大道14号',
                    usedCount: 23,
                    availableCount: 15,
                    distance: 435
                }, {
                    deviceId: 4,
                    location: '秀竹苑小区',
                    locationDetail: '南宁市新竹街道办',
                    usedCount: 20,
                    availableCount: 10,
                    distance: 2897
                }]
            }
            var tpl = doT.template($('#list-template').html())(res.content);
            $('#J_list-wrap').html(tpl);

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


$(function(){
    var $searchBar = $('#searchBar'),
        $searchResult = $('#searchResult'),
        $searchText = $('#searchText'),
        $searchInput = $('#searchInput'),
        $searchClear = $('#searchClear'),
        $searchCancel = $('#searchCancel');

    function hideSearchResult(){
        $searchResult.hide();
        $searchInput.val('');
    }
    function cancelSearch(){
        hideSearchResult();
        $searchBar.removeClass('weui-search-bar_focusing');
        $searchText.show();
    }

    $searchText.on('click', function(){
        $searchBar.addClass('weui-search-bar_focusing');
        $searchInput.focus();
    });
    $searchInput
        .on('blur', function () {
            if(!this.value.length) cancelSearch();
        })
        .on('input', function(){
            if(this.value.length) {
                $searchResult.show();
            } else {
                $searchResult.hide();
            }
        })
    ;
    $searchClear.on('click', function(){
        hideSearchResult();
        $searchInput.focus();
    });
    $searchCancel.on('click', function(){
        cancelSearch();
        $searchInput.blur();
    });
});

// signature: "db0b8fe6d009bf3a49aabca683b6f7505572914c",
// appId: "wxdbf5c24cf1e06f3e",
// nonceStr: "febf9335-06ac-4307-9656-43b8a9b270e6",
// timestamp: "1524563311"
