// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import scroller from 'vue-scroller'

Vue.use(VueRouter)

Vue.prototype.$http = axios;

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(scroller)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
