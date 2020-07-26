<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{stock.name}}
          <small>(Price: {{stock.price}} | Quantity: {{stock.quantity}})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input type="number" class="form-control" placeholder="Quantity" v-model.number="quant" />
        </div>
        <div class="pull-right">
          <button
            :class="['btn', {'btn-success': !isDisabled}, {'btn-secondary': isDisabled}]"
            :disabled="isDisabled"
            @click="sellStock"
          >{{insufficientQuant ? 'Insufficien Quant' : 'Sell'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["stock"],
  data() {
    return {
      quant: 0
    };
  },
  computed: {
    insufficientQuant() {
      return this.quant > this.stock.quantity;
    },
    isDisabled() {
      return (
        !Number.isInteger(this.quant) ||
        this.quant <= 0 ||
        this.insufficientQuant
      );
    }
  },
  methods: {
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quant
      };
      this.$store.dispatch("sellStock", order);
      this.quant = 0;
    }
  }
};
</script>

<style scoped>
input {
  width: 135px;
}
</style>