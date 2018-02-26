<template>
  <div class="card" id="answer">
    <div class="columns is-mobile">
      <div class="column is-one-fifth" id="total_vote">
        <span class="icon" v-on:click="upvote(answer.questionId)">
          <i class="fas fa-chevron-up"></i>
        </span>
        <label>{{totalVote}}</label>
        <span class="icon" v-on:click="downvote(answer.questionId)">
          <i class="fas fa-chevron-down"></i>
        </span>
      </div>
      <div class="column">
        <p>{{answer.answer}}</p>
      </div>
    </div>
    <p id="author">{{answer.authorEmail}}</p>
  </div>
</template>

<script>
import { auth, voteCollection } from '../firebase'
import swal from 'sweetalert'

export default {
  data () {
    return {
      totalVote: 0
    }
  },
  props: ['answer'],
  created () {
    let id = String(this.answer.questionId)
    voteCollection.doc(id).get()
      .then(doc => {
        if (doc.exists) {
          let documents = doc.data()
          for (let key in documents) {
            if (documents[key] === true) {
              this.totalVote++
            }
          }
        }
      })
  },
  methods: {
    upvote (id) {
      this.update(id, true)
    },
    downvote (id) {
      this.update(id, false)
    },
    update (id, value) {
      const user = auth.currentUser
      if (user) {
        voteCollection.doc(id).get()
          .then(doc => {
            var usersUpdate = {}
            usersUpdate[`${user.uid}`] = value
            if (!doc.exists) {
              return voteCollection.doc(id).set(usersUpdate)
            } else {
              return voteCollection.doc(id).update(usersUpdate)
            }
          })
          .then(() => {
            swal('SUCCESS VOTE', 'success')
          })
          .catch(err => {
            console.log('Error getting document', err)
          })
      }
    }
  }
}
</script>

<style scoped>
p{
  text-align: left;
}
.card{
  padding: 12px;
}
#total_vote{
  display: flex;
  justify-content: center;
  flex-direction:column;
  align-items: center;
}
#answer{
  margin: 12px
}
#author{
  text-align: right;
  margin: 12px;
}
</style>
