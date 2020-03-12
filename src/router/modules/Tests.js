export default [
  {
    path: '/tests',
    name: 'tests',
    component: () => import('@/views/Tests.vue'),
  },
  {
    path: '/test/:id',
    name: 'testPreview',
    component: () => import('@/views/TestPreview.vue'),
  },
  {
    path: '/test/pass/:id',
    name: 'testPass',
    component: () => import('@/views/TestPass.vue'),
  },
  {
    path: '/test/results/:id',
    name: 'testResults',
    component: () => import('@/views/TestResults.vue'),
  },
]
