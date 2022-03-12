const sqlite3 = require('sqlite3');
const uuid = require('uuid').v4;

const db = new sqlite3.Database('database/qwestion.db');

module.exports = class UsersService {
	static inscription(username, password, firstname, lastname, wallpaper, callback) {
		db.get('SELECT id FROM users WHERE username = ?', username, function(err, res) {
			if (res) {
				callback(false);
			} else {
				db.run('INSERT INTO users(username, password, firstname, lastname, wallpaper) VALUES(?, ?, ?, ?, ?)', username, password, firstname, lastname, wallpaper);

				callback(true);
			}
		});
	}

	static connexion(username, password, callback) {
		db.get('SELECT username, firstname, lastname, token, quizApiToken, apiNinjasToken, wallpaper FROM users WHERE username = ? AND password = ?', username, password, function(err, res) {
			if (res) {
				const token = uuid();

				db.run('UPDATE users SET token = ? WHERE username = ?', token, username);

				res.token = token;
				res.wallpaper = Buffer.from(res.wallpaper).toString('base64');
			}
			
			callback(res);
		});
	}

	static editionprofil(token, params, callback) {
		const sql = 'UPDATE users SET ' + Object.keys(params).reduce(function(a, b) {
			return a + b + ' = ?';
		}, '') + ' WHERE token = ?';
		
		db.run(sql, [...Object.values(params), token], callback);
	}

	static desinscription(username, callback) {
		db.run('DELETE FROM users WHERE username = ?', username, callback);
	}
}