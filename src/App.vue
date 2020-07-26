<template>
  <div class="container">
    <Header />
    <div class="row">
      <div class="col-xs-12">
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: {
    Header
  },
  created() {
    this.$store.dispatch("initStocks");
  }
};
</script>

<style scoped>
div.container {
  padding: 30px;
}

.slide-enter-active {
  animation: slide-in 0.2s ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 0.2s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>