import Vue from 'vue'
import Router from 'vue-router'
import main from '../main.vue'
import relation from './relation.js'
Vue.use(Router)
const mount = new Router({
  mode:'hash',
  routes: []
})
let routerList = [
  {
    name:'main',
    path:'/',
    component: main,
    children:[
    ]
  }
]
mount.beforeEach((to, from, next) => { // 面包屑导航
  for(let i in relation){
    if(relation[i].path == to.path.replace(/\//g,'')){
      const num = routerList[0].children.filter(v => {
        return v.module == relation[i].module
      })
      let aaa = relation[i].module
      let module = require(`@/components/child/${aaa}`).default
      if(num < 1){
        routerList[0].children = [...routerList[0].children,...module]
      }
    }
  }
  mount.options.routes = routerList
  mount.addRoutes(mount.options.routes)
  next()
})


export default mount