const path = require('path');
const appDirName = path.resolve(__dirname+'/..');

module.exports = {
	js : {
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["env", "react"]
						},
					},
				},
			],
		},
		entry : [
			appDirName+"/src/js/entry.js",
		],
		output : {
			path : appDirName +'/public',
			filename : 'bundle.js',
		},
		optimization : {
			minimize : false,
		},
	},
	test : {
		rootDir : appDirName,
		testMatch : [
			'**/spec/**/?(*.)(spec|test).js?(x)',
		],
		verbose : false,
		transform: {
			"^.+\\.jsx?$": "babel-jest"
		},
	},
	app : {
		port : 3002,
	},
	css : {
		inputFolder : appDirName+'/src/less',
		inputFilename : 'index.less',
		outputFolder : appDirName+'/public',
		outputFilename : 'style.css',
	},
};