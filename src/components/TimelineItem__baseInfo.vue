<template>
<div :class="rootClass">

  <div class="duration small-text">
    {{formatDuration(info.duration)}}
  </div>

  <div class="order small-text">
    {{order}}
  </div>

  <div class="title body-copy" :title="info.title">
    {{info.title}}
  </div>

  <div class="recordedAt small-text">
    {{formatRecordedAt(info.recordedAt)}}
  </div>

  <div class="location small-text" v-if="isActiveOrMain">
    {{info.location}}
  </div>

  <div class="categories small-text" v-if="isActiveOrMain">
    <div
      class="categories__item btn"
      v-for="value in info.categories"
      :key="value"
    >
      {{value}}
    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'baseInfo',

  props: {
    info: Object,
    vid: String,
    mode: String
  },

  computed: {
    ...mapState({
      videoIds: state => state.videos.sortedVideoIds
    }),

    order () {
      return this.videoIds.indexOf(this.vid) + 1
    },

    rootClass () {
      switch (this.mode) {
        case 'default':
          return 'baseInfo'
        case 'active':
          return 'baseInfo--active'
        case 'mobileMain':
          return 'baseInfo--mobileMain'
        default:
          return 'baseInfo'
      }
    },

    isActiveOrMain () {
      return this.mode === 'active' || this.mode === 'mobileMain'
    }
  },

  methods: {
    formatDuration (duration) {
      // original duration will look like PT01H30M25S
      // format into 01:30:25
      return duration.toString().replace(/(PT|S)/g, '').replace(/(H|M)/g, ':')
    },

    formatRecordedAt (unixDate) {
      // format unix time into yyyy-mm-dd
      let date = new Date(unixDate)
      // let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = ('0' + date.getDate()).substr(-2)

      return month + '月' + day + '日'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";
@import "../assets/stylesheets/timeline-shared-styles";

.baseInfo {
  display: grid;
  grid-area: baseInfo;
  grid-template-columns: 0.24rem 1fr 0.8rem;
  grid-template-areas:
    ". . duration"
    "order title recordedAt";
  align-items: center;

  font-size: 0.16rem;

  @media (min-width: $md) {
    grid-template-columns: 0.35rem 1fr 1.75rem;
  }
}

.baseInfo--active {
  @extend .baseInfo;

  @media (min-width: $md) {
    grid-column-gap: 0.24rem;
    grid-row-gap: 0.2rem;
    grid-template-columns: auto auto 1fr;
    grid-template-areas:
      "order . . "
      "title title title"
      "recordedAt location categories";
  }

  .duration {
    @media (min-width: $md) {
      display: none;
    }
  }

  .location, .categories {
    @media (max-width: $md) {
      display: none;
    }
  }
}

.baseInfo--mobileMain {
  @extend .baseInfo;

  grid-column-gap: 0.16rem;
  grid-row-gap: 0.08rem;
  grid-template-columns: auto auto 1fr;
  grid-template-areas:
    "order . . "
    "title title title"
    "recordedAt location categories";

  padding: 0 $mobileMainPadding; /* source: timeline-shared-styles */

  .duration {
    display: none;
  }

  .order {
    justify-self: stretch;
  }
}

.duration {
  grid-area: duration;
  justify-self: right;

  background: $gunmetalBlack--l5;
  color: black;
  text-align: center;

  padding: 0 0.08rem;
}

.order {
  grid-area: order;
  justify-self: center;

  color: $eucalyptusGreen--d1;

  @media (min-width: $md) {
    justify-self: left;
  }
}

.title {
  grid-area: title;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: $md) {
    white-space: nowrap;
  }
}

.recordedAt {
  justify-self: center;
  grid-area: recordedAt;
  color: $eucalyptusGreen--d1;
}

.location {
  grid-area: location;
}

.categories {
  display: grid;
  grid-column-gap: 0.24rem;
  grid-template-columns: repeat(auto-fill, 0.9rem);
  grid-area: categories;

  &__item {
    display: grid;
    place-items: center center;

    color: #d6d0d2; /* To Josie - can't find this color in the style guild */
    border-color: #d6d0d2; /* To Josie - can't find this color in the style guild */
  }
}
</style>
