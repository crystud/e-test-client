export default {
  namespaced: true,

  state: {
    alert: {
      title: '',
      text: '',
      delay: 1500,
      show: false,
      isSuccess: false,
    },
  },

  getters: {
    alert: ({ alert }) => alert,
  },

  mutations: {
    setAlert(state, alert) {
      state.alert = alert
    },
  },

  actions: {
    close({ commit }) {
      commit('setAlert', {
        title: '',
        text: '',
        delay: 1500,
        show: false,
        isSuccess: false,
      })
    },
    set({ commit }, alert) {
      const alertObject = alert

      if (!alertObject.delay) alertObject.delay = 1500

      commit('setAlert', alert)
    },
  },
}
