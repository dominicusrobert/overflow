const successUpdateEmail = (state, payload) => {
  state.email = payload
}

const successUpdatePassword = (state, payload) => {
  state.password = payload
}

const resetStatus = (state, payload) => {
  state.login_status = null
}

const successSignin = (state, payload) => {
  state.email = payload.email
  state.password = payload.password
  state.error_message = ''
  state.login_status = true
}

const failedSignin = (state, payload) => {
  state.email = ''
  state.password = ''
  state.error_message = 'Login failed please make sure you have enter valid email and password'
  state.login_status = false
}

const invalidRequest = (state, payload) => {
  state.login_status = false
  state.error_message = 'Please enter email and password'
}

export {
  successUpdateEmail,
  successUpdatePassword,
  resetStatus,
  successSignin,
  failedSignin,
  invalidRequest
}
