
var SESSION = function (){
	
	var exports = {};
	var currentUser = {};
	var isLogin = false;
	
	var setLoginStatus = exports.setLoginStatus = function setLoginStatus(value){
		if(value && value == 1){
			isLogin = true;
		}
	}
	
	var setCurrentUser = exports.setCurrentUser = function setCurrentUser(user){
		if(user){
			currentUser = user
		}
	}
	
	var getCurrentUser = exports.getCurrentUser = function getCurrentUser(){
		return currentUser;
	}
	
	var getLoginStatus = exports.getLoginStatus = function getLoginStatus(callback){
		
		if(isLogin){
		   callback(true);	
		}else{
			globalObject.messageListener.sendMessage({
				  action: "getCurrentUser",
				callback: "session.auth"
			})
		}

	}
	
	var auth = exports.auth = function auth(status, user){
		if(status === true){
			setLoginStatus(1);
			setCurrentUser(user);
		}else{
			window.location.href = chrome.extension.getURL('html/auth.html');
		}
		
	}
 
 
   return exports;
}


var session = new SESSION();
session.getLoginStatus(function(status){
	if(status){
		var html = globalObject.loadHandlebarsTemplate.loadIdTemplate("tmp-main-header", {
			appName: chrome.runtime.getManifest().name
		});
		
		$("#main-header").html(html);
	}
	
})