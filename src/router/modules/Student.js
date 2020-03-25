export default [
  {
    path: '/student/:id',
    name: 'student',
    meta: {
      title: 'Персональна сторінка студента',
    },
    component: () => import('@/views/Student.vue'),
  },
]
