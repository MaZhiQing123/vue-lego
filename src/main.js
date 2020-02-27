import Vue from 'vue'
import router from './components/root/router'
import App from './components/root/App.vue'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)



new Vue({
    el: '#root',
    router,
    components: { App },
    template: '<App/>'
})
  