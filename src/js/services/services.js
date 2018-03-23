
const httpService = require('../services/http.js');

exports.getData = function (callback) {
	httpService.get('/getData', function(response) {
		if (callback && typeof callback == 'function') {
			callback(response.data);
		}
	});
},


exports.saveData = function (callback) {
	const data = {
		tasks : app.state.data.tasks,
		projects : app.state.data.projects,
		settings : app.state.data.settings,
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