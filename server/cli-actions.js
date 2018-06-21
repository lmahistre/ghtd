
// const reactAppBase = require('./react-app-base.js');
const config = require('./compiler-config.js');
const compiler = require('./compiler.js');

/**
 * Compile CSS
 */
exports.css = function(args) {
	compiler.css(config.css);
}


/**
 * Compile JS
 */
exports.js = function(args) {
	compiler.js(config.js);
}


/**
 * Compile JS and CSS
 */
exports.compile = function(args) {
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
		compiler.js(mergeConf.js(config.js), function() {
			compiler.css(config.css);
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


exports.jest = function (args) {
	const jest = require('jest');
	const path = require('path');
	const appDirName = path.resolve(__dirname+'/../src/spec');
	const options = config.test;
	const je = jest.runCLI(options, [options.rootDir]).then(function(success) {
	})
}


/**
 * Compile JS
 */
exports.test = exports.jest;


/**
 * Compilation JS et CSS
 */
exports.build = function(args) {
	compiler.js(config.js, function() {
		compiler.css(config.css, function() {
			exports.test();
		});
	});
}


exports.help = function(args) {
	console.log('Usage: github-todo [OPTION]');
	console.log('Options:');
	for (let k in exports) {
		console.log ('  '+k+ '');
	}
}


exports.default = exports.build;
exports['--help'] = exports['-h'] = exports.help;