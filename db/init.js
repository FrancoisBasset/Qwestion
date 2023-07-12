const fs = require('fs');
const sqlite3 = require('sqlite3');
require('dotenv').config();

if (fs.existsSync('db/qwestion.db')) {
	fs.unlinkSync('db/qwestion.db');
}

const db = new sqlite3.Database('./db/qwestion.db');
db.exec(require('./users'));
db.exec(require('./stats'));
