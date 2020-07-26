<template>
  <div>
    <h1>Trade or view your portfolio</h1>
    <h5>You may save and load your data</h5>
    <h5>Click on 'End Day' to begin a new day!</h5>
    <hr />
    <h4>Your funds: {{funds | currency}}</h4>
  </div>
</template>

<script>
export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  }
};
</script>