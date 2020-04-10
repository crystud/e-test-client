export default (axiosInstance, store) => {
  axiosInstance.interceptors.request.use(async (request) => {
    if (store.getters['auth/authorized']) {
      // eslint-disable-next-line no-param-reassign
      request.headers.authorization = `Bearer ${store.getters['auth/accessToken']}`
    }

    return request
  })
}
