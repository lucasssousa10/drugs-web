const config = {
	'developer': {
 		'domain': 'http://localhost:5000',
		'appName': "Follow Life",
		'version': "1.0",
		'company': "IFCE/UFRN",
		'year': "2020"
	},
	'production': {
		'domain': 'http://localhost:5000',
		'appName': "Follow Life",
		'version': "1.0",
		'company': "IFCE/UFRN",
		'year': "2020"
	},
	'heroku': {
		'domain': 'https://drugs-backend.herokuapp.com',
		'appName': "Follow Life",
		'version': "1.0",
		'company': "IFCE/UFRN",
		'year': "2020"
	}
}

let environment = 'developer';
require('dotenv').config();
if(process.env.REACT_APP_NODE_ENV !==  undefined) {
	environment = process.env.REACT_APP_NODE_ENV;
}

console.log("Starting environment " + environment)

export const Properties = config[environment];
