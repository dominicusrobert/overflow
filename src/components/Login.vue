<template>
  <div id="login">
    <img src="../assets/icon_overflow.jpg" alt="The Overflow">
    <p class="help is-danger">{{error_message}}</p>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="text" placeholder="Email" v-model="user_email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="Password" v-model="user_password">
      </div>
    </div>
    <div class="control">
      <button class="button is-link" 
      v-on:click="clickLogin({email:user_email, password:user_password})" 
      id="btn_link">
        Login
      </button>
    </div>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import loginModule from '../modules/login/index'
import Loading from '@/components/Loading'

export default {
  components: {
    Loading
  },
  created () {
    const store = this.$store
    if (!(store && store.state && store.state[name])) {
      store.registerModule(name, loginModule)
    } else {
      console.log('reusing module: '.concat(name))
    }
  },
  computed: {
    ...mapState(name, {
      email: state => state.email,
      uid: state => state.uid,
      error_message: state => state.error_message,
      password: state => state.password,
      login_status: state => state.login_status
    }),
    user_email: {
      get () { return this.email },
      set (value) { this.updateEmail(value) }
    },
    user_password: {
      get () { return this.password },
      set (value) { this.updatePassword(value) }
    }
  },
  methods: {
    ...mapActions(name, ['updateEmail', 'updatePassword', 'login']),
    clickLogin (payloadData) {
      this.$refs.loading.showDialog()
      this.login(payloadData)
    }
  },
  watch: {
    login_status (val) {
      this.$refs.loading.hideDialog()
      if (val) {
        this.$router.push('/questions')
      }
    }
  }
}
</script>

<style scoped>
#login{
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
