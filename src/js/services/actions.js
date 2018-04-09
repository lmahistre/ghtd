
const httpService = require('../services/http.js');
const browserService = require('../services/browser.js');
const dataContainerService = require('../services/data-container.js');
const stateContainerService = require('../services/state-container.js');

exports.getData = function (callback) {
	httpService.get('/getData', function(response) {
		console.log(response);
		const data = response.data;
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
		stateContainerService.setIsInitialized(true);

		if (callback && typeof callback == 'function') {
			callback(data);
		}
	});
},


exports.saveData = function (callback) {
	const data = {
		tasks : dataContainerService.getTasks(),
		projects : dataContainerService.getProjects(),
		settings : dataContainerService.getSettings(),
	}
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


exports.showAlert = function(type, msg, timeout) {
	exports.state.alerts[type] = msg;
	browserService.render();
	if (timeout && parseInt(timeout) > 0) {
		setTimeout(function() {
			if (exports.state.alerts[type] == msg) {
				exports.state.alerts[type] = null;
				browserService.render();
			}
		}, timeout);
	}
}