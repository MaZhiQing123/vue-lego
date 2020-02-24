import relation from './relation.js'
import loadjs from 'loadjs'
import main from './main.vue'
const relationData = relation
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

const filterdevelopment = (path,router,type) => {
    for(let i in relationData){
        if(relationData[i].path == path){
            let parent = relationData[i].parent
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
                for(let i in relationData){
                    if(relationData[i].path == router.history.current.path){
                        let parent = relationData[i].parent
                        loadjs(`/static/js/${parent}/index.js`,'mountModule2')
                        loadjs.ready('mountModule2',{
                            success: function(){
                                routerList[0].children.push(...window[`lego__module_${parent}`].default)
                                router.addRoutes(routerList)
                            },
                            error: function() {
                            }
                        })                        
                    }
                }
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
                for(let i in relationData){
                    if(relationData[i].path == to.path){
                        let parent = relationData[i].parent
                        loadjs(`/static/js/${parent}/index.js`,'mountModule')
                        loadjs.ready('mountModule',{
                            success: function(){
                                routerList[0].children.push(...window[`lego__module_${parent}`].default)
                                router.options.routes = routerList
                                router.addRoutes(routerList)
                            },
                            error: function() {
                            }
                        })                        
                    }
                }
            }
        }

        next()
    }) 

}
export default mount