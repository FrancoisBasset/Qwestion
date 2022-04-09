const usersService = require('../services/usersService');

module.exports.handler = async function(event) {
	const { username, password, firstname, lastname } = JSON.parse(event.body);

	return new Promise(function(resolve) {
		usersService.inscription(username, password, firstname, lastname, function(success) {
			resolve({
				statusCode: success ? 201 : 400
			});
		});
	});
};