const webpack = require('webpack');
const inquirer = require('inquirer');
const production = require('./webpack.prod.js')
const fs = require("fs")
let floderList = []
try {
    floderList = fs.readdirSync("src/components/child/")
} catch (error) {
    console.log('\x1B[31m%s\x1B[0m', '读取 child 文件夹失败')
}

if(!floderList.length){
    return
}
const modulesList = [{
    type:"checkbox",
    message: "请选择要打包的模块：",
    name:"value",
    choices: floderList,
    validate: function(val) {
        if (!val.length) {
          return;
        }
        return true
    }
}];
const modeList = [{
    type:"list",
    message: "请选择打包类型：",
    name:"value",
    choices: ['root','child']
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
(async function(){
    let checkMode = await inquirer.prompt(modeList);
    console.log(`TYPE: ${checkMode.value}`)
    if(checkMode.value !== 'root') {
        let modules = await inquirer.prompt(modulesList);
        console.log(`Building ${modules.value} ...`);
        await build(modules.value)
    } else {
        console.log(`ALL Building...`);
        await build(checkMode.value)
    }
    console.log('\n---------------------------success------------------------')
})()

