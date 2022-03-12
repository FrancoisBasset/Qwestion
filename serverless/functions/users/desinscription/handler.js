const usersService = require('../../../services/usersService');

module.exports.desinscription = async function(event) {
	return new Promise(function(resolve) {
		usersService.desinscription(
			event.headers.Authorization.substr(7),
			function() {
				resolve({
					statusCode: 204
				});
			}
		);
	});
}