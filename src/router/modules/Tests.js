export default [
  {
    path: '/tests',
    name: 'tests',
    meta: {
      title: 'Тести',
    },
    component: () => import('@/views/Tests.vue'),
  },
  {
    path: '/test/:id',
    name: 'testPreview',
    meta: {
      title: 'Інформація про тест',
    },
    component: () => import('@/views/TestPreview.vue'),
  },
  {
    path: '/test/pass/:id',
    name: 'testPass',
    meta: {
      title: 'Проходження тесту',
    },
    component: () => import('@/views/TestPass.vue'),
  },
  {
    path: '/test/results/:id',
    name: 'testResults',
    meta: {
      title: 'Результати тесту',
    },
    component: () => import('@/views/TestResults.vue'),
  },
]
