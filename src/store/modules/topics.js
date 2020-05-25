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
  },
}
