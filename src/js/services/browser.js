const React = require("react");
const ReactDOM = require("react-dom");
const Main = require("../components/main.jsx");

// const stateContainerService = require('./state-container.js');
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
			icon : document.querySelector('head link[rel^=shortcut]').href,
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
		React.createElement(Main, null), 
		document.getElementById('react-root')
	);
}


exports.redirect = function (uri) {
	window.location.href = '#/'+uri;
}


exports.setBackgroundImage = function(url) {
	document.getElementsByTagName('html')[0].style.backgroundImage = "url("+url+")";
}


exports.addServiceWorker = function () {
	if ('serviceWorker' in navigator) {
		console.log('Service Worker registration in progress.');
		navigator.serviceWorker
		.register('sw.js')
		.then(function(registration) {
			console.log('Service Worker registration complete.');
		})
		.catch(function(error) {
			console.log('Service Worker registration failure.', error);
		});
	}
	else {
		console.log('Service Worker is not supported.');
	}
}
