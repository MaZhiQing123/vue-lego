
process.env.NODE_ENV = 'development'
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {  
    devServer: {
        contentBase: false,
        historyApiFallback: true,
        port: "8080",
        inline: true,
        hot: true,
        proxy: {
        }
    },
    devtool: 'source-map',
    entry: {
        root: './src/main.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            hash: true,
            favicon: 'favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
})