import relation from './relation.js'
import loadjs from 'loadjs'
const mount = (router,route) => {
    let routerList = [
        {
            name:'main',
            path:'/',
            component: () => import('./main.vue'),
            children:[
            ]
        }
    ]
    if(process.env.NODE_ENV == 'production'){
        const loader = path => {
            let parent = ''
            relation.forEach(v => {
                if(v.path == path) {
                    parent = v.module
                }
            })
            loadjs(`/static/js/${parent}/index.js`,'mountModule')
            loadjs.ready('mountModule',{
                success: function(){
                    routerList[0].children = [...routerList[0].children,...window[`lego__module_${parent}`].default]
                    router.addRoutes(routerList)
                },
                error: function() {
                    router.push('/404')
                }
            })
        }
        if(!router.beforeEachMount){
            loader(router.history.current.path)
        }
        router.beforeEach((to, from, next) => {
            router.beforeEachMount = true
            loader(to.path)
            next()
        })            
        
    } else {
        for(let i in relation){
            let parent = relation[i]
            routerList[0].children.push(...require(`@/components/child/${parent}`).default)
        }
        router.addRoutes(routerList)        
    }

}
export default mount