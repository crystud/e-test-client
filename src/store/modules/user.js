import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    self: {
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
  },

  mutations: {
    setUser(state, user) {
      state.self = user
    },
  },

  actions: {
    async fetchSelf({ commit }) {
      try {
        const { data, status } = await axios.get('/users/me')

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
