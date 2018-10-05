import firebase from 'firebase/app'

export default {
  namespaced: true,

  state: {
    all: {}, // all timelines
    specifiedOne: null // the timeline which is selected in Home and displaying in Timeline page
  },

  getters: {
    getSpecifiedTimeline: (state) => (timelineId) => {
      return state.all[timelineId]
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

      if (!specifiedTimeline) {
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
    }
  },

  mutations: {
    setTimelines (state, timelines) {
      state.all = timelines
    },

    setSpecifiedTimeline (state, specifiedTimeline) {
      state.specifiedOne = specifiedTimeline
    }
  }
}
