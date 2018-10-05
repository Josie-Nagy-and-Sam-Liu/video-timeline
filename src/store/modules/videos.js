import firebase from 'firebase/app'

export default {
  namespaced: true,

  state: {
    all: {} // the videos belong to the specifiedTimeline
  },

  getters: {
    getSpecifiedVideo: (state) => (videoId) => {
      return state.all[videoId]
    }
  },

  actions: {
    fetchVideos ({ commit }, timelineId) {
      firebase.database().ref('videos').orderByChild('timelineId').equalTo(timelineId).once('value', videos => {
        commit('setVideos', videos.val())
      })
    }
  },

  mutations: {
    setVideos (state, videos) {
      state.all = videos
    }
  }
}
