<template>
  <div>
      <QuestionItemDetail></QuestionItemDetail>
      <hr/>
      <QuestionItemDetailAnswer></QuestionItemDetailAnswer>
      <hr/>
      <QuestionItemReply></QuestionItemReply>
  </div>
</template>

<script>
import QuestionItemDetail from '@/components/QuestionItemDetail'
import QuestionItemDetailAnswer from '@/components/QuestionItemDetailAnswers'
import QuestionItemReply from '@/components/QuestionItemReply'

export default {
  components: {
    QuestionItemDetail,
    QuestionItemDetailAnswer,
    QuestionItemReply
  }
}
</script>

<style>

</style>
