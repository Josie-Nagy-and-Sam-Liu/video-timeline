<template>
<div class="timeline">
  <div class="container">
    <timeline-item
      v-for="(video, key, index) in videos"
      :vid="key"
      :info="video"
      :key="key"
      :index="index"
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
      videos: null
    }
  },

  created () {
    firebase.database().ref('videos').orderByChild('timelineId').equalTo(this.$route.params.timelineId).once('value', snapshot => {
      this.videos = snapshot.val()
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";

.container {
  display: grid;
  grid-template-columns: [contain] 100%;
  grid-template-rows: auto;

  @media (min-width: $md) {
    grid-row-gap: 0.24rem;
    grid-template-columns: 1fr [contain] 7.41rem 1fr;
  }
}
</style>
