const getEmail = (state) => {
  return state.email
}
const getError = (state) => {
  return state.error_message
}
const getPassword = (state) => {
  return state.password
}
const getStatus = (state) => {
  return state.login_status
}

export {
  getEmail,
  getError,
  getPassword,
  getStatus
}
