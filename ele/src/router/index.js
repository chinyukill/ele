import Vue from 'vue'
import Router from 'vue-router'
import admin from './admin'
import shop from './shop'
import goods from './goods'
import adv from './adv'
Vue.use(Router)

export default new Router({
  routes:admin.concat(shop,goods,adv)
})
