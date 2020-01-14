import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import VueRouter from 'vue-router'

Vue.prototype.$http = axios
Vue.use(Vuex)
Vue.use(VueRouter)


import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Files from './views/Files'
import Connection from './views/Connection'
const routes = [{
    path: '/',
    component: Dashboard
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/files',
    component: Files
  },
  {
    path: '/connection',
    component: Connection
  } 
]


const router = new VueRouter({
  routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {

  if (!store.getters.loggedIn && to.path != '/login') {
    next('/login')
  } else next()
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')