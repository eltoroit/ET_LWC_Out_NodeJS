"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsforce_1 = __importDefault(require("jsforce")); // JS Connector (https://jsforce.github.io/)
// ENVIRONMENT
var conn;
var SALESFORCE_LOGIN_SERVER = "" + process.env.SALESFORCE_LOGIN_SERVER;
var SALESFORCE_LIGHTNING_SERVER = "https://" + process.env.SALESFORCE_MY_DOMAIN + ".lightning.force.com";
var SALESFORCE_USER_USERNAME = "" + process.env.SALESFORCE_USER_USERNAME;
var SALESFORCE_USER_PASSWORD = "" + process.env.SALESFORCE_USER_PASSWORD;
var SALESFORCE_USER_SECTOKEN = "" + process.env.SALESFORCE_USER_SECTOKEN;
// ENVIRONMENT
var Salesforce = /** @class */ (function () {
    function Salesforce() {
    }
    Salesforce.checkEnvironmentVariables = function () {
        var output = true;
        output = output && (SALESFORCE_LOGIN_SERVER ? true : false);
        if (!output)
            throw new Error("SALESFORCE_LOGIN_SERVER does not have a valid value");
        output = output && (process.env.SALESFORCE_MY_DOMAIN ? true : false);
        if (!output)
            throw new Error("process.env.SALESFORCE_MY_DOMAIN does not have a valid value");
        output = output && (SALESFORCE_LIGHTNING_SERVER ? true : false);
        if (!output)
            throw new Error("SALESFORCE_LIGHTNING_SERVER does not have a valid value");
        output = output && (SALESFORCE_USER_USERNAME ? true : false);
        if (!output)
            throw new Error("SALESFORCE_USER_USERNAME does not have a valid value");
        output = output && (SALESFORCE_USER_PASSWORD ? true : false);
        if (!output)
            throw new Error("SALESFORCE_USER_PASSWORD does not have a valid value");
        // output = output && (SALESFORCE_USER_SECTOKEN ? true : false); if (!output) throw new Error(`SALESFORCE_USER_SECTOKEN does not have a valid value`);
    };
    Salesforce.userLogin_UNPW = function () {
        this.checkEnvironmentVariables();
        return new Promise(function (resolve, reject) {
            conn = new jsforce_1.default.Connection({ loginUrl: SALESFORCE_LOGIN_SERVER });
            conn.login(SALESFORCE_USER_USERNAME, SALESFORCE_USER_PASSWORD + SALESFORCE_USER_SECTOKEN, function (err, userInfo) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({
                        username: SALESFORCE_USER_USERNAME,
                        accessToken: conn.accessToken,
                        sfdcServerUrl: conn.instanceUrl,
                        lightningServerUrl: SALESFORCE_LIGHTNING_SERVER,
                        userId: userInfo.id,
                        orgId: userInfo.organizationId
                    });
                }
            });
        });
    };
    return Salesforce;
}());
exports.Salesforce = Salesforce;
//# sourceMappingURL=salesforce.js.map