
const storageService = require('./storage.js');
const githubService = require('./github.js');
const validateService = require('./validate.js');
const reduxActions = require('./redux-actions.js');
const store = require('./store.js');
const utils = require('./utils.js');

exports.importProjects = function (callback) {
	githubService.getProjects(function(error, data) {
		if (callback && typeof callback === 'function') {
			callback(data);
		}
	});
}

const pullFromGitHub = function (callback) {
	githubService.getGistData(function(error, ghData) {
		if (error) {
			store.dispatch(reduxActions.addAlert('error', error.message));
			callback(false);
		}
		else {
			const localData = storageService.retrieve();
			const mergedData = utils.mergeData(localData, ghData);

			const debugData = {
				local : localData,
				github : ghData,
				merged : mergedData,
			};
			console.log(debugData);

			store.dispatch(reduxActions.setData(mergedData));

			if (callback && typeof callback === 'function') {
				callback(ghData);
			}
		}
	});
}

const saveToGitHub = function (callback) {
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
		githubService.setGistData(validatedData, callback);
	}
	else {
		store.dispatch(reduxActions.addAlert('warning', 'No data to write'));
		if (callback && typeof callback === 'function') {
			callback();
		}
	}
}

exports.syncWithGitHub = function (callback) {
	pullFromGitHub(function (ghData) {
		if (ghData) {
			saveToGitHub(callback);
		}
		else {
			store.dispatch(reduxActions.addAlert('warning', 'No data fetched'));
			if (callback && typeof callback === 'function') {
				callback();
			}
		}
	});
}
