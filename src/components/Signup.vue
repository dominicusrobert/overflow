<template>
  <div>
      <form>
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
          <button class="button is-link" v-on:click="signup(email, password)">Submit</button>
        </div>
      </form>
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
      validEmail: false
    }
  },
  methods: {
    signup (email, password) {
      auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
          swal('SUCCESS', 'Your account has been created', 'success')
            .then(() => {
              console.log('Success')
            })
            .catch((err) => {
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

</style>
