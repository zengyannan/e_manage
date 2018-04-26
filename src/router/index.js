import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../components/Home';
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
        //     name: '主界面',
        //     component: Home,
        //     leaf:false,
        //     hidden:false,
        //     children: [
        //         {
        //         path: '/main',
        //         name: '主页',
        //         component: Main,
        //         leaf:true,
        //         hidden:false
        //        },
        //        {
        //         path: '/test',
        //         name: '测试页面',
        //         component: Test,
        //         leaf:true,
        //         hidden:false
        //        }
        //     ]

        // }
        // {
        //   path: '/hello',
        //   name: 'test',
        //   component: Test
        // }
    ]
});