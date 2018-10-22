<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },

  methods: {
    ...mapMutations({
      setWindowWidth: 'setWindowWidth',
      setIsYouTubeIframeAPIReady: 'videos/setIsYouTubeIframeAPIReady'
    }),

    commitWindowWidth () {
      // get the current width of window and commit to vuex
      let currentWidth = document.documentElement.clientWidth
      this.setWindowWidth(currentWidth)
    }
  },

  created () {
    // This code loads the IFrame Player API code asynchronously.
    let tag = document.createElement('script')

    tag.src = 'https://www.youtube.com/iframe_api'
    let firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      this.setIsYouTubeIframeAPIReady(true)
    }
  },

  mounted () {
    // add listener on window resizing
    window.addEventListener('resize', this.commitWindowWidth)
    // do the first commit of window width
    this.commitWindowWidth()
  }
}
</script>

<style lang="scss">
@import "assets/stylesheets/styleguide";

html {
  font-size: 625%; /* 1px = 0.01rem */
}

*,
*:before,
*:after {
  position: relative;
  box-sizing: border-box;
}

body {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: Montserrat, "Avenir", "Hiragino Sans", "Microsoft JhengHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  font-family: inherit;
}
</style>
