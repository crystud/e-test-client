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
    async get({ commit }, groupsIDS) {
      return new Promise((resolve, reject) => {
        if (!groupsIDS.length) {
          return resolve([])
        }

        const groups = []

        return AsyncLoop(groupsIDS, async (groupID, next) => {
          const { data, status } = await axios.get(`/groups/${groupID}`)

          if (status !== 200) {
            return reject(status)
          }

          groups.push(data)

          return next()
        }, () => {
          commit('setList', groups)

          return resolve(groups)
        })
      })
    },
  },
}
