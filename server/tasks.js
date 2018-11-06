const webpack = require('webpack');
const fs = require('fs');
const webpack = require('webpack');
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
						resolve();
					}
					else {
						fs.writeFile(config.css.outputFolder+'/'+config.css.outputFilename, output.css, {
							flag:'w+', 
							encoding:'utf8'
						},
						function(err) {
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
			reject(error);
		}
	});
}


exports.js = function() {
	const webpackCompiler = webpack(config.js);
	return new Promise(function(resolve, reject) {
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


exports.test = function (args) {
	const jest = require('jest');
	return jest.runCLI(config.test, [config.test.rootDir]);
}