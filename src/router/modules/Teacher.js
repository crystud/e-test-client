export default [
  {
    name: 'createTest',
    path: '/create',
    meta: {
      title: 'Створення тесту',
    },
    component: () => import('@/views/teacher/CreateTest.vue'),
  },
  {
    name: 'testLiveData',
    path: '/test/:testID/live',
    meta: {
      title: 'Дані про тест (наживо)',
    },
    component: () => import('@/views/teacher/TestDataLive.vue'),
  },
  {
    name: 'teacher',
    path: '/teacher/:id',
    meta: {
      title: 'Профіль вчителя',
    },
    component: () => import('@/views/teacher/Teacher.vue'),
  },
  {
    name: 'homeTeacher',
    path: '/home/teacher',
    meta: {
      title: 'Домівка вчителя',
    },
    component: () => import('@/views/teacher/Teacher.vue'),
  },
  {
    path: '/tests/own',
    name: 'TeacherOwnTests',
    meta: {
      title: 'Тести у авторській розробці',
    },
    component: () => import('@/views/teacher/Tests.vue'),
  },
  {
    path: '/questions/bank',
    name: 'questionsBank',
    meta: {
      title: 'Банк питань',
    },
    component: () => import('@/views/teacher/QuestionsBank.vue'),
  },
  {
    path: '/topic/:id',
    name: 'topic',
    meta: {
      title: 'Сторінка теми',
    },
    component: () => import('@/views/teacher/Topic.vue'),
  },
]
