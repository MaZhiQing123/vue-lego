const ConcatSource = require('webpack-sources').ConcatSource;

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            let obj = {}
            compilation.hooks.finishModules.tap('a',v => {
                // if(v[0].name == 'a1'){
                    // console.log(process.env.NODE_ENV)
                    for(let i in compilation.modules){
                        console.log(compilation.modules[i]._source)
                    }
                // }
                
            })
        });
    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin