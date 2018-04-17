
const browserService = require('./services/browser.js');
const actionsService = require('./services/actions.js');
const dataContainerService = require('./services/data-container.js');

window.onload = function() {

	browserService.render();
	actionsService.getData(function(data) {
		dataContainerService.setDataIsLoaded(true);
		browserService.render();
	});
}