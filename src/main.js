import Vue from 'vue'
import router from './router'
import App from './App.vue'

new Vue({
    el: '#root',
    router,
    components: { App },
    template: '<App/>'
})
  