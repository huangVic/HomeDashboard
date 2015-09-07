

var USERMODEL = function () {
     var exports = {};


	 var getCurrentUser = exports.getCurrentUser = function getCurrentUser(callback){
	 	 console.log(" #### UserModel getCurrentUser ####")
		   if (Parse && Parse.User) {
			   console.log(" #### currentUser #### ");
			   
			   var currentUser = Parse.User.current();
			   if (currentUser.id) {
				   var user = {
					   id: currentUser.id,
					   user_name: currentUser.getUsername(), //Parse.User.current().getUsername(),
					   email: currentUser.getEmail(), // Parse.User.current().getEmail(),
					   sessionToken: currentUser.getSessionToken() //Parse.User.current().getSessionToken()
				   }
				   console.log(user)

				   if (callback) {
					   callback(user)
				   }
			   } else {
				   callback(null)
			   }
		   }
		 else{
			 callback(null)
		 }
	 }


	 var userLogin = exports.userLogin = function userLogin(user_name, user_password, callback) {
	 	console.log(" #### UserModel userLogin ####")
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


     var getUserList = exports.getUserList = function getUserList(){
     	console.log(" #### UserModel getUserList ####")
        var query = new Parse.Query(Parse.User)
        query.find({
          success: function(results) {
            // results is an array of Parse.Object.
             console.log(" [getUserList] query results")
             console.log(results)
          },
          error: function(error) {
             // error is an instance of Parse.Error.
             console.log(" [getUserList] error: " + error)
          }
        });
     }


	 return exports;
}

var userModel = new USERMODEL();

//userModel.getUserList();
// if (!currentUser) {
//     userModel.userLogin("vichuang", "b0b1Tag123")
// }