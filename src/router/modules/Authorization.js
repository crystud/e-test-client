export default [
  {
    path: '/',
    meta: {
      onlyWithoutAuth: true,
    },
    component: () => import('@/views/Authorization.vue'),
    children: [
      {
        path: '/',
        name: 'signIn',
        component: () => import('@/components/templates/authorization/AppSignIn.vue'),
      },
      {
        path: '/join',
        name: 'signUp',
        component: () => import('@/components/templates/authorization/AppSignUp.vue'),
      },
      {
        path: '/forgot',
        name: 'forgotPassword',
        component: () => import('@/components/templates/authorization/AppForgotPassword.vue'),
      },
      {
        path: '/restore/:hash',
        name: 'restorePassword',
        component: () => import('@/components/templates/authorization/AppRestorePassword.vue'),
      },
    ],
  },
]
