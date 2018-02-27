import { auth } from './../../firebase'

const updateEmail = ({commit, state}, payload) => {
  commit('successUpdateEmail', payload)
}

const updatePassword = ({commit, state}, payload) => {
  commit('successUpdatePassword', payload)
}

const resetStatusAction = ({commit, state}, payload) => {
  commit('resetStatus', payload)
}

const signup = ({commit, state}, payload) => {
  console.log('masuk action')
  if (payload.email === '' || payload.password === '') {
    console.log('masuk invalid')
    commit('invalidRequest', payload)
    return
  }

  auth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(function () {
      console.log('masuk then')
      commit('successSignup', payload)
    })
    .catch(function (error) {
      console.log('masuk catch')
      console.error(error)
      commit('failedSignup', payload)
    })
}

export {
  updateEmail,
  updatePassword,
  resetStatusAction,
  signup
}
