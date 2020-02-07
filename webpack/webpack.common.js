// webpack.common.js
const path = require('path');  // 路径处理模块
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin') 
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        // root: './src/components/a/index.js'
        root: './src/main.js'
    },
    resolve: {
        alias: {
            '@': resolve('src'), 
        }
    },
    output: {
        path: path.join( __dirname, "../dist"), //打包后的文件存放的地方
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,   // 正则匹配以.css结尾的文件
                use: ExtractTextPlugin.extract({  // 这里我们需要调用分离插件内的extract方法
                    fallback: 'style-loader',  // 相当于回滚，经postcss-loader和css-loader处理过的css最终再经过style-loader处理
                    use: ['css-loader', 'postcss-loader','sass-loader']
                })
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
        new VueLoaderPlugin(),
        new ExtractTextPlugin('css/index.css')
    ]
}