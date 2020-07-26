<template>
  <div>
    <div
      class="alert alert-warning"
      role="alert"
      v-if="stockPortfolio.length==0"
    >You hold no stocks yet!</div>
    <div v-else>
      <PortfolioCard v-for="s in stockPortfolio" :key="s.id" :stock="s" />
    </div>
  </div>
</template>

<script>
import PortfolioCard from "./PortfolioCard";
export default {
  computed: {
    stockPortfolio() {
      return this.$store.getters.stockPortfolio;
    }
  },
  components: {
    PortfolioCard
  }
};
</script>