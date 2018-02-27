/**
 * Express is used for routing
 */
const express = require('express');
const app = express();

const fs = require('fs');

const configManager = require("./config-manager.js");
const config = configManager.get();

module.exports = function(callback) {
	/**
	 * Render main html page
	 */
	app.get('/', function (req, res) {
		res.sendFile(__dirname+'/view.html');
	});


	// Routing
	const apiRouter = require('./api-router.js');

	app.use('/api', apiRouter);


	/**
	 * Serve static files
	 */
	app.use('/dist', express.static('dist'));

	// Port the app is listening
	const port = config.port ? config.port : 3000;

	app.listen(port);

	console.log('Server is running on port '+port);
	if (callback && typeof callback === 'function') {
		callback();
	}
}