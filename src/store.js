import Vue from 'vue'
import Vuex from 'vuex'

import LoginModule from './modules/login/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    LoginModule
  }
})

export default store
