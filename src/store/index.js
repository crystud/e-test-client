import Vue from 'vue'
import Vuex from 'vuex'

import theme from './modules/appearance'
import auth from './modules/auth'
import college from './modules/college'
import edbo from './modules/edbo'
import subjects from './modules/subjects'
import specialities from './modules/specialities'
import groups from './modules/groups'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    theme,
    auth,
    college,
    edbo,
    subjects,
    specialities,
    groups,
  },
})
