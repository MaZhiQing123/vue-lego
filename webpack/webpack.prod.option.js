const webpack = require('webpack');
const inquirer = require('inquirer');
const production = require('./webpack.prod.js')
const modulesList = [{
    type:"checkbox",
    message: "请选择要打包的模块：",
    name:"value",
    choices: ['ALL','a','b']
}];
const modeList = [{
    type:"list",
    message: "请选择打包类型：",
    name:"value",
    choices: ['ROOT','Modules']
}]
const build = name => {
    return new Promise((resolved, rejected) => {
        webpack(production(name), (err, stats) => {
            if (err || stats.hasErrors()) {
                console.error('发生错误')
                process.stdout.write( err || stats.hasErrors() )
                rejected()
            }
            process.stdout.write(stats.toString({
                colors: true,
                modules: false
            }))
            resolved()
        }) 
    })

}
build(['ALL'])
// (async function(){
//     let checkMode = await inquirer.prompt(modeList);
//     console.log(`TYPE: ${checkMode.value}`)
//     if(checkMode.value !== 'ROOT') {
//         let modules = await inquirer.prompt(modulesList);
//         console.log(`Building ${modules.value} ...`);
//         await build(modules.value)
//     } else {
//         console.log(`ALL Building...`);
//         await 
//     }
//     console.log('\n---------------------------success------------------------')
// })()

