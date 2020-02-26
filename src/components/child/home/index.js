
export default [

    {
        path:'a1',
        name:'a1',
        component:() => import(/* webpackChunkName: "a1" */ './view/a1.vue'),
        meta:{
            name:"A1页面"
        },
    },{
        path:'a2',
        name:'a2',
        component:() => import(/* webpackChunkName: "c1" */ './view/c1.vue'),
        meta:{
            name:"A2页面 "
        },
    }
]    
