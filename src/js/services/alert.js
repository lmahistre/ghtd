
const stateContainerService = require('./state-container.js');

exports.error = function (err) {
	stateContainerService.addAlert(err.message ? err.message : err, 'error');
	exports.render();
	console.error(err);
}