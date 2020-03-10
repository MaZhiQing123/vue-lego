import relation from '../relation.js'

const mount = route => {
    const comp =  require(`@/components/child/${route.meta.modules}`).default
    comp.forEach(v => {
        if(route.name == v.name){
            route.component = v.component
        }
    })
}
const child = router => {
    router.forEach(e => {
        if(!e.component){
            mount(e)
        }
        if(e.children && e.children.length){
            child(e.children)
        }
    })
}
const parent = router => {
    const list = relation
    list.forEach(e => {
        if(e.path !== '/' && !e.component){
            mount(e)
        }
        if(e.children && e.children.length){
            child(e.children)
        }
    })
    router.options.routes = list
    router.addRoutes(router.options.routes)
}
export default parent