// init
Parse.initialize(config.parse.APPLICATION_ID, config.parse.JAVASCRIPT_KEY);

var USERMODEL = function () {
     var exports = {};	 

	 
	 var getCurrentUser = exports.getCurrentUser = function getCurrentUser(){
		 var currentUser;
		 if(Parse && Parse.User){
			 currentUser = Parse.User.current(); 
		 }
		 console.log("currentUser: " + currentUser);
		 return currentUser;
	 }
	 
	 
	 var userLogin = exports.userLogin = function userLogin(user_name, user_password, callback) {
		 if (user_name && user_password) {
			 Parse.User.logIn(user_name, user_password, {
				 success: function (user) {
					 console.log("successful login")
					 console.log(user)
					 if(callback){
						 callback()
					 }
				 },
				 error: function (user, error) {
					 console.log("the login failed")
					 console.log("error: ")
					 console.log(error)
				 }
			 })
		 }
	 }
	 
	 return exports;
}

var userModel = new USERMODEL();
var currentUser = userModel.getCurrentUser();

// if (!currentUser) {
//     userModel.userLogin("vichuang", "b0b1Tag123")
// }