import RouterHelper from '@libs/router';
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Forget from '../views/Forget.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            title:"客户端-用户登录"
        }
    },
    {
        path: '/forget',
        name: 'Forget',
        component: Forget,
        meta: {
            title: "忘记密码"
        }
    }
]

const router = new VueRouter({
    routes
})

const routerHelper = new RouterHelper(router)

export {
    routerHelper
}
  
export default router
