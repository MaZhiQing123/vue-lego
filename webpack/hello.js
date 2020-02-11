const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap(pluginName, compilation => {
            console.log(compilation)
            // compilation.hooks.seal.tap('a',options => {
            //     // let key = Object.keys(options)
            //     console.log(options);

            // })
        });
    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin