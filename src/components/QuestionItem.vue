<template>
  <div>
    <div class="columns is-mobile">
        <div class="column is-one-fifth" id="total_vote">
          <label>total</label>
        </div>
        <div class="column">
          <p>
            <strong>{{questionData.title}}</strong>
            <br>
            {{questionData.shortDesc}}
          </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['questionData']
}
</script>

<style scoped>
#total_vote{
  display: flex;
  justify-content: center;
  align-items: center;
}

p{
  text-align: left;
}
</style>
