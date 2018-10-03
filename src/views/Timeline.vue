<template>
<div class="timeline">
  <div :class="setContainerClass">
    <timeline-item
      v-for="(video, key, index) in videos"
      :key="key"
      :vid="key"
      :info="video"
      :index="index"
      :active="nowFocusOn === index"
      @click.native="nowFocusOn = index"
    />
  </div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import TimelineItem from '@/components/TimelineItem'

export default {
  name: 'timeline',
  components: {
    TimelineItem
  },

  data () {
    return {
      videos: null,
      nowFocusOn: null
    }
  },

  created () {
    firebase.database().ref('videos').orderByChild('timelineId').equalTo(this.$route.params.timelineId).once('value', snapshot => {
      this.videos = snapshot.val()
    })
  },

  computed: {
    setContainerClass () {
      if (this.nowFocusOn === null) {
        // no video is selected yet
        return 'container'
      } else {
        // one video is selected
        return 'container--active'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";
@import "../assets/stylesheets/timeline-shared-styles";

.container {
  display: grid;
  grid-template-columns: [contain] 100%;
  grid-template-rows: auto;

  transition: .3s;

  @media (min-width: $md) {
    grid-row-gap: 0.24rem;
    @include column__large; /* source: timeline-shared-styles */
  }
}

.container--active {
  @extend .container;

  @media (min-width: $xl) {
    @include column__large--active; /* source: timeline-shared-styles */
  }
}
</style>
