// webpack.common.js
const path = require('path');  // 路径处理模块
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') 
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    context: path.resolve(__dirname, '../'),
    output: {
        path: path.resolve( __dirname, "../dist"),
        publicPath: '/',
        filename: 'bundle.js'
    },
    target: 'web',
    resolve: {
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['.js','.vue']
    },
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
                loader: 'vue-loader'
            },
            {            
                test: /\.js$/,               
                loader: "babel-loader",
                include: [resolve('src'), resolve('test')],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': ''
        }),
        new webpack.BannerPlugin('vue-lego'),  // new一个插件的实例 
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({filename: 'static/css/[name].[chunkhash:8].css'})
    ]
}