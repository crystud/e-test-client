export default [
  {
    path: '/test/:id',
    name: 'testPreview',
    meta: {
      title: 'Інформація про тест',
    },
    component: () => import('@/views/tests/TestPreview.vue'),
  },
  {
    path: '/test/pass/:id',
    name: 'testPass',
    meta: {
      title: 'Проходження тесту',
    },
    component: () => import('@/views/tests/TestPass.vue'),
  },
  {
    path: '/test/results/:id',
    name: 'testResults',
    meta: {
      title: 'Результати тесту',
    },
    component: () => import('@/views/tests/TestResults.vue'),
  },
]
