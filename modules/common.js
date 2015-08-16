//icon image:  http://www.flaticon.com/free-icon/pie-graph_87100
/*******************************************/
var version_name = chrome.runtime.getManifest().version_name;
version_name = version_name.split(" ");

var ext_version = "test";
if (version_name.length >= 2) {
	ext_version = version_name[1];
}
console.log("ext_version: " + ext_version);

globalObject = {};
/*******************************************/


function debugConsole(message) {
	if (ext_version == "develop") {
		console.log('%c ' + message + ' ', 'background: #006600; color: white');
	}
}



// ################# load html template   ################
globalObject.loadHandlebarsTemplate = {
    locadCommonTemplate: function (id_name, file_name, callbck) {
        console.log('load handlebars template ... start');
        if (!id_name) {
            id_name = 'common-template';
        }
        if (!file_name) {
            file_name = '../html/template.xml';
        }
        $('<script>', { id: id_name }).appendTo('head').ready(function () {
            //var html = "handlebarsTemplate.xml";
            $("#" + id_name).load(file_name, function (data) {
                console.log('load handlebars template ... success');
                if (callback && typeof (callback) === "function") {
                    callback();
                };
            });
        });
    },
    loadIdTemplate: function (id, dataSet) {
        var html;
        if ($("#" + id).length > 0) {
            var source = $("#" + id).html();
            var template = Handlebars.compile(source);
            html = template(dataSet);
        }
        return html;
    }
};
globalObject.loadHandlebarsTemplate.locadCommonTemplate();



// ################# initial Message Listener  ################
globalObject.messageListener = {
    addMessageListener: function () {
        chrome.extension.onMessage.addListener(function (request, sender, response) {
            debugConsole('<messageListener>.<addMessageListener>: ');
        })
    },
    sendMessage: function (message) {
        chrome.extension.sendMessage(message);
    }

}