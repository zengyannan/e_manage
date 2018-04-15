import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import Login from '../components/Login';
import Main from '../components/Main';


Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requireAuth: 100
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                requireAuth: 200
            },
            children: [{
                path: '/main',
                name: 'Main',
                component: Main,
                meta: {
                    requireAuth: 200
                },
            }]

        }
        // {
        //   path: '/hello',
        //   name: 'test',
        //   component: Test
        // }
    ]
});