const path = require('path');
const appDirName = path.resolve(__dirname+'/..');

module.exports = {
	oldJs : {
		entry: appDirName+"/src/js/entry.js",
		output: {
			path: appDirName +'/dist',
			filename: "bundle.js"
		},
		module: {
			loaders: [
				{
					test: /\.jsx$/,
					loader: 'jsx-loader?insertPragma=React.DOM&harmony',
				},
			],
		},
	},
	js : {
		inputFilepath : appDirName+"/src/js/entry.js",
		outputFolder : appDirName +'/dist',
		outputFilename : 'bundle.js',
	},
	css : {
		inputFolder : appDirName+'/src/less',
		inputFilename : 'index.less',
		outputFolder : appDirName+'/dist',
		outputFilename : 'style.css',
	},
	test : {
		inputFolder : appDirName+'/src/spec',
	},
};