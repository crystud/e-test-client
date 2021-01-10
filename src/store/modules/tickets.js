import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    async getByID(_, ticketID) {
      try {
        const { data, status } = await axios.get(`/tickets/${ticketID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async use(_, ticket) {
      try {
        const { data, status } = await axios.post('/attempts', { ticket })

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
