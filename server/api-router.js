const express = require('express');
const router = express.Router();

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

const https = require('https');

const options = {
	host : 'api.github.com',
	// port : 443,
	path : "/gists/"+config.gistId,
	// auth : config.user+':'+config.token,
	headers : {
		'User-Agent' : 'GHT',
	},
};


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
		let pageData = '';
		response.on('data', function (chunk) {
			pageData += chunk;
		});
		response.on('end', function(){
			try {
				const parsedData = JSON.parse(pageData);
				const gistContent = parsedData.files['ght.json'].content;
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


router.post('/setData', function(req, res) {
	reqToPost(req, res, function(post) {
		let reqOptions = JSON.parse(JSON.stringify(options));
		reqOptions.method = 'POST';
		reqOptions.headers['Content-Type'] = 'application/json';
		const postData = JSON.stringify(post);
		reqOptions.headers['Content-Length'] = Buffer.byteLength(postData);
		reqOptions.auth = config.user+':'+config.token;
		const postReq = https.request(reqOptions, function(response) {
			response.setEncoding('utf8');
			let pageData = '';
			response.on('data', function (chunk) {
				pageData += chunk;
				// console.log(chunk);
			});
			response.on('end', function(){
				console.log('POST response');
				console.log(pageData);
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

module.exports = router;