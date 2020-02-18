
export default [

    {
        path:'a1',
        name:'a1',
        component:() => import(/* webpackChunkName: "a1" */ './view/a1.vue'),
        meta:{
            name:"募集说明书结果查询"
        },
    },{
        path:'c1',
        name:'c1',
        component:() => import(/* webpackChunkName: "c1" */ './view/c1.vue'),
        meta:{
            name:"募集说明书结果查询a "
        },
    }
]    
