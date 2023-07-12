module.exports = `CREATE TABLE "stats" (
	"id"			INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	"userId"		INTEGER NOT NULL,
	"date"			TEXT NOT NULL,
	"api"			TEXT NOT NULL,
	"category"		TEXT,
	"difficulty"	TEXT,
	"correct"		INTEGER NOT NULL,
	"incorrect"		INTEGER NOT NULL,
	
	FOREIGN KEY("userId") REFERENCES "users"("id")
)`;
