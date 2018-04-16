import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import Login from '../components/Login';
import Main from '../components/Main';
import NotFound from '../components/NotFound';


Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                noRequireAuth: true
            }
        },
        {
            path: '/nofound',
            name: 'NotFound',
            component: NotFound,
            meta: {
                noRequireAuth: true
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [{
                path: '/main',
                name: 'Main',
                component: Main,
            }]

        }
        // {
        //   path: '/hello',
        //   name: 'test',
        //   component: Test
        // }
    ]
});