import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index';
import Login from '../components/Login';
// import Main from '../components/Main';
import NotFound from '../components/NotFound';


Vue.use(Router);

export default new Router({
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login,
            leaf: true,
            hidden: true,
            meta: {
                noRequireAuth: true
            }
        },
        {
            path: '/404',
            name: 'NotFound',
            component: NotFound,
            meta: {
                noRequireAuth: true
            },
            leaf: true,
            hidden: true
        },
        // {
        //     path: '/',
        //     name: '首页',
        //     component: Index,
        //     leaf: true,
        //     hidden: true,
        //     meta: {
        //         noRequireAuth: true
        //     },
        // }
        // {
        //   path: '/hello',
        //   name: 'test',
        //   component: Test
        // }
    ]
});