export default [
  {
    path: '/',
    name: 'homeUser',
    meta: {
      title: 'Домівка',
    },
    component: () => import('@/views/student/Student.vue'),
  },
]
