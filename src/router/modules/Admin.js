export default [
  {
    path: '/admin',
    name: 'college',
    meta: {
      title: 'Навчальний заклад',
    },
    component: () => import('@/views/College.vue'),
  },
  {
    path: '/admin/specialtys',
    name: 'specialtys',
    meta: {
      title: 'Спеціальності',
    },
    component: () => import('@/views/Specialtys.vue'),
  },
  {
    path: '/admin/classes',
    name: 'classes',
    meta: {
      title: 'Пари/Уроки',
    },
    component: () => import('@/views/Classes.vue'),
  },
  {
    path: '/admin/subjects',
    name: 'subjects',
    meta: {
      title: 'Предмети',
    },
    component: () => import('@/views/Subjects.vue'),
  },
  {
    path: '/admin/students',
    name: 'students',
    meta: {
      title: 'Студенти',
    },
    component: () => import('@/views/Students.vue'),
  },
  {
    path: '/assigning/:specialtyID',
    name: 'assigning',
    meta: {
      title: 'Призначення тестів',
    },
    component: () => import('@/views/TestsAssigning.vue'),
  },
  {
    path: '/request',
    name: 'request',
    meta: {
      title: 'Заявка на створення навчального закладу',
    },
    component: () => import('@/views/CollegeRequest.vue'),
  },
]
