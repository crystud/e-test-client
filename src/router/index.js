import Vue from 'vue'
import VueRouter from 'vue-router'

import Verify from './hooks/Verify'

import Home from './modules/Home'
import Authorization from './modules/Authorization'
import Tests from './modules/Tests'
import Student from './modules/Student'
import Admin from './modules/Admin'
import Teacher from './modules/Teacher'

Vue.use(VueRouter)

const routes = [
  ...Authorization,
  {
    path: '/',
    component: () => import('@/views/Home'),
    meta: {
      requiredAuth: true,
    },
    children: [
      ...Home,
      ...Tests,
      ...Student,
      ...Admin,
      ...Teacher,
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(Verify)
router.afterEach((to) => {
  const {
    meta: { title } = {},
  } = to

  document.title = title ? `${to.meta.title} - CRYSTUD` : 'CRYSTUD'
})

export default router
