import Vue from 'vue';
import Vuex from 'vuex';
import store from './store/store';
import App from './App.vue';
import './assets/styles/index.css';

Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
