<template>
  <div id="editQuestion">
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
      question: '',
      contentAuthor: ''
    }
  },
  created () {
    const id = this.$route.params.id
    questionCollection.doc(id).get()
      .then((snapshot) => {
        this.title = snapshot.data().title
        this.question = snapshot.data().question
        this.contentAuthor = snapshot.data().authorEmail
      })
      .catch((err) => {
        console.error(err)
      })
  },
  methods: {
    saveQuestion (title, question) {
      if (this.contentAuthor !== auth.currentUser.email) {
        swal('FAILED', 'You are unauthorized', 'error')
        return
      }

      const self = this
      const id = this.$route.params.id
      questionCollection.doc(id).update({
        title: title,
        question: question,
        shortDesc: question.substring(0, 40).concat('...')
      })
        .then(function () {
          swal('SUCCESS', 'Question has been updated', 'success')
            .then(() => self.$router.push('/questionEdit'))
            .catch((err) => console.error(err))
        })
        .catch(function (error) {
          swal('FAILED', 'Failed to update Question', 'error')
          console.error('Error updating document: ', error)
        })
    }
  }
}
</script>

<style>
label{
  text-align: left;
}
#editQuestion{
  margin: 24px;
}
#btn_link{
    width: -webkit-fill-available;
}
</style>
