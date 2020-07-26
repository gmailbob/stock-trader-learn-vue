<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link class="navbar-brand" to="/">Stock Trader</router-link>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link to="/portfolio" active-class="active" tag="li">
            <a>Portfolio</a>
          </router-link>
          <router-link to="/stocks" active-class="active" tag="li">
            <a>Stocks</a>
          </router-link>
        </ul>

        <strong class="navbar-text navbar-right">Funds: {{funds | currency}}</strong>

        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#" @click.prevent="endDay">End Day</a>
          </li>
          <li
            :class="['dropdown', {'open': dropdownOpen}]"
            @click.prevent="dropdownOpen=!dropdownOpen"
          >
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Save &amp; Load
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#" @click.prevent="saveData">Save Data</a>
              </li>
              <li>
                <a href="#" @click.prevent="loadData">Load Data</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dropdownOpen: false
    };
  },
  computed: mapGetters(["stocks", "funds", "stockPortfolio"]),
  methods: {
    ...mapActions(["randomizeStocks", "loadUserDataFromDB"]),
    endDay() {
      this.randomizeStocks();
    },
    saveData() {
      const userData = {
        stocks: this.stocks,
        funds: this.funds,
        stockPortfolio: this.stockPortfolio
      };
      fetch("http://localhost:3000/userData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      }).catch(err => console.log(err));
    },
    loadData() {
      fetch("http://localhost:3000/userData")
        .then(res => res.json())
        .then(json => {
          if (json) {
            this.loadUserDataFromDB(json);
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>