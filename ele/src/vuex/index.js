
import Vue from 'vue';
import Vuex from 'vuex';
import admin from './admin'
import shop from './shop'
import goods from './goods'
import adv from './adv'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        admin,
        shop,
        goods,
        adv
    }
})
