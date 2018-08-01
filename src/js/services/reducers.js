
const clone = require('clone');

// TO REMOVE
exports.removeResolvedTasks = function(tasks) {
	for (let i in tasks) {
		if (tasks[i].status === 'done') {
			tasks[i].status = 'removed';
		}
	}
	return tasks;
}


// TO REMOVE
exports.deleteRemovedTasks = function(tasks, currentTimestamp) {
	for (let i in tasks) {
		if (tasks[i].status === 'removed' && currentTimestamp-tasks[i].timestampModified > 365*86400) {
			delete tasks[i];
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