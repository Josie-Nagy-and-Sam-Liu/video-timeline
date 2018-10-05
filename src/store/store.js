import Vue from 'vue'
import Vuex from 'vuex'

import timelines from './modules/timelines'
import videos from './modules/videos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timelines,
    videos
  },

  state: {
  },

  getters: {
  },

  actions: {
  },

  mutations: {
  }
})
