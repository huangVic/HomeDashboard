
var sessionAuth = function (req, res, next) {
	console.log(" ==== session auth ====")
	console.log(req.session.user)
	if (req.session.user || req.path === '/auth' || req.path === '/auth/login') {
        next();
    } else {
		res.redirect("/auth");
    }
}

module.exports = sessionAuth;