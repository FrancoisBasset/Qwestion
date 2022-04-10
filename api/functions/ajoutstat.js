const statsService = require('../services/statsService');

module.exports = function(req, res) {
	const { date, api, category, difficulty, correct, incorrect } = req.body;

	statsService.ajoutstat(req.headers.authorization.substr(7), date, api, category, difficulty, correct, incorrect, function() {
		res.status(201).end();
	});
};