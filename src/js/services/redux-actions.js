
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
		type : 'SET_TASK',
		task : elt,
	}
}


exports.updateTask = function(elt) {
	// elt.timestampModified = parseInt(Date.now()/1000);
	return {
		type : 'SET_TASK',
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

exports.setBusy = function(busy) {
	return {
		type : 'SET_BUSY',
		busy : busy ? true : false,
	}
}

exports.setSelectedProject = function(id) {
	return {
		type : 'SET_SELECTED_PROJECT',
		id : id,
	}
}


exports.deleteProject = function(id) {
	return {
		type : 'DELETE_PROJECT',
		id : id,
	}
}


exports.importSettings = function(settings) {
	return {
		type : 'IMPORT_SETTINGS',
		settings : settings,
	}
}


exports.setImportProjects = function(elts) {
	return {
		type : 'SET_IMPORT_PROJECTS',
		importProjects : elts,
	}
}


exports.addAlert = function(type, msg) {
	const types = ['info', 'warning', 'success', 'error'];
	return {
		type : 'ADD_ALERT',
		message : msg,
		alertType : types.indexOf(type) > -1 ? type : 'error',
	}
}


exports.clearAlert = function(index) {
	return {
		type : 'CLEAR_ALERT',
		index : index,
	}
}


exports.updateSettings = function(elt) {
	return {
		type : 'SET_SETTINGS',
		settings : elt,
	}
}


exports.setData = function(data) {
	return {
		type : 'SET_DATA',
		tasks : data.tasks,
		projects : data.projects,
	}
}


exports.endSync = function(data) {
	return {
		type : 'END_SYNC',
	}
}