import AsyncLoop from 'node-async-loop'

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
    searchResults: [],
  },

  getters: {
    self: ({ self }) => self,
    user: ({ user }) => user,
    searchResults: ({ searchResults }) => searchResults,
  },

  mutations: {
    setSelf(state, self) {
      state.self = self
    },
    setUser(state, user) {
      state.user = user
    },
    setSearchResults(state, results) {
      state.searchResults = results
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
    async getUsers(_, userIDs) {
      return new Promise((resolve, reject) => {
        try {
          if (userIDs.length === 0) {
            return Promise.resolve([])
          }

          const users = []

          return AsyncLoop(userIDs, async (userID, next) => {
            const { data, status } = await axios.get(`/users/${userID}`)

            if (status !== 200) {
              return reject()
            }

            users.push(data)

            return next()
          }, () => resolve(users))
        } catch (e) {
          return reject(e)
        }
      })
    },
    async search({ commit }, searchData) {
      try {
        const { data, status } = await axios.get('/users', {
          params: searchData,
        })

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
