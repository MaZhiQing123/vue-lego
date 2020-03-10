
process.env.NODE_ENV = 'production'

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let webpackConfigList = []
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
                },
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
                path:path.resolve(__dirname, '../dist'),
                publicPath:'/',
                filename:`static/js/${element}/[name].js`,
                chunkFilename:`static/js/${element}/[name].[contenthash:8].js`,
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
                filename: 'index.html',
                template: 'index.html',
                inject: true,
                hash: true,
                favicon: 'favicon.ico'
            }),
            new CleanWebpackPlugin()
        ];
        config.output = {
            path:path.resolve(__dirname, '../dist/'),
            publicPath:'/',
            filename:'static/js/[name].[hash:8].js',
            chunkFilename:'static/js/[name].[contenthash:8].js',
        }
        webpackConfigList = config;
    }

    return webpackConfigList
}
