import axios from 'axios'

// const baseUrl = new URL(global.window.origin)
const apiUrl = 'http://192.168.0.103:3000/'

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL || apiUrl,
})
