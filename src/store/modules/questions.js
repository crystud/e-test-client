import AsyncLoop from 'node-async-loop'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {
    question: {
      id: 0,
      question: '',
      type: null,
      attachment: null,
      topic: {},
      creator: {},
      answers: [],
    },
  },

  getters: {
    question: ({ question }) => question,
  },

  mutations: {
    setQuestion(state, question) {
      state.question = question
    },
  },

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
            question: answerText,
            correct = false,
            position = 0,
            image: { data: image = '' } = {},
          } = questionInfo

          const payload = {
            answerText,
            correct,
            task: test,
          }

          if (position) payload.position = position
          if (image) payload.image = image

          const { data, status } = await axios.post('/answers', payload)

          if (status === 201) {
            inserted.push(data)
          }

          return next()
        }, () => resolve(inserted))
      })
    },
    async getByID({ commit }, questionID) {
      try {
        const { data, status } = await axios.get(`/tasks/${questionID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        commit('setQuestion', data)

        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject()
      }
    },
    addToTest(_, { questionsIDs, testID: test }) {
      return new Promise((resolve) => {
        if (questionsIDs.length === 0 || !test) return resolve([])

        const questions = []

        return AsyncLoop(questionsIDs, async (task, next) => {
          const { data, status } = await axios.post('/tests/addTask', { task, test })

          if (status === 201) {
            questions.push(data)
          }

          return next()
        }, () => resolve(questions))
      })
    },
  },
}
