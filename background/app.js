
debugConsole("load app.js");




var MessageListener = function(){

    var exports = {};


    var addMessageListener = exports.addMessageListener = function addMessageListener(){
        chrome.extension.onMessage.addListener(function (request, sender, response) {
            switch (request.action) {
                case "getCurrentUser":
                    var currentUser = userModel.getCurrentUser();
                    if (currentUser == null) {
                        sendMessage({ action: "auth", value: false }, null);
                    } else {
                        sendMessage({ action: "auth", value: true, user: currentUser }, null);
                    }
                    break;
                case "auth":
                    userModel.userLogin("vichuang", "b0b1Tag123");
                    break;
            }
        });
    };


    var sendMessage = exports.sendMessage = function sendMessage(message, callback) {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendMessage(tab.id, message);
            if (callback)
                callback();
        });
    };


    return exports;

}

var msgListener = new MessageListener();
msgListener.addMessageListener();


