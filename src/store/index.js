import Vue from 'vue'
import Vuex from 'vuex'

import theme from './modules/appearance'
import auth from './modules/auth'
import college from './modules/college'
import subjects from './modules/subjects'
import specialities from './modules/specialities'
import groups from './modules/groups'
import user from './modules/user'
import alert from './modules/alert'
import tests from './modules/tests'
import levels from './modules/levels'
import studies from './modules/studies'
import topics from './modules/topics'
import questions from './modules/questions'
import permissions from './modules/permissions'
import tickets from './modules/tickets'
import attempts from './modules/attempts'
import results from './modules/results'
import teacher from './modules/teacher'

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
    studies,
    levels,
    alert,
    tests,
    theme,
    auth,
    college,
    subjects,
    specialities,
    groups,
    user,
    teacher,
  },
})
