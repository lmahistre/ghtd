
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
	};
}


exports.ADD_TASK = function(state, action) {
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