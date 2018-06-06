const path = require('path');
const appDirName = path.resolve(__dirname+'/..');

module.exports = {
	js : {
		inputFilepath : appDirName+"/src/js/entry.js",
		outputFolder : appDirName +'/public_html',
		outputFilename : 'bundle.js',
	},
	css : {
		inputFolder : appDirName+'/src/less',
		inputFilename : 'index.less',
		outputFolder : appDirName+'/public_html',
		outputFilename : 'style.css',
	},
	test : {
		inputFolder : appDirName+'/src/spec',
	},
};