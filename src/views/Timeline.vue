<template>
<div class="timeline">
  <div :class="setContainerClass">
    <timeline-item
      :vid="videoIds[nowFocusOn]"
      :index="nowFocusOn"
      mode="mobileMain"
      v-if="nowFocusOn >= 0"
    />
    <timeline-item
      v-for="(videoId, index) in videoIds"
      :key="'Timeline__' + videoId"
      :vid="videoId"
      :index="index"
      :mode="(nowFocusOn === index ? 'active' : 'default')"
      @click.native="setNowFocusOn(index)"
    />
  </div>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import TimelineItem from '@/components/TimelineItem'

export default {
  name: 'timeline',
  components: {
    TimelineItem
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState({
      specifiedTimeline: state => state.timelines.specifiedOne,
      videoIds: state => state.videos.sortedVideoIds,
      nowFocusOn: state => state.videos.nowFocusOn
    }),

    setContainerClass () {
      if (this.nowFocusOn === -1) {
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
      fetchVideos: 'videos/fetchVideos',
      fetchSpecifiedTimeline: 'timelines/fetchSpecifiedTimeline'
    }),

    ...mapMutations({
      setNowFocusOn: 'videos/setNowFocusOn',
      resetState: 'videos/resetState'
    })
  },

  created () {
    // fetch the information of the timemline with timelineId
    this.fetchSpecifiedTimeline(this.$route.params.timelineId)
    // fetch all videos of the timeline with timelineId
    this.fetchVideos(this.$route.params.timelineId)
  },

  destroyed () {
    // We found that the videos of the last timeline may remain displaying in a flash
    // It is because the asyc call of fetchVideo hasn't finished yet
    // To solve that, we clean the all in videos store everytime user leave this page to avoid it
    this.resetState()
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
