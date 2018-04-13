import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import 'normalize.css';
import router from './router'

Vue.use(ElementUI)

router.beforeEach((to,from,next) => { 

  if(to.path === '/login'){
    next();
  }else{
    console.log(2);
    if(to.meta.requireAuth==100){
      console.log(3);
      next({path:'/login'});
    }else if(to.meta.requireAuth==200){
      console.log(4);
      next();
    }
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
