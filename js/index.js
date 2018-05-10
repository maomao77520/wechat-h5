var css = require('../css/index.scss');
var com = require('./common.js');
var scroll = require('./myScroll.js');

$(document).on('ready', function () {
    var currentLat;
    var currentLng;
    var currentPage = 1;

    com.getWxConfig();
    wx.ready(function () {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                currentLat = res.latitude;
                currentLng = res.longitude;
                getList(currentPage, currentLat, currentLng, initScroll);
            },
            fail: function (err) {
                currentLat = '';
                currentLng = '';
                getList(currentPage, currentLat, currentLng, initScroll);
            }
        });

        // 打开导航
        $('#J_list-wrap').on('click', '.J_Navigation', function (e) {
            var location = $(this).data('location');
            var addr = $(this).data('addr');
            var lat = $(this).data('lat');
            var lng = $(this).data('lng');
            com.convert(lat, lng).done(function (res) {
                com.openMap(location, addr, res.locations[0].lat, res.locations[0].lng);
            });
            
        });
    });
    
    initSearch();

    
    // 地点下拉框
    $('#J_city_picker').on('click', function () {
        $this = $(this);
        weui.picker([{
            label: '南宁',
            value: 1
        }, {
            label: '柳州',
            value: 2
        }, {
            label: '防城港',
            value: 3
        },{
            label: '北海',
            value: 4
        }, {
            label: '桂林',
            value: 5
        }], {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                $this.find('span').text(result[0].label);
                $this.css({
                    width:  (result[0].label.length + 2) + 'em'
                });
            }
        });
    });

    function initScroll() {
        scroll.init(function () {
            currentPage++;
            getList(currentPage, currentLat, currentLng);
        }, function () {
            currentPage = 1;
            getList(currentPage, currentLat, currentLng);
        });
    }


    function getList(pageIndex, lat, lng, cb) {
        $.ajax({
            url: '/charger/getnearcharging',
            type: 'post',
            async: false,
            data: JSON.stringify({
                lat: lat,
                lng: lng,
                accesstoken: 'asdasdwedf565665',
                pagesize: 20,
                pageindex: pageIndex
            }),
            contentType: 'application/json',
            success: function (res) {    
                if (res.status == 0) {
                    var tpl = doT.template($('#list-template').html())(res.data.content);
                    if (pageIndex == 1) {
                        $('#J_list-wrap').html(tpl);
                    }
                    else {
                        $('#J_list-wrap').append(tpl);
                    }
                    cb && cb();
                }
            },
            error: function (err) {

            }
        });
    }

    function searchList() {
        var word = $('#searchInput').val();
        $.ajax({
            url: '/charger/getsearchWordcharging',
            type: 'post',
            data: JSON.stringify({
                accesstoken: 'asdasdwedf565665',
                search: word,
                lat: currentLat,
                lng: currentLng
            }),
            contentType: 'application/json',
            success: function (res) {
                if (res.status == 0) {
                    var tpl = doT.template($('#list-template').html())(res.content);
                    $('#J_list-wrap').html(tpl);
                }
            },
            error: function (err) {}

        });
    }


    var deboun = com.debounce(function () {
        searchList();
    }, 1000, this);
    function initSearch() {
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
                deboun();
            });
        ;
        $searchClear.on('click', function(){
            hideSearchResult();
            $searchInput.focus();
        });
        $searchCancel.on('click', function(){
            cancelSearch();
            $searchInput.blur();
        });
    }

});








