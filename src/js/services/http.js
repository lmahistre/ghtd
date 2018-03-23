
const browserService = require('./browser.js');

const apiEndpoint = '/api';

const call = function(uri, post, callback) {
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
		return response.text();
	})
	.then(function(responseText) {
		try {
			const responseData = JSON.parse(responseText);

			if (responseData.warning) {
				console.warn(responseData.warning);
			}
			if (responseData.error) {
				browserService.error(responseData.error);
			}
			app.render();
			if (callback && typeof callback === 'function') {
				callback(responseData);
			}
		}
		catch (error) {
			browserService.error(error);
		}
	})
	.catch(function(error) {
		browserService.error(error);
	});
}


exports.get = function(uri, callback) {
	call(apiEndpoint+uri, null, callback);
}


exports.post = function(uri, data, callback) {
	call(apiEndpoint+uri, data, callback);
}
