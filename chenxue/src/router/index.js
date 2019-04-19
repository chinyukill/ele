import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import search from '@/components/search'
import order from '@/components/order'
import mine from '@/components/mine'
import login from '@/components/login'
import shopList from '@/components/shopList'
import detail from '@/components/detail'
import sureOrder from '@/components/sureOrder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      alias:'/index'
    },{
      path:'/search',
      name:'search',
      component:search
    },{
      path:'/order',
      name:'order',
      component:order
    },{
      path:'/mine',
      name:'mine',
      component:mine
    },{
        path:'/login',
        name:'login',
        component:login
    },{
        path:'/shopList/:id',
        name:'shopList',
        component:shopList
    },{
        path:'/detail/:id',
        name:'detail',
        component:detail
    },{
        path:'/sureOrder',
        name:'sureorder',
        component:sureOrder
    }
  ]
})
