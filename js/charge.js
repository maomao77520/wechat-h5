var css = require('../css/charge.scss');

$(document).ready(function () {

    $('.price-btn').on('click', function (e) {
        $('.price-btn').removeClass('active-btn');
        $(this).addClass('active-btn');
    });

});