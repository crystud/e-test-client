export default [
  {
    path: '/admin/stats',
    name: 'statsCollege',
    meta: {
      title: 'Статистика навчального закладу',
    },
    component: () => import('@/views/superadmin/CollegeStats.vue'),
  },
]
