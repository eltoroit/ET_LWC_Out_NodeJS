import jsforce from 'jsforce';		// JS Connector (https://jsforce.github.io/)

// ENVIRONMENT
let conn: jsforce.Connection;
const SALESFORCE_LOGIN_SERVER: string = `${process.env.SALESFORCE_LOGIN_SERVER}`;
const SALESFORCE_LIGHTNING_SERVER: string = `https://${process.env.SALESFORCE_MY_DOMAIN}.lightning.force.com`;
const SALESFORCE_USER_USERNAME: string = `${process.env.SALESFORCE_USER_USERNAME}`;
const SALESFORCE_USER_PASSWORD: string = `${process.env.SALESFORCE_USER_PASSWORD}`;
const SALESFORCE_USER_SECTOKEN: string = `${process.env.SALESFORCE_USER_SECTOKEN}`;
// ENVIRONMENT

export class Salesforce {
	static checkEnvironmentVariables(): void {
		let output: Boolean = true;

		output = output && (SALESFORCE_LOGIN_SERVER ? true : false); if (!output) throw new Error(`SALESFORCE_LOGIN_SERVER does not have a valid value`);
		output = output && (process.env.SALESFORCE_MY_DOMAIN ? true : false); if (!output) throw new Error(`process.env.SALESFORCE_MY_DOMAIN does not have a valid value`);
		output = output && (SALESFORCE_LIGHTNING_SERVER ? true : false); if (!output) throw new Error(`SALESFORCE_LIGHTNING_SERVER does not have a valid value`);
		output = output && (SALESFORCE_USER_USERNAME ? true : false); if (!output) throw new Error(`SALESFORCE_USER_USERNAME does not have a valid value`);
		output = output && (SALESFORCE_USER_PASSWORD ? true : false); if (!output) throw new Error(`SALESFORCE_USER_PASSWORD does not have a valid value`);
		// output = output && (SALESFORCE_USER_SECTOKEN ? true : false); if (!output) throw new Error(`SALESFORCE_USER_SECTOKEN does not have a valid value`);
	}

	static userLogin_UNPW(): Promise<any> {
		this.checkEnvironmentVariables();
		return new Promise((resolve, reject) => {
			conn = new jsforce.Connection({ loginUrl: SALESFORCE_LOGIN_SERVER });
			conn.login(SALESFORCE_USER_USERNAME, SALESFORCE_USER_PASSWORD + SALESFORCE_USER_SECTOKEN, (err, userInfo) => {
				if (err) {
					reject(err);
				} else {
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
	}
}