const merge = require('webpack-merge');  // 引入webpack-merge功能模块
const common = require('./webpack.common.js'); // 引入webpack.common.js


module.exports = merge(common, {   // 将webpack.common.js合并到当前文件
    devServer: {
        contentBase: false,
        historyApiFallback: true,
        port: "8088",  // 设置端口号为8088
        inline: true,  // 文件修改后实时刷新
        hot: true,     //热加载
        // lazy: true,
    },
    entry: {
        root: './src/main.js'
    },
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['.js','.vue']
    },
    mode:'development'
})