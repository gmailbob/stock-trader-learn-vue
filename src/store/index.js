import Vue from 'vue'
import Vuex from 'vuex'

const { stocks } = require('../../db')

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
      return state.portfolio.records;
    }
  },
  mutations: {
    setStocks(state, stocks) {
      state.stocks = stocks;
    },
    // randStocks(state) { }
    buyStock(state, order) {
      const { stockId, stockPrice, quantity } = order;
      if (state.portfolio.funds < stockPrice * quantity) return;
      let record = state.portfolio.records.find(r => r.id == stockId);
      if (!record) {
        record = {
          ...state.stocks.find(s => s.id == stockId),
          quantity: 0
        }
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
    }
  },
  actions: {
    initStocks({ commit }) {
      commit('setStocks', stocks);
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
  },
  modules: {
  }
})
