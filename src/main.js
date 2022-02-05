import Vue from 'vue'
import App from './App.vue'
import {io} from "socket.io-client";

Vue.config.productionTip = false

const socket = io('localhost:3000');
new Vue({
  render: h => h(App),
  provide: {$socket: socket}
}).$mount('#app')


