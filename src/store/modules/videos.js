import firebase from 'firebase/app'

export default {
  namespaced: true,

  state: {
    all: {}, // the videos belong to the specifiedTimeline
    sortedVideoIds: []
  },

  getters: {
    getSpecifiedVideo: (state) => (videoId) => {
      return state.all[videoId]
    }
  },

  actions: {
    fetchVideos ({ state, dispatch, commit }, timelineId) {
      firebase.database().ref('videos').orderByChild('timelineId').equalTo(timelineId).once('value', videos => {
        commit('setVideos', videos.val())
        dispatch('sortVideos')
      })
    },

    sortVideos ({ state, commit }) { // return a list of videoIds sorted by recordAt
      let sortedVideoIds = Object.keys(state.all).sort((a, b) => state.all[b].recordedAt - state.all[a].recordedAt)
      commit('setSortedVideoIds', sortedVideoIds)
    }
  },

  mutations: {
    setVideos (state, videos) {
      state.all = videos
    },

    setSortedVideoIds (state, idList) {
      state.sortedVideoIds = idList
    }
  }
}
