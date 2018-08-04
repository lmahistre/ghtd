
const storageService = require('./storage.js');
const utilsService = require('./utils.js');


exports.init = function() {
	return {
		type : 'INIT',
		tasks : storageService.getTasks(),
		projects : storageService.getProjects(),
		settings : storageService.getSettings(),
	}
}


exports.addTask = function(elt) {
	elt.id = utilsService.getNextTaskId();
	elt.timestampCreated = parseInt(Date.now()/1000);
	elt.timestampModified = elt.timestampCreated;
	return {
		type : 'ADD_TASK',
		task : elt,
	}
}


exports.removeResolvedTasks = function() {
	return {
		type : 'REMOVE_RESOLVED_TASKS',
		currentTimestamp : parseInt(Date.now()/1000),
	}
}


exports.setTaskStatus = function(id, status) {
	return {
		type : 'SET_TASK_STATUS',
		id : id,
		status : status,
		currentTimestamp : parseInt(Date.now()/1000),
	}
}


exports.addProject = function(elt) {
	elt.id = utilsService.getNextProjectId();
	// elt.
	return {
		type : 'SET_PROJECT',
		project : elt,
	}
}


exports.updateProject = function(elt) {
	return {
		type : 'SET_PROJECT',
		project : elt,
	}
}

exports.changeProjectVisibility = function(id) {
	return {
		type : 'SET_PROJECT_VISIBLE',
		id : id,
	}
}