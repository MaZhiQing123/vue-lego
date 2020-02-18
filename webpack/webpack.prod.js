
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const path = require('path');  // 路径处理模块

// const ConsoleLogOnBuildWebpackPlugin = require('./hello.js')
// const WebpackMd5Hash = require('webpack-md5-hash')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let webpackConfigList = []
const webpackDefalutConfig = {
    mode:'production',
    plugins: [
        // new WebpackMd5Hash(),
        // new ConsoleLogOnBuildWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10 // 优先级
                }
            }
        }
    },
    entry:{},
    output:{}
}
module.exports = name => {

    if(name && typeof name == 'string'){
        name = [name]
    }
    if(name[0] !== 'root'){
        name.forEach(element => {
            let config = merge(common, webpackDefalutConfig)
            config.name = element
            config.entry = {
                index:`./src/components/child/${element}`
            }
            config.output = {
                filename:`static/js/${element}/[name].js`,
                chunkFilename:`static/js/${element}/[name].[chunkhash:8].js`,
            }
            webpackConfigList.push(config)
        });        
    } else {
        let config = merge(common, webpackDefalutConfig)
        config.entry = {
            index:`./src/main.js`
        }
        config.plugins = [
            ...config.plugins,
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "../index.html")
            }),
            new CleanWebpackPlugin(),
        ],
        config.output.filename = `static/js/[name].[chunkhash:8].js`
        webpackConfigList = []
        webpackConfigList.push(config)
        console.log(config)
    }

    return webpackConfigList
}
