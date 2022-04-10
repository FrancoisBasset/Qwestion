const statsService = require('../services/statsService');

module.exports = function(req, res) {
	statsService.listestats(req.headers.authorization.substr(7), function(result) {
		res.status(200).json(result);
	});
};