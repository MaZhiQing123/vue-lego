// const ConcatSource = require('webpack-sources').ConcatSource;

const editRelation = require('../src/relation.json')
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            let obj = {}
            compilation.hooks.additionalAssets.tapAsync('addAssets',() => {
                // if(v[0].name == 'a1'){
                    compilation.chunks.forEach(element => {
                        editRelation.forEach(child => {
                            if(element.name == child.name){
                                child.component = element.files
                            }
                        })
                    });
                    compilation.assets['static/js/relation.js'] = `
                        export default
                        \/n${editRelation}
                    `
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