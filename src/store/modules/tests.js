import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    userTests: [],
    test: {
      id: 0,
      title: '',
      description: '',
      isPublic: null,
      creator: null,
      levels: [],
      subject: null,
      colleges: [],
    },
  },

  getters: {
    userTests: ({ userTests }) => userTests,
    test: ({ test }) => test,
  },

  mutations: {
    setUserTests(state, tests) {
      state.userTests = tests
    },
    setTest(state, test) {
      state.test = test
    },
  },

  actions: {
    async create(_, payload) {
      try {
        const { data, status } = await axios.post('/tests', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getTestByID({ commit }, testID) {
      try {
        const { data, status } = await axios.get(`/tests/${testID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setTest', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
