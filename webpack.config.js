const path = require("node:path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const plugins = [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
    })
]

module.exports = {
    devtool: "source-map",
    devServer: {
        open: true,
        hot: true,
        port: 3000,
    },
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].bundle.js',
        clean: true,
        assetModuleFilename: "assets/[hash][ext][query]",
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: process.env.MODE === "production" ? "asset" : "asset/resource",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};
