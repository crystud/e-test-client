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
        const { data, status } = await axios.post('/levels', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getByIDs(_, levelsIDs) {
      return new Promise((resolve, reject) => {
        if (levelsIDs.length === 0) return resolve([])

        const levels = []

        return AsyncLoop(levelsIDs, async (levelID, next) => {
          const { data, status } = await axios.get(`/levels/${levelID}`)

          if (status !== 200) {
            return next({ error: 'server response status was not 200' })
          }

          levels.push(data)

          return next()
        }, (err) => {
          if (err) return reject(err)

          return resolve(levels)
        })
      })
    },
  },
}
