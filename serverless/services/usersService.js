const sqlite3 = require('sqlite3');
const uuid = require('uuid').v4;
const Buffer = require('buffer').Buffer;

const db = new sqlite3.Database('database/qwestion.db');

module.exports = class UsersService {
	static inscription(username, password, firstname, lastname, callback) {
		db.get('SELECT id FROM users WHERE username = ?', username, function(err, res) {
			if (res) {
				callback(false);
			} else {
				db.run('INSERT INTO users(username, password, firstname, lastname) VALUES(?, ?, ?, ?)', username, password, firstname, lastname);

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
				if (res.wallpaper) {
					res.wallpaper = 'data:image/jpeg;base64,' + Buffer.from(res.wallpaper).toString('base64');
				}
			}
			
			callback(res);
		});
	}

	static editionprofil(token, params, callback) {
		if (params.wallpaper) {
			params.wallpaper = params.wallpaper.substr(23);
			params.wallpaper = Buffer.from(params.wallpaper, 'base64');
		}

		const sqlParams = Object.keys(params).reduce(function(a, b) {
			a.push(`${b} = ?`);
			return a;
		}, []).join(', ');

		const sql = `UPDATE users SET ${sqlParams} WHERE token = ?`;
		
		db.run(sql, [...Object.values(params), token], callback);
	}

	static desinscription(username, callback) {
		db.run('DELETE FROM users WHERE username = ?', username, callback);
	}
};