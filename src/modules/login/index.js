import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

const namespaced = true

const state = {
  email: '',
  error_message: '',
  password: '',
  login_status: false
}

export default {
  namespaced,
  state,
  actions,
  mutations,
  getters
}
