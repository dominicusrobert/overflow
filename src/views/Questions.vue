<template>
  <div>
    <div v-if="!showDetail">
      <div class="button is-link" v-on:click="moveToAddQuestion">
        Add new Question
      </div>
      <QuestionItem v-for="(question, index) in listQuestion" 
      :questionData="question" v-bind:key="listId[index]">
      </QuestionItem>
    </div>
    <div v-else>
      <QuestionDetail></QuestionDetail>
    </div>
  </div>
</template>

<script>
import QuestionItem from '@/components/QuestionItem'
import QuestionDetail from '@/views/QuestionDetail'
import { questionCollection } from '../firebase'

export default {
  data () {
    return {
      listId: [],
      listQuestion: [],
      showDetail: false
    }
  },
  components: {
    QuestionItem,
    QuestionDetail
  },
  watch: {
    '$route.params.id' () {
      let params = this.$route.params.id
      this.showDetail = params !== undefined && params !== ''
    }
  },
  created () {
    let self = this
    questionCollection.get()
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
