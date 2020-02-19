
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ConsoleLogOnBuildWebpackPlugin = require('./hello.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let webpackConfigList = []
process.env.NODE_ENV = 'production'
const webpackDefalutConfig = {
    mode:'production',
    plugins: [
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
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
            config.plugins = [
                ...config.plugins,
                new ConsoleLogOnBuildWebpackPlugin()
            ],
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
