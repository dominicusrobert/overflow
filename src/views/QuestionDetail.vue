<template>
  <div>
    <QuestionItemDetail v-bind:detailQuestion="detailData"/>
    <div class="backgroundAnswer">
      <QuestionItemDetailAnswer v-for="answer in answers" 
      v-bind:answer="answer" v-bind:key="answer.id"/>
    </div>
    <QuestionItemReply v-on:updateAnswers="updateAnswer"></QuestionItemReply>
  </div>
</template>

<script>
import QuestionItemDetail from '@/components/QuestionItemDetail'
import QuestionItemDetailAnswer from '@/components/QuestionItemDetailAnswers'
import QuestionItemReply from '@/components/QuestionItemReply'
import { questionCollection, answerCollection } from '../firebase'

export default {
  data () {
    return {
      detailData: {
        authorEmail: '',
        created: 0,
        question: '',
        shortDesc: '',
        title: ''
      },
      answers: []
    }
  },
  components: {
    QuestionItemDetail,
    QuestionItemDetailAnswer,
    QuestionItemReply
  },
  created () {
    const questionId = this.$route.params.id
    const arrPromise = [
      questionCollection.doc(questionId).get(),
      answerCollection.where('questionId', '==', questionId).get()
    ]
    Promise.all(arrPromise)
      .then((snapshot) => {
        this.detailData = snapshot[0].data()
        snapshot[1].forEach(doc => {
          this.answers.push(doc.data())
        })
      })
      .catch((err) => {
        console.log('Error getting documents', err)
      })
  },
  methods: {
    updateAnswer (e) {
      this.answers.push(e)
    }
  }
}
</script>

<style scoped>
.backgroundAnswer{
  background-color: lightblue;
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
