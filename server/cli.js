
const config = require('./compiler-config.js');
const compiler = require('./compiler.js');
const chalk = require('chalk');


exports.dev = function(args) {
	compiler.webpack(config.webpack, function(error, success) {
		if (success) {
			console.log(chalk.green('Successfully compiled'));
		}
		else {
			console.log(chalk.red(error));
		}
	});
}


exports.test = function (args) {
	const jest = require('jest');
	const path = require('path');
	const appDirName = path.resolve(__dirname+'/../src/spec');
	const options = config.test;
	const je = jest.runCLI(options, [options.rootDir]).then(function(success) {
	})
}


exports.build = function(args) {
	compiler.webpack(config.webpack, function(error, success) {
		if (success) {
			console.log(chalk.green('Successfully compiled'));
		}
		else {
			console.log(chalk.red(error));
		}
		exports.test();
	});
}


exports.help = function(args) {
	console.log('Usage: github-todo [OPTION]');
	console.log('Options:');
	for (let k in exports) {
		console.log ('  '+k+ '');
	}
}


exports.start = function(args) {
	const express = require('express');
	const app = express();
	const path = require('path');

	const port = config.app.port || 3002;

	app.get('/', function (req, res) {
		res.sendFile(path.resolve(__dirname+'/../public_html/index.html'));
	});

	// Static files
	app.use('/', express.static(path.resolve(__dirname+'/../public_html')));

	app.listen(port);

	console.log('Server is listening on port '+port);
}


exports.watch = function(args) {
	const watch = require('node-watch');
	console.log('Watching src');
	watch('./src', { 
		recursive: true 
	}, function(evt, name) {
		console.log('%s changed.', name);
		exports.build();
	});
}


exports.default = exports.build;
exports['--help'] = exports['-h'] = exports.help;