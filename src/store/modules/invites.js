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
    setInvites(state, list) {
      state.list = list
    },
  },

  actions: {
    async createMany(_, payload) {
      try {
        const { data, status } = await axios.post('/invites/many', payload)

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async get({ commit }, filters) {
      try {
        const { data, status } = await axios.get('/invites', { params: filters })

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setInvites', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
  },
}
