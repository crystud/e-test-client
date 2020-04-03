export default [
  {
    path: '/verify/:requestID',
    name: 'verifyRequest',
    meta: {
      title: 'Перевірка заявки на верифікацію',
    },
    component: () => import('@/views/superadmin/VerifyRequest.vue'),
  },
  {
    path: '/verify',
    name: 'verifyRequests',
    meta: {
      title: 'Заявки на створення',
    },
    component: () => import('@/views/superadmin/VerifyRequests.vue'),
  },
  {
    path: '/stats',
    name: 'statsGlobal',
    meta: {
      title: 'Загальна статистика',
    },
    component: () => import('@/views/superadmin/GlobalStats.vue'),
  },
]
