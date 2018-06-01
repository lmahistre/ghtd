
const browserService = require('./browser.js');
const stateContainerService = require('./state-container.js');
const storageService = require('./storage.js');


const config = {
	filename : 'ght.json',
	fileDescription : 'Github-Todo',
	userAgent : 'GHT',
	endPoint : 'https://api.github.com/gists/',
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
	const settings = storageService.getSettings();
	const params = {
		credentials : 'omit',
	};
	stateContainerService.increasePleaseWait();
	browserService.render();
	if (post) {
		params.method = 'PATCH';
		params.body = JSON.stringify(post);
		params.headers = new Headers({  
			'Content-type': "application/json; charset=UTF-8",
			'User-Agent' : config.userAgent,
			'Authorization' : 'Basic '+btoa(settings.user+':'+settings.token),
		});
	}

	fetch(uri, params).then(function(response) {
		return response.text();
	})
	.then(function(responseText) {
		try {
			const responseData = JSON.parse(responseText);
			console.log(responseData);

			if (responseData.warning) {
				console.warn(responseData.warning);
			}
			if (responseData.error) {
				browserService.error(responseData.error);
			}
			if (callback && typeof callback === 'function') {
				callback(responseData);
			}
		}
		catch (error) {
			browserService.error(error);
		}
		stateContainerService.decreasePleaseWait();
		browserService.render();
		return new Promise(function(resolve, reject) {
			resolve(true);
		});
	})
	.catch(function(error) {
		browserService.error(error);
		return new Promise(function(resolve, reject) {
			reject(error);
		});
	})
}


/**
 * Gets Gist data from GitHub
 */
exports.getGistData = function(callback) {
	const settings = storageService.getSettings();
	call(config.endPoint+settings.gistId, null, function(parsedData) {
		const gistContent = parsedData.files[config.filename].content;
		const gistData = JSON.parse(gistContent);
		if (callback && typeof callback === 'function') {
			callback(gistData);
		}
	});
}


exports.setGistData = function(post, callback) {
	const settings = storageService.getSettings();
	const postData = {
		description : config.fileDescription,
		files : {
			[config.filename] : {
				content : JSON.stringify(post),
			},
		},
	};
	call(config.endPoint+settings.gistId, postData, function(parsedData) {
		const gistContent = parsedData.files[config.filename].content;
		const gistData = JSON.parse(gistContent);
		if (callback && typeof callback === 'function') {
			callback(gistData);
		}
	});
}


exports.getProjects = function(callback) {
	const settings = storageService.getSettings();
	call('https://api.github.com/users/'+settings.user+'/repos', null, function(parsedData) {
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


	// let reqOptions = JSON.parse(JSON.stringify(options));
	// reqOptions.path = '/users/'+config.user+'/repos';
	// reqOptions.auth = config.user+':'+config.token;
	// https.get(reqOptions, function(response) {
	// 	response.setEncoding('utf8');
	// 	let content = '';
	// 	response.on('data', function (chunk) {
	// 		content += chunk;
	// 	});
	// 	response.on('end', function() {
	// 		try {
	// 			const parsedData = JSON.parse(content);
	// 			const projects = [];
	// 			for (var i = 0; i < parsedData.length; i++) {
	// 				projects.push({
	// 					name : parsedData[i].name,
	// 				});
	// 			}
	// 			if (callback && typeof callback === 'function') {
	// 				callback(null, projects);
	// 			}
	// 		}
	// 		catch (err) {
	// 			console.error(err);
	// 			if (callback && typeof callback === 'function') {
	// 				callback(err, null);
	// 			}
	// 		}
	// 	});
	// })
	// .on('error', function(err) {
	// 	console.error(err);
	// 	if (callback && typeof callback === 'function') {
	// 		callback(err, null);
	// 	}
	// });
}

