const merge = require('webpack-merge');  // 引入webpack-merge功能模块
const common = require('./webpack.common.js'); // 引入webpack.common.js
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const path = require('path');  // 路径处理模块

module.exports = merge(common, {   // 将webpack.common.js合并到当前文件
    devServer: {
        contentBase: false,
        historyApiFallback: true,
        port: "8088",  // 设置端口号为8088
        inline: true,  // 文件修改后实时刷新
        hot: true,     //热加载
        // lazy: true,
    },
    devtool: 'source-map',
    entry: {
        root: './src/main.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../index.html")// new一个这个插件的实例，并传入相关的参数
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
})