const path = require('path');
// var webpack = require("webpack");

module.exports = {
	mode: 'production',
	entry: {
		'dist/js/bundle': './app/js/index.js',
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, './')
	},
	performance: {
		maxEntrypointSize: 4000000,
		maxAssetSize: 1000000
	},
	devtool: 'source-map'
	/*plugins: [ // fix for moment (momet.js without other locales, only ru)
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
	]*/
};