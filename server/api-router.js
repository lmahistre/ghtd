const express = require('express');
const router = express.Router();


const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

/**
 * Get data from Github
 */
router.get('/getData', function(req, res) {
	const http = require('http');

	const options = {
		host : 'api.github.com',
		port : 80,
		path : "/gists/"+config.gistId,
		auth : config.user+':'+config.token,
	};
	http.get(options, function(response) {
		// for (var k in res) {
		// 	console.log(k);
		// }
		let pageData = '';
		response.on('data', function (chunk) {
			pageData += chunk;
			console.log(chunk);
		});
		response.on('end', function(){
			console.log(pageData);
			res.json({
				data : pageData,
			});
		});
		// console.log(res);
	})
	.on('error', function(err) {
		console.error(err);
		res.json({
			error : err,
		});
	});
});


router.post('/setData', function(req, res) {
	res.json({});
});

module.exports = router;