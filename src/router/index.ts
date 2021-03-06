import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import RouterHelper from '@/lib/router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
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
    path: '/publishExpress',
    name: 'PublishExpress',
    component: () => import(/* webpackChunkName: "about" */ '../views/PublishExpress.vue')
  },
  {
    path: '/publishTask',
    name: 'PublishTask',
    component: () => import(/* webpackChunkName: "about" */ '../views/PublishTask.vue')
  },
  {
    path: '/missionManage',
    name: 'MissionManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/MissionManage.vue')
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
  },
  {
    path: '/goodsManage',
    name: 'GoodsManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/GoodsManage.vue')
  },
  {
    path: '/addGoods',
    name: 'AddGoods',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddGoods.vue')
  },
  {
    path: '/editGoods',
    name: 'EditGoods',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditGoods.vue')
  },
  {
    path: '/smartHelper',
    name: 'SmartHelper',
    component: () => import(/* webpackChunkName: "about" */ '../views/SmartHelper.vue')
  },
  {
    path: '/platNotice',
    name: 'PlatNotice',
    component: () => import(/* webpackChunkName: "about" */ '../views/PlatNotice.vue')
  },
  {
    path: '/noticeDetail',
    name: 'NoticeDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/NoticeDetail.vue')
  },
  {
    path: '/editUnit',
    name: 'EditUnit',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditUnit.vue')
  },
  {
    path: '/blackListManage',
    name: 'BlackListManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/BlackListManage.vue')
  },
  {
    path: '/customService',
    name: 'CustomService',
    component: () => import(/* webpackChunkName: "about" */ '../views/CustomService.vue')
  },
  {
    path: '/inviteFriends',
    name: 'InviteFriends',
    component: () => import(/* webpackChunkName: "about" */ '../views/InviteFriends.vue')
  },
  {
    path: '/payAccount',
    name: 'PayAccount',
    component: () => import(/* webpackChunkName: "about" */ '../views/PayAccount.vue')
  },
  {
    path: '/transFerAccountManage',
    name: 'TransFerAccountManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/TransFerAccountManage.vue')
  },
  {
    path: '/fundManage',
    name: 'FundManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/fundManage.vue')
  },{
    path: '/orderManage',
    name: '/OrderManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/orderManage.vue')
  },{
    path: '/successCallback',
    name: '/SuccessCallback',
    component: () => import(/* webpackChunkName: "about" */ '../views/SuccessCallback.vue')
  },{
    path: '/rules',
    name: '/Rules',
    component: () => import(/* webpackChunkName: "about" */ '../views/Rules.vue')
  },{
    path: '/templateList',
    name: '/TemplateList',
    component: () => import(/* webpackChunkName: "about" */ '../views/TemplateList.vue')
  },{
    path: '/flowTypeManage',
    name: '/FlowTypeManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/FlowTypeManage.vue')
  },{
    path: '/templatePub',
    name: '/TemplatePub',
    component: () => import(/* webpackChunkName: "about" */ '../views/TemplatePub.vue')
  },{
    path: '/commentList',
    name: '/CommentList',
    component: () => import(/* webpackChunkName: "about" */ '../views/CommentList.vue')
  },{
    path: '/workOrderDatail',
    name: '/WorkOrderDatail',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkOrderDatail.vue')
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
