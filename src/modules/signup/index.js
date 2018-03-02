import * as actions from './actions'
import * as mutations from './mutations'

const namespaced = true

const state = {
  email: '',
  error_message: '',
  password: '',
  signup_status: false
}

export default {
  namespaced,
  state,
  actions,
  mutations
}
