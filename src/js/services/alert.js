
const stateContainerService = require('./state-container.js');

exports.error = function (err) {
	stateContainerService.addAlert(err.message ? err.message : err, 'error');
	console.error(err);
}


exports.info = function (msg) {
	stateContainerService.addAlert(msg, 'info');
}


exports.warning = function (msg) {
	stateContainerService.addAlert(msg, 'warning');
}


exports.success = function (msg) {
	stateContainerService.addAlert(msg, 'success');
}