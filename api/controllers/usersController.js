const usersService = require('../services/usersService');
const Buffer = require('buffer').Buffer;

function listeusers(req, res) {
	usersService.listeusers(req.headers.authorization.substr(7), function(result) {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(401).end();
		}
	});
};

function inscription(req, res) {
	const { username, password, firstname, lastname } = req.body;
	
	usersService.inscription(username, password, firstname, lastname, function(success) {
		res.status(success ? 201 : 400).end();
	});
};

function connexion(req, res) {
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

function editionprofil(req, res) {
	usersService.editionprofil(
		req.headers.authorization.substr(7),
		req.body,
		function() {
			res.status(204).end();
		}
	);
};

function desinscription(req, res) {
	usersService.desinscription(
		req.headers.authorization.substr(7),
		function() {
			res.status(204).end();
		}
	);
};

module.exports = {
	listeusers,
	connexion,
	inscription,
	editionprofil,
	desinscription
};