<template>
  <div>
    <StockCard v-for="s in stocks" :key="s.id" :stock="s" />
  </div>
</template>

<script>
import StockCard from "./StockCard";
export default {
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  },
  components: {
    StockCard
  }
};
</script>