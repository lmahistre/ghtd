
const alerts = [];
let pleaseWait = 0;
let isInitialized = false;

console.warn('state container service is deprecated')

exports.getAlerts = function () {
	return alerts;
}


/**
 * types : error
 */
exports.addAlert = function (message, type) {
	// if (type !== 'error') {
	// 	type = 'error';
	// }
	alerts.push ({
		type,
		message,
	});
}


exports.clearAlert = function (index) {
	alerts.splice(index, 1);
}


exports.getPleaseWait = function () {
	return pleaseWait;
}


exports.increasePleaseWait = function () {
	pleaseWait++;
}


exports.decreasePleaseWait = function () {
	pleaseWait--;
}
