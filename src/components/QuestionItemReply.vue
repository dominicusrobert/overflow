<template>
  <div id="reply_answer">
    <div class="field">
      <label class="label">Your Answer</label>
      <div class="control">
        <textarea class="textarea" placeholder="Answer..." v-model="answer"></textarea>
      </div>
    </div>
    <div class="button is-link" v-on:click="submitAnswer(answer)">Submit</div>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import { auth, answerCollection } from '../firebase'
import Loading from '@/components/Loading'
import swal from 'sweetalert'

export default {
  data () {
    return {
      answer: ''
    }
  },
  components: {
    Loading
  },
  methods: {
    submitAnswer (answer) {
      const self = this
      const user = auth.currentUser
      if (user) {
        this.$refs.loading.showDialog()
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
            self.$refs.loading.hideDialog()
            swal('SUCCESS', 'Answer has been save', 'success')
              .then(() => {
                this.$emit('updateAnswers', newAnswer)
              })
          })
          .catch((err) => {
            self.$refs.loading.hideDialog()
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
