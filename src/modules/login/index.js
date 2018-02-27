import * as actions from './actions'
import * as mutations from './mutations'

const namespaced = true

const state = {
  uid: '',
  email: '',
  error_message: '',
  password: '',
  login_status: false
}

export default {
  namespaced,
  state,
  actions,
  mutations
}
