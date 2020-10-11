import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/index'
import '../style/reset.scss'
import { getToken } from '@/lib/cache';
import { routerHelper } from "@/login/router";

Vue.use(ElementUI);

Vue.config.productionTip = false

const token = getToken()

if(!token) routerHelper.to("/")

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#login')
