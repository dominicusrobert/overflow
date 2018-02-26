<template>
  <div id="reply_answer">
    <div class="field">
      <label class="label">Your Answer</label>
      <div class="control">
        <textarea class="textarea" placeholder="Answer..." v-model="answer"></textarea>
      </div>
    </div>
    <div class="button is-link" v-on:click="submitAnswer(answer)">Submit</div>
  </div>
</template>

<script>
import { auth, answerCollection } from '../firebase'
import swal from 'sweetalert'

export default {
  data () {
    return {
      answer: ''
    }
  },
  methods: {
    submitAnswer (answer) {
      const self = this
      const user = auth.currentUser
      if (user) {
        const authorEmail = user.email
        const createdDate = Date.now()
        const id = String(createdDate).concat(user.uid)
        const newAnswer = {
          id: id,
          authorEmail: authorEmail,
          questionId: self.$route.params.id,
          answer: answer,
          created: createdDate
        }
        answerCollection.doc(id).set(newAnswer)
          .then(() => {
            swal('SUCCESS', 'Answer has been save', 'success')
              .then(() => {
                this.$emit('updateAnswers', newAnswer)
              })
          })
          .catch((err) => {
            swal('FAILED', 'Failed to save Answer', 'error')
            console.error(err)
          })
      }
    }
  }
}
</script>

<style scoped>
.button{
  width: -webkit-fill-available;
}
#reply_answer{
    margin: 12px;
}
label{
  text-align: left;
}
</style>
