
const httpService = require('../services/http.js');
const browserService = require('../services/browser.js');
const dataContainerService = require('../services/data-container.js');
const stateContainerService = require('../services/state-container.js');
const storageService = require('../services/storage.js');

exports.getData = function (callback) {
	storageService.retrieve(function (data) {
		dataContainerService.setDataIsLoaded(true);
		if (data.tasks) {
			for (let k in data.tasks) {
				dataContainerService.setTask(k, data.tasks[k]);
			}
		}
		if (data.projects) {
			for (let k in data.projects) {
				dataContainerService.setProject(k, data.projects[k]);
			}
		}
		if (data.settings) {
			for (let k in data.settings) {
				dataContainerService.setSetting(k, data.settings[k]);
			}
		}
		if (data.tasks || data.projects || data.settings) {
			stateContainerService.setIsInitialized(true);
		}
		browserService.render();
		// console.log(data);

		httpService.get('/getData', function(response) {
			// console.log(response);
			data = response.data;
			stateContainerService.setIsInitialized(true);
			dataContainerService.setDataIsLoaded(true);
			if (data.tasks) {
				for (let k in data.tasks) {
					dataContainerService.setTask(k, data.tasks[k]);
				}
			}
			if (data.projects) {
				for (let k in data.projects) {
					dataContainerService.setProject(k, data.projects[k]);
				}
			}
			if (data.settings) {
				for (let k in data.settings) {
					dataContainerService.setSetting(k, data.settings[k]);
				}
			}

			if (callback && typeof callback == 'function') {
				callback(data);
			}
		});
	});
},


exports.saveData = function (callback) {
	const data = {
		tasks : dataContainerService.getTasks(),
		projects : dataContainerService.getProjects(),
		settings : dataContainerService.getSettings(),
	}
	storageService.save(data);
	httpService.post('/setData', data, function(response) {
		if (callback && typeof callback == 'function') {
			callback(response.data);
		}
	});
}


exports.importProjects = function (callback) {
	httpService.get('/importProjects', function(response) {
		callback(response.data);
	});
}


exports.recompileCss = function(callback) {
	httpService.post('/compileCss', function(response) {
		if (callback && typeof callback == 'function') {
			callback(response.data);
		}
	});
}


exports.recompileJs = function(callback) {
	httpService.post('/compileJs', function(response) {
		if (callback && typeof callback == 'function') {
			callback(response.data);
		}
	});
}