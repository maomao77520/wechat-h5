window.onload = function() {
    var container = document.getElementById("map-wrap");
    var map ;
    function init(lat, lng) {
        var center= new qq.maps.LatLng(lat, lng);
        map = new qq.maps.Map(container, {
            center: center,
            zoom: 10
        });
        var marker = new qq.maps.Marker({
            position: center,
            map: map
        });
    }

    function getLocation() {
        var geolocation = new qq.maps.Geolocation("C5YBZ-MJ4C6-HXBSF-MJ6LD-OYABF-N6FNI", "myapp");
        geolocation.getLocation(function (res) {
            init(res.lat, res.lng)
        })
    }

    function getDestination() {
        var callbacks = {
            complete:function(result){
                map.setCenter(result.detail.location);
                var marker = new qq.maps.Marker({
                    map: map,
                    position: result.detail.location
                });
            }
        }
        geocoder = new qq.maps.Geocoder(callbacks);
        geocoder.getLocation("南宁市青环路90号");
    }
    

    getLocation();
    //调用初始化函数地图
    init();
    getDestination()


}