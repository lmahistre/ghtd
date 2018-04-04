
window.app = require("./app.jsx");

const browserService = require('./services/browser.js');
const actionsService = require('./services/actions.js');
const dataContainerService = require('./services/data-container.js');

window.onload = function() {

	browserService.render();
	// app.state.isInitialized = false;
	actionsService.getData(function(data) {
		// app.state.isInitialized = true;
		dataContainerService.setDataIsLoaded(true);
		browserService.render();
	});
}