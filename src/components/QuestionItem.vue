<template>
  <div class="card" v-on:click="moveToDetailQuestion">
    <p>
      <strong>{{questionData.title}}</strong>
      <br>
      {{questionData.shortDesc}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['questionData'],
  methods: {
    moveToDetailQuestion () {
      this.$router.push('/questionDetail')
    }
  }
}
</script>

<style scoped>
.card{
  margin: 12px;
  padding: 12px;
}

#total_vote{
  display: flex;
  justify-content: center;
  align-items: center;
}

p{
  text-align: left;
}
</style>
