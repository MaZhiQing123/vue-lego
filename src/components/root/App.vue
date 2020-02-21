<template>
    <router-view></router-view>
</template>
<script>
import mount from './mount.js'
export default {
    name:'App',
    data(){
        return{

        }
    },
    created(){
        mount(this.$router)
        // if(!router.beforeEachMount){
        //     mount(router.history.current.path)
        // }
        // router.beforeEach((to, from, next) => {
        //     router.beforeEachMount = true
        //     mount(to.path)
        //     next()
        // }) 
        
    }
}
</script>