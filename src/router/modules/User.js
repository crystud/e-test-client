export default [
  {
    path: '/activity',
    name: 'activity',
    meta: {
      title: 'Активність',
    },
    component: () => import('@/views/user/Activity.vue'),
  },
]
