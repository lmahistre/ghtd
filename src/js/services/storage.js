
const browserService = require('./browser.js');

let localStorage = window && window.localStorage ? window.localStorage : null;


exports.setDependencies = function (deps) {
	if (deps.localStorage) {
		localStorage = deps.localStorage;
	}
}


exports.save = function (data) {
	for (let k in data) {
		localStorage[k] = JSON.stringify(data[k]);
	}
}


exports.retrieve = function (callback) {
	const data = {}
	let keys = ['tasks', 'projects'];
	for (let i in keys) {
		try {
			if (localStorage[keys[i]]) {
				data[keys[i]] = JSON.parse(localStorage[keys[i]]);
			}
		}
		catch (error) {
			browserService.error(error);
		}
	}
	if (callback && typeof callback === 'function') {
		callback(data);
	}
}


exports.getImportProjects = function (callback) {
	var importProjects;
	try {
		if (localStorage.importProjects) {
			importProjects = JSON.parse(localStorage.importProjects);
		}
	}
	catch (error) {
		browserService.error(error);
	}
	if (callback && typeof callback === 'function') {
		callback(importProjects);
	}
}


exports.getSettings = function () {
	try {
		if (localStorage.settings) {
			let settings = JSON.parse(localStorage.settings);
			return settings;
			// if (callback && typeof callback === 'function') {
			// 	callback(importProjects);
			// }
		}
		else {
			return null;
		}
	}
	catch (error) {
		return null;
	}
}