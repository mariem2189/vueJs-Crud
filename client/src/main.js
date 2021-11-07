import Vue from 'vue';
import App from './App.vue';


Vue.config.productionTip = false;

export const EventBus = new Vue();
export const EventBusDisplay = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app');
