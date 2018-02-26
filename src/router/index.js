import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/Auth'
import AddQuestion from '@/views/AddQuestion'
import EditQuestion from '@/views/EditQuestion'
import EditQuestionList from '@/views/EditQuestionList'
import Questions from '@/views/Questions'
import QuestionDetail from '@/views/QuestionDetail'
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
      path: '/questionAdd',
      name: 'AddQuestion',
      component: AddQuestion,
      beforeEnter: (to, from, next) => {
        auth.onAuthStateChanged(function (user) {
          if (user) {
            next()
          } else {
            this.a.push('/authorization')
          }
        })
      }
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
      },
      children: [
        {
          path: ':id',
          component: QuestionDetail,
          name: 'QuestionDetail',
          props: true
        }
      ]
    },
    {
      path: '/questionEdit',
      name: 'EditQuestionList',
      component: EditQuestionList,
      beforeEnter: (to, from, next) => {
        auth.onAuthStateChanged(function (user) {
          if (user) {
            next()
          } else {
            this.a.push('/authorization')
          }
        })
      },
      children: [
        {
          path: ':id',
          component: EditQuestion,
          name: 'EditQuestion',
          props: true
        }
      ]
    },
    {
      path: '/',
      redirect: '/authorization'
    }
  ]
})
