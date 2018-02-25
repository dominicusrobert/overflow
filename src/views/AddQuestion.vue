<template>
  <div id="addQuestion">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Title" v-model="title">
      </div>
    </div>
    <div class="field">
      <label class="label">Question</label>
      <div class="control">
        <textarea class="textarea" placeholder="Question..." v-model="question"></textarea>
      </div>
    </div>
    <div class="control">
      <button class="button is-link" v-on:click="saveQuestion(title, question)" id="btn_link">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      question: ''
    }
  },
  methods: {
    saveQuestion (title, question) {

    }
  }
}
</script>

<style scoped>
label{
  text-align: left;
}
#addQuestion{
  margin: 24px;
}
#btn_link{
    width: -webkit-fill-available;
}
</style>
