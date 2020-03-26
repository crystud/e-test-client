export default [
  {
    name: 'createTest',
    path: '/create',
    meta: {
      title: 'Створення тесту',
    },
    component: () => import('@/views/CreateTest.vue'),
  },
  {
    name: 'testLiveData',
    path: '/test/:testID/live',
    meta: {
      title: 'Дані про тест (наживо)',
    },
    component: () => import('@/views/TestDataLive.vue'),
  },
]
