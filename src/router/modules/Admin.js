export default [
  {
    path: '/admin',
    name: 'college',
    component: () => import('@/views/College.vue'),
  },
  {
    path: '/admin/specialtys',
    name: 'specialtys',
    component: () => import('@/views/Specialtys.vue'),
  },
  {
    path: '/admin/classes',
    name: 'classes',
    component: () => import('@/views/Classes.vue'),
  },
  {
    path: '/admin/subjects',
    name: 'subjects',
    component: () => import('@/views/Subjects.vue'),
  },
  {
    path: '/admin/students',
    name: 'students',
    component: () => import('@/views/Students.vue'),
  },
]
