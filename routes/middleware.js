module.exports = {
	
	authenticate: function(req, res, next){
		
		if (req.session.authenticated) next();
		else res.redirect('/auth');
		
	},	
}