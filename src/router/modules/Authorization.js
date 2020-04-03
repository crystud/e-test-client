export default [
  {
    path: '/auth',
    meta: {
      onlyWithoutAuth: true,
    },
    component: () => import('@/views/authorization/Authorization.vue'),
    children: [
      {
        path: '/',
        name: 'signIn',
        meta: {
          title: 'Авторизація',
        },
        component: () => import('@/components/templates/authorization/AppSignIn.vue'),
      },
      {
        path: '/join',
        name: 'signUp',
        meta: {
          title: 'Приєднатись',
        },
        component: () => import('@/components/templates/authorization/AppSignUp.vue'),
      },
      {
        path: '/forgot',
        name: 'forgotPassword',
        meta: {
          title: 'Відновлення паролю',
        },
        component: () => import('@/components/templates/authorization/AppForgotPassword.vue'),
      },
      {
        path: '/restore/:hash',
        name: 'restorePassword',
        meta: {
          title: 'Скидання паролю',
        },
        component: () => import('@/components/templates/authorization/AppRestorePassword.vue'),
      },
    ],
  },
]
