import Vue from 'vue'
import Router from 'vue-router'

import main from '@/components/main.vue'
import a from '@/components/a'
import b from '@/components/b'
Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [{
    path:'/',
    name:'main',
    component: main,
    children:[...a,...b]
  }]
})