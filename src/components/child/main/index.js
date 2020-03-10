export default [
    {
        path:'main',
        name:'main',
        component:() => import(/* webpackChunkName: "main" */ './view/main.vue'),
    }
]