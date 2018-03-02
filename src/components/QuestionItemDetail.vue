<template>
  <div>
    <div class="columns is-mobile">
      <div class="column is-one-fifth" id="total_vote">
        <span class="icon" v-on:click="upvote(detailQuestion.id)">
          <i class="material-icons">keyboard_arrow_up</i>
        </span>
        <label>{{totalVote}}</label>
        <span class="icon" v-on:click="downvote(detailQuestion.id)">
          <i class="material-icons">keyboard_arrow_down</i>
        </span>
      </div>
      <div class="column">
        <p>
        <strong>{{detailQuestion.title}}</strong>
        <br>
        {{detailQuestion.question}}
        </p>
      </div>
    </div>
    <p id="author">{{detailQuestion.authorEmail}}</p>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import { auth, voteCollection } from '../firebase'
import Loading from '@/components/Loading'
import swal from 'sweetalert'

export default {
  data () {
    return {
      totalVote: 0
    }
  },
  components: {
    Loading
  },
  props: ['detailQuestion'],
  mounted () {
    this.getVote()
  },
  methods: {
    upvote (id) {
      this.update(id, true)
    },
    downvote (id) {
      this.update(id, false)
    },
    getVote () {
      let self = this
      let id = String(this.$route.params.id)

      this.$refs.loading.showDialog()
      voteCollection.doc(id).get()
        .then(doc => {
          self.$refs.loading.hideDialog()
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
        this.$refs.loading.showDialog()
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
            self.$refs.loading.hideDialog()
            swal('SUCCESS VOTE', 'success')
              .then((data) => {
                self.getVote()
              })
          })
          .catch(err => {
            self.$refs.loading.hideDialog()
            console.log('Error getting document', err)
          })
      }
    }
  }
}
</script>

<style scoped>
#total_vote{
  display: flex;
  justify-content: center;
  flex-direction:column;
  align-items: center;
}
p{
  text-align: left;
}
#author{
  text-align: right;
  margin: 12px;
}
</style>
