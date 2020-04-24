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
    setSpecialities(state, specialties) {
      state.list = specialties
    },
  },

  actions: {
    async get({ commit }, collegeID) {
      try {
        const college = await axios.get(`/colleges/${collegeID}`)

        const { specialties } = college.data

        if (college.status !== 200 || !specialties) {
          return Promise.reject()
        }

        if (specialties.length === 0) {
          commit('setSpecialities', [])

          return Promise.resolve([])
        }

        const specialtiesList = []

        return AsyncLoop(specialties, async (specialtyID, next) => {
          const { data, status } = await axios.get(`/specialties/${specialtyID}`)

          if (status !== 200) {
            return Promise.reject()
          }

          specialtiesList.push(data)

          return next()
        }, () => {
          commit('setSpecialities', specialtiesList)

          return Promise.resolve(specialtiesList)
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async create(_, postData) {
      try {
        const { data, status } = await axios.post('/specialties', postData)

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
