const statsService = require('../services/statsService');

function getStats(req, res) {
	statsService.getAll(req.headers.authorization.substr(7), function(result) {
		res.status(200).json(result);
	});
}

function addStat(req, res) {
	const { date, api, category, difficulty, correct, incorrect } = req.body;

	statsService.add(req.headers.authorization.substr(7), date, api, category, difficulty, correct, incorrect, function() {
		res.status(201).end();
	});
}

module.exports = {
	getStats,
	addStat
};
