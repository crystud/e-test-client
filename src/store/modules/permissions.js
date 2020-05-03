import AsyncLoop from 'node-async-loop'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    async create(_, payload) {
      try {
        const { data, status } = await axios.post('/permissions', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    getByIDs({ dispatch }, permissionsIDs) {
      return new Promise((resolve) => {
        if (!permissionsIDs.length) return resolve([])

        const permissions = []

        return AsyncLoop(permissionsIDs, async (permissionID, next) => {
          const { data, status } = await axios.get(`/permissions/${permissionID}`)

          if (status !== 200) {
            return next()
          }

          const test = await dispatch('tests/getTestByID', data.test, { root: true })

          permissions.push({
            ...data,
            test,
          })

          return next()
        }, () => resolve(permissions))
      })
    },
  },
}
