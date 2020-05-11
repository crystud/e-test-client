import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    searchResults: [],
  },

  getters: {
    list: ({ list }) => list,
    searchResults: ({ searchResults }) => searchResults,
  },

  mutations: {
    setTopics(state, list) {
      state.list = list
    },
    setSearchResults(state, results) {
      state.searchResults = results
    },
  },

  actions: {
    async create(_, payload) {
      try {
        const { data, status } = await axios.post('/topics', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getByID(_, topicID) {
      try {
        const { data, status } = await axios.get(`/topics/${topicID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async search({ commit }, { name, confirmed, subject }) {
      try {
        const params = {}

        if (name) params.name = name
        if (confirmed.length !== 0) params.confirmed = confirmed
        if (subject) params.subject = subject

        const { data, status } = await axios.get('/topics', { params })

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setSearchResults', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
