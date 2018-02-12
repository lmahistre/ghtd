#!/usr/bin/env nodejs
const compiler = require('./server/compiler.js');
const config = require('./server/compiler-config.js');

const args = process.argv.slice(2);
const actions = ['js', 'css'];

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
