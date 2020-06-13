import Vue from 'vue'
import Vuex from 'vuex'

import theme from './modules/appearance'
import auth from './modules/auth'
import subjects from './modules/subjects'
import specialities from './modules/specialities'
import groups from './modules/groups'
import user from './modules/user'
import alert from './modules/alert'
import tests from './modules/tests'
import levels from './modules/levels'
import student from './modules/student'
import topics from './modules/topics'
import questions from './modules/questions'
import permissions from './modules/permissions'
import tickets from './modules/tickets'
import attempts from './modules/attempts'
import results from './modules/results'
import teacher from './modules/teacher'
import invites from './modules/invites'
import messages from './modules/messages'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    results,
    attempts,
    tickets,
    permissions,
    questions,
    topics,
    student,
    levels,
    alert,
    tests,
    theme,
    auth,
    subjects,
    specialities,
    groups,
    user,
    teacher,
    invites,
    messages,
  },
})
