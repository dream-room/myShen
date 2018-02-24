const routers = [
    {
        path: '/login',
        meta: {
            title: 'Login - 登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve),
    },
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children:[
            {
                path: '/',
                meta: {
                    title: '主页'
                },
                component: (resolve) => require(['./views/pageHome.vue'], resolve),
            },
            {
                path: '/pageHome',
                meta: {
                    title: '主页'
                },
                component: (resolve) => require(['./views/pageHome.vue'], resolve),
            },
            {
                path: '/personalInformation',
                meta: {
                    title: '个人资料'
                },
                component: (resolve) => require(['./views/personalInformation.vue'], resolve),
            },
            {
                path: '/list',
                meta: {
                    title: '用户列表'
                },
                component: (resolve) => require(['./views/list.vue'], resolve),
            },
            {
                path: '/orderManagement',
                meta: {
                    title: '订单管理'
                },
                component: (resolve) => require(['./views/orderManagement.vue'], resolve),
            },
            {
                path: '/authorityManagement',
                meta: {
                    title: '权限管理'
                },
                component: (resolve) => require(['./views/authorityManagement.vue'], resolve),
            },
            {
                path: '/itemManagement',
                meta: {
                    title: '物品管理'
                },
                component: (resolve) => require(['./views/itemManagement.vue'], resolve),
            },



        ]
    },
    {
        path: '*',
        meta: {
            title: 'Login - 登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve),
    },

];
export default routers;