export default {
  namespaced: true,

  state: {
    isDarkTheme: localStorage.getItem('darkTheme') === 'true',
  },

  getters: {
    isDarkTheme: (state) => state.isDarkTheme,
  },

  mutations: {
    setTheme(state, isDark) {
      state.isDarkTheme = isDark
    },
  },

  actions: {
    setCurrentTheme({ commit }, isDarkTheme) {
      localStorage.setItem('darkTheme', !!isDarkTheme)

      commit('setTheme', !!isDarkTheme)
    },
  },
}
