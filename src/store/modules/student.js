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
    async getByID(_, studentID) {
      try {
        const { data, status } = await axios.get(`/students/${studentID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
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
    async getTickets({ commit, rootGetters }, { student, filters }) {
      try {
        let userID

        if (!student) {
          userID = rootGetters['user/info'].id
        }

        const { data, status } = await axios.get(`/tickets/findByStudent/${student || userID}`, {
          params: filters,
        })

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
