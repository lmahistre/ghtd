
const browserService = require('./services/browser.js');
const actionsService = require('./services/actions.js');
const storageService = require('./services/storage.js');
const dataContainerService = require('./services/data-container.js');
const stateContainerService = require('./services/state-container.js');

window.onload = function() {

	browserService.render();
	// actionsService.getData(function(data) {
	storageService.retrieve(function(data) {
		dataContainerService.setProjects(data.projects);
		dataContainerService.setTasks(data.tasks);
		dataContainerService.setDataIsLoaded(true);
		stateContainerService.setIsInitialized(true);
		browserService.render();
	});
}