const process = require('process');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');

const app = express();
app.use(cors());
app.listen(process.env.PORT || 2022);

const router = express.Router();
router.use(bodyParser.json({limit: '50mb'}));
router.post('/inscription', require('./functions/inscription'));
router.get('/connexion', require('./functions/connexion'));
router.put('/editionprofil', require('./functions/editionprofil'));
router.delete('/desinscription', require('./functions/desinscription'));
router.post('/ajoutstat', require('./functions/ajoutstat'));
router.get('/listestats', require('./functions/listestats'));
router.get('/listeusers', require('./functions/listeusers'));

app.use(serveStatic('vue/dist'));
app.use('/api', router);