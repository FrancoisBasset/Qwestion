const usersService = require('../services/usersService');

module.exports = function(req, res) {
	usersService.listeusers(req.headers.authorization.substr(7), function(result) {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(401).end();
		}
	});
};