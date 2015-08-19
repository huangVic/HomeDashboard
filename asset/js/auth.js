/**************************
 * [Auth Controller]
 **************************/
 
var authController = {

    // [authController][login]
    login: function (user) {
        debugConsole(" # authController >> login ")
    },

    // [authController][register]
    register: function () {
        debugConsole(" # authController >> register ")
    },

    // [authController][forgetPassword]
    forgetPassword: function () {
       debugConsole(" # authController >> forgetPassword ")
    }
};


function clearForm() {
    $("input[type=text]").val("");
}




$(document).ready(function () {

    /*
     * Waves Animation
     */
    (function () {
        Waves.attach('.btn', ['waves-button', 'waves-float']);
        Waves.init();
    })();

    clearForm();

    $('html').addClass('login-content');
    $('body').on('click', '.login-navigation > li', function () {
        var z = $(this).data('block');
        var t = $(this).closest('.lc-block');

        t.removeClass('toggled');

        setTimeout(function () {
            $(z).addClass('toggled');
        });

    });


    $(".btn-login").on("click", function () {
        var form = $(this).closest('.toggled');
        switch (form.attr("id")) {
            case "l-login":
                post.login();
                break;
            case "l-register":
                break;
            case "l-forget-password":
                break;
        }
    });


});