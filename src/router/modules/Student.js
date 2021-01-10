export default [
  {
    path: '/admin/student/:id',
    name: 'studentOverview',
    meta: {
      title: 'Персональна сторінка студента',
    },
    component: () => import('@/views/student/Student.vue'),
  },
  {
    path: '/student/:id',
    name: 'studentHome',
    meta: {
      title: 'Персональна сторінка студента',
    },
    component: () => import('@/views/student/Student.vue'),
  },
]
