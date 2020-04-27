import AsyncLoop from 'node-async-loop'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
  },

  getters: {
    list: ({ list }) => list,
  },

  mutations: {
    setList(state, list) {
      state.list = list
    },
  },

  actions: {
    getAll({ dispatch, rootGetters }) {
      return new Promise((resolve, reject) => {
        try {
          dispatch('user/fetchSelf', null, { root: true })

          const { teachSubjects } = rootGetters['user/self']

          if (teachSubjects.length === 0) return resolve([])

          const subjects = []

          return AsyncLoop(teachSubjects, async (subjectID, next) => {
            const { data, status } = await axios.get(`/subject/${subjectID}`)

            if (status !== 200) {
              return next({ error: 'Status was not 200' })
            }

            subjects.push(data)

            return next()
          }, (err) => {
            if (err) return reject(err)

            return resolve(subjects)
          })
        } catch (e) {
          return Promise.reject(e)
        }
      })
    },
  },
}
