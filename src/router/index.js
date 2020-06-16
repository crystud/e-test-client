import Vue from 'vue'
import VueRouter from 'vue-router'

import Verify from './hooks/Verify'

import Home from './modules/Home'
import Authorization from './modules/Authorization'
import Tests from './modules/Tests'
import Student from './modules/Student'
import Admin from './modules/Admin'
import Teacher from './modules/Teacher'
import Superadmin from './modules/Superadmin'
import User from './modules/User'

Vue.use(VueRouter)

const routes = [
  ...Authorization,
  {
    path: '/user/home',
    name: 'userHome',
    meta: {
      title: 'Домівка користувача',
    },
    component: () => import('@/views/user/Home.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/authorization/Home'),
    meta: {
      requiredAuth: true,
    },
    children: [
      ...Home,
      ...Tests,
      ...Student,
      ...Admin,
      ...Teacher,
      ...Superadmin,
      ...User,
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
