const webpack = require('webpack');
const fs = require('fs');


exports.webpack = function(config, callback) {
	const webpackCompiler = webpack(config);
	try {
		webpackCompiler.run(function(err, stats) {
			try {
				if (err) {
					if (callback && typeof callback === 'function') {
						callback(err);
					}
				}
				else if (stats.compilation.errors && stats.compilation.errors.length) {
					if (callback && typeof callback === 'function') {
						callback(stats.compilation.errors);
					}
				}
				else {
					if (callback && typeof callback === 'function') {
						callback(null, true);
					}
				}
			}
			catch (error) {

				if (callback && typeof callback === 'function') {
					callback(error);
				}
			}
		});
	}
	catch (error) {
		if (callback && typeof callback === 'function') {
			callback(error);
		}
	}
};


exports.test = function(config, callback) {
	const jest = require('jest');
	jest.runCLI(config, [config.rootDir]).then(function(success) {
		if (callback && typeof callback === 'function') {
			callback(success);
		}
	});
}