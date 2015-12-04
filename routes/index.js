var express = require('express');
var router = express.Router();
var UsersModel = require('../models/UsersModel.js');

router.use('/auth', require('./auth'));
router.use('/input', require('./input'));

/* GET Default page. */
router.get('/', function (req, res, next) {

        if (!req.session.user) {
                res.redirect('/auth');
                return;
        }

        res.render('index', { mainId: "home", user: req.session.user });

});

module.exports = router;
