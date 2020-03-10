import Vue from 'vue'
import VueRouter from 'vue-router'

import Verify from './hooks/Verify'

import Home from './modules/Home'
import Authorization from './modules/Authorization'

Vue.use(VueRouter)

const routes = [
  ...Authorization,
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: {
      requiredAuth: true,
    },
    children: [
      ...Home,
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})


router.beforeEach(Verify)

export default router
