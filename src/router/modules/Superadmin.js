export default [
  {
    path: '/verify/:requestID',
    name: 'verifyRequest',
    meta: {
      title: 'Перевірка заявки на верифікацію',
    },
    component: () => import('@/views/VerifyRequest.vue'),
  },
  {
    path: '/verify',
    name: 'verifyRequests',
    meta: {
      title: 'Заявки на створення',
    },
    component: () => import('@/views/VerifyRequests.vue'),
  },
]
