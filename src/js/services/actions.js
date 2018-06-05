
const storageService = require('./storage.js');
const githubService = require('./github.js');
const dataService = require('./data.js');

exports.importProjects = function (callback) {
	githubService.getProjects(function(error, data) {
		if (callback && typeof callback === 'function') {
			callback(data);
		}
	});
}


exports.removeResolvedTasks = function () {
	const tasks = dataService.getTasks();
	for (let i in tasks) {
		if (tasks[i].status === 'done') {
			delete tasks[i];
		}
	}
	storageService.save({tasks});
}


exports.pullFromGitHub = function () {
	githubService.getGistData(function(ghData) {
		const localData = storageService.retrieve();
		if (ghData.tasks) {
			for (let k in ghData.tasks) {
				if (!localData.tasks[k] || localData.tasks[k].timestampModified < ghData.tasks[k].timestampModified) {
					localData.tasks[k] = ghData.tasks[k];
				}
			}
		}
		if (ghData.projects) {
			for (let k in ghData.projects) {
				if (!localData.projects[k] || localData.projects[k].timestampModified < ghData.projects[k].timestampModified) {
					localData.projects[k] = ghData.projects[k];
				}
			}
		}
		storageService.save(localData);
	});
}


exports.saveToGitHub = function () {
	let data = storageService.retrieve();
	const validatedData = {
		tasks : {},
		projects : {},
	};
	if (data.tasks) {
		for (let k in data.tasks) {
			validatedData.tasks[k] = {
				id : data.tasks[k].id,
				name : data.tasks[k].name,
				projectId : data.tasks[k].projectId,
				status : data.tasks[k].status,
				timestampCreated : isNaN(data.tasks[k].timestampCreated) ? 0 : data.tasks[k].timestampCreated,
				timestampModified : isNaN(data.tasks[k].timestampModified) ? 0 : data.tasks[k].timestampModified,
			}
		}
	}
	if (data.projects) {
		for (let k in data.projects) {
			validatedData.projects[k] = {
				id : data.projects[k].id,
				name : data.projects[k].name,
				visible : data.projects[k].visible,
				color : data.projects[k].color,
				repo : data.projects[k].repo,
				timestampCreated : isNaN(data.projects[k].timestampCreated) ? 0 : data.projects[k].timestampCreated,
				timestampModified : isNaN(data.projects[k].timestampModified) ? 0 : data.projects[k].timestampModified,
			}
		}
	}
	validatedData.timestampSynchronized = parseInt(data.timestampSynchronized);
	githubService.setGistData(validatedData);
}


exports.syncWithGitHub = function () {
}
