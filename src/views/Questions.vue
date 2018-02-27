<template>
  <div>
    <div v-if="!showDetail">
      <QuestionItem v-for="(question, index) in listQuestion" 
      :questionData="question" v-bind:key="listId[index]">
      </QuestionItem>
    </div>
    <div v-else>
      <QuestionDetail></QuestionDetail>
    </div>
    <div v-if="!showDetail">
      <fab :actions="fabActions" 
      :bg-color="bgColor"
      @create="moveToAddQuestion"
      @edit="moveToEditQuestion"
      v-on:click="moveToAddQuestion"></fab>
    </div>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import fab from 'vue-fab'
import QuestionItem from '@/components/QuestionItem'
import QuestionDetail from '@/views/QuestionDetail'
import { questionCollection } from '../firebase'
import Loading from '@/components/Loading'
import swal from 'sweetalert'

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
    QuestionItem,
    QuestionDetail,
    fab,
    Loading
  },
  watch: {
    '$route.params.id' () {
      let params = this.$route.params.id
      this.showDetail = params !== undefined && params !== ''
    }
  },
  mounted () {
    let self = this
    this.$refs.loading.showDialog()
    questionCollection.get()
      .then((snapshot) => {
        self.$refs.loading.hideDialog()
        snapshot.forEach((doc) => {
          self.listId.push(doc.id)
          self.listQuestion.push(doc.data())
        })
        if (self.$route.params.id !== undefined && self.$route.params.id !== '') {
          this.showDetail = true
        }
      })
      .catch((err) => {
        self.$refs.loading.hideDialog()
        swal('FAILED', 'Failed to get questions', 'error')
        console.log('Error getting documents', err)
      })
  },
  methods: {
    moveToAddQuestion () {
      this.$router.push('/questionAdd')
    },
    moveToEditQuestion () {
      this.$router.push('/questionEdit')
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
