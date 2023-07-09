const fs = require('fs');
const sqlite3 = require('sqlite3');

if (fs.existsSync('db/qwestion.db')) {
	fs.unlinkSync('db/qwestion.db');
}

const dump = (db, file) => db.exec(fs.readFileSync(file).toString());

const db = new sqlite3.Database('./db/qwestion.db', () => {
	dump(db, './db/users.sql');
	dump(db, './db/stats.sql');
});
