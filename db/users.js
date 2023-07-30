const crypto = require('crypto');
const hash = crypto.createHash('SHA512').update(process.env.ADMIN_PASS).digest('hex');

module.exports = `CREATE TABLE "users" (
	"id"				INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"username"			TEXT NOT NULL UNIQUE,
	"password"			TEXT NOT NULL,
	"firstname"			TEXT NOT NULL,
	"lastname"			TEXT NOT NULL,
	"token"				TEXT,
	"quizApiToken"		TEXT,
	"apiNinjasToken"	TEXT,
	"wallpaper"			BLOB
);

INSERT INTO users (username, password, firstname, lastname, quizApiToken, apiNinjasToken) VALUES("admin", "${hash}", "Admin", "Istrateur", "${process.env.ADMIN_QUIZ_API}", "${process.env.ADMIN_API_NINJAS}");
`;
