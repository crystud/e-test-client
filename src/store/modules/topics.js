import AsyncLoop from 'node-async-loop'

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
    async getByID({ dispatch }, topicID) {
      try {
        const { data, status } = await axios.get(`/topics/${topicID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        const creator = await dispatch('user/getUser', data.creator, { root: true })

        data.creator = creator

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async search({ commit }, { name, confirmed }) {
      try {
        const params = {}

        if (name) params.name = name
        if (confirmed) params.confirmed = confirmed

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
    getByIDs({ dispatch, commit }, topicsIDs) {
      return new Promise((resolve, reject) => {
        try {
          if (topicsIDs.length === 0) return resolve([])

          const topics = []

          return AsyncLoop(topicsIDs, async (topicID, next) => {
            const topic = await dispatch('getByID', topicID)

            topics.push(topic)

            return next()
          }, () => {
            commit('setTopics', topics)

            return resolve(topics)
          })
        } catch (e) {
          return reject(e)
        }
      })
    },
  },
}
