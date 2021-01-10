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
    async get({ commit }) {
      try {
        const { data, status } = await axios.get('/specialties')

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setSpecialities', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getByID(_, specialityID) {
      try {
        const { data, status } = await axios.get(`/specialties/${specialityID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return data
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
    async attachSubject(_, payload) {
      try {
        const { data, status } = await axios.post('/specialties/addSubject', payload)

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
