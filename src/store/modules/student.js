import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    tickets: [],
    studentGroups: [],
  },

  getters: {
    tickets: ({ tickets }) => tickets,
    studentGroups: ({ studentGroups }) => studentGroups,
  },

  mutations: {
    setTickets(state, tickets) {
      state.tickets = tickets
    },
    setStudentGroups(state, groups) {
      state.studentGroups = groups
    },
  },

  actions: {
    async getGroups({ commit }) {
      try {
        const { data, status } = await axios.get('/students/own')

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setStudentGroups', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
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
    async create(_, payload) {
      try {
        const { data, status } = await axios.post('/students', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
