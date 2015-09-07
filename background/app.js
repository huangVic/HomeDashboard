
debugConsole("load app.js");




var MessageListener = function(){

    var exports = {};


    var addMessageListener = exports.addMessageListener = function addMessageListener(){
        chrome.extension.onMessage.addListener(function (request, sender, response) {
            switch (request.action) {
                case "getCurrentUser":
                    var currentUser = userModel.getCurrentUser(function (currentUser) {
                        if (currentUser == null) {
                            sendMessage({ callback: request.callback, value: false, user: null }, null);
                        } else {
                            sendMessage({ callback: request.callback, value: true, user: currentUser }, null);
                        }
                    });
                     
                    break;
                
                case "auth":
                    userModel.userLogin("vichuang", "b0b1Tag123");
                    break;
                    
                case "getDataModel": 
                      dataModel.getDataSet(request.query, function(result){
                           sendMessage({ callback: request.callback , dataModel: result }, null);
                      })
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


