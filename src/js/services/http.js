
const browserService = require('./browser.js');
const stateContainerService = require('./state-container.js');

const apiEndpoint = '/api';
const queue = [];

const call = function(uri, post, callback) {
	const params = {
		credentials : 'same-origin',
	};
	stateContainerService.increasePleaseWait();
	browserService.render();
	if (post) {
		params.method = 'POST';
		params.headers = {  
			"Content-type": "application/json; charset=UTF-8" 
		};
		params.body = JSON.stringify(post);
	}

	const timeout = function(ms, promise) {
	  return new Promise(function(resolve, reject) {
	    setTimeout(function() {
	      reject(new Error("timeout"))
	    }, ms)
	    promise.then(resolve, reject)
	  })
	}

	timeout(1000,	fetch(uri, params).then(function(response) {
			return response.text();
		})
		.then(function(responseText) {
			try {
				const responseData = JSON.parse(responseText);
				// console.log(responseData);

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
	);
}



exports.get = function(uri, callback) {
	call(apiEndpoint+uri, null, callback);
}


exports.post = function(uri, data, callback) {
	call(apiEndpoint+uri, data, callback);
}
