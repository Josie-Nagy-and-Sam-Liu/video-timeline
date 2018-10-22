<template>
<div :class="['small-text', rootClass]">

  <div class="timelineItem__header">
    <!-- the next video -->
    <timeline-item
      :videoIndex="videoIndex - 1"
      mode="nextVideo"
      v-if="showIf(['active']) && videoIndex > 0"
    />
    <!-- header half-high background -->
    <div class="header__extendedBg" v-if="showIf(['active']) && videoIndex > 0"></div>

    <div class="caption text-left" v-if="showIf(['nextVideo'])">下部影片</div>
    <div class="caption text-right" v-if="showIf(['prevVideo'])">較舊的影片</div>
  </div>

  <div class="timelineItem__body" @click="setNowFocusOn(videoIndex)">

    <div class="player" v-show="showIf(['active', 'mobileMain'])">
      <portal-target :name="mode + '__' + vid" slim></portal-target>
    </div>

    <div class="secondaryTitle" v-if="showIf(['active', 'mobileMain'])">
      <router-link to="/" class="secondaryTitle__backToHome">&lt; 回首頁</router-link>
      <div class="secondaryTitle__timelineName">{{specifiedTimeline.name}}</div>
    </div>

    <descriptions :info="video" v-if="showIf(['active', 'mobileMain'])" />

    <base-info :info="video" :vid="vid" :mode="mode" />

  </div>

</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
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
    videoIndex: Number,
    mode: String // default, active, nextVideo, prevVideo or mobileMain
  },

  computed: {
    ...mapState({
      windowWidth: state => state.windowWidth,
      specifiedTimeline: state => state.timelines.specifiedOne,
      videos: state => state.videos.sortedVideoIds,
      nowFocusOn: state => state.videos.noFocusOn
    }),

    ...mapGetters({
      getVideo: 'videos/getSpecifiedVideo'
    }),

    vid () {
      return this.videos[this.videoIndex]
    },

    rootClass () {
      switch (this.mode) {
        case 'default':
          return 'timelineItem'
        case 'active':
          return 'timelineItem--active'
        case 'nextVideo':
          return 'timelineItem--nextVideo'
        case 'mobileMain':
          return 'timelineItem--mobileMain'
        default:
          return 'timelineItem'
      }
    }
  },

  methods: {
    ...mapMutations({
      setNowFocusOn: 'videos/setNowFocusOn'
    }),

    /*
      decide the element to be shown in which conditions
      input: an array of modes whom will show this element
      output: Boolean (ture => show, false => don't show)
    */
    showIf (modeArray) {
      if (modeArray.indexOf(this.mode) >= 0) {
        return true
      } else {
        return false
      }
    }
  },

  created () {
    this.video = this.getVideo(this.vid)
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";
@import "../assets/stylesheets/timeline-shared-styles";

$itemBg--active: #232a3c; /* To Josie - can't find this color in styleguide */

/* base styles of timelineItem__body */
%timelineItem__body__baseStyle {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas: "baseInfo";

  background: white;

  padding-bottom: 0.16rem;

  transition: .3s;

  @media (min-width: $md) {
    padding: 0.06rem 0.06rem 0.36rem 0.18rem;

    border-width: 0.02rem;
    border-radius: 0.04rem;
  }
}

.timelineItem {
  grid-column: item-start / item-stop;
  cursor: pointer;

  > .timelineItem__body {
    @extend %timelineItem__body__baseStyle;

    border: 0.01rem solid #232a3c38; /* To Josie - can't find this color in styleguide */

    @media (min-width: $md) {
      box-shadow: 0.06rem 0.06rem $japaneseIndigoBlue--l3;

      &:hover {
        border-color: $pokemonRed--l2;
        box-shadow: 0.06rem 0.06rem $pokemonRed--l1;
      }
    }
  }
}

.timelineItem--active {
  display: grid;
  grid-column: 1 / -1; /* take the whole row */

  > .timelineItem__header {
    display: none;

    @media (min-width: $md) {
      display: grid;
      @include column__large;  /* source: timeline-shared-styles */
      grid-template-rows: auto auto;
      grid-template-areas:
        ". nextVideo ."
        ". nextVideo .";
    }

    @media (min-width: $xl) {
      @include column__large--active;  /* source: timeline-shared-styles */
      grid-template-areas:
        ". nextVideo . ."
        ". nextVideo editBtns .";
    }

    .header__extendedBg {
      grid-column: 1 / -1;
      grid-row: 2 / -1;
      height: 0.45rem;
      z-index: 0;

      background: $itemBg--active;
    }
  }

  > .timelineItem__body {
    @extend %timelineItem__body__baseStyle;

    background: $itemBg--active;
    color: white;

    @media (max-width: $md) {
      /* only show these components in PC and tablet use cases */
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

      padding: 0.2rem 0 0 0;
    }

    @media (min-width: $xl) {
      @include column__large--active;  /* source: timeline-shared-styles */
      grid-row-gap: 0.2rem;
      grid-template-rows: 0.2rem 3.82rem auto;
      grid-template-areas:
        ". player secondaryTitle ."
        ". player descriptions ."
        ". baseInfo descriptions .";

      padding: 0.4rem 0 0.45rem 0;
    }
  }
}

.timelineItem--nextVideo {
  grid-area: nextVideo;
  z-index: 1;

  > .timelineItem__body {
    @extend %timelineItem__body__baseStyle;
    cursor: pointer;

    border: 0.01rem solid #232a3c38; /* To Josie - can't find this color in styleguide */
  }
}

.timelineItem--mobileMain {
  border-bottom: 0.05rem solid #d8d8d8;

  @media (min-width: $md) {
    display: none;
  }

  > .timelineItem__body {
    @extend %timelineItem__body__baseStyle;

    grid-template-columns: 1fr;
    grid-template-rows: auto 0.28rem 1.02rem 1fr;
    grid-template-areas:
      "player"
      "secondaryTitle"
      "baseInfo"
      "descriptions";

    background: $itemBg--active;
    color: white;

    padding: 0;

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
