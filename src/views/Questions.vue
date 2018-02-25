<template>
  <div>
    <div class="button is-link" v-on:click="moveToAddQuestion">
      Add new Question
    </div>
    <div v-if="!showDetail">
      <QuestionItem v-for="(question, index) in listQuestion" 
      :questionData="question" v-bind:key="listId[index]">
      </QuestionItem>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import QuestionItem from '@/components/QuestionItem'
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
    QuestionItem
  },
  watch: {
    '$route.params.id' () {
      let params = this.$route.params.id
      if (params !== undefined && params !== '') {
        this.showDetail = true
      } else {
        this.showDetail = false
      }
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
