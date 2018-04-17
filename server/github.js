
const https = require('https');

const configManager = require("./config-manager.js");
const config = configManager.get();

const options = {
	host : 'api.github.com',
	path : "/gists/"+config.gistId,
	headers : {
		'User-Agent' : 'Github-Todo',
	},
};


/**
 * Gets Gist data from GitHub
 */
exports.getGistData = function(callback) {
	options.auth = config.user+':'+config.token;
	https.get(options, function(response) {
		response.setEncoding('utf8');
		let content = '';
		response.on('data', function (chunk) {
			content += chunk;
		});
		response.on('end', function() {
			let parsedData;
			try {
				parsedData = JSON.parse(content);
				console.log(content);
				const gistContent = parsedData.files[config.filename].content;
				const gistData = JSON.parse(gistContent);
				if (callback && typeof callback === 'function') {
					callback(null, gistData);
				}
			}
			catch (err) {
				if (parsedData && parsedData.message) {
					console.error(parsedData.message);
					if (callback && typeof callback === 'function') {
						callback(parsedData.message, null);
					}
				}
				else {
					console.error(err);
					if (callback && typeof callback === 'function') {
						callback(err, null);
					}
				}
			}
		});
	})
	.on('error', function(err) {
		console.error(err);
		if (callback && typeof callback === 'function') {
			callback(err, null);
		}
	});
}


exports.getProjects = function(callback) {
	let reqOptions = JSON.parse(JSON.stringify(options));
	reqOptions.path = '/users/'+config.user+'/repos';
	reqOptions.auth = config.user+':'+config.token;
	https.get(reqOptions, function(response) {
		response.setEncoding('utf8');
		let content = '';
		response.on('data', function (chunk) {
			content += chunk;
		});
		response.on('end', function() {
			try {
				const parsedData = JSON.parse(content);
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
	})
	.on('error', function(err) {
		console.error(err);
		if (callback && typeof callback === 'function') {
			callback(err, null);
		}
	});
}


exports.setGistData = function(post, callback) {
	let reqOptions = JSON.parse(JSON.stringify(options));
	reqOptions.method = 'POST';
	reqOptions.headers['Content-Type'] = 'application/json';
	const postData = JSON.stringify({
		description : "Github-Todo",
		files : {
			[config.filename] : {
				content : JSON.stringify(post),
			},
		},
	});
	reqOptions.headers['Content-Length'] = Buffer.byteLength(postData);
	reqOptions.auth = config.user+':'+config.token;

	const postReq = https.request(reqOptions, function(response) {
		response.setEncoding('utf8');
		let content = '';
		response.on('data', function (chunk) {
			content += chunk;
		});
		response.on('end', function(){
			try {
				const parsedData = JSON.parse(content);
				if (parsedData 
					&& parsedData.files 
					&& parsedData.files[config.filename]
					&& parsedData.files[config.filename].content
				) {
					const gistContent = parsedData.files[config.filename].content;
					const gistData = JSON.parse(gistContent);
					if (callback && typeof callback === 'function') {
						callback(null, gistData);
					}
				}
				else {
					throw	"Could not parse API response";
				}
			}
			catch (err) {
				console.error(err);
				if (callback && typeof callback === 'function') {
					callback(err, null);
				}
			}
		});
	})
	.on('error', function(err) {
		console.error(err);
		if (callback && typeof callback === 'function') {
			callback(err, null);
		}
	});

	postReq.write(postData);
	postReq.end();
}