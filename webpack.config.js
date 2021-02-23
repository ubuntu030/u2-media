const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader", "source-map-loader"]
			},
			{
				test: /\.(png|jpe?g|gif|ico)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						}
					},
				],
			},
			{
				test: /\.(ogg|mp3|wav|mpe?g|mov|mp4)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						}
					},
				],
			}
		]
	},
	devtool: false,
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
		}),
		new webpack.SourceMapDevToolPlugin({}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
			DEBUG: true,
		})
	]
}