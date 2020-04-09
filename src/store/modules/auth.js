import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    authorized: !!localStorage.getItem('refreshToken'),
  },

  getters: {
    authorized: ({ authorized }) => authorized,
    accessToken: ({ accessToken }) => accessToken,
    refreshToken: ({ refreshToken }) => refreshToken,
  },

  mutations: {
    setAccessToken(state, token) {
      localStorage.setItem('accessToken', token)
      state.accessToken = token
    },
    setRefreshToken(state, token) {
      localStorage.setItem('refreshToken', token)
      state.refreshToken = token
    },
    setAuthorized(state, authorized) {
      state.authorized = authorized
    },
  },

  actions: {
    async signUp({ commit }, postData) {
      try {
        const { data } = await axios.post('/users', postData)
        const { access, refresh } = data

        commit('setAccessToken', access)
        commit('setRefreshToken', refresh)
        commit('setAuthorized', true)

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async signIn({ commit }, postData) {
      try {
        const { data } = await axios.post('/auth/login', postData)
        const { access, refresh } = data

        commit('setAccessToken', access)
        commit('setRefreshToken', refresh)
        commit('setAuthorized', true)

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async refresh({ commit, state }) {
      const res = await axios.post('/auth/refresh', {
        token: state.refreshToken,
      })

      const { data } = res

      if (data.errors) {
        commit('setAuthorized', false)

        return Promise.reject(data.errors)
      }

      const { access, refresh } = data

      commit('setAccessToken', access)
      commit('setRefreshToken', refresh)
      commit('setAuthorized', true)

      return Promise.resolve()
    },
  },
}
