
const config = require('./compiler-config.js');
const compiler = require('./compiler.js');


exports.dev = function(args) {
	compiler.webpack(config.webpack, function(error, success) {
		if (success) {
			console.log('Successfully compiled');
		}
		else {
			console.log(error);
		}
	});
}


// exports.dev = function(args) {
// 	compiler.css(config.css, function(error, success) {
// 		if (success) {
// 			console.log('CSS successfully compiled');
// 		}
// 		else {
// 			console.log(error);
// 		}
// 		config.js.mode = 'development';
// 		compiler.js(config.js, function(error, success) {
// 			if (success) {
// 				console.log('JS successfully compiled');
// 			}
// 			else {
// 				console.log(error);
// 			}
// 		});
// 	});
// }


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
			console.log('Successfully compiled');
		}
		else {
			console.log(error);
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


exports.default = exports.build;
exports['--help'] = exports['-h'] = exports.help;