const path = require('path');
const appDirName = path.resolve(__dirname+'/..');

// const resolve = relativePath => path.resolve(__dirname, '..', relativePath)
// const resolve = function(relativePath) {
// 	path.resolve(__dirname, '..', relativePath);
// }

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	webpack : {
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
				{
					test : /\.less$/,
					use : [
						{ 
							loader : MiniCssExtractPlugin.loader 
						},
						{
							loader : 'css-loader',
						},
						{
							loader : 'less-loader',
						},
					],
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					loader: 'file-loader?name=fonts/[name].[ext]'
				}
			],
		},
		entry : [
			appDirName+"/src/js/entry.js",
			appDirName+"/src/less/index.less",
		],
		output : {
			path : appDirName +'/public_html',
			filename : 'bundle.js',
		},
		optimization : {
			minimize : false,
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "style.css",
			}),
			new CleanWebpackPlugin([
				appDirName+'/public_html/fonts',
				appDirName+'/public_html/bundle.js',
				appDirName+'/public_html/style.css',
			], {
				allowExternal : true,
			}),
		],
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
};