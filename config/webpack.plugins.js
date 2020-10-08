const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ProgressBarWebpackPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("./site.config");

const copyStatic = new CopyPlugin({
	patterns: [{ from: "../static", to: "" }],
});

const clean = new CleanWebpackPlugin();

// I'll expand this later to loop over all HTML pages if I need more than just root
const html = new HtmlWebpackPlugin({
	filename: "index.html",
	template: "index.ejs",
	inject: true,
	meta: config.META,
});

// Seems like should be able to avoid writing './', but alas not:
// https://github.com/jantimon/favicons-webpack-plugin/issues/137
const favicon = new FaviconsWebpackPlugin({
	logo: "./favicon.svg",
	favicons: {
		appName: config.TITLE,
		appShortName: config.NAME,
		appDescription: config.DESCRIPTION,
		developerName: config.NAME,
		developerURL: config.HOST,
		icons: {
			android: false,
			appleIcon: false,
			appleStartup: false,
			coast: true,
			favicons: true,
			firefox: true,
			windows: true,
			yandex: true,
		},
	},
});

const progress = new ProgressBarWebpackPlugin();

const cssFiles = new MiniCssExtractPlugin({
	filename: "assets/style.[contenthash].css",
});

module.exports = [clean, copyStatic, html, favicon, progress, cssFiles];
