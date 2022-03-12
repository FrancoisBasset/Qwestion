const usersService = require('../../../services/usersService');

module.exports.inscription = async function(event) {
	const { username, password, firstname, lastname, wallpaper } = JSON.parse(event.body);

	return new Promise(function(resolve) {
		usersService.inscription(username, password, firstname, lastname, Buffer.from(wallpaper, 'base64'), function(success) {
			resolve({
				statusCode: success ? 201 : 400
			});
		});
	});
};