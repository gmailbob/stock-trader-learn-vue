import Vue from 'vue'
import Vuex from 'vuex'

const initStocks = require('../../initStocks')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stocks: [],
    portfolio: {
      funds: 10000,
      records: []
    }
  },
  getters: {
    stocks(state) {
      return state.stocks;
    },
    funds(state) {
      return state.portfolio.funds;
    },
    stockPortfolio(state) {
      return state.portfolio.records.map(r => {
        const stock = state.stocks.find(s => s.id == r.id);
        return {
          id: r.id,
          name: stock.name,
          price: stock.price,
          quantity: r.quantity
        }
      })
    }
  },
  mutations: {
    setStocks(state, stocks) {
      state.stocks = stocks;
    },
    randStocks(state) {
      state.stocks.forEach(stock => {
        stock.price = Math.ceil((Math.random() * 0.2 + 0.9) * stock.price);
      })
    },
    buyStock(state, order) {
      const { stockId, stockPrice, quantity } = order;
      let record = state.portfolio.records.find(r => r.id == stockId);
      if (!record) {
        record = { id: stockId, quantity: 0 };
        state.portfolio.records.push(record);
      }
      record.quantity += quantity;
      state.portfolio.funds -= stockPrice * quantity;
    },
    sellStock(state, order) {
      const { stockId, stockPrice, quantity } = order;
      const i = state.portfolio.records.findIndex(r => r.id == stockId);
      const record = state.portfolio.records[i];
      if (record.quantity > quantity) {
        record.quantity -= quantity;
        state.portfolio.funds += stockPrice * quantity;
      }
      else {
        state.portfolio.records.splice(i, 1);
        state.portfolio.funds += stockPrice * record.quantity;
      }
    },
    loadUserDataFromDB(state, userData) {
      state.stocks = userData.stocks;
      state.portfolio.funds = userData.funds;
      state.portfolio.records = userData.stockPortfolio.map(ele => ({ id: ele.id, quantity: ele.quantity }));
    }
  },
  actions: {
    initStocks({ commit }) {
      commit('setStocks', initStocks);
    },
    randomizeStocks({ commit }) {
      commit('randStocks');
    },
    buyStock({ commit }, order) {
      commit('buyStock', order);
    },
    sellStock({ commit }, order) {
      commit('sellStock', order);
    },
    loadUserDataFromDB({ commit }, userData) {
      commit('loadUserDataFromDB', userData);
    }
  },
  modules: {
  }
})
