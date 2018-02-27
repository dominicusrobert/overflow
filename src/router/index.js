import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/Auth'
import AddQuestion from '@/views/AddQuestion'
import EditQuestion from '@/views/EditQuestion'
import EditQuestionList from '@/views/EditQuestionList'
import Questions from '@/views/Questions'
import QuestionDetail from '@/views/QuestionDetail'
import NotFound from '@/views/NotFound'
import { auth } from '../firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/authorization',
      name: 'Authorization',
      component: Auth,
      meta: {
        requireAuth: false,
        isLoginPage: true
      }
    },
    {
      path: '/questionAdd',
      name: 'AddQuestion',
      component: AddQuestion,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/questions',
      name: 'Questions',
      component: Questions,
      meta: {
        requireAuth: true
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
      meta: {
        requireAuth: true
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
      redirect: '/authorization',
      meta: {
        requireAuth: false
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        requireAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requireAuth = to.matched.some(record => record.meta.requireAuth)
  let isLoginPage = to.matched.some(record => record.meta.isLoginPage)

  auth.onAuthStateChanged(function (user) {
    if (requireAuth && !user) next('Authorization')
    else if (isLoginPage && user) next('Questions')
    else next()
  })
})

export default router
