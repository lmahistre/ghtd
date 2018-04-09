
exports.alerts = {};


exports.pleaseWait = 0;


exports.isInitialized = false;


exports.getAlerts = function () {
	return exports.alerts;
}


exports.setAlerts = function (value) {
	exports.alerts = value;
}


// exports.getPleaseWait

exports.getIsInitialized = function () {
	return exports.isInitialized;
}


exports.setIsInitialized = function (value) {
	exports.isInitialized = value ? true : false;
}