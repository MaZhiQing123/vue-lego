const fs = require("fs")
const chalk = require('chalk')


const commanderArr = process.argv.slice(2)
const childList = fs.readdirSync("src/components/child/")
console.log(commanderArr)
commanderArr.forEach(v => {
    if(childList.indexOf(v) > -1){
        console.log(`${chalk.keyword('orange')(`目录 ${v} 已存在`)}`)
    } else {
        fs.mkdir(`src/components/child/${v}`,(error) => {
            if(error){
                console.log(chalk.red(error))
                return
            }
            fs.mkdir(`src/components/child/${v}/view`,(error) => {
                if(error){
                    console.log(chalk.red(error))
                    return
                }
            })
            fs.mkdir(`src/components/child/${v}/common`,(error) => {
                if(error){
                    console.log(chalk.red(error))
                    return
                }
            })
            fs.writeFile(`src/components/child/${v}/index.js`,'export default []','utf8',function(error){
                if(error){
                    console.log(chalk.red(error))
                    return ;
                }
                console.log(`${chalk.keyword('green')(`${v}创建成功`)}`)

            })
        })
    }
})


