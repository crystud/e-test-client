import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    subjects: [],
  },

  getters: {
    subjects: ({ subjects }) => subjects,
  },

  mutations: {
    setSubjects(state, subjects) {
      state.subjects = subjects
    },
  },

  actions: {
    async fetch({ commit }) {
      try {
        const { data, status } = await axios.get('/subjects')

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setSubjects', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getByID(_, subjectID) {
      try {
        const { data, status } = await axios.get(`/subjects/${subjectID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async create(_, createData) {
      try {
        const { data, status } = await axios.post('/subjects', createData)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
