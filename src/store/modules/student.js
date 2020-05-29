import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    results: [],
    tickets: [],
  },

  getters: {
    results: ({ results }) => results,
    tickets: ({ tickets }) => tickets,
  },

  mutations: {
    setResults(state, results) {
      state.results = results
    },
    setTickets(state, tickets) {
      state.tickets = tickets
    },
  },

  actions: {
    async getTickets({ commit, rootGetters }, studentID) {
      try {
        let userID

        if (!studentID) {
          userID = rootGetters['user/info'].id
        }

        const { data, status } = await axios.get(`/tickets/findByStudent/${studentID || userID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setTickets', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getResults({ commit }) {
      try {
        const { data, status } = await axios.get('/users/me/results')

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setResults', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
