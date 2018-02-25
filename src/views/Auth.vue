<template>
  <div>
    <div v-if="!showSignup">
      <Login></Login>
      <div class="show_signup">
        <a class="text">Don't have account?</a>
        <a v-on:click="clickShowSignup" id="auth_option">Signup here</a>
      </div>
    </div>
    <div v-if="showSignup">
      <Signup></Signup>
        <div class="show_login">
          <a class="text">Already have account?</a>
          <a v-on:click="clickShowLogin" id="auth_option">Login here</a>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default {
  components: {
    Login,
    Signup
  },
  data () {
    return {
      showSignup: false
    }
  },
  methods: {
    clickShowLogin () {
      this.showSignup = !this.showSignup
    },
    clickShowSignup () {
      this.showSignup = !this.showSignup
    }
  }
}
</script>

<style>

.text{
  color: black;
}

#auth_option{
  color: blue;
}
</style>
