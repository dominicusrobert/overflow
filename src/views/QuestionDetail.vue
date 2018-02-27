<template>
  <div>
    <QuestionItemDetail v-bind:detailQuestion="detailData"/>
    <div class="backgroundAnswer">
      <QuestionItemDetailAnswer v-for="answer in answers" 
      v-bind:answer="answer" v-bind:key="answer.id"
      v-on:deleteAnswers="deleteAnswer"/>
    </div>
    <QuestionItemReply v-on:updateAnswers="updateAnswer"></QuestionItemReply>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import QuestionItemDetail from '@/components/QuestionItemDetail'
import QuestionItemDetailAnswer from '@/components/QuestionItemDetailAnswers'
import QuestionItemReply from '@/components/QuestionItemReply'
import { questionCollection, answerCollection } from '../firebase'
import Loading from '@/components/Loading'
import swal from 'sweetalert'

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
    QuestionItemReply,
    Loading
  },
  mounted () {
    let self = this
    const questionId = this.$route.params.id
    const arrPromise = [
      questionCollection.doc(questionId).get(),
      answerCollection.where('questionId', '==', questionId).get()
    ]
    this.$refs.loading.showDialog()
    Promise.all(arrPromise)
      .then((snapshot) => {
        self.$refs.loading.hideDialog()
        this.detailData = snapshot[0].data()
        snapshot[1].forEach(doc => {
          this.answers.push(doc.data())
        })
      })
      .catch((err) => {
        self.$refs.loading.hideDialog()
        swal('FAILED', 'Failed to get questions', 'error')
        console.log('Error getting documents', err)
      })
  },
  methods: {
    updateAnswer (e) {
      this.answers.push(e)
    },
    deleteAnswer (e) {
      this.answers.forEach((item, index) => {
        if (item.id === e) {
          this.answers.splice(index, 1)
        }
      })
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
