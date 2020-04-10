export default (axiosInstance, store) => {
  axiosInstance.interceptors.response.use(async (response) => {
    if (response.data.accessTokenExpired) {
      await store.dispatch('auth/refresh')

      return axiosInstance.post({
        ...response.config,
        header: {
          authorization: store.getters['auth/refreshToken'],
        },
      })
    }

    return response
  })
}
