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
    async verificate(_, collegeID) {
      try {
        const { data, status } = await axios.post(`/colleges/confirm/${collegeID}`)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    async fetch({ commit }, params) {
      try {
        const { status, data } = await axios.get('/colleges', { params })

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setList', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    async sendRequest(_, postData) {
      try {
        const { data, status } = await axios.post('/colleges', postData)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async editable() {
      try {
        const { data, status } = await axios.get('/colleges/editable')

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getByID(_, collegeID) {
      try {
        const { data, status } = await axios.get(`/colleges/${collegeID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getStudies({ dispatch, commit }, collegeID) {
      try {
        const { studies = [] } = await dispatch('getByID', collegeID) || {}

        if (!studies.length) {
          return Promise.resolve([])
        }

        const studiesList = await dispatch('studies/getByIDs', studies.map(({ id }) => id), { root: true })

        commit('setStudies', studiesList)

        return Promise.resolve(studiesList)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
