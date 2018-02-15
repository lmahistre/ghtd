
const fs = require('fs');

const fileName = 'config.json';

/**
 * Load configuration and create file if does not exist
 */
exports.load = function() {
	let configFileContent;
	try {
		configFileContent = fs.readFileSync(fileName);
	}
	catch (err) {
		configFileContent = fs.readFileSync('config.sample.json');
		fs.writeFileSync(fileName, configFileContent);
	}
	exports.config = JSON.parse(configFileContent);
	return exports.config;
}


exports.setEntry = function(key, value) {
	exports.config[key] = value;
	return fs.writeFileSync(fileName, JSON.stringify(exports.config));
}


exports.get = function() {
	return exports.config;
}