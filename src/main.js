import Vue from 'vue'
import router from './components/root/router'
import App from './components/root/App.vue'
console.log(router)

new Vue({
    el: '#root',
    router,
    components: { App },
    template: '<App/>'
})
  