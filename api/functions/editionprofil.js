const usersService = require('../services/usersService');

module.exports = function(req, res) {
	usersService.editionprofil(
		req.headers.authorization.substr(7),
		req.body,
		function() {
			res.status(204).end();
		}
	);
};