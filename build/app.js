"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load configuration
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Imports
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var salesforce_1 = require("./lib/salesforce");
// Constants
var app = express_1.default();
var PORT = Number(process.env.PORT);
// Configure a new express application instance
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname + '/../', 'views'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname + '/../', 'public')));
// CORS (Needed to make request to Lightning Out Javascript library from JavaScript code)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Set paths
app.get('/', function (req, res, next) {
    salesforce_1.Salesforce.userLogin_UNPW()
        .then(function (loginResponse) {
        res.render('pages/lout', {
            appName: "c:AuraApp",
            auraCmpName: "c:AuraCmp",
            lwcCmpName: "c:lwcCmp",
            sfdcServerUrl: loginResponse.sfdcServerUrl,
            lightningServerUrl: loginResponse.lightningServerUrl,
            accessToken: loginResponse.accessToken
        });
    })
        .catch(function (err) {
        return next(err);
    });
});
// Start server (HTTP & HTTPS)
var httpServer = http_1.default.createServer(app);
httpServer.listen(PORT);
console.log("HTTP listening on port " + PORT);
if (process.env.SERVER === 'Localhost') {
    var httpsServer = https_1.default.createServer({
        key: fs_1.default.readFileSync('./SSL/domain.key', 'utf8'),
        cert: fs_1.default.readFileSync('./SSL/domain.crt', 'utf8')
    }, app);
    httpsServer.listen(PORT + 1);
    console.log("HTTPS listening on port " + (PORT + 1));
}
//# sourceMappingURL=app.js.map