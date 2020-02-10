
export default [
    {
        path:'a2',
        name:'a2',
        component:() => import(/* webpackChunkName: "a2" */ './view/a2.vue'),
        meta:{
            name:"募集说明书结果查询"
        },
    },{
        path:'c2',
        name:'c2',
        component:() => import(/* webpackChunkName: "c2" */ './view/c2.vue'),
        meta:{
            name:"募集说明书结果查询"
        },
    }

]
