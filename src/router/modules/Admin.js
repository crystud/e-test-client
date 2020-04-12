export default [
  {
    path: '/admin',
    name: 'college',
    meta: {
      title: 'Навчальний заклад',
    },
    component: () => import('@/views/admin/College.vue'),
  },
  {
    path: '/admin/specialtys',
    name: 'specialtys',
    meta: {
      title: 'Спеціальності',
    },
    component: () => import('@/views/admin/Specialtys.vue'),
  },
  {
    path: '/admin/classes',
    name: 'classes',
    meta: {
      title: 'Пари/Уроки',
    },
    component: () => import('@/views/admin/Classes.vue'),
  },
  {
    path: '/admin/subjects',
    name: 'subjects',
    meta: {
      title: 'Предмети',
    },
    component: () => import('@/views/admin/Subjects.vue'),
  },
  {
    path: '/admin/students',
    name: 'students',
    meta: {
      title: 'Студенти',
    },
    component: () => import('@/views/admin/Students.vue'),
  },
  {
    path: '/assigning/:specialtyID',
    name: 'assigning',
    meta: {
      title: 'Призначення тестів',
    },
    component: () => import('@/views/admin/TestsAssigning.vue'),
  },
  {
    path: '/request',
    name: 'request',
    meta: {
      title: 'Заявка на створення навчального закладу',
    },
    component: () => import('@/views/admin/CollegeRequest.vue'),
  },
  {
    path: '/groups',
    name: 'groups',
    meta: {
      title: 'Групи',
    },
    component: () => import('@/views/admin/Groups.vue'),
  },
  {
    path: '/group/:id',
    name: 'group',
    meta: {
      title: 'Група',
    },
    component: () => import('@/views/admin/Group.vue'),
  },
]
