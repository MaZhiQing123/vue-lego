import relation from './relation.js'
import loadjs from 'loadjs'
import main from './main.vue'
import routers from './router/index.js'

let routesMemory = []
let routerList = [
    {
        name:'main',
        path:'/',
        component: main,
        children:[
        ]
    }
]
const filterproduction = (path,router,type) => {
    if(relation[i].path == path){
        let parent = relation[i].parent
        loadjs(`/static/js/${parent}/index.js`,'mountModule')
        loadjs.ready('mountModule',{
            success: function(){
                routerList[0].children.push(...window[`lego__module_${parent}`].default)
                if(type){
                    router.options.routes = routerList
                    router.addRoutes(router.options.routes)      
                } else {
                    router.addRoutes(routerList) 
                }
            },
            error: function() {
            }
        })
    }
}
const filterdevelopment = (path,router,type) => {
    for(let i in relation){
        if(relation[i].path == path){
            let parent = relation[i].parent
            routerList[0].children.push(...require(`@/components/child/${parent}`).default)
            if(type){
                router.options.routes = routerList
                router.addRoutes(router.options.routes)      
            } else {
                router.addRoutes(routerList)      
            }
        }
    }
}
const mount = router => {
    if(!router.beforeEachMount){
        if(router.history.current.path !== '/'){
            routesMemory.push(router.history.current.path);
            if(process.env.NODE_ENV == 'development'){
                filterdevelopment(router.history.current.path,router,false)
            } else {
                filterproduction(router.history.current.path,router,false)
            }
        }
    }
    router.beforeEach((to, from, next) => {
        if(routesMemory.indexOf(to.path) < 0){
            router.beforeEachMount = true
            routesMemory.push(to.path)
            if(process.env.NODE_ENV == 'development'){
                filterdevelopment(to.path,router,true)
            } else {
                filterproduction(to.path,router,true)
            }
        }

        next()
    }) 

    // if(process.env.NODE_ENV == 'production'){
    //         let parent = ''
    //         relation.forEach(v => {
    //             if(v.path == path) {
    //                 parent = v.module
    //             }
    //         })
    //         loadjs(`/static/js/${parent}/index.js`,'mountModule')
    //         loadjs.ready('mountModule',{
    //             success: function(){
    //                 routerList[0].children = [...routerList[0].children,...window[`lego__module_${parent}`].default]
    //                 router.addRoutes(routerList)
    //             },
    //             error: function() {
    //                 router.push('/404')
    //             }
    //         })
    // } else {
    //     // for(let i in relation){
    //     //     let parent = relation[i].module
    //     //     routerList[0].children.push(...require(`@/components/child/${parent}`).default)
    //     // }
    //     // router.addRoutes(routerList)        
    // }

}
export default mount