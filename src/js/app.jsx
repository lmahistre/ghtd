
const browserService = require('./services/browser.js');

exports.state = require('./services/state-container.js'),

exports.services = require('./services/services.js'),
exports.consts = require('./services/consts.js'),
exports.utils = require('./services/utils.js'),
exports.actions = require('./services/actions.js'),


exports.init = function() {
	// Focus
	exports.hasFocus = true;
	window.onfocus = function() {
		exports.hasFocus = true;
	};
	window.onblur = function() {
		exports.hasFocus = false;
	};

	exports.render();
	exports.state.isInitialized = false;
	exports.services.getData(function(data) {
		if (data.tasks) {
			for (let k in data.tasks) {
				exports.state.data.tasks[k] = data.tasks[k];
			}
		}
		if (data.projects) {
			for (let k in data.projects) {
				exports.state.data.projects[k] = data.projects[k];
			}
		}
		if (data.settings) {
			for (let k in data.settings) {
				exports.state.data.settings[k] = data.settings[k];
			}
		}
		exports.state.isInitialized = true;
		exports.render();
	});
}


// TO REMOVE
exports.error = browserService.error;
exports.setTitle = browserService.setTitle;
exports.render = browserService.render;


exports.showAlert = function(type, msg, timeout) {
	exports.state.alerts[type] = msg;
	exports.render();
	if (timeout && parseInt(timeout) > 0) {
		setTimeout(function() {
			if (exports.state.alerts[type] == msg) {
				exports.state.alerts[type] = null;
				exports.render();
			}
		}, timeout);
	}
}


// exports.render = function() {
// 	ReactDOM.render(
// 		React.createElement(AppRouter, null), 
// 		document.getElementById('react-root')
// 	);
// }
