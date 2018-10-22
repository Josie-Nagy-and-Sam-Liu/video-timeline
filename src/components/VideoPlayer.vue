<template>
<portal :to="portalTo" v-if="nowFocusOn >= 0">
  <iframe
    id="videoPlayer"
    frameborder="0"
    allowfullscreen="1"
    allow="autoplay; encrypted-media"
    title="YouTube video player"
    :src="'https://www.youtube.com/embed/' + videoIds[nowFocusOn] + '?enablejsapi=1&amp;rel=0&amp;showinfo=0&amp;modestbranding=1&amp;origin=http%3A%2F%2Fvideo-timeline-samtw.c9users.io%3A8080&amp;widgetid=1'">
  </iframe>
</portal>
</template>

<script>
/* eslint no-undef: 0 */
/*
We disable the specific rule for this file
bacause the YT will always cause eslint warning no-undef
The constructions in created hook refer to the YouTube iframe player API
  https://developers.google.com/youtube/iframe_api_reference
*/

import { mapState } from 'vuex'

export default {
  name: 'videoPlayer',

  computed: {
    ...mapState({
      windowWidth: state => state.windowWidth
    }),

    ...mapState('videos', {
      videoIds: state => state.sortedVideoIds,
      nowFocusOn: state => state.nowFocusOn,
      isYouTubeIframeAPIReady: state => state.isYouTubeIframeAPIReady
    }),

    player () {
      // if the YouTube iframe Api is ready => new the plyer on the iframe
      // the nowFocusOn in if is to let the player re-render everytime nowFocusOn changed
      if (this.isYouTubeIframeAPIReady && this.nowFocusOn >= 0) {
        let player = new YT.Player('videoPlayer', {
          events: {
            'onReady': function (event) {
              event.target.playVideo()
            },
            'onStateChange': function (event) {
              // Todo: add corresponding actions, e.g. state === end => play next video
            }
          }
        })

        return player
      }
    },

    portalTo () {
      if (this.windowWidth > 768) { // portal to desktop and tablet player
        return 'active__' + this.videoIds[this.nowFocusOn]
      } else { // portal to mobile player
        return 'mobileMain__' + this.videoIds[this.nowFocusOn]
      }
    }
  },

  watch: {
    nowFocusOn: function (newVideoIndex) {
      this.$nextTick(() => {
        try {
          this.player()
        } catch (err) {
          // ignore TypeError: _this.player is not a function
          // Not sure why it will happen. The player should exist when we call it
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";

#videoPlayer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media (min-width: $md) {
    position: relative;
  }
}
</style>
