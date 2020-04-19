import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    self: {
      notEvaluated: true,
      firstName: '',
      lastName: '',
      patronymic: '',
      roles: [],
      email: '',
      createAt: '',
      editableColleges: [],
      groups: [],
      ownColleges: [],
      createSubjectRequests: [],
      createTopicRequests: [],
      teachSubjects: [],
      studies: [],
      tests: [],
    },
    user: {
      notEvaluated: true,
      firstName: '',
      lastName: '',
      patronymic: '',
      roles: [],
      email: '',
      createAt: '',
      editableColleges: [],
      groups: [],
      ownColleges: [],
      createSubjectRequests: [],
      createTopicRequests: [],
      teachSubjects: [],
      studies: [],
      tests: [],
    },
  },

  getters: {
    self: ({ self }) => self,
    user: ({ user }) => user,
  },

  mutations: {
    setSelf(state, self) {
      state.self = self
    },
    setUser(state, user) {
      state.user = user
    },
  },

  actions: {
    async fetchSelf({ commit }) {
      try {
        const { data, status } = await axios.get('/users/me')

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setSelf', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getUser({ commit }, userID) {
      try {
        const { data, status } = await axios.get(`/users/${userID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setUser', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
