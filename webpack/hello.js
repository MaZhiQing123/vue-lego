// const ConcatSource = require('webpack-sources').ConcatSource;

const editRelation = require('../src/relation.json')
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            let obj = {}
            compilation.hooks.optimizeChunksBasic.tap('addAssets',(v) => {
                // if(v[0].name == 'a1'){
                    // let keys = Object.keys(compilation.assets)
                    console.log(compilation.chunks)
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