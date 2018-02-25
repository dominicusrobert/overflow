<template>
  <div id="signup">
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
        <button class="button is-link" v-on:click="signup(email, password)" id="btn_link">
          Signup
        </button>
      </div>
  </div>
</template>

<script>
import { auth } from '../firebase'
import swal from 'sweetalert'

export default {
  data () {
    return {
      email: '',
      password: '',
      error_message: ''
    }
  },
  methods: {
    signup (email, password) {
      let self = this
      if (email === '' || password === '') {
        self.error_message = 'Please enter email and password'
        return
      }
      auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
          swal('SUCCESS', 'Your account has been created', 'success')
            .then(() => {
              self.error_message = ''
              console.log('Success')
            })
            .catch((err) => {
              self.error_message = 'Signup failed please try again later'
              console.error(err)
            })
        })
        .catch(function (error) {
          console.error(error)
        })
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
