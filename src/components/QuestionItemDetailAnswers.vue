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
        <p>answer</p>
      </div>
    </div>
    <p id="author">Author Email</p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#answer{
  margin: 12px
}
</style>
