// webpack.common.js
const path = require('path');  // 路径处理模块
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/components/a/index.js'
    },
    output: {
        path: path.join( __dirname, "../dist"), //打包后的文件存放的地方
        filename: "[hash].js" //打包后输出文件的文件名
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.css$/,   // 正则匹配以.css结尾的文件
                use: ['style-loader', 'css-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
            },
            {
                test: /\.(scss|sass)$/,   // 正则匹配以.scss和.sass结尾的文件
                use: ['style-loader', 'css-loader', 'sass-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
            },
            {
                test: /\.vue$/, 
                use: ['vue-loader']  
            },
            {                             // jsx配置
                test: /(\.jsx|\.js)$/,   
                use: {                    // 注意use选择如果有多项配置，可写成这种对象形式
                    loader: "babel-loader"
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
        new VueLoaderPlugin()
    ]
}