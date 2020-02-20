import relation from './relation.js'
const mount = router => {
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
        router.addRoutes(routerList)
        relation.forEach(v => {
            let parent = v.module
            loadjs(`/static/js/${parent}/index.js`,'mountModule')
            loadjs.ready('mountModule',{
                success: function(){
                    console.log(window[`lego_module_${parent}`])
                },
                error: function() {
                    router.push('/404')
                }
            })
        })
    } else {
        for(let i in relation){
            let parent = relation[i].module
            routerList[0].children.push(...require(`@/components/child/${parent}`).default)
        }
        router.addRoutes(routerList)        
    }

}
export default mount