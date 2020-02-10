// webpack.common.js
const path = require('path');  // 路径处理模块
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') 
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    context: path.resolve(__dirname, '../'),
    resolve: {
        alias: {
            '@': resolve('src'), 
        }
    },
    output: {
        path: path.resolve( __dirname, "../dist"),
        publicPath: '/',
        filename: 'bundle.js'
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/, 
                loader: 'vue-loader',
            },
            {                             // jsx配置
                test: /(\.jsx|\.js)$/,                  // 注意use选择如果有多项配置，可写成这种对象形式
                loader: "babel-loader",
                options: {
                    plugins: ['syntax-dynamic-import']
                },
                exclude: /node_modules/   // 排除匹配node_modules模块
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('vue-lego'),  // new一个插件的实例 
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../index.html")// new一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({filename: 'css/[name].[hash:5].css'})
    ]
}