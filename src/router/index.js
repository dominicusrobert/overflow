import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/Auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/authorization',
      name: 'Authorization',
      component: Auth
    }
  ]
})
