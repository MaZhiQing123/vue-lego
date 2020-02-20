// const ConcatSource = require('webpack-sources').ConcatSource;

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            let obj = {}
            compilation.hooks.optimizeChunkAssets.tap('addAssets',(v) => {
                let key = Object.keys(compilation.assets)
                for(let i in key){
                    if(key[i].indexOf('vender') > -1){
                        console.log(compilation.assets[key[i]])
                    }
                }
                // if(v[0].name == 'a1'){
                    // let key = RegExp(`static/js/${*}/index.js`,'g')
                    // console.log(compilation.assets)
                    // compilation.assets[/static/js/${*}/index.js/]
                    // for(let i in v){
                    //     console.log(v[i].entryModule)
                    // }
                    // console.log(compilation.chunks)
                    // for(let i in compilation.chunks){
                    //     console.log(compilation.chunks[i]._modules)
                    // }
                // }
                
            })
        });
    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin