
const alerts = [];
var pleaseWait = 0;
var isInitialized = false;


exports.getAlerts = function () {
	return alerts;
}


/**
 * types : error
 */
exports.addAlert = function (message, type) {
	if (type !== 'error') {
		type = 'error';
	}
	alerts.push ({
		type,
		message,
	});
}


exports.clearAlert = function () {

}


// exports.getPleaseWait

exports.getIsInitialized = function () {
	return isInitialized;
}


exports.setIsInitialized = function (value) {
	isInitialized = value ? true : false;
}