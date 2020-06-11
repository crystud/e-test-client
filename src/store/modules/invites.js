import jwtDecode from 'jwt-decode'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    invite: {},
    overview: {},
  },

  getters: {
    list: ({ list }) => list,
    invite: ({ invite }) => invite,
    overview: ({ overview }) => overview,
  },

  mutations: {
    setInvites(state, list) {
      state.list = list
    },
    setInvite(state, invite) {
      state.invite = invite
    },
    setOverview(state, overview) {
      state.overview = overview
    },
  },

  actions: {
    async createMany(_, payload) {
      try {
        const { data, status } = await axios.post('/invites/many', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async get({ commit }, filters) {
      try {
        const { data, status } = await axios.get('/invites', { params: filters })

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setInvites', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    async getOverview({ commit }) {
      try {
        const { data, status } = await axios.get('/invites/info')

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setOverview', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    async getByCode({ commit }, code) {
      try {
        const params = { code }

        const { data, status } = await axios.get('/invites/findOneByCode', { params })

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setInvite', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    async activate({ commit }, payload) {
      try {
        const { data, status } = await axios.post('/invites/activate', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        const { access, refresh } = data

        commit('auth/setAccessToken', access, { root: true })
        commit('auth/setRefreshToken', refresh, { root: true })
        commit('auth/setAuthorized', true, { root: true })

        const { user, roles } = jwtDecode(access)

        commit('user/setInfo', {
          ...user,
          roles,
        }, { root: true })

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
  },
}
