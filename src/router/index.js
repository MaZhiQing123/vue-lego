import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// import {bus} from '../common/EventBus'
const router = new Router({
  mode:'history',
  routes: [
      {
        path:'/a',
        name:'a',
        component:resolve => require(['@/components/a'], resolve),
        meta:{
          name:"募集说明书结果查询"
        },
      },{
        path:'/b',
        name:'b',
        component:resolve => require(['@/components/b'], resolve),
        meta:{
          name:"募集说明书结果查询"
        },
      }
      
  ]
})

export default  router

