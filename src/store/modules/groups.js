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
    setList(state, groups) {
      state.list = groups
    },
  },

  actions: {
    async create(_, postData) {
      try {
        const { data, status } = await axios.post('/groups', postData)

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
