const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ConsoleLogOnBuildWebpackPlugin = require('./hello.js')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let webpackConfigList = []
const webpackDefalutConfig = {
    entry: '',
    plugins: [
        new CleanWebpackPlugin(),
        new ConsoleLogOnBuildWebpackPlugin(),
    ],
    mode:'production',
    output: {
        filename: 'js/[name]/[name].[hash:8].js',
    },
}
module.exports = name => {
    webpackDefalutConfig.entry = {
        root: './src/main.js'
    }
    webpackDefalutConfig.output.filename = `js/[name].[hash:8].js`
    return merge(common, webpackDefalutConfig)
} 