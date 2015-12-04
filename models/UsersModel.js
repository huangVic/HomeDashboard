var DB = require('../common/db');


var USERS = function USERS() {
    var exports = {}
    
    // 判斷 Parse Session
    var currentUser = exports.currentUser = function currentUser(callback) {
        var currentUser = DB.User.current();
        if (currentUser) {
            console.log("currentUser is : ")
            console.log(currentUser)
        }

        if (callback) {
            callback(currentUser)
        }
    }
    
    
    
    // 執行 Parse 登入
    var login = exports.login = function login(data, callback) {
        DB.User.logIn(data.username, data.password, {
            success: function (user) {
                console.log("[Parse][username]: " + user.get("username"));
                console.log("[Parse][email]: " + user.get("email"));
                console.log("[Parse][id]: " + user.id);
                callback(user)
            },
            error: function (user, error) {
                console.log("[Parse][login fail]: ");
                console.log("error code: " + error.code);
                console.log("error message: " + error.message);
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