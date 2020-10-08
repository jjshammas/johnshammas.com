const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const styleLoader = {
	loader: "style-loader",
	options: {
		injectType: "linkTag",
	},
};

const cssLoader = {
	loader: "css-loader",
	options: {},
};

const sassLoader = {
	loader: "sass-loader",
	options: {},
};

const postcssLoader = {
	loader: "postcss-loader",
	options: {
		postcssOptions: {
			plugins: ["autoprefixer"],
		},
	},
};

const cssLinkLoader = {
	loader: MiniCssExtractPlugin.loader,
	options: {},
};

const styleRule = {
	test: /\.s[ac]ss$/i,
	use: [cssLinkLoader, cssLoader, postcssLoader, sassLoader],
};

module.exports = [styleRule];
