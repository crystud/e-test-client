import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    tests: [],
    subjects: [],
    permissions: [],
  },

  getters: {
    tests: ({ tests }) => tests,
    subjects: ({ subjects }) => subjects,
    permissions: ({ permissions }) => permissions,
  },

  mutations: {
    setTests(state, tests) {
      state.tests = tests
    },
    setSubjects(state, subjects) {
      state.subjects = subjects
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
  },

  actions: {
    async getOwnTests({ commit, rootGetters }, teacherID) {
      try {
        if (!(rootGetters['user/info'].roles || []).includes('teacher') || !teacherID) {
          commit('setTests', [])

          return Promise.resolve([])
        }

        const { data, status } = await axios.get(`/tests/own/${teacherID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setTests', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getSubjects({ commit, rootGetters }) {
      try {
        if (!(rootGetters['user/info'].roles || []).includes('teacher')) {
          commit('setSubjects', [])

          return Promise.resolve([])
        }

        const { data, status } = await axios.get('/teachers/own')

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setSubjects', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getPermissions({ commit }, teacherID) {
      try {
        const { data, status } = await axios.get(`/permissions/findByTeacher/${teacherID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setPermissions', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async create(_, payload) {
      try {
        const { data, status } = await axios.post('/teachers', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
  },
}
