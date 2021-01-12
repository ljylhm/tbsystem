import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import { httpGet } from './lib/http';
import { setProvinceData } from '@/config/province';
import { getProvinceNet } from '@/service/province';
import { getToken, setLastPath } from '@/lib/cache';
import { openWarnMsg } from './lib/notice';
import 'babel-polyfill'

import 'element-ui/lib/theme-chalk/index.css';
import './style/reset.scss'
import './style/base.scss'



Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  // 重写meta
  if(to.meta.title){
    document.title = to.meta.title
  }

  // 判断是否有token
  const token = getToken()
  if(!token) {
    const origin = location.origin
    const url = location.href
    setLastPath(url)
    openWarnMsg("请先登录或注册",()=>{
      location.href = origin + "/login"
    },1000)
  }

  next()
})


new Vue({
  router,
  store,
  render: h => h(App),

  async created(){
    // await getProvinceNet()
  }

}).$mount('#app')
