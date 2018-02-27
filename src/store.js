import Vue from 'vue'
import Vuex from 'vuex'

import SignupModule from './modules/signup/index'
import LoginModule from './modules/login/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    SignupModule,
    LoginModule
  }
})

export default store
