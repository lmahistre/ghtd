
const reduxActions = require('./redux-actions.js');
const store = require('./store.js');

const config = {
	site : 'https://api.github.com',
}


const timeout = function(ms, promise) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			reject(new Error("timeout"))
		}, ms)
		promise.then(resolve, reject)
	})
}


const call = function(uri, post, callback) {
	const state = store.getState();
	const settings = state.settings;
	const params = {
		credentials : 'omit',
	};

	if (post) {
		params.method = 'PATCH';
		params.body = JSON.stringify(post);
		params.headers = new Headers({  
			'Content-type': "application/json; charset=UTF-8",
			'User-Agent' : settings.appName,
			'Authorization' : 'Basic '+btoa(settings.user+':'+settings.token),
		});
	}

	fetch(uri, params).then(function(response) {
		return response.text();
	})
	.then(function(responseText) {
		try {
			const responseData = JSON.parse(responseText);
			if (responseData.warning) {
				console.warn(responseData.warning);
			}
			if (responseData.error) {
				store.dispatch(reduxActions.addAlert('error', responseData.error));
			}
			if (callback && typeof callback === 'function') {
				callback(responseData);
			}
		}
		catch (error) {
			store.dispatch(reduxActions.addAlert('error', error));
		}

		return new Promise(function(resolve, reject) {
			resolve(true);
		});
	})
	.catch(function(error) {
		// alertService.error(error);
		store.dispatch(reduxActions.addAlert('error', error));
		return new Promise(function(resolve, reject) {
			reject(error);
		});
	})
}


/**
 * Gets Gist data from GitHub
 */
exports.getGistData = function(callback) {
	const state = store.getState();
	const settings = state.settings;
	call(config.site+'/gists/'+settings.gistId, null, function(parsedData) {
		try {
			const gistContent = parsedData.files[settings.fileName].content;
			const gistData = JSON.parse(gistContent);
			if (callback && typeof callback === 'function') {
				callback(null, gistData);
			}
		}
		catch (error) {
			callback(error);
		}
	});
}


exports.setGistData = function(post, callback) {
	const state = store.getState();
	const settings = state.settings;
	const postData = {
		description : settings.appName,
		files : {
			[settings.fileName] : {
				content : JSON.stringify(post),
			},
		},
	};
	call(config.site+'/gists/'+settings.gistId, postData, function(parsedData) {
		const gistContent = parsedData.files[settings.fileName].content;
		const gistData = JSON.parse(gistContent);
		if (callback && typeof callback === 'function') {
			callback(gistData);
		}
	});
}


exports.getProjects = function(callback) {
	const state = store.getState();
	const settings = state.settings;
	call(config.site+'/users/'+settings.user+'/repos', null, function(parsedData) {
		try {
			const projects = [];
			for (var i = 0; i < parsedData.length; i++) {
				projects.push({
					name : parsedData[i].name,
				});
			}
			if (callback && typeof callback === 'function') {
				callback(null, projects);
			}
		}
		catch (err) {
			console.error(err);
			if (callback && typeof callback === 'function') {
				callback(err, null);
			}
		}
	});
}

