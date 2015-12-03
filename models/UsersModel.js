var DB = require('../common/db');


var USERS = function Users() {
    var exports = {}
    
    var getCurrentUser = exports.getCurrentUser = function getCurrentUser(callback){
        var currentUser = DB.User.current();
        if (currentUser) {
            console.log("currentUser is : ")
            console.log(currentUser)
        } 
        
        if (callback){
            callback(currentUser)
        }
    }
    
    var login = exports.login = function login(data, callback) {
        //a: vichuang
        //b: b0b1Tag123
        DB.User.logIn(data.username, data.password, {
            success: function (user) {
                console.log("[Parse][username]: " + user.get("username"));
                callback(user)
            },
            error: function (user, error) {
                console.log("[Parse][login fail]: " + error);
                console.log(user);
                callback(null)
            }
        });
    }
    
    
    return exports;
};



// Users.prototype.GetUserIsLogin = function (callback) {
//     /* (1)
//     var query = new Parse.Query(DB.User);
//     query.find({
//         success: function (users) {
//             for (var i = 0; i < users.length; i++) {
//                 console.log("username: " + users[i].get("username"));
//             }
//         }
//     });
//      */

//     // (2)
//     var isCurrentUser;

//     if (DB.User) {
//         console.log("There is no current user user on a node.js server environment");
//     } else {
//         var currentUser = DB.User.current();
//         console.log("currentUser: " + currentUser);
//         if (currentUser) {
//             // do stuff with the user
//             console.log("currentUser is : ")
//             console.log(currentUser)
//             isCurrentUser = currentUser;
//         } else {
//             // show the signup or login page
//             console.log("no currentUser: ")
//         }
//     }





//     console.log(" ======================= ");
//     /*
//     Parse.User.logIn("vichuang", "b0b1Tag123" , {
//         success: function (user) {
//             console.log("[Parse][username]: " + user.get("username"));
//         },
//         error: function (user, error) {
//             console.log("[Parse][login fail]: " + user.get("username"));
//         }
//     });
//     */


//     if (callback) {
//         callback(isCurrentUser)
//     }
// };



module.exports = USERS;