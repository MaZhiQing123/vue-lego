
import relation from '../relation.js'
import loadjs from 'loadjs'

let mountArr = []
let list = null

const child = (router,v) => {
    router.forEach(e => {
        if(!e.component){
            if(v){
                v.component.forEach(c => {
                    if(e.name == c.name){
                        e.component = c.component
                    }
                })
            } else {
                mountArr.push({
                    modules:e.meta.modules,
                    name:e.name,
                })                
            }
        }
        if(e.children && e.children.length){
            if(v){
                child(e.children,v)
            } else {
                child(e.children)
            }
        }
    })
}
const parent = v => {
    list.forEach(e => {
        if(e.path !== '/' && !e.component){
            if(v){
                v.component.forEach(c => {
                    if(e.name == c.name){
                        e.component = c.component
                    }
                })
            } else {
                mountArr.push({
                    modules:e.meta.modules,
                    name:e.name,
                })                
            }
        }
        if(e.children && e.children.length){
            if(v){
                child(e.children,v)
            } else {
                child(e.children)
            }
        }
    })

}

const main = router => {
    list = relation
    parent()

    let URL = mountArr.map(v => `/static/js/${v.modules}/index.js`)
    loadjs(URL,'lego__module')
    loadjs.ready('lego__module',{
        success: function(){
            mountArr.forEach(v => {
                v.component = window[`lego__module_${v.modules}`].default
                parent(v)
            })
            router.options.routes = list
            router.addRoutes(router.options.routes)
        },
        error: function() {
        }
    }) 
}

export default main