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
import { questionCollection } from '../firebase'
import swal from 'sweetalert'

export default {
  data () {
    return {
      title: '',
      question: ''
    }
  },
  methods: {
    saveQuestion (title, question) {
      let self = this
      const authorEmail = localStorage.getItem('email')
      const createdDate = Date.now()
      const id = String(createdDate)
        .concat('.')
        .concat(authorEmail.substring(0, authorEmail.indexOf('@')))

      var docRef = questionCollection.doc(id)
      docRef.set({
        id: id,
        authorEmail: authorEmail,
        created: createdDate,
        title: title,
        question: question,
        shortDesc: question.substring(0, 40).concat('...')
      })
        .then(() => {
          swal('SUCCESS', 'Question has been created', 'success')
            .then(() => {
              console.log('Success')
              self.$router.push('/questions')
            })
            .catch((err) => {
              console.error(err)
            })
        })
        .catch((err) => {
          console.error(err)
        })
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
