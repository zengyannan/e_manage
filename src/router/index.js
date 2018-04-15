import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import Login from '../components/Login';
import Index from '../components/Main';


Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'Main',
            component: Main,
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
            path: '/Home',
            name: 'Home',
            component: Home,
            meta: {
                requireAuth: 200
            }
        }
        // {
        //   path: '/hello',
        //   name: 'test',
        //   component: Test
        // }
    ]
});