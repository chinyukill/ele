// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from './Login';
import axios from 'axios';
import store from './vuex';
import filters from '@/filters'
Vue.config.productionTip = false
Vue.use(ElementUI);

for(var key in filters){
  Vue.filter(key,filters[key])
}

axios.interceptors.request.use((config)=>{
  config.url="http://127.0.0.1"+config.url
  return config
})
axios.interceptors.response.use(({data})=>{
  return data;
})
router.beforeEach((to,from,next)=>{
  if(to.meta.isAuthorization&&localStorage.adminId){
    next()
  }
})
Vue.prototype.$ajax = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App,Login },
  template: `<components :is="$store.state.admin.adminId?'App':'Login'"/>`
})
