import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    async getByID(_, resultID) {
      try {
        const { data, status } = await axios.get(`/results/${resultID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    async getByIDs(_, resultsIDs) {
      try {
        const { data, status } = await axios.get(`/results/${resultsIDs}/ids`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
  },
}
