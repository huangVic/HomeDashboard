var ajaxSettings = {
    dataType: 'json'
};

var restful = {}

var api_req = function(name, callback, settings) {
    settings = (!settings) ? {} : settings;

    return $.ajax(
    $.extend({}, ajaxSettings, {
        url:  window.location.protocol + "//" + window.location.host + name,
        type: (settings.data) ? 'POST' : 'GET',
        success: callback,
        error: function(xhr, status, errorThrown) {
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
    get: function(path, data, callback, settings) {
        path = path.replace(/^([^\/])/g, '/$1');
        settings = settings || {};
        data = data || {};
        // fixed ie ajax cache
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            $.extend(settings, {cache: false});
        }
        //$.extend(data, {'lang': userLang});
        return api_req(
        path, callback, $.extend({
            type: 'GET',
            data: data
        }, settings));
    },
    post: function(path, data, callback, settings) {
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
    put: function(path, data, callback, settings) {
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
    delete: function(path, data, callback, settings) {
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
		add: "/input/power/add"
    },
	water: {
		add: "/input/water/add"
	}
}