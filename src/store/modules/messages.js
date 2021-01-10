import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    messages: [],
    page: 0,
    lastFetchedCount: 0,
    limit: 15,
  },

  getters: {
    messages: ({ messages }) => messages,
    lastFetchedCount: ({ lastFetchedCount }) => lastFetchedCount,
    page: ({ page }) => page,
    limit: ({ limit }) => limit,
  },

  mutations: {
    setMessages(state, sent) {
      state.messages = sent
    },
    setPage(state, page) {
      state.page = page
    },
    setLastFetchedCount(state, count) {
      state.lastFetchedCount = count
    },
  },

  actions: {
    async getSentMessages({ commit, getters }, { initiate }) {
      try {
        if (initiate) {
          commit('setMessages', [])
        }

        const { page, limit, messages } = getters

        const pageValue = initiate ? 0 : page + 1

        const { data = [], status } = await axios.get('/messages/sended', {
          params: {
            limit,
            offset: limit * pageValue,
          },
        }) || {}

        commit('setPage', pageValue)
        commit('setMessages', [...messages, ...data])
        commit('setLastFetchedCount', data.length)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async send(_, postData) {
      try {
        const { data, status } = await axios.post('/messages/sendToGroups', postData) || {}

        if (status !== 201) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getByStudentID({ commit, getters }, { initiate, studentID: student }) {
      try {
        if (initiate) {
          commit('setMessages', [])
        }

        const { page, limit, messages } = getters

        const pageValue = initiate ? 0 : page + 1

        const { data = [], status } = await axios.get('/messages/findByStudent', {
          params: {
            limit,
            offset: limit * pageValue,
            student,
          },
        }) || {}

        commit('setPage', pageValue)
        commit('setMessages', [...messages, ...data])
        commit('setLastFetchedCount', data.length)

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
