
const browserService = require('./services/browser.js');
const actionsService = require('./services/actions.js');
const dataContainerService = require('./services/data-container.js');
const stateContainerService = require('./services/state-container.js');

window.onload = function() {

	// browserService.render();
	// actionsService.getData(function(data) {
		dataContainerService.setDataIsLoaded(true);
		stateContainerService.setIsInitialized(true);
		browserService.render();
	// });
}