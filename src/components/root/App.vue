<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
import relation from '@/relation.json'
export default {
    name:'App',
    data(){
        return{

        }
    },
    created(){
        console.log(relation)
    }
}
</script>