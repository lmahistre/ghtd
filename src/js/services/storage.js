
const constsService = require('./consts.js');

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


exports.retrieve = function () {
	const data = {}
	try {
		data.tasks = localStorage.tasks ? JSON.parse(localStorage.tasks) : {};
		data.projects = localStorage.projects ? JSON.parse(localStorage.projects) : {};
		data.timestampSynchronized = isNaN(localStorage.timestampSynchronized) ? 0 : parseInt(localStorage.timestampSynchronized);
	}
	catch (error) {
		store.dispatch(reduxActions.addAlert('error', error));
	}
	return data;
}


exports.getTimestampSynchronized = function () {
	try {
		if (localStorage.timestampSynchronized) {
			let timestampSynchronized = JSON.parse(localStorage.timestampSynchronized);
			return timestampSynchronized;
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
		if (localStorage.tasks) {
			let tasks = JSON.parse(localStorage.tasks);
			return tasks;
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
		if (localStorage.projects) {
			let projects = JSON.parse(localStorage.projects);
			return projects;
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
		store.dispatch(reduxActions.addAlert('error', error));
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
		settings.appName = constsService.appName;
	}
	if (!settings.fileName) {
		settings.fileName = constsService.fileName;
	}
	if (!settings.language) {
		settings.language = 'en';
	}
	if (!settings.theme) {
		settings.theme = 'light';
	}
	return settings;
}