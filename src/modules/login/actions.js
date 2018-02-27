import { auth } from './../../firebase'

const updateEmail = ({commit, state}, payload) => {
  commit('successUpdateEmail', payload)
}

const updatePassword = ({commit, state}, payload) => {
  commit('successUpdatePassword', payload)
}

const login = ({commit, state}, payload) => {
  if (payload.email === '' || payload.password === '') {
    commit('invalidRequest', payload)
    return
  }

  auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(function () {
      commit('successSignin', payload)
    })
    .catch(function (error) {
      console.error(error)
      commit('failedSignin', payload)
    })
}

export {
  updateEmail,
  updatePassword,
  login
}
