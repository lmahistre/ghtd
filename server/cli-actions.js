
const reactAppBase = require('react-app-base');
const config = require('./compiler-config.js');
const compiler = require('./compiler.js');

/**
 * Compile CSS
 */
exports.css = function(args) {
	// const compiler = require('./compiler.js');
	reactAppBase.css(config.css);
}


/**
 * Compile JS
 */
exports.js = function(args) {
	reactAppBase.js(config.js);
}


/**
 * Compile JS and CSS
 */
exports.compile = function(args) {
	if (args.length) {
		if (args[0] === 'js') {
			reactAppBase.js(config.js);
		}
		else if (args[0] === 'css') {
			reactAppBase.css(config.css);
		}
		else {
			console.log('Invalid argument '+args[0]);
		}
	}
	else {
		reactAppBase.js(config.js, function() {
			reactAppBase.css(config.css);
		});
	}
}


// /**
//  * Run unit tests
//  */
// exports.jasmine = function(args) {
// 	const Jasmine = require('jasmine');
// 	const jasmine = new Jasmine();

// 	jasmine.loadConfig({
// 		spec_dir: 'src/spec',
// 		spec_files: [
// 			'utils.test.js',
// 		],
// 		helpers: [
// 			// 'helpers/**/*.js'
// 		]
// 	});

// 	jasmine.onComplete(function(passed) {
// 		console.log(' --- ')
// 		if(passed) {
// 			console.log('All tests pass');
// 		}
// 		else {
// 			console.log('At least one test failed');
// 		}
// 	});

// 	jasmine.execute();
// }


// exports.jest = function (args) {
// 	const jest = require('jest');
// 	const path = require('path');
// 	const appDirName = path.resolve(__dirname+'/../src/spec');
// 	var options = {
// 		rootDir : appDirName,
// 		testMatch : [
// 			'**/__tests__/**/*.js?(x)', 
// 			'**/?(*.)(spec|test).js?(x)'
// 		],
// 	}

// 	var je = jest.runCLI(options, [options.rootDir]).then(function(success) {
// 		console.log('youpi');
// 		console.log(success);
// 	})
// 	// console.log(je);
// }


/**
 * Compile JS
 */
exports.test = function(args) {
	reactAppBase.test(config.test);
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
				let projectName = data.tasks[id].projectId;
				if (data.projects[data.tasks[id].projectId]) {
					projectName = data.projects[data.tasks[id].projectId].name;
				}
				console.log('\x1b[32m%s\x1b[0m', "["+projectName+"]", data.tasks[id].name);
			}
		}
	});
}


/**
 * Compilation JS et CSS
 */
exports.build = function(args) {
	reactAppBase.js(config.js, function() {
		reactAppBase.css(config.css, function() {
			exports.test();
		});
	});
}


exports.default = exports.server;