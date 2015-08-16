
    
$(document).ready(function () {
    /*
    * Top Search
    */
    (function () {
        $('body').on('click', '#top-search > a', function (e) {
            e.preventDefault();

            $('#header').addClass('search-toggled');
        });

        $('body').on('click', '#top-search-close', function (e) {
            e.preventDefault();

            $('#header').removeClass('search-toggled');
        });
    })();




   // window.location.href = chrome.extension.getURL('html/auth.html');


});