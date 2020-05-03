import AsyncLoop from 'node-async-loop'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    userTests: [],
    test: {
      id: 0,
      title: '',
      description: '',
      isPublic: null,
      creator: null,
      levels: [],
      subject: null,
      colleges: [],
    },
  },

  getters: {
    userTests: ({ userTests }) => userTests,
    test: ({ test }) => test,
  },

  mutations: {
    setUserTests(state, tests) {
      state.userTests = tests
    },
    setTest(state, test) {
      state.test = test
    },
  },

  actions: {
    async create(_, payload) {
      try {
        const { data, status } = await axios.post('/tests', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getTestByID({ commit }, testID) {
      try {
        const { data, status } = await axios.get(`/tests/${testID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setTest', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    getByIDs({ commit, dispatch }, testsIDs) {
      return new Promise((resolve, reject) => {
        if (testsIDs.length === 0) return resolve([])

        const tests = []

        return AsyncLoop(testsIDs, async (testID, next) => {
          try {
            const { data: test, status } = await axios.get(`/tests/${testID}`)

            if (status !== 200) {
              return next({ error: 'Status is not 200' })
            }

            test.subject = await dispatch('subjects/getByID', test.subject, { root: true })

            tests.push(test)

            return next()
          } catch (e) {
            return next(e)
          }
        }, (err) => {
          if (err) return reject(err)

          commit('setUserTests', tests)

          return resolve(tests)
        })
      })
    },
  },
}
