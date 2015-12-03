var express = require('express');
var router = express.Router();
var UsersModel = require('../models/UsersModel.js');

router.use('/auth', require('./auth'));
//router.use('/input', require('./input'));

/* GET Default page. */
router.get('/', function(req, res, next) {
     console.log(req.session.user)
     
     var is_login= false;
     
     if (req.session.user){
        is_login = true;
        res.render('index', {mainId: "home", user: req.session.user});
        return;
     }
     
     var UsersStore = new UsersModel();
     UsersStore.getCurrentUser( function(result){
         console.log("UsersStore.getCurrentUser -- result: ")
         console.log(result);
         if (result && result.username ) {
            is_login = true;
         }  
         
         if(!is_login){
            res.redirect('/auth');
            return;
         }
         
         res.render('index', {mainId: "home", user: result});
     })
    
    
});

module.exports = router;
