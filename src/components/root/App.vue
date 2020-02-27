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
    }
}
</script>