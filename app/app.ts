// Load configuration
import dotenv from 'dotenv'
dotenv.config();

// Imports
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import express from 'express';
import jsforce from 'jsforce';
import bodyParser from "body-parser";
import { Salesforce } from './lib/salesforce';

// Constants
const app: express.Application = express();
const PORT: number = Number(process.env.PORT);

// Configure a new express application instance
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../', 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/../', 'public')));

// Set paths
app.get('/', (req, res, next) => {
	Salesforce.userLogin_UNPW()
		.then(loginResponse => {
			res.render('pages/lout',
				Object.assign(loginResponse, {
					appName: "c:AuraApp",
					auraCmpName: "c:AuraCmp",
					lwcCmpName: "c:lwcCmp"
				})
			);
		})
		.catch(err => {
			return next(err);
		});
});

// Start server (HTTP & HTTPS)
const httpServer = http.createServer(app);
httpServer.listen(PORT); console.log(`HTTP listening on port ${PORT}`);

if (process.env.SERVER === 'Localhost') {
	const httpsServer = https.createServer({
		key: fs.readFileSync('./SSL/domain.key', 'utf8'),
		cert: fs.readFileSync('./SSL/domain.crt', 'utf8')
	}, app);
	httpsServer.listen(PORT + 1); console.log(`HTTPS listening on port ${PORT + 1}`);
}
