<template>
  <div>
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
        <p>
        <strong>{{detail.title}}</strong>
        <br>
        {{detail.question}}
        </p>
      </div>
    </div>
    <p id="author">{{detail.authorEmail}}</p>
  </div>
</template>

<script>
export default {
  props: ['detail']
}
</script>

<style>
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
