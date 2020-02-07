const webpack = require('webpack');
const inquirer = require('inquirer');
const production = require('./webpack.prod.js')
const promptList = [{
    type:"checkbox",
    message: "请选择要打包的模块：",
    name:"value",
    choices: ['a','b']
}];
const build = name => {
    webpack(production(name), (err, stats) => {
        if (err || stats.hasErrors()) {
            throw err || stats.hasErrors()
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false
        }))
    })
}
(async function() {
    let answers = await inquirer.prompt(promptList);
    console.log(`开始打包 ${answers.value} 模块...`);
    await build('a')
})().then(() => {
    console.log("\n--------------- success ---------------\n");
});
