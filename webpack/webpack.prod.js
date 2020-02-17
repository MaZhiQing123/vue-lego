const webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ConsoleLogOnBuildWebpackPlugin = require('./hello.js')
// const WebpackMd5Hash = require('webpack-md5-hash')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let webpackConfigList = []
const webpackDefalutConfig = {
    mode:'production',
    plugins: [
        new CleanWebpackPlugin(),
        // new WebpackMd5Hash(),
        new ConsoleLogOnBuildWebpackPlugin(),
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
    let config = merge(common, webpackDefalutConfig)

    if(name && typeof name == 'string'){
        name = [name]
    }
    if(name[0] !== 'root'){
        name.forEach(element => {
            config.entry = {
                index:`./src/components/child/${element}`
            }
            config.output.filename = `static/js/${element}/[name].[chunkhash:8].js`
            webpackConfigList.push(config)
        });        
    } else {
        config.entry = {
            index:`./src/components/root/main.js`
        }
        config.plugins = [new HtmlWebpackPlugin({
            template: path.join(__dirname, "../index.html")
        })],
        config.output.filename = `static/js/[name].[chunkhash:8].js`
        webpackConfigList.push(config)
    }
 

    return webpackConfigList
}