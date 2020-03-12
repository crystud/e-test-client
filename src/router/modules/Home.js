export default [
  {
    path: '/user',
    name: 'homeUser',
    meta: {
      title: 'Домівка - CRYSTUD',
    },
    component: () => import('@/components/templates/authorization/home/User'),
  },
]
