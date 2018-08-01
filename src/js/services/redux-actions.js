
const storageService = require('./storage.js');


exports.init = function() {
	return {
		type : 'INIT',
		tasks : storageService.getTasks(),
		projects : storageService.getProjects(),
		settings : storageService.getSettings(),
	}
}