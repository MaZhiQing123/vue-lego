<template>
    <router-view></router-view>
</template>
<script>
export default {
    name:'App',
    data(){
        return{

        }
    },
    created(){
        let fn = require('./mount/mount_' + process.env.NODE_ENV)
        fn.default(this.$router)
    },
    methods:{

    }
}
</script>
<style>

</style>