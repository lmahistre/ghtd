
const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname+'/../config.json');

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
		configFileContent = fs.readFileSync(path.resolve(__dirname+'/../config.sample.json'));
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

