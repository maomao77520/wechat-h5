var css = require('../css/index.scss');

$(document).on('ready', function () {
    $('.city-select').width($('.select-text').width());

    $('.city-select').on('change', function (e) {
        var text = $(this).find('option:selected').text();
        $('.select-text').text(text);
    });

    $('.list-item-wrap').on('click', function () {
        window.location.href = $(this).data('link');
    });
});


