// ################# initial Message Listener  ################
globalObject.messageListener = {
    addMessageListener: function () {
        debugConsole(" addMessageListener init ")
        chrome.extension.onMessage.addListener(function (request, sender, response) {
            debugConsole('<messageListener>.<addMessageListener>: ');
             switch (request.callback) {
                 case "session.auth":
                 console.log("session.auth: " + request.value)
                     //session.auth(request.value, request.user);
                    break;
             }
        })
    },
    sendMessage: function (message) {
        chrome.extension.sendMessage(message);
    }
}



globalObject.messageListener.addMessageListener();