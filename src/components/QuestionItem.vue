<template>
  <div>
    <div class="columns is-mobile">
        <div class="column is-one-fifth"  id="total_vote">
          <label>total</label>
        </div>
        <div class="column">
          <p>
            <strong>title</strong>
            <br>
            short_description
          </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {

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
