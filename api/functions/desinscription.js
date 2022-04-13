const usersService = require('../services/usersService');

module.exports = function(req, res) {
	usersService.desinscription(
		req.headers.authorization.substr(7),
		function() {
			res.status(204).end();
		}
	);
};