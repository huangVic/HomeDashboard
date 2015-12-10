

/****************** restful api *********************/
var ajaxSettings = {
    dataType: 'json'
};

var restful = {}

var api_req = function (name, callback, settings) {
    settings = (!settings) ? {} : settings;

    return $.ajax(
        $.extend({}, ajaxSettings, {
            url: window.location.protocol + "//" + window.location.host + name,
            type: (settings.data) ? 'POST' : 'GET',
            success: callback,
            error: function (xhr, status, errorThrown) {
                var message = 'Unknown error. Please try again later.';
                switch (status) {
                    case 'timeout':
                        message = 'Server timeout. Please try again later.';
                        break;
                    case 'error':
                    case 'parsererror':
                        message = 'Server experienced some difficulty. Please try again later.';
                        break;
                    case 'abort':
                        message = 'Aborted.';
                        break;
                }
                // console.log(message);
            }
        }, settings));
};

restful = {
    get: function (path, data, callback, settings) {
        path = path.replace(/^([^\/])/g, '/$1');
        settings = settings || {};
        data = data || {};
        // fixed ie ajax cache
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            $.extend(settings, { cache: false });
        }
        //$.extend(data, {'lang': userLang});
        return api_req(
            path, callback, $.extend({
                type: 'GET',
                data: data
            }, settings));
    },
    post: function (path, data, callback, settings) {
        path = path.replace(/^([^\/])/g, '/$1');
        settings = settings || {};
        data = data || {};
        //$.extend(data, {'lang': userLang});
        return api_req(
            path, callback, $.extend({
                type: 'POST',
                data: data
            }, settings));
    },
    put: function (path, data, callback, settings) {
        path = path.replace(/^([^\/])/g, '/$1');
        settings = settings || {};
        data = data || {};

        // if(data.lang == undefined){
        //     $.extend(data, {'lang': userLang});
        // }

        return api_req(
            path, callback, $.extend({
                type: 'PUT',
                data: data
            }, settings));
    },
    delete: function (path, data, callback, settings) {
        path = path.replace(/^([^\/])/g, '/$1');
        settings = settings || {};
        data = data || {};
        //$.extend(data, {'lang': userLang});
        return api_req(
            path, callback, $.extend({
                type: 'DELETE',
                data: data
            }, settings));
    }
};



var api_url = {
    power: {
        home: {
            add: "/input/home/powerAdd",
            totalList: "/dataList/home/powerList"
        }
    },
    water: {
        home: {
            add: "/input/home/waterAdd",
            totalList: "/dataList/home/waterList"
        }
        
    },
    gas: {
        home: {
            add: "/input/home/gasAdd",
            totalList: "/dataList/home/gasList"
        }
    }
}
/****************** / restful api *********************/


/**************** handlebar template ******************/
var loadTemplate = function (html, css, data, template, callback) {

    var loadHandlebarsTemplate = function (html, inputData, template, callback) {
        if (html) {
            if ($("#handlebars-template").length > 0) {
                $("#handlebars-template").load(html, function (data) {
                    var templateSource = template == undefined || null ? data : $("#" + template).html();
                    var handleTemplate = Handlebars.compile(templateSource);
                    callback(handleTemplate(inputData));
                });
            } else {
                $('<script>', { id: "handlebars-template" }).appendTo('head').ready(function () {
                    $("#handlebars-template").load(html, function (data) {
                        var templateSource = template == undefined || null ? data : $("#" + template).html();
                        var handleTemplate = Handlebars.compile(templateSource);
                        callback(handleTemplate(inputData));
                    });
                })
            }
        }
        else {
            if ($("#handlebars-common-template").length == 0) {
                $('<script>', { id: "handlebars-common-template" }).appendTo('head').ready(function () {
                    var html = "./libs/handlebarsTemplate.xml" + "?_ts=" + new Date().getTime();
                    $("#handlebars-common-template").load(html, function (data) {
                        var templateSource = template == undefined || null ? data : $("#" + template).html();
                        var handleTemplate = Handlebars.compile(templateSource);
                        callback(handleTemplate(inputData));
                    });
                })
            } else {
                var templateSource = template == undefined || null ? "" : $("#" + template).html();
                var handleTemplate = Handlebars.compile(templateSource);
                callback(handleTemplate(inputData));
            }
        }
    }

    var loadHandlebarsCss = function (css) {
        if (css) {
            css += '?_ts=' + new Date().getTime();
            $('<link>', { rel: 'stylesheet', type: 'text/css', 'href': css }).appendTo('head').ready(function () {
                loadHandlebarsTemplate(html, data, template, callback);
            })
        }
        else {
            loadHandlebarsTemplate(html, data, template, callback);
        }
    }

    loadHandlebarsCss(css);
}	
/**************** / handlebar template ******************/


/******************* dataTable config *******************/
var dataTable_config = {
    "pageLength": 25,
    "language": {
        "lengthMenu": "每頁顯示 _MENU_ 筆",
        "zeroRecords": "查無任何一筆資料",
        "info": "顯示第 _PAGE_ 頁, 共 _PAGES_ 頁",
        "search": "查詢",
        "infoEmpty": "沒有查詢到任何資料",
        "infoFiltered": "(過濾自 _MAX_ 筆資料)",
        "loadingRecords": "載入中...",
        "processing": "查詢中...",
        "paginate": {
            "next": "下一頁",
            "previous": "上一頁"
        }
    }
}
/******************* /dataTable config *******************/