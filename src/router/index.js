import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/Auth'
import Questions from '@/views/Questions'
import { auth } from '../firebase'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/authorization',
      name: 'Authorization',
      component: Auth
    },
    {
      path: '/questions',
      name: 'Questions',
      component: Questions,
      beforeEnter: (to, from, next) => {
        auth.onAuthStateChanged(function (user) {
          if (user) {
            next()
          } else {
            this.a.push('/authorization')
          }
        })
      }
    }
  ]
})
