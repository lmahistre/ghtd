
const clone = require('clone');


exports.DELETE_REMOVED_TASKS = function(state, action) {
	const newState = clone(state);
	for (let i in newState.tasks) {
		if (newState.tasks[i].status === 'removed' 
				&& action.currentTimestamp-newState.tasks[i].timestampModified > 365*86400) {
			delete newState.tasks[i];
		}
	}
	return tasks;
}


exports.INIT = function(state, action) {
	return {
		tasks : action.tasks,
		projects : action.projects,
		settings : action.settings,
		alerts : [],
		busy : false,
	};
}


exports.SET_TASK = function(state, action) {
	const newState = clone(state);
	if (action.task && action.task.id) {
		newState.tasks[action.task.id] = action.task;
	}
	return newState;
}


exports.SET_TASK_STATUS = function(state, action) {
	const newState = clone(state);
	newState.tasks[action.id].status = action.status;
	newState.tasks[action.id].timestampModified = action.currentTimestamp;
	return newState;
}


exports.REMOVE_RESOLVED_TASKS = function(state, action) {
	const newState = clone(state);
	for (let i in newState.tasks) {
		if (newState.tasks[i].status === 'done') {
			newState.tasks[i].status = 'removed';
			newState.tasks[i].timestampModified = action.currentTimestamp;
		}
	}
	return newState;
}


exports.SET_PROJECT = function(state, action) {
	const newState = clone(state);
	if (action.project && action.project.id) {
		newState.projects[action.project.id] = action.project;
	}
	return newState;
}


exports.SET_PROJECT_VISIBLE = function(state, action) {
	const newState = clone(state);
	newState.projects[action.id].visible = !state.projects[action.id].visible;
	return newState;
}


exports.IMPORT_PROJECTS = function(state, action) {
	const newState = clone(state);
	newState.busy = true;
	return newState;
}


exports.DELETE_PROJECT = function(state, action) {
	const newState = clone(state);
	if (newState.projects && action.id && newState.projects[action.id]) {
		delete newState.projects[action.id];
	}
	return newState;
}

exports.SET_SELECTED_PROJECT = function(state, action) {
	const newState = clone(state);
	newState.settings.projectId = action.id;
	return newState;
}


exports.IMPORT_SETTINGS = function(state, action) {
	const newState = clone(state);
	newState.settings.user = action.settings.user;
	newState.settings.gistId = action.settings.gistId;
	newState.settings.token = action.settings.token;
	return newState;
}


exports.SET_IMPORT_PROJECTS = function(state, action) {
	const newState = clone(state);
	newState.importProjects = action.importProjects ? action.importProjects : [];
	newState.busy = false;
	return newState;
}


exports.ADD_ALERT = function(state, action) {
	const newState = clone(state);
	newState.alerts.push({
		type : action.alertType,
		message : action.message,
	});
	return newState;
}


exports.CLEAR_ALERT = function(state, action) {
	const newState = clone(state);
	if (newState.alerts && newState.alerts[action.index]) {
		delete newState.alerts[action.index];
	}
	return newState;
}