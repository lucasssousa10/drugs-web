const config = {
	'developer': {
 		'domain': 'http://localhost:5000',
		'appName': "FollowLife",
		'version': "0.0.0.1",
		'company': "IFCE",
		'year': "2020"
	},
	'production': {
		'domain': 'http://localhost:5000',
		'appName': "FollowLife",
		'version': "0.0.0.1",
		'company': "IFCE",
		'year': "2020"
	},
	'heroku': {
		'domain': 'http://localhost:5000',
		'appName': "FollowLife",
		'version': "0.0.0.1",
		'company': "IFCE",
		'year': "2020"
	}
}

let environment = 'developer';
require('dotenv').config();
if(process.env.REACT_APP_NODE_ENV !==  undefined){
	console.log("AEL")
	environment = process.env.REACT_APP_NODE_ENV ;
}

export const Properties = config[environment];
