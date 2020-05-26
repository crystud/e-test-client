import jwtDecode from 'jwt-decode'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    info: localStorage.accessToken ? ({
      ...jwtDecode(localStorage.accessToken || '').user,
      roles: jwtDecode(localStorage.accessToken || '').roles,
    }) : {},
    searchResults: [],
  },

  getters: {
    self: ({ self }) => self,
    user: ({ user }) => user,
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
