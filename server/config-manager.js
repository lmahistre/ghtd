
const fs = require('fs');

const fileName = 'config.json';

let config = {};

/**
 * Load configuration and create config file if does not exist
 */
load = function() {
	let configFileContent;
	try {
		configFileContent = fs.readFileSync(fileName);
	}
	catch (err) {
		configFileContent = fs.readFileSync('config.sample.json');
		fs.writeFileSync(fileName, configFileContent);
	}
	return JSON.parse(configFileContent);
}

config = load();


exports.setEntry = function(key, value) {
	config[key] = value;
	return fs.writeFileSync(fileName, JSON.stringify(config));
}


exports.get = function() {
	return config;
}

