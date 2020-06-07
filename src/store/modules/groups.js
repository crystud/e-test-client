import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    group: {},
  },

  getters: {
    list: ({ list }) => list,
    group: ({ group }) => group,
  },

  mutations: {
    setList(state, groups) {
      state.list = groups
    },
    setGroup(state, group) {
      state.group = group
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
    async getByID({ commit }, groupID) {
      try {
        const { data, status } = await axios.get(`/groups/${groupID}`)

        if (status !== 200) {
          return Promise.reject(status)
        }

        commit('setGroup', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    async addStudent(_, { studentID, groupID }) {
      try {
        if (!studentID || !groupID) {
          return Promise.reject()
        }

        const { data, status } = await axios.post(`/groups/${groupID}/student/${studentID}`)

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
