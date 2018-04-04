
// TODO : remove
exports.data = {
	tasks : {},
	projects : {},
	settings : {},
}


// TODO : remove
exports.alerts = {};


exports.pleaseWait = 0;


exports.isInitialized = false;


exports.getData = function () {
	return exports.data;
}


exports.setData = function (value) {
	exports.data = value;
}


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