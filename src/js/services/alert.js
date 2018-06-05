
const stateContainerService = require('./state-container.js');
// const browserService = require('./browser.js');

exports.error = function (err) {
	stateContainerService.addAlert(err.message ? err.message : err, 'error');
	// exports.render();
	console.error(err);
}