import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    async getByID(_, attemptID) {
      try {
        const { data, status } = await axios.get(`/attempts/${attemptID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getTasks(_, attemptID) {
      try {
        const { data, status } = await axios.get(`/attempts/${attemptID}/tasks`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getQuestion(_, questionID) {
      try {
        const { data, status } = await axios.get(`/attempts/attemptTasks/${questionID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async sendAnswers(_, { payload: tasks, attemptID }) {
      try {
        const { data, status } = await axios.post('/attempts/complete', {
          ...tasks,
          attempt: parseInt(attemptID, 10),
        })

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
