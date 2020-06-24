import jwtDecode from 'jwt-decode'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    authorized: !!localStorage.getItem('refreshToken'),
  },

  getters: {
    authorized: ({ authorized }) => authorized,
    accessToken: ({ accessToken }) => accessToken,
    refreshToken: ({ refreshToken }) => refreshToken,
  },

  mutations: {
    setAccessToken(state, token) {
      localStorage.setItem('accessToken', token)
      state.accessToken = token
    },
    setRefreshToken(state, token) {
      localStorage.setItem('refreshToken', token)
      state.refreshToken = token
    },
    setAuthorized(state, authorized) {
      state.authorized = authorized
    },
  },

  actions: {
    async signUp({ commit }, postData) {
      try {
        const { data } = await axios.post('/users', postData)
        const { access, refresh } = data

        commit('setAccessToken', access)
        commit('setRefreshToken', refresh)
        commit('setAuthorized', true)

        const { user, roles } = jwtDecode(access)

        commit('user/setInfo', {
          ...user,
          roles,
        }, { root: true })

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async signIn({ commit }, postData) {
      try {
        const { data } = await axios.post('/auth/login', postData)
        const { access, refresh } = data

        commit('setAccessToken', access)
        commit('setRefreshToken', refresh)
        commit('setAuthorized', true)

        const { user, roles } = jwtDecode(access)

        commit('user/setInfo', {
          ...user,
          roles,
        }, { root: true })

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async refresh({ commit, state }) {
      const res = await axios.post('/auth/refresh', {
        token: state.refreshToken,
      })

      const { data } = res

      if (data.errors) {
        commit('setAuthorized', false)

        return Promise.reject(data.errors)
      }

      const { access, refresh } = data

      commit('setAccessToken', access)
      commit('setRefreshToken', refresh)
      commit('setAuthorized', true)

      const { user, roles } = jwtDecode(access)

      commit('user/setInfo', {
        ...user,
        roles,
      }, { root: true })

      return Promise.resolve()
    },
    exit({ commit }, $router) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')

      commit('user/setInfo', {}, { root: true })

      $router.push({ name: 'signIn' })
    },
    async redirectToHome({ dispatch, rootGetters }, { $router }) {
      try {
        const { roles = [] } = rootGetters['user/info']

        if (roles.includes('student')) {
          const [student] = await dispatch('student/getGroups', null, { root: true })

          console.log('student', student.id)

          return $router.push({
            name: 'studentHome',
            params: {
              id: student.id,
            },
          })
        }

        if (roles.includes('teacher')) {
          return $router.push({ name: 'homeTeacher' })
        }

        if (roles.includes('admin')) {
          return $router.push({ name: 'statsCollege' })
        }

        if (roles.includes('user')) {
          return $router.push({ name: 'userHome' })
        }

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
