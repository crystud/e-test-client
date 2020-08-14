export default (axiosInstance, store) => {
  const refresh = async (response) => {
    const authorization = await store.dispatch('auth/refresh')

    const query = await axiosInstance.post({
      ...response.config,
      header: {
        authorization,
      },
    })

    return query
  }

  axiosInstance.interceptors.response.use(async (response) => {
    let query

    if (response && response.status === 401) {
      query = await refresh(response)
    }

    return query || response
  }, async (error) => {
    let query

    if (error?.response.status === 401) {
      query = await refresh(error.response)
    }

    return query || error.response
  })
}
