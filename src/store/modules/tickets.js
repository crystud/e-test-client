import AsyncLoop from 'node-async-loop'

import axios from '../../tools/axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    async getByID({ dispatch }, ticketID) {
      try {
        const { data, status } = await axios.get(`/tickets/${ticketID}`)

        if (status !== 200) {
          return Promise.reject()
        }

        const test = await dispatch('tests/getTestByID', data.permission.test, { root: true })

        return Promise.resolve({
          ...data,
          test,
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    getByIDs({ dispatch }, ticketsIDs) {
      return new Promise((resolve) => {
        if (!ticketsIDs.length) return resolve([])

        const tickets = []

        return AsyncLoop(ticketsIDs, async (ticketID, next) => {
          const ticket = await dispatch('getByID', ticketID)

          if (!ticket.id) {
            return next()
          }

          tickets.push(ticket)

          return next()
        }, () => resolve(tickets))
      })
    },
    async use(_, ticketID) {
      try {
        const { data, status } = await axios.post(`/tickets/${ticketID}/use`)

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
