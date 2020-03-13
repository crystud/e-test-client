export default [
  {
    path: '/student/:id',
    name: 'student',
    component: () => import('@/views/Student.vue'),
  },
]
