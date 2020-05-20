import AsyncLoop from 'node-async-loop'
import jwtDecode from 'jwt-decode'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    permissions: [],
    groups: [],
    subjects: [],
    info: localStorage.accessToken ? ({
      ...jwtDecode(localStorage.accessToken || '').user,
      roles: jwtDecode(localStorage.accessToken || '').roles,
    }) : {},
    user: {
      notEvaluated: true,
      firstName: '',
      lastName: '',
      patronymic: '',
      roles: [],
      email: '',
      createAt: '',
      groups: [],
      tests: [],
    },
    searchResults: [],
  },

  getters: {
    self: ({ self }) => self,
    user: ({ user }) => user,
    permissions: ({ permissions }) => permissions,
    results: ({ results }) => results,
    tickets: ({ tickets }) => tickets,
    searchResults: ({ searchResults }) => searchResults,
    info: ({ info }) => info,
  },

  mutations: {
    setSelf(state, self) {
      state.self = self
    },
    setUser(state, user) {
      state.user = user
    },
    setSearchResults(state, searchResults) {
      state.searchResults = searchResults
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
    setResults(state, results) {
      state.results = results
    },
    setTickets(state, tickets) {
      state.tickets = tickets
    },
    setInfo(state, info) {
      state.info = info
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
    async getPermissions({ commit }) {
      try {
        const { data, status } = await axios.get('/users/me/permissions')

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setPermissions', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getTickets({ commit }) {
      try {
        const { data, status } = await axios.get('/users/me/tickets')

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
