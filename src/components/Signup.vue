<template>
  <div id="signup">
    <img src="../assets/icon_overflow.jpg" alt="The Overflow">
    <p class="help is-danger">{{state_error_message}}</p>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="text" placeholder="Email" 
        v-on:bind="state_email" v-on:input="clickUpdateEmail">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="Password" 
        v-on:bind="state_password" v-on:input="clickUpdatePassword">
      </div>
    </div>
    <div class="control">
      <button class="button is-link" id="btn_link"
        v-on:click="clickSignup({email:state_email, password:state_password})">
        Signup
      </button>
    </div>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import signupModule from '../modules/signup/index'
import Loading from '@/components/Loading'
import swal from 'sweetalert'

// Module name that ragistered in store.js
const name = 'SignupModule'

export default {
  components: {
    Loading
  },
  created () {
    const store = this.$store
    if (!(store && store.state && store.state[name])) {
      store.registerModule(name, signupModule)
    } else {
      console.log('reusing module: '.concat(name))
    }
  },
  computed: {
    ...mapState(name, {
      state_email: state => state.email,
      state_error_message: state => state.error_message,
      state_password: state => state.password,
      state_signup_status: state => state.signup_status
    })
  },
  methods: {
    ...mapActions(name, ['resetStatusAction', 'updateEmail', 'updatePassword', 'signup']),
    clickSignup (payload) {
      this.$refs.loading.showDialog()
      this.resetStatusAction()
      this.signup(payload)
    },
    clickUpdateEmail (e) {
      this.updateEmail(e.target.value)
    },
    clickUpdatePassword (e) {
      this.updatePassword(e.target.value)
    }
  },
  watch: {
    state_signup_status (val) {
      this.$refs.loading.hideDialog()
      if (val) {
        swal('SUCCESS', 'Your account has been created', 'success')
      }
    }
  }
}
</script>

<style>
#signup{
  margin: 24px;
}
#btn_link{
  margin-top: 12px;
  width: -webkit-fill-available;
}
label{
  text-align: left;
}
</style>
