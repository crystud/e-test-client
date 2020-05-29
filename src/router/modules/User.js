export default [
  {
    path: '/activity',
    name: 'activity',
    meta: {
      title: 'Активність',
    },
    component: () => import('@/views/user/Activity.vue'),
  },
  {
    path: '/user/home',
    name: 'userHome',
    meta: {
      title: 'Домівка користувача',
    },
    component: () => import('@/views/user/Home.vue'),
  },
]
