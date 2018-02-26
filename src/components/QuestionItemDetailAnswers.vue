<template>
  <div class="card" id="answer">
    <div class="columns is-mobile">
      <div class="column is-one-fifth" id="total_vote">
        <span class="icon" v-on:click="upvote(answer.id)">
          <i class="material-icons">keyboard_arrow_up</i>
        </span>
        <label>{{totalVote}}</label>
        <span class="icon" v-on:click="downvote(answer.id)">
          <i class="material-icons">keyboard_arrow_down</i>
        </span>
      </div>
      <div class="column">
        <p>{{answer.answer}}</p>
      </div>
    </div>
    <div class="columns is-one-fifth">
      <div class="column">
        <p id="author">{{answer.authorEmail}}</p>
      </div>
      <!-- <div class="column is-half" id="deleteAnswer" v-on:click="deleteAnswer(answer.id)">
        <a>DELETE</a>
        <span class="icon" >
          <i class="fas fa-trash-alt"></i>
        </span>
      </div> -->
    </div>
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
    this.getvote()
  },
  methods: {
    upvote (id) {
      this.update(id, true)
    },
    downvote (id) {
      this.update(id, false)
    },
    getvote () {
      let id = String(this.answer.id)
      voteCollection.doc(id).get()
        .then(doc => {
          this.totalVote = 0
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
    update (id, value) {
      const self = this
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
              .then(() => {
                self.getvote()
              })
          })
          .catch(err => {
            console.log('Error getting document', err)
          })
      }
    },
    deleteAnswer (id) {
      // TODO: DELETE STILL BUG
      // voteCollection.doc(id).set({})
      voteCollection.doc(id).delete()
        .then(function () {
          swal('SUCCESS', 'Answer has been deleted', 'success')
            .then(() => {
              this.$emit('deleteAnswers', id)
            })
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    }
  }
}
</script>

<style scoped>
p{
  text-align: left;
}
#total_vote{
  display: flex;
  justify-content: center;
  flex-direction:column;
  align-items: center;
}
#answer{
  margin: 12px;
  padding: 12px;
}
#author{
  text-align: right;
  margin-right: 12px;
}
#deleteAnswer{
  text-align: right;
}
</style>
