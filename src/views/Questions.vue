<template>
  <div>
    <div class="button is-link" v-on:click="moveToAddQuestion">
      Add new Question
    </div>
    <QuestionItem></QuestionItem>
  </div>
</template>

<script>
import QuestionItem from '@/components/QuestionItem'

export default {
  components: {
    QuestionItem
  },
  methods: {
    moveToAddQuestion () {
      this.$router.push('/questionAdd')
    }
  }
}
</script>

<style scoped>
.button{
  margin-bottom: 24px;
  margin-left: 12px;
  margin-right: 12px;
  width: -webkit-fill-available;
}
</style>
