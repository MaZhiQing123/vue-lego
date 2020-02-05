import Vue from 'vue'
import Router from 'vue-router'
const RaiseResult =  resolve => require(['@/components/a'], resolve) 
// const prinlt = resolve => require(['@/components/commonPage/prinlt'],resolve)
Vue.use(Router)
// import {bus} from '../common/EventBus'
const router = new Router({
  mode:'history',
  routes: [
      {
        path:'/',
        name:'RaiseResult',
        component:RaiseResult,
        meta:{
          name:"募集说明书结果查询"
        },
      }
      
  ]
})

export default  router

