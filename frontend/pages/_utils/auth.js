export const isAuthenticated = () => {
  const token = localStorage.getItem('@user:token')

  if (!token) {
    return false
  }

  return true
}