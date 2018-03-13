
/**
 * Compile CSS
 */
exports.css = function(args) {
	const compiler = require('./compiler.js');
	const config = require('./compiler-config.js');
	compiler.css(config.css);
}


/**
 * Compile JS
 */
exports.js = function(args) {
	const compiler = require('./compiler.js');
	const config = require('./compiler-config.js');
	compiler.js(config.js);
}


/**
 * Compile JS and CSS
 */
exports.compile = function(args) {
	const compiler = require('./compiler.js');
	const config = require('./compiler-config.js');
	if (args.length) {
		if (args[0] === 'js') {
			compiler.js(config.js);
		}
		else if (args[0] === 'css') {
			compiler.css(config.css);
		}
		else {
			console.log('Invalid argument '+args[0]);
		}
	}
	else {
		compiler.js(config.js, function() {
			compiler.css(config.css);
		});
	}
}


/**
 * Run unit tests
 * TODO
 */
exports.test = function(args) {
	var Jasmine = require('jasmine');
	var jasmine = new Jasmine();

	jasmine.loadConfig({
		spec_dir: 'src/spec',
		spec_files: [
			'test.js',
		],
		helpers: [
			// 'helpers/**/*.js'
		]
	});

	jasmine.onComplete(function(passed) {
		console.log(' --- ')
		if(passed) {
			console.log('Tous les tests passent');
		}
		else {
			console.log('Au moins un test a échoué');
		}
	});

	jasmine.execute();
}


/**
 * Start webserver
 */
exports.server = function(args) {
	const server = require('./server.js')();
}


/**
 * Display currently active tasks in command line
 */
exports.tasks = function(args) {
	const github = require('./github.js');
	github.getGistData(function(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			for (let id in data.tasks) {
				console.log("["+data.tasks[id].projectName+"] "+data.tasks[id].name);
			}
		}
	});
}


exports.default = function() {
	const compiler = require('./compiler.js');
	const config = require('./compiler-config.js');
	const server = require('./server.js');
	compiler.js(config.js, function() {
		compiler.css(config.css, server);
	});
}