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
        meta: {
          title: 'Авторизація - CRYSTUD',
        },
        component: () => import('@/components/templates/authorization/AppSignIn.vue'),
      },
      {
        path: '/join',
        name: 'signUp',
        meta: {
          title: 'Приєднатись - CRYSTUD',
        },
        component: () => import('@/components/templates/authorization/AppSignUp.vue'),
      },
      {
        path: '/forgot',
        name: 'forgotPassword',
        meta: {
          title: 'Відновлення паролю - CRYSTUD',
        },
        component: () => import('@/components/templates/authorization/AppForgotPassword.vue'),
      },
      {
        path: '/restore/:hash',
        name: 'restorePassword',
        meta: {
          title: 'Скидання паролю - CRYSTUD',
        },
        component: () => import('@/components/templates/authorization/AppRestorePassword.vue'),
      },
    ],
  },
]
