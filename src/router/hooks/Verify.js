export default async (to, from, next) => {
  const token = localStorage.getItem('accessToken')

  if (to.matched.some((route) => route.meta && route.meta.requiredAuth)) {
    if (token) {
      next()
    } else {
      next({ name: 'signIn' })
    }
  } else if (to.matched.some((route) => route.meta && route.meta.onlyWithoutAuth)) {
    if (!token) {
      next()
    } else {
      next({ name: 'homeUser' })
    }
  } else {
    next()
  }
}
