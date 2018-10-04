import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from '@/database/config'
import App from './App.vue'
import router from './router'
import store from '@/store/store'

Vue.config.productionTip = false

const config = firebaseConfig
firebase.initializeApp(config)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
