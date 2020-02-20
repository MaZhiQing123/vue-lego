
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let webpackConfigList = []
const webpackDefalutConfig = {
    mode:'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
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
    };
    if(name[0] !== 'root'){
        name.forEach((element,index) => {
            let config = merge(common, webpackDefalutConfig)
            config.name = element
            config.entry = {
                index:`./src/components/child/${element}`
            }
            if(index == 0){
                config.plugins = [
                    ...config.plugins,
                    new CleanWebpackPlugin()
                ]
            }
            config.output = {
                libraryTarget: 'umd',
                library:`lego__module_${element}`,
                filename:`static/js/${element}/[name].js`,
                chunkFilename:`static/js/${element}/[name].[chunkhash:8].js`,
            }
            webpackConfigList.push(config)
        });        
    } else {
        let config = merge(common, webpackDefalutConfig);
        config.entry = {
            index:'./src/main.js'
        };
        config.plugins = [
            ...config.plugins,
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "../index.html")
            }),
            new CleanWebpackPlugin()
        ];
        config.output = {
            filename:'static/js/[name].[hash:8].js',
            chunkFilename:'static/js/[name].[chunkhash:8].js',
        }
        webpackConfigList = config;
    }

    return webpackConfigList
}
