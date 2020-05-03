import AsyncLoop from 'node-async-loop'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    studies: [],
  },

  getters: {
    list: ({ list }) => list,
    studies: ({ studies }) => studies,
  },

  mutations: {
    setList(state, list) {
      state.list = list
    },
    setStudies(state, studies) {
      state.studies = studies
    },
  },

  actions: {
    getByIDs(_, studiesIDs) {
      return new Promise((resolve) => {
        if (!studiesIDs.length) return resolve([])

        const studies = []

        return AsyncLoop(studiesIDs, async (id, next) => {
          const { data, status } = await axios.get(`/studies/${id}`)

          if (status !== 200) {
            return next()
          }

          studies.push(data)

          return next()
        }, () => resolve(studies))
      })
    },
  },
}
