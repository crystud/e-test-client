export default (axiosInstance, store) => {
  const refresh = async (response) => {
    await store.dispatch('auth/refresh')

    return axiosInstance.post({
      ...response.config,
      header: {
        authorization: store.getters['auth/refreshToken'],
      },
    })
  }

  axiosInstance.interceptors.response.use(async (response) => {
    if (response && response.status === 401) {
      await refresh()
    }

    return response
  }, async (error) => {
    if (error?.response.status === 401) {
      await refresh(error.response)
    }

    return Promise.reject(error)
  })
}
