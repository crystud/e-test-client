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
    getAll({ dispatch, rootGetters, commit }) {
      return new Promise((resolve, reject) => {
        try {
          dispatch('user/fetchSelf', null, { root: true })

          const { teachSubjects } = rootGetters['user/self']

          if (teachSubjects.length === 0) return resolve([])

          const subjects = []

          return AsyncLoop(teachSubjects, async (subjectID, next) => {
            const { data, status } = await axios.get(`/subjects/${subjectID}`)

            if (status !== 200) {
              return next({ error: 'Status was not 200' })
            }

            subjects.push(data)

            return next()
          }, (err) => {
            if (err) return reject(err)

            commit('setList', subjects)

            return resolve(subjects)
          })
        } catch (e) {
          return Promise.reject(e)
        }
      })
    },
    getAllStudies({ dispatch, commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        try {
          dispatch('user/fetchSelf', null, { root: true })

          const { studies } = rootGetters['user/self']

          if (studies.length === 0) return resolve([])

          const subjects = []

          return AsyncLoop(studies, async (study, next) => {
            const { data, status } = await axios.get(`/studies/${study}`)

            if (status !== 200) {
              return next({ error: 'Status was not 200' })
            }

            subjects.push(data)

            return next()
          }, (err) => {
            if (err) return reject(err)

            commit('setStudies', subjects)

            return resolve(subjects)
          })
        } catch (e) {
          return Promise.reject(e)
        }
      })
    },
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
