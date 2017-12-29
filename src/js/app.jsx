const React = require("react");
const ReactDOM = require("react-dom");
const AppPage = require("./components/app-page.jsx");
const AppRouter = require("./components/app-router.jsx");

module.exports = {

	state : {
		data : {
			tasks : {},
			projects : {},
		},
		alerts : {},
		pleaseWait : 0,
		isInitialized : false,
	},

	apiEndpoint : 'main.php',

	services : require('./services.jsx'),
	consts : require('./consts.jsx'),

	init : function() {

		// Focus
		app.hasFocus = true;
		window.onfocus = function() {
			app.hasFocus = true;
		};
		window.onblur = function() {
			app.hasFocus = false;
		};

		app.render();
		app.state.isInitialized = false;
		app.services.getData(function(data) {
			if (data.tasks) {
				for (let k in data.tasks) {
					app.state.data.tasks[k] = data.tasks[k];
				}
			}
			if (data.projects) {
				for (let k in data.projects) {
					app.state.data.projects[k] = data.projects[k];
				}
			}
			app.state.isInitialized = true;
			app.render();
		});
	},


	error : function(err) {
		app.showAlert('error', err);
		console.error(err);
	},


	fetch : function(uri, post, callback) {
		// app.startPleaseWait();
		const params = {
			credentials : 'same-origin',
		};
		if (post) {
			params.method = 'POST';
			params.headers = {  
				"Content-type": "application/json; charset=UTF-8" 
			};
			// params.body = post;
			params.body = JSON.stringify(post);
		}
		fetch(uri, params).then(function(response) {
			// app.endPleaseWait();
			return response.text();
		})
		.then(function(responseText) {
			try {
				const responseData = JSON.parse(responseText);

				// if (!responseData.logged_in) {
				// 	delete app.state.currentUser;
				// }

				if (responseData.warning) {
					console.warn(responseData.warning);
				}
				if (responseData.error) {
					app.error(responseData.error);
				}
				app.render();
				if (callback && typeof callback === 'function') {
					callback(responseData);
				}
			}
			catch (error) {
				app.error(error);
			}
		})
		.catch(function(error) {
			app.error(error);
		});
	},


	/**
	 * Get format : index.php/[controller]/[action]/[id/param]
	 */
	get : function(uri, callback) {
		app.fetch(app.apiEndpoint+uri, null, callback);
	},

	
	post : function(uri, data, callback) {
		app.fetch(app.apiEndpoint+uri, data, callback);
	},


	showAlert : function(type, msg, timeout) {
		app.state.alerts[type] = msg;
		app.render();
		if (timeout && parseInt(timeout) > 0) {
			setTimeout(function() {
				if (app.state.alerts[type] == msg) {
					app.state.alerts[type] = null;
					app.render();
				}
			}, timeout);
		}
	},


	render : function() {
		ReactDOM.render(<AppRouter />, document.getElementById('react-root'));
	},


	startPleaseWait : function() {
	// 	app.pleaseWait++;
	// 	$('.please-wait').show();
	},


	endPleaseWait : function() {
	// 	app.pleaseWait--;
	// 	if (app.pleaseWait < 0) {
	// 		app.pleaseWait = 0;
	// 	}
	// 	if (!app.pleaseWait) {
	// 		$('.please-wait').hide();
	// 	}
	},


	setTitle : function(str) {
		var baseTitle = 'GHT';
		var title = baseTitle;
		if (str.length > 0) {
			title += ' - '+str;
		}
		document.title = title;
	},


	/**
	 * Envoie une notification
	 */
	notify : function(msg) {
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
	},
};


