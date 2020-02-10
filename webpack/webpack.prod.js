const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let webpackConfigList = []
const webpackDefalutConfig = {
    entry: '',
    // plugins: [new CleanWebpackPlugin()],
    output: {
        filename: 'js/[name]/[name].[hash:8].js'
    },
    mode: 'production'
}
module.exports = name => {
    for(let i in name){
        let obj = merge(common, webpackDefalutConfig)

        if(name[i] == 'ALL'){
            obj.entry = `@/main.js`
            obj.output.filename = `js/[name].[hash:8].js`
        } else {
            obj.name = name[i]
            obj.entry = `@/components/${name[i]}/index.js`
            obj.output.filename = `js/${name[i]}/[name].[hash:8].js`
            obj.externals = {
                vue:'Vue'
            }
        }
        webpackConfigList[i] = obj                
    }
    console.log(webpackConfigList)
    return webpackConfigList
} 