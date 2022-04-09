const Buffer = require('buffer').Buffer;
const usersService = require('../services/usersService');

module.exports.handler = async function(event) {
	const basicAuth = Buffer.from(event.headers.Authorization.substr(6), 'base64').toString();

	return new Promise(function(resolve) {
		usersService.connexion(
			basicAuth.split(':')[0],
			basicAuth.split(':')[1],
			function(res) {
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
			}
		);
	});
};