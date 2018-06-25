
const storageService = require('./storage.js');
const githubService = require('./github.js');
const dataService = require('./data.js');
const validateService = require('./validate.js');
const alertService = require('./alert.js');
const browserService = require('./browser.js');


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


const pullFromGitHub = function (callback) {
	githubService.getGistData(function(error, ghData) {
		if (error) {
			alertService.error(error);
		}
		const localData = storageService.retrieve();
		if (ghData && ghData.tasks) {
			for (let k in ghData.tasks) {
				if ((typeof localData.tasks[k] === 'undefined'
						&& (!localData.timestampSynchronized
							|| localData.timestampSynchronized < ghData.timestampSynchronized)) 
					|| (localData.tasks[k] 
						&& localData.tasks[k].timestampModified < ghData.tasks[k].timestampModified)
				) {
					localData.tasks[k] = ghData.tasks[k];
				}
			}
		}
		if (ghData && ghData.projects) {
			for (let k in ghData.projects) {
				// if (!localData.projects[k] || localData.projects[k].timestampModified < ghData.projects[k].timestampModified) {
				if ((typeof localData.projects[k] === 'undefined'
						&& (!localData.timestampSynchronized
							|| localData.timestampSynchronized < ghData.timestampSynchronized)) 
					|| (localData.projects[k] 
						&& localData.projects[k].timestampModified < ghData.projects[k].timestampModified)
				) {
					localData.projects[k] = ghData.projects[k];
				}
			}
		}
		// Remove deleted tasks
		if (localData.timestampSynchronized && localData.timestampSynchronized < ghData.timestampSynchronized) {
			for (let k in localData.tasks) {
				if (typeof ghData.tasks[k] === 'undefined') {
					delete localData.tasks[k];
				}
			}
		}
		storageService.save(localData);

		if (callback && typeof callback === 'function') {
			callback(ghData);
		}
	});
}


const saveToGitHub = function () {
	const data = storageService.retrieve();
	if (data && data.tasks && data.projects) {
		const validatedData = {
			tasks : {},
			projects : {},
		};
		if (data.tasks) {
			for (let k in data.tasks) {
				validatedData.tasks[k] = validateService.task(data.tasks[k]);
			}
		}
		if (data.projects) {
			for (let k in data.projects) {
				validatedData.projects[k] = validateService.project(data.projects[k]);
			}
		}
		validatedData.timestampSynchronized = parseInt(Date.now()/1000);
		githubService.setGistData(validatedData);
	}
}


exports.syncWithGitHub = function () {
	pullFromGitHub(function (ghData) {
		if (ghData) {
			saveToGitHub();
		}
		else {
			alertService.warning('No data fetched');
			browserService.render();
		}
	});
}
