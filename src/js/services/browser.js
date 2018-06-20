const React = require("react");
const ReactDOM = require("react-dom");
const AppRouter = require("../components/app-router.jsx");

const stateContainerService = require('./state-container.js');
const constsService = require('./consts.js');

/**
 * Set the title of the document
 */
exports.setTitle = function (str) {
	var baseTitle = constsService.appName;
	var title = baseTitle;
	if (str && str.length > 0) {
		title += ' - '+str;
	}
	document.title = title;
}


exports.notify = function (msg) {
	if (window.Notification) {
		var options = {
			// icon : $('head link[rel^=shortcut]').attr('href'),
		};

		if (Notification.permission === "granted") {
			var notification = new Notification(msg, options);
		}
		else if (Notification.permission !== "denied") {
			Notification.requestPermission(function (permission) {
				if (permission === "granted") {
					var notification = new Notification(msg, options);
				}
			});
		}
	}
}


exports.render = function () {
	ReactDOM.render(
		React.createElement(AppRouter, null), 
		document.getElementById('react-root')
	);
}


exports.redirect = function (uri) {
	window.location.href = '#/'+uri;
}