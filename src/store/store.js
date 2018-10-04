import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timelines: {}, // all timelines
    specifiedTimeline: null, // the timeline which is selected in Home and displaying in Timeline page
    videos: null // the videos belong to the specifiedTimeline
  },

  getters: {
    getSpecifiedTimeline: (state) => (timelineId) => {
      return state.timelines[timelineId]
    }
  },

  actions: {
    fetchTimelines ({ commit }) {
      firebase.database().ref('timelines').once('value', timelines => {
        commit('setTimelines', timelines.val())
      })
    },

    fetchSpecifiedTimeline ({ state, getters, commit }, timelineId) {
      let specifiedTimeline = getters.getSpecifiedTimeline(timelineId)

      if (specifiedTimeline) {
        // specified timeline is not fetched yet => fetch it from database
        // use case: people directly access the Timeline page
        firebase.database().ref('timelines').child(timelineId).once('value', timeline => {
          commit('setSpecifiedTimeline', timeline.val())
        })
      } else {
        // specifed timeline is fetched => commit mutation directly
        // use case: people access the Timeline page by clicking on one of the timelines in Home
        commit('setSpecifiedTimeline', specifiedTimeline)
      }
    },

    fetchVideos ({ commit }, timelineId) {
      firebase.database().ref('videos').orderByChild('timelineId').equalTo(timelineId).once('value', videos => {
        commit('setVideos', videos.val())
      })
    }
  },

  mutations: {
    setTimelines (state, timelines) {
      state.timelines = timelines
    },

    setSpecifiedTimeline (state, specifiedTimeline) {
      state.specifiedTimeline = specifiedTimeline
    },

    setVideos (state, videos) {
      state.videos = videos
    }
  }
})
