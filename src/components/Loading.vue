<template>
  <div class="modal" v-bind:class="{'is-active': loading_visibility}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <p class="image is-4by3">
        <img src="../assets/loading.gif" alt="loading">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading_visibility: false
    }
  },
  methods: {
    showDialog () {
      this.loading_visibility = true
    },
    hideDialog () {
      this.loading_visibility = false
    }
  }
}
</script>

<style>
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
