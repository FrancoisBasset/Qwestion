const statsService = require('../services/statsService');

function listestats(req, res) {
	statsService.listestats(req.headers.authorization.substr(7), function(result) {
		res.status(200).json(result);
	});
}

function ajoutstat(req, res) {
	const { date, api, category, difficulty, correct, incorrect } = req.body;

	statsService.ajoutstat(req.headers.authorization.substr(7), date, api, category, difficulty, correct, incorrect, function() {
		res.status(201).end();
	});
}

module.exports = {
	listestats,
	ajoutstat
};
