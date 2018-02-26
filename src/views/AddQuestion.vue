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
import { auth, questionCollection } from '../firebase'
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
      const self = this
      const user = auth.currentUser
      if (user) {
        const authorEmail = user.email
        const createdDate = Date.now()
        const id = String(createdDate).concat(user.uid)

        questionCollection.doc(id).set({
          id: id,
          authorEmail: authorEmail,
          created: createdDate,
          title: title,
          question: question,
          shortDesc: question.substring(0, 40).concat('...')
        })
          .then(() => {
            swal('SUCCESS', 'Question has been created', 'success')
              .then(() => self.$router.push('/questions'))
              .catch((err) => console.error(err))
          })
          .catch((err) => {
            console.error(err)
          })
      }
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
