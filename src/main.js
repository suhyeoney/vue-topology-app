import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index'

import { SweetModal, SweetModalTab } from 'sweet-modal-vue';
Vue.component('sweet-modal', SweetModal);
Vue.component('sweet-modal-tab', SweetModalTab);

import CustomSweetModal from '@/components/common/SweetModal.vue';
Vue.component('custom-sweet-modal', CustomSweetModal); // Vue.component(GlobalComponent Name, Global Component)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
