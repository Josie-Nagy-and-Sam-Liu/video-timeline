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
import { mapState, mapActions } from 'vuex'
import TimelineItem from '@/components/TimelineItem'

export default {
  name: 'timeline',
  components: {
    TimelineItem
  },

  data () {
    return {
      nowFocusOn: null
    }
  },

  computed: {
    ...mapState({
      videos: 'videos',
      specifiedTimeline: 'specifiedTimeline'
    }),

    setContainerClass () {
      if (this.nowFocusOn === null) {
        // no video is selected yet
        return 'container'
      } else {
        // one video is selected
        return 'container--active'
      }
    }
  },

  methods: {
    ...mapActions({
      fetchVideos: 'fetchVideos',
      fetchSpecifiedTimeline: 'fetchSpecifiedTimeline'
    })
  },

  created () {
    // fetch all videos of the timeline with timelineId
    this.fetchVideos(this.$route.params.timelineId)
    // fetch the information of the timemline with timelineId
    this.fetchSpecifiedTimeline(this.$route.params.timelineId)
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
