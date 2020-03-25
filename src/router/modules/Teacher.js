export default [
  {
    name: 'createTest',
    path: '/create',
    meta: {
      title: 'Створення тесту',
    },
    component: () => import('@/views/CreateTest.vue'),
  },
]
