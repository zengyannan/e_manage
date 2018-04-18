import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import 'normalize.css';
import router from './router'
import MenuUtils from './utils/MenuUtils'
import axios from 'axios';

Vue.use(ElementUI)

//验证是否有菜单
let menus = JSON.parse(window.sessionStorage.getItem('menus'))
if (menus){
  //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
  let routes = []
  MenuUtils(routes,menus)
  router.addRoutes(routes)
  window.sessionStorage.removeItem('isLoadNodes')
}
router.beforeEach((route,from,next) => { 
  let menus = JSON.parse(window.sessionStorage.getItem('menus'));
  if(menus && route.path === '/login'){
    //这里不使用router进行跳转，是因为，跳转到登录页面的时候，是需要重新登录，获取数据的，这个时候，会再次向router实例里面add路由规则，
    //而next()跳转过去之后，没有刷新页面，之前的规则还是存在的，但是使用location的话，可以刷新页面，当刷新页面的时候，整个app会重新加载
    //而我们在刷新之前已经把sessionStorage里的user移除了，所以上面的添加路由也不行执行
    window.sessionStorage.removeItem('menus')
    window.sessionStorage.removeItem('user_token')
    window.sessionStorage.removeItem('isLoadNodes')
    window.location.href = '/'
    return false
  }
  if(route.meta.noRequireAuth===true){
    next()
  }
  if (!menus && route.path !== '/login') {
    next({ path: '/login' })
  } else {
    if (route.path) {
      next()
    } else {
      next({ path: '/nofound' })
    }
  }
});

//全局拦截器 请求加上token
axios.interceptors.request.use(  
  config => {  
      var token = sessionStorage.getItem("user_token");  
      if(token != null){  
          config.headers['token'] = token;  
      }  
      // if(config.method=='post'){  
      //     config.data = {  
      //         ...config.data,  
      //         _t: Date.parse(new Date())/1000,  
      //     }  
      // }else if(config.method=='get'){  
      //     config.params = {  
      //         _t: Date.parse(new Date())/1000,  
      //         ...config.params  
      //     }  
      // }  
      return config  
  },function(error){  
      return Promise.reject(error)  
  }  
)  
axios.interceptors.response.use(function (response) {  
// token 已过期，重定向到登录页面  
if (response.data.code == 4){  
  localStorage.clear()  
  router.replace({  
                  path: '/signin',  
                  query: {redirect: router.currentRoute.fullPath}  
              })  
}  
return response  
}, function (error) {  
// Do something with response error  
return Promise.reject(error)  
})  


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
