const webpack = require('webpack');
const fs = require('fs');
const config = require('./compiler-config.js');

exports.css = function() {
	const less = require('less');
	return new Promise(function(resolve, reject) {
		try {
			fs.readFile(config.css.inputFolder+'/'+config.css.inputFilename, { 
				encoding: 'utf8' 
			}, 
			function(err, data) {
				if (err) {
					reject(err);
				}
				less.render(data, {
					paths: [config.css.inputFolder+'/'],
					filename: './'+config.css.inputFilename,
					compress: false,
				},
				function (e, output) {
					if (e) {
						reject(e);
					}
					else {
						fs.writeFile(config.css.outputFolder+'/'+config.css.outputFilename, output.css, {
							flag:'w+', 
							encoding:'utf8'
						},
						function(err, stg) {
							console.log(err);
							console.log(stg);
							if (err) {
								reject(err);
							}
							else {
								resolve();
							}
						});
					}
				});
			});
		}
		catch(err) {
			reject(err);
		}
	});
}

exports.js = function() {
	return new Promise(function(resolve, reject) {
		const webpackCompiler = webpack(config.js);
		try {
			webpackCompiler.run(function(err, stats) {
				try {
					if (err) {
						reject(err);
					}
					else if (stats.compilation.errors && stats.compilation.errors.length) {
						reject(stats.compilation.errors);
					}
					else {
						resolve();
					}
				}
				catch (error) {
					reject(error);
				}
			});
		}
		catch (error) {
			reject(error);
		}
	});
}

exports.test = function () {
	const jest = require('jest');
	return jest.runCLI(config.test, [config.test.rootDir]);
}

const reqToPost = function(req, res, callback) {
	let content ='';
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
			callback({});
		}
	});
}

exports.start = function (portOption) {
	return new Promise(function(resolve, reject) {
		try {
			const express = require('express');
			const app = express();
			const path = require('path');

			const port = parseInt(portOption) || config.app.port || 3002;

			app.get('/', function (req, res) {
				res.sendFile(path.resolve(__dirname+'/../public/index.html'));
			});

			app.use('/', express.static(path.resolve(__dirname+'/../public')));
			app.post('/debug', function(req, res) {
				reqToPost(req, res, function(post) {
					console.log(post);
					res.end();
				});
			});

			app.use('/api', require('./api-router'));

			app.listen(port);
			resolve(port);
		}
		catch (error) {
			reject(error);
		}
	});
}

exports.createDb = function() {
	const Sequelize = require('sequelize');
	const sequelize = new Sequelize(config.db.sequelize);
	const defs = require('../services/db-defs');
	const mods = {};
	for (let k in defs) {
		mods[k] = sequelize.define(k, defs[k], config.db.table);
	}
	return sequelize.sync();
}
