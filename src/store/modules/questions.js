import AsyncLoop from 'node-async-loop'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    async create(_, questionData) {
      const { data, status } = await axios.post('/tasks', questionData)

      if (status !== 201) {
        return Promise.reject()
      }

      return Promise.resolve(data)
    },
    async addAnswers(_, { questions, test }) {
      return new Promise((resolve, reject) => {
        if (!questions.length || !test) {
          return reject()
        }

        const inserted = []

        return AsyncLoop(questions, async (questionInfo, next) => {
          const {
            question: text,
            correct = false,
            position = 0,
          } = questionInfo

          const { data, status } = await axios.post('/answers', {
            text,
            correct,
            position,
            task: test,
          })

          if (status === 201) {
            inserted.push(data)
          }

          return next()
        }, () => resolve(inserted))
      })
    },
    async getByID(_, questionID) {
      try {
        const { data, status } = await axios.get(`/tasks/${questionID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    getByIDs({ dispatch }, questionsIDs) {
      return new Promise((resolve) => {
        if (questionsIDs.length === 0) return resolve([])

        const questions = []

        return AsyncLoop(questionsIDs, async (id, next) => {
          const question = await dispatch('getByID', id)

          if (question) {
            questions.push(question)
          }

          return next()
        }, () => resolve(questions))
      })
    },
    addToTest(_, { questionsIDs, level }) {
      return new Promise((resolve) => {
        if (questionsIDs.length === 0 || !level) return resolve([])

        const questions = []

        return AsyncLoop(questionsIDs, async (questionID, next) => {
          const { data, status } = await axios.post(`/levels/${level}/task/${questionID}`)

          if (status === 201) {
            questions.push(data)
          }

          return next()
        }, () => resolve(questions))
      })
    },
  },
}
