const merge = require('webpack-merge');  // 引入webpack-merge功能模块
const common = require('./webpack.common.js'); // 引入webpack.common.js
const webpack = require('webpack')

module.exports = merge(common, {   // 将webpack.common.js合并到当前文件
    devServer: {
        contentBase: false,
        historyApiFallback: true,
        port: "8088",  // 设置端口号为8088
        inline: true,  // 文件修改后实时刷新
        hot: true,     //热加载
        // lazy: true,
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
        },
    },
    devtool: 'source-map',
    entry: {
        root: './src/main.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../index.html")// new一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
})