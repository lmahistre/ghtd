#!/usr/bin/env nodejs

/**
 * Express is used for routing
 */
const express = require('express');
const app = express();

const fs = require('fs');

/**
 * Render main html page
 */
app.get('/', function (req, res) {
	res.sendFile(__dirname+'/index.html');
});

const apiRouter = require('./services/api-router.js');
app.use('/api', apiRouter);

/**
 * Serve static files
 */
app.use('/dist', express.static('dist'));

// Port the app is listening
const port = 3002;

app.listen(port);

console.log('Server is running on port '+port);