<template>
  <div id="reply_answer">
    <div class="field">
      <label class="label">Your Answer</label>
      <div class="control">
        <textarea class="textarea" placeholder="Answer..." v-model="answer"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      answer: ''
    }
  }
}
</script>

<style scoped>
#reply_answer{
    margin: 12px;
}
label{
  text-align: left;
}
</style>
