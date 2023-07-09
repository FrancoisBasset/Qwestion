const process = require('process');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.listen(3000, function() {
	process.stdout.write('Start on 3000');
});

const { listeusers, inscription, connexion, editionprofil, desinscription } = require('./controllers/usersController');
const { listestats, ajoutstat } = require('./controllers/statsController');

const router = express.Router();
router.use(bodyParser.json({
	limit: '50mb'
}));
router.get('/listeusers', listeusers);
router.post('/inscription', inscription);
router.get('/connexion', connexion);
router.put('/editionprofil', editionprofil);
router.delete('/desinscription', desinscription);

router.get('/listestats', ajoutstat);
router.post('/ajoutstat', listestats);

app.use('/api', router);
