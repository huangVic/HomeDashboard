var express = require('express')
    , router = express.Router();
var UsersModel = require('../models/UsersModel.js');    

//router.use('/index', require('./index'));

/* GET Default page. */
router.get('/', function (req, res) {
     res.render('auth');
});


router.post('/login', function (req, res, next) {
    console.log(" ---- auth/login ----")
    console.log(" username: " + req.body.username)
    console.log(" password: " + req.body.password)
    if (req.session.user) {
        res.redirect('/index');
        return;
    }
    
    if (!req.body.username || !req.body.password){
       res.json({ success: 'ok' , is_login: false , status: 990, msg: "username or password not empty."})
    }
    else{
        var UsersStore = new UsersModel();
        var params = {
           username: req.body.username,
           password: req.body.password
        }
        UsersStore.login( params, function(result){
            if (!result){
                res.json({ success: 'ok' , is_login: false , status: 991, msg: "login fail."})
            }
            else{
               console.log(" ---- UsersStore.login ----") 
               console.log(result)
               res.json({ success: 'ok' , is_login: true , status: 100, msg: "login success."})
            }
        })
    }
});

/* GET Default page. */
// router.get('/login', function (req, res) {
//     res.render('./auth/login',{
//         layout: false
//     });
// });

module.exports = router;