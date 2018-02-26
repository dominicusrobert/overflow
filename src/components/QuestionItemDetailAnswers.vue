<template>
  <div class="card" id="answer">
    <div class="columns is-mobile">
      <div class="column is-one-fifth"  id="total_vote">
        <span class="icon">
        <i class="fas fa-chevron-up"></i>
          </span>
        <label>total</label>
        <span class="icon">
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
export default {
  props: ['answer']
}
</script>

<style scoped>
.card{
  padding: 12px;
}
#answer{
  margin: 12px
}
</style>
