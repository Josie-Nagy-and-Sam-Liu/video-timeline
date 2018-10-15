import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store'

import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from '@/database/config'

import PortalVue from 'portal-vue'
Vue.use(PortalVue)

Vue.config.productionTip = false

const config = firebaseConfig
firebase.initializeApp(config)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
