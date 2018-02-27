<template>
  <div id="login">
    <img src="../assets/icon_overflow.jpg" alt="The Overflow">
    <p class="help is-danger">{{error_message}}</p>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="text" placeholder="Email" v-model="email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="Password" v-model="password">
      </div>
    </div>
    <div class="control">
      <button class="button is-link" v-on:click="login(email, password)" id="btn_link">
        Login
      </button>
    </div>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import { auth } from '../firebase'
import Loading from '@/components/Loading'

export default {
  data () {
    return {
      email: '',
      password: '',
      error_message: ''
    }
  },
  components: {
    Loading
  },
  methods: {
    login (email, password) {
      let self = this
      if (email === '' || password === '') {
        this.error_message = 'Please enter email and password'
        return
      }

      this.$refs.loading.showDialog()
      auth.signInWithEmailAndPassword(email, password)
        .then(function () {
          self.$refs.loading.hideDialog()
          self.error_message = ''
          self.$router.push('/questions')
        })
        .catch(function (error) {
          self.$refs.loading.hideDialog()
          self.error_message = 'Login failed please make sure you have enter valid email and password'
          console.error(error)
        })
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
