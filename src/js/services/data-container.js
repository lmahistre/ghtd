let importProjects = [];
let importProjectsIsLoaded = false;
let projects = {};
let tasks = {};
let settings = {};
let dataIsLoaded = false;
let timestampSynchronized = 0;


exports.getImportProjects = function () {
	return importProjects;
}


exports.setImportProjects = function (value) {
	importProjects = value;
}


exports.addImportProject = function (value) {
	importProjects.push(value);
}


exports.getImportProjectsIsLoaded = function () {
	return importProjectsIsLoaded;
}


exports.setImportProjectsIsLoaded = function (value) {
	importProjectsIsLoaded = value ? true : false;
}


exports.getProjects = function () {
	return projects;
}


exports.getProject = function (id) {
	return projects[id];
}


exports.setProjects = function (value) {
	projects = value;
}


exports.setProject = function (id, obj) {
	projects[id] = obj;
}


exports.deleteProject = function(id) {
	if (projects[id]) {
		delete projects[id];
		return true;
	}
	return false;
}


exports.getTasks = function () {
	return tasks;
}


exports.setTasks = function (value) {
	tasks = value;
}


exports.getTask = function (id) {
	return tasks[id];
}


exports.setTask = function (id, obj) {
	tasks[id] = obj;
}


exports.deleteTask = function(id) {
	if (tasks[id]) {
		delete tasks[id];
		return true;
	}
	return false;
}


exports.getSettings = function () {
	return settings;
}


exports.setSettings = function (value) {
	settings = value;
}


exports.setSetting = function (id, obj) {
	settings[id] = obj;
}


exports.getDataIsLoaded = function () {
	return dataIsLoaded;
}


exports.setDataIsLoaded = function (value) {
	dataIsLoaded = value ? true : false;
}
