import { auth } from './../../firebase'

const updateEmail = ({commit, state}, payload) => {
  commit('successUpdateEmail', payload)
}

const updatePassword = ({commit, state}, payload) => {
  commit('successUpdatePassword', payload)
}

const signup = ({commit, state}, payload) => {
  if (payload.email === '' || payload.password === '') {
    commit('invalidRequest', payload)
    return
  }

  auth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(function () {
      commit('successSignup', payload)
    })
    .catch(function (error) {
      console.error(error)
      commit('failedSignup', payload)
    })
}

export {
  updateEmail,
  updatePassword,
  signup
}
