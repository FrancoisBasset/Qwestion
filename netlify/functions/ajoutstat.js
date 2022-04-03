const statsService = require('../services/statsService');

module.exports.handler = async function(event) {
	const { date, api, category, difficulty, correct, incorrect } = JSON.parse(event.body);

	return new Promise(function(resolve) {
		statsService.ajoutstat(event.headers.Authorization.substr(7), date, api, category, difficulty, correct, incorrect, function() {
			resolve({
				statusCode: 201
			});
		});
	});
};