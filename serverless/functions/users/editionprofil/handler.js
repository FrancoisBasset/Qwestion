const usersService = require('../../../services/usersService');

module.exports.editionprofil = function(event) {
	return new Promise(function(resolve) {
		usersService.editionprofil(
			event.headers.Authorization.substr(7),
			JSON.parse(event.body),
			function() {
				resolve({
					statusCode: 204
				});
			}
		);
	});
};