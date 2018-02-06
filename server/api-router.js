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
	};
	http.get(options, function(res) {
		console.log(res);
	})
	.on('error', function(err) {
		console.error(err);
	});
	res.json({});
});


router.post('/setData', function(req, res) {
	res.json({});
});

module.exports = router;