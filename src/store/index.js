import Vue from 'vue'
import Vuex from 'vuex'

import theme from './modules/appearance'
import auth from './modules/auth'
import college from './modules/college'
import edbo from './modules/edbo'
import subjects from './modules/subjects'
import specialities from './modules/specialities'
import groups from './modules/groups'
import user from './modules/user'
import alert from './modules/alert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alert,
    theme,
    auth,
    college,
    edbo,
    subjects,
    specialities,
    groups,
    user,
  },
})
