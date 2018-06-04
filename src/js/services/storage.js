
const browserService = require('./browser.js');
const alertService = require('./alert.js');

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
	try {
		data.tasks = JSON.parse(localStorage.tasks);
		data.projects = JSON.parse(localStorage.projects);
		data.timestampSynchronized = parseInt(localStorage.timestampSynchronized);
	}
	catch (error) {
		alertService.error(error);
	}
	if (callback && typeof callback === 'function') {
		callback(data);
	}
	return data;
}


exports.getTimestampSynchronized = function () {
	try {
		if (localStorage.settings) {
			let settings = JSON.parse(localStorage.timestampSynchronized);
			return settings;
		}
		else {
			return {};
		}
	}
	catch (error) {
		return {};
	}
}


exports.getTasks = function () {
	try {
		if (localStorage.settings) {
			let settings = JSON.parse(localStorage.tasks);
			return settings;
		}
		else {
			return {};
		}
	}
	catch (error) {
		return {};
	}
}


exports.getProjects = function () {
	try {
		if (localStorage.settings) {
			let settings = JSON.parse(localStorage.projects);
			return settings;
		}
		else {
			return {};
		}
	}
	catch (error) {
		return {};
	}
}


exports.getImportProjects = function (callback) {
	var importProjects = [];
	try {
		if (localStorage.importProjects) {
			importProjects = JSON.parse(localStorage.importProjects);
		}
	}
	catch (error) {
		alertService.error(error);
	}
	return importProjects;
}


exports.getSettings = function () {
	var settings = {};
	try {
		if (localStorage.settings) {
			settings = JSON.parse(localStorage.settings);
		}
	}
	catch (error) {}
	if (!settings.appName) {
		settings.appName = 'GHT';
	}
	if (!settings.fileName) {
		settings.fileName = 'ght.json';
	}
	return settings;
}