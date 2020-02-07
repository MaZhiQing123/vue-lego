const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfig = {
    plugins: [
        new CleanWebpackPlugin(),  // 所要清理的文件夹名称
        // new BundleAnalyzerPlugin()
    ],
    output: {
        filename: "" //打包后输出文件的文件名
    },
    mode: 'production',
}
module.exports = name => {
    webpackConfig.output.filename = `js/${name}.min.js`
    return merge(common, webpackConfig)
} 