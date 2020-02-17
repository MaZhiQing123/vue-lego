import Vue from 'vue'
import Router from 'vue-router'
import main from '../main.vue'
// import LoadJs from 'loadjs'
Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      name:'main',
      path:'/',
      component: main,
      children:[
      ]
    }
  ]
})