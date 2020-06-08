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
    path: '/admin/specialities',
    name: 'specialtys',
    meta: {
      title: 'Спеціальності',
    },
    component: () => import('@/views/admin/Specialtys.vue'),
  },
  {
    path: '/admin/specialities/sync',
    name: 'specialtysSync',
    meta: {
      title: 'Синхронізація спеціальностей',
    },
    component: () => import('@/views/admin/SpecialitiesSync.vue'),
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
  {
    path: '/invites/:groupID',
    name: 'invites',
    meta: {
      title: 'Створення запрошень для групи',
    },
    component: () => import('@/views/admin/Invites.vue'),
  },
  {
    path: '/invites',
    name: 'createdInvites',
    meta: {
      title: 'Створені запрошення',
    },
    component: () => import('@/views/admin/CreatedInvites.vue'),
  },
]
