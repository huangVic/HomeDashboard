/**************************
 * [Auth Controller]
 **************************/
var post = {

    // [post][login]
    login: function () {
        var url = "/Auth/auth";
        var params = {
            username: $("#l-login .username").val(),
            password: $("#l-login .password").val()
        };

        debugWriteLine(" url : " + url);
        debugWriteLine(params);

        globalObject.api.POST(url, params, function (result) {
            debugWriteLine(result)
            if (result.status == 100) {

            } else {
                clearForm();
            };
        });
    },

    // [post][register]
    register: function () {

    },

    // [post][forgetPassword]
    forgetPassword: function () {

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