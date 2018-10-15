<template>
<div :class="['small-text', rootClass]">
  <div class="timelineItem__body">

    <div class="player">
      <portal-target :name="mode + '__' + vid" slim></portal-target>
    </div>

    <div class="secondaryTitle">
      <router-link to="/" class="secondaryTitle__backToHome">&lt; 回首頁</router-link>
      <div class="secondaryTitle__timelineName">{{specifiedTimeline.name}}</div>
    </div>

    <descriptions :info="video" />

    <base-info :info="video" :vid="vid" :mode="mode" />

  </div>

</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import descriptions from '@/components/TimelineItem__descriptions'
import baseInfo from '@/components/TimelineItem__baseInfo'

export default {
  name: 'TimelineItem',

  components: {
    descriptions,
    baseInfo
  },

  data () {
    return {
      video: {}
    }
  },

  props: {
    vid: String,
    videoIndex: Number,
    mode: String // default, active or mobileMain
  },

  computed: {
    ...mapState({
      windowWidth: state => state.windowWidth,
      specifiedTimeline: state => state.timelines.specifiedOne,
      videos: state => state.videos.all
    }),

    ...mapGetters({
      getVideo: 'videos/getSpecifiedVideo'
    }),

    rootClass () {
      switch (this.mode) {
        case 'default':
          return 'timelineItem'
        case 'active':
          return 'timelineItem--active'
        case 'mobileMain':
          return 'timelineItem--mobileMain'
        default:
          return 'timelineItem'
      }
    }
  },

  created () {
    this.video = this.getVideo(this.vid)
  },

  watch: {
    vid: function (val) {
      this.video = this.getVideo(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";
@import "../assets/stylesheets/timeline-shared-styles";

.timelineItem {
  cursor: pointer;

  @media (min-width: $md) {
    grid-column: 2 / 3;
  }
}

.timelineItem__body {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas: "baseInfo";

  padding-bottom: 0.16rem;

  border: 0.01rem solid #232a3c38; /* To Josie - can't find this color in styleguide */

  transition: .3s;

  @media (min-width: $md) {
    padding: 0.06rem 0.06rem 0.36rem 0.18rem;

    border-width: 0.02rem;
    border-radius: 0.04rem;
    box-shadow: 0.06rem 0.06rem $japaneseIndigoBlue--l3;

    &:hover {
      border-color: $pokemonRed--l2;
      box-shadow: 0.06rem 0.06rem $pokemonRed--l1;
    }
  }
}

.timelineItem {
  .timelineItem__body {
    /* won't show player and secondaryTitle in default state */
    .player, .secondaryTitle, .descriptions {
      display: none;
    }
  }
}

.timelineItem--active {
  grid-column: 1 / -1; /* take the whole row */

  .timelineItem__body {
    background: #232a3c; /* To Josie - can't find this color in styleguide */
    color: white;

    border: none;
    box-shadow: none;

    @media (max-width: $md) {
      /* only show player and secondaryTitle in PC and tablet use cases */
      .player, .secondaryTitle, .descriptions {
        display: none;
      }
    }

    @media (min-width: $md) {
      @include column__large;  /* source: timeline-shared-styles */
      grid-template-rows: auto 4.2rem auto 1fr;
      grid-template-areas:
        ". secondaryTitle ."
        ". player ."
        ". baseInfo ."
        ". descriptions .";

      padding: 0;
    }

    @media (min-width: $xl) {
      @include column__large--active;  /* source: timeline-shared-styles */
      grid-row-gap: 0.2rem;
      grid-template-rows: 0.2rem 3.82rem auto;
      grid-template-areas:
        ". player secondaryTitle ."
        ". player descriptions ."
        ". baseInfo descriptions .";

      padding-bottom: 0.45rem;
    }
  }
}

.timelineItem--mobileMain {
  border-bottom: 0.05rem solid #d8d8d8;

  @media (min-width: $md) {
    display: none;
  }

  .timelineItem__body {
    grid-template-columns: 1fr;
    grid-template-rows: auto 0.28rem 1.02rem 1fr;
    grid-template-areas:
      "player"
      "secondaryTitle"
      "baseInfo"
      "descriptions";

    background: #232a3c; /* To Josie - can't find this color in styleguide */
    color: white;

    padding: 0;

    border: none;
    box-shadow: none;

    .secondaryTitle, .descriptions {
      padding: 0 $mobileMainPadding; /* source: timeline-shared-styles */
    }
  }
}

.player {
  position: relative;
  grid-area: player;
  width: 100%;

  padding-top: 56%;

  @media (min-width: $md) {
    height: 100%;
    padding: 0;
  }
}

.secondaryTitle {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "backToHome timelineName";
  align-items: center;
  grid-area: secondaryTitle;

  font-size: 0.2rem;

  &__backToHome {
    grid-area: backToHome;

    color: $pokemonRed;
  }

  &__timelineName {
    grid-area: timelineName;
    justify-self: right;
  }
}
</style>
