const tasks = require('./tasks.js');
const config = require('./compiler-config.js');
const chalk = require('chalk');


exports.css = function (args) {
	tasks.css().then(function() {
		console.log(chalk.green('CSS successfully compiled'));
	}).catch(function(error) {
		console.log(chalk.red(error));
	});
}


exports.js = function (args) {
	tasks.js().then(function() {
		console.log(chalk.green('JS successfully compiled'));
	}).catch(function(error) {
		console.log(chalk.red(error));
	});
}

exports.dev = function(args) {
	tasks.js().then(tasks.css);
}

exports.test = function (args) {
	tasks.test();
}

exports.build = function(args) {
	tasks.js().then(tasks.css).then(tasks.test);
}

exports.start = function(options) {
	tasks.start(options['--port'] || options['-p']).then(function(port) {
		console.log(chalk.green('Server is listening on port '+port));
	});
}

exports.watch = function(args) {
	const watch = require('node-watch');
	console.log('Watching src');
	watch('./src/js', { 
		recursive: true 
	}, function(evt, name) {
		console.log('%s changed.', name);
		tasks.js().then(function() {
			console.log(chalk.green('JS successfully compiled'));
		}).catch(function(error) {
			console.log(chalk.red(error));
		});
	});
	watch('./src/less', { 
		recursive: true 
	}, function(evt, name) {
		console.log('%s changed.', name);
		tasks.css().then(function() {
			console.log(chalk.green('CSS successfully compiled'));
		}).catch(function(error) {
			console.log(chalk.red(error));
		});
	});
}

exports.version = function() {
	const consts = require('../src/js/services/consts');
	console.log(chalk.green('Version ' + consts.version));
}

exports.error = function(error) {
	console.log(chalk.red(error));
}

exports.default = function() {
	console.log(chalk.yellow('No action specified'));
}
