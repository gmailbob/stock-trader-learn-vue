import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// practice using global filter
Vue.filter('currency', value => '$' + value.toLocaleString())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
