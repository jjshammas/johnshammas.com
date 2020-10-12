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
			plugins: ["autoprefixer", "postcss-combine-media-query"],
		},
	},
};

const cssLinkLoader = {
	loader: MiniCssExtractPlugin.loader,
	options: {
		publicPath: "",
	},
};

const htmlLoader = {
	loader: "ejs-compiled-loader",
	options: {},
};

const imagesLoader = {
	loader: "file-loader",
	options: {
		outputPath: "assets",
		name: "[name].[ext]",
		publicPath: "/assets",
	},
};

const styleRule = {
	test: /\.s[ac]ss$/i,
	use: [cssLinkLoader, cssLoader, postcssLoader, sassLoader],
};

const partialsRule = {
	test: /\.ejs$/i,
	use: [htmlLoader],
};

const imagesRule = {
	test: /\.(png|jpe?g|gif)$/i,
	use: [imagesLoader],
};

module.exports = [styleRule, partialsRule, imagesRule];
