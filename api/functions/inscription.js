const usersService = require('../services/usersService');

module.exports = function(req, res) {
	const { username, password, firstname, lastname } = req.body;
	
	usersService.inscription(username, password, firstname, lastname, function(success) {
		res.status(success ? 201 : 400).end();
	});
};