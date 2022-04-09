const statsService = require('../services/statsService');

module.exports.handler = async function(event) {
	return new Promise(function(resolve) {
		statsService.listestats(event.headers.Authorization.substr(7), function(res) {
			resolve({
				statusCode: 200,
				body: JSON.stringify(res)
			});
		});
	});
};