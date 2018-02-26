<template>
  <div>
    <div v-if="!showDetail">
      <EditQuestionItem v-for="(question, index) in listQuestion" 
      :questionData="question" v-bind:key="listId[index]">
      </EditQuestionItem>
    </div>
    <div v-else>
        <EditQuestion></EditQuestion>
    </div>
    <div v-if="!showDetail">
      <fab :actions="fabActions" 
      :bg-color="bgColor"
      @create="moveToAddQuestion"
      @edit="moveToEditQuestion"
      v-on:click="moveToAddQuestion"></fab>
    </div>
  </div>
</template>

<script>
import fab from 'vue-fab'
import EditQuestionItem from '@/components/EditQuestionItem'
import EditQuestion from '@/views/EditQuestion'
import { auth, questionCollection } from '../firebase'

export default {
  data () {
    return {
      listId: [],
      listQuestion: [],
      showDetail: false,
      bgColor: '#778899',
      position: 'top-right',
      fabActions: [
        {
          name: 'create',
          icon: 'add'
        },
        {
          name: 'edit',
          icon: 'edit'
        }
      ]
    }
  },
  components: {
    EditQuestionItem,
    EditQuestion,
    fab
  },
  watch: {
    '$route.params.id' () {
      let params = this.$route.params.id
      this.showDetail = params !== undefined && params !== ''
    }
  },
  created () {
    let self = this
    questionCollection.where('authorEmail', '==', auth.currentUser.email).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          self.listId.push(doc.id)
          self.listQuestion.push(doc.data())
        })
        if (self.$route.params.id !== undefined && self.$route.params.id !== '') {
          this.showDetail = true
        }
      })
      .catch((err) => {
        console.log('Error getting documents', err)
      })
  },
  methods: {
    moveToAddQuestion () {
      this.$router.push('/questionAdd')
    },
    moveToEditQuestion () {
      this.$router.go()
    }
  }
}
</script>

<style scoped>
.button{
  margin-bottom: 24px;
  margin-left: 12px;
  margin-right: 12px;
  width: -webkit-fill-available;
}
</style>
