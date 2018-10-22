import firebase from 'firebase/app'

export default {
  namespaced: true,

  state: {
    all: {}, // the videos belong to the specifiedTimeline
    sortedVideoIds: [],
    nowFocusOn: -10,
    isYouTubeIframeAPIReady: false
  },

  getters: {
    getSpecifiedVideo: (state) => (videoId) => {
      return state.all[videoId]
    },

    getVideoId: (state) => (index) => {
      return state.sortedVideoIds[index]
    },

    getNowFocusOn (state) {
      return state.nowFocusOn
    }
  },

  actions: {
    fetchVideos ({ state, dispatch, commit }, timelineId) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('videos').orderByChild('timelineId').equalTo(timelineId).once('value', videos => {
          commit('setVideos', videos.val())
          dispatch('sortVideos')
          resolve()
        })
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
    },

    setNowFocusOn (state, videoIndex) {
      state.nowFocusOn = videoIndex
    },

    setIsYouTubeIframeAPIReady (state, isReady) {
      state.isYouTubeIframeAPIReady = isReady
    },

    resetState (state) {
      state.all = {}
      state.sortedVideoIds = []
      state.nowFocusOn = -10
    }
  }
}
