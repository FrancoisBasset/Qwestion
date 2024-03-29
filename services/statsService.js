const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('db/qwestion.db');

module.exports = class StatsService {
	static add(token, date, api, category, difficulty, correct, incorrect, callback) {
		console.log(token);

		db.get('SELECT id FROM users WHERE token = ?', token, function(err, res) {
			db.run('INSERT INTO stats(userId, date, api, category, difficulty, correct, incorrect) VALUES(?, ?, ?, ?, ?, ?, ?)',
				res.id, date, api, category, difficulty, correct, incorrect, callback);
		});
	}

	static getAll(token, callback) {
		db.get('SELECT id FROM users WHERE token = ?', token, function(err, res) {
			db.all('SELECT date, api, category, difficulty, correct, incorrect FROM stats WHERE userId = ?', res.id, function(err, res) {
				callback(res);
			});
		});
	}
};
