import Vue from 'vue';
import store from './store/store';
import App from './App.vue';
import './assets/styles/index.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
