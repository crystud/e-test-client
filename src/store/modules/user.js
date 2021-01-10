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
    avatar: '',
  },

  getters: {
    self: ({ self }) => self,
    user: ({ user }) => user,
    searchResults: ({ searchResults }) => searchResults,
    info: ({ info }) => info,
    avatar: ({ avatar }) => avatar,
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
    setInfo(state, info) {
      state.info = info
    },
    setAvatar(state, avatar) {
      state.avatar = avatar
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
    async getAvatar({ commit }, userID) {
      try {
        const {
          data: avatar = '',
          status,
        } = await axios.get(userID ? `/users/${userID}/avatar` : '/users/avatar')

        if (status !== 200) {
          return Promise.reject()
        }

        if (!userID) {
          commit('setAvatar', avatar)
        }

        return Promise.resolve(avatar)
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
