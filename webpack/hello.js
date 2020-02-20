// const ConcatSource = require('webpack-sources').ConcatSource;

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            let obj = {}
            compilation.hooks.finishModules.tap('addAssets',(v) => {
                console.log(v)
            })
        });
    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin