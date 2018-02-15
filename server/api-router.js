const express = require('express');
const router = express.Router();

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

const https = require('https');

const options = {
	host : 'api.github.com',
	path : "/gists/"+config.gistId,
	headers : {
		'User-Agent' : 'Github-Todo',
	},
};

const filename = 'ght.json';


/**
 * Parses the body and extracts the post data
 */
const reqToPost = function(req, res, callback) {
	var content ='';
	req.on('data', function(data) {
		content+=data;
	});
	req.on('end', function() {
		try {
			const post = JSON.parse(content);
			if (callback && typeof callback == 'function') {
				callback(post);
			}
		}
		catch (err) {
			console.log(err);
			res.send(err);
		}
	});
}


/**
 * Get data from Github
 */
router.get('/getData', function(req, res) {
	https.get(options, function(response) {
		response.setEncoding('utf8');
		let content = '';
		response.on('data', function (chunk) {
			content += chunk;
		});
		response.on('end', function() {
			try {
				const parsedData = JSON.parse(content);
				const gistContent = parsedData.files[filename].content;
				const gistData = JSON.parse(gistContent);
				res.json({
					data : gistData,
				});
			}
			catch (err) {
				res.json({
					error : err,
				});
			}
		});
	})
	.on('error', function(err) {
		console.error(err);
		res.json({
			error : err,
		});
	});
});


/**
 * Send data to Gist
 */
router.post('/setData', function(req, res) {
	reqToPost(req, res, function(post) {
		let reqOptions = JSON.parse(JSON.stringify(options));
		reqOptions.method = 'POST';
		reqOptions.headers['Content-Type'] = 'application/json';
		const postData = JSON.stringify({
			description : "Github-Todo",
			files : {
				[filename] : {
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
						&& parsedData.files[filename]
						&& parsedData.files[filename].content
					) {
						const gistContent = parsedData.files[filename].content;
						const gistData = JSON.parse(gistContent);
						res.json({
							data : gistData,
						});
					}
					else {
						res.json({
							error : "Could not parse API response",
						})
					}
				}
				catch (err) {
					console.error(err);
					res.json({
						error : err,
					})
				}
			});
		})
		.on('error', function(err) {
			console.error(err);
			res.json({
				error : err,
			});
		});

		postReq.write(postData);
		postReq.end();
	});
});


/**
 * Get data from Github
 */
router.get('/importProjects', function(req, res) {
	let reqOptions = JSON.parse(JSON.stringify(options));
	reqOptions.path = '/users/'+config.user+'/repos';
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
				res.json({
					data : projects,
				});
			}
			catch (err) {
				res.json({
					error : err,
				});
			}
		});
	})
	.on('error', function(err) {
		console.error(err);
		res.json({
			error : err,
		});
	});
});


module.exports = router;