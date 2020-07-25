import Vue from 'vue'
import Vuex from 'vuex'

const { stocks } = require('../../db')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stocks: []
  },
  getters: {
    stocks(state) {
      return state.stocks;
    }
  },
  mutations: {
    setStocks(state, stocks) {
      state.stocks = stocks;
    },
    // randStocks(state) { }
  },
  actions: {
    // buyStock({ commit }, order) {
    //   commit();
    // },
    initStocks({ commit }) {
      commit('setStocks', stocks);
    },
    randomizeStocks({ commit }) {
      commit('randStocks');
    }
  },
  modules: {
  }
})
