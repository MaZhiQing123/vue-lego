
import '@babel/polyfill'
import Vue from 'vue'
import router from './components/root/router'
import App from './components/root/App.vue'


new Vue({
    el: '#root',
    router,
    components: { App },
    template: '<App/>'
})
