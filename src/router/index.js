import Vue from 'vue'
import VueRouter from 'vue-router'

import Verify from './hooks/Verify'

import Home from './modules/Home'
import Authorization from './modules/Authorization'
import Tests from './modules/Tests'

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
  document.title = to.meta.title || 'Title неоприділено'
})

export default router
