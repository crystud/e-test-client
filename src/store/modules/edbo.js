import axios from 'axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    async search(_, query) {
      try {
        const { data, status } = await axios.post(`https://registry.edbo.gov.ua/api/university-search/?ns=${query}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getData(_, collegeID) {
      try {
        const { data, status } = await axios.post(`https://registry.edbo.gov.ua/api/university/?id=${collegeID}&exp=json`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
