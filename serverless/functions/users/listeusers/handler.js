const usersService = require('../../../services/usersService');

module.exports.listeusers = async function(event) {
	return new Promise(function(resolve) {
		usersService.listeusers(event.headers.Authorization.substr(7), function(res) {
			if (res) {
				resolve({
					statusCode: 200,
					body: JSON.stringify(res)
				});
			} else {
				resolve({
					statusCode: 401
				});
			}
		});
	});
};