const successUpdateEmail = (state, payload) => {
  state.email = payload
}

const successUpdatePassword = (state, payload) => {
  state.password = payload
}

const resetStatus = (state, payload) => {
  state.signup_status = null
}

const successSignup = (state, payload) => {
  state.email = payload.email
  state.error_message = ''
  state.signup_status = true
}

const failedSignup = (state, payload) => {
  state.email = ''
  state.error_message = 'Login failed please make sure you have enter valid email and password'
  state.signup_status = false
}

const invalidRequest = (state, payload) => {
  state.error_message = 'Please enter email and password'
  state.signup_status = false
}

export {
  successUpdateEmail,
  successUpdatePassword,
  resetStatus,
  successSignup,
  failedSignup,
  invalidRequest
}
