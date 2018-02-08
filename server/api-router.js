const express = require('express');
const router = express.Router();

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

const https = require('https');

const options = {
	host : 'api.github.com',
	port : 443,
	path : "/gists/"+config.gistId,
	// auth : config.user+':'+config.token,
	headers : {
		'User-Agent' : 'GHT',
	},
};


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
	// const dataToSet = res.body;
	// const 

	https.request(options, function(response) {
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

module.exports = router;