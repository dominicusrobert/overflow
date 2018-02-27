const successUpdateEmail = (state, payload) => {
  state.email = payload
}

const successUpdatePassword = (state, payload) => {
  state.password = payload
}

const successSignin = (state, payload) => {
  state.uid = payload.uid
  state.email = payload.email
  state.error_message = ''
  state.login_status = true
}

const failedSignin = (state, payload) => {
  state.uid = ''
  state.email = ''
  state.error_message = 'Login failed please make sure you have enter valid email and password'
  state.login_status = false
}

const invalidRequest = (state, payload) => {
  state.error_message = 'Please enter email and password'
  state.login_status = false
}

export {
  successUpdateEmail,
  successUpdatePassword,
  successSignin,
  failedSignin,
  invalidRequest
}
