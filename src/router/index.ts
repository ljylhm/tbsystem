import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title: "客户端-用户登录"
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import(/* webpackChunkName: "about" */ '../views/Publish.vue')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import(/* webpackChunkName: "about" */ '../views/Personal.vue')
  },
  {
    path: '/blackList',
    name: 'BlackList',
    component: () => import(/* webpackChunkName: "about" */ '../views/BlackList.vue')
  },
  {
    path: '/shopManage',
    name: 'ShopManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShopManage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
