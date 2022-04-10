const Buffer = require('buffer').Buffer;
const usersService = require('../services/usersService');

module.exports = function(req, res) {
	const basicAuth = Buffer.from(req.headers.authorization.substr(6), 'base64').toString();
	
	usersService.connexion(
		basicAuth.split(':')[0],
		basicAuth.split(':')[1],
		function(result) {
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(401).end();
			}
		}
	);
};