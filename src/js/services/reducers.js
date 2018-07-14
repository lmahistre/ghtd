
exports.removeResolvedTasks = function(tasks) {
	for (let i in tasks) {
		if (tasks[i].status === 'done') {
			tasks[i].status = 'removed';
		}
	}
	return tasks;
}


exports.deleteRemovedTasks = function(tasks, currentTimestamp) {
	for (let i in tasks) {
		if (tasks[i].status === 'removed' && currentTimestamp-tasks[i].timestampModified > 365*86400) {
			delete tasks[i];
		}
	}
	return tasks;
}
