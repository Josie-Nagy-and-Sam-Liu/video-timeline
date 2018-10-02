<template>
<div class="timelineItem--active small-text">
  <div class="timelineItem__body">

    <div id="player" class="player" v-if="active"></div>

    <div class="secondaryTitle" v-if="active">
      <router-link to="/" class="secondaryTitle__backToHome">&lt; 回首頁</router-link>
      <div class="secondaryTitle__timelineName">TTTTEEESSTTT</div>
    </div>

    <descriptions :info="info" v-if="active" />

    <base-info :info="info" :order="index" :active="active" />

  </div>

</div>
</template>

<script>
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
      active: true
    }
  },

  props: {
    info: Object,
    vid: String,
    index: Number
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";

.timelineItem {
  grid-column: contain;
  cursor: pointer;

  &__body {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    grid-template-area: "baseInfo";

    padding-bottom: 0.16rem;

    border: 0.01rem solid #232a3c38; /* To Josie - can't find this color in styleguide */

    @media (min-width: $md) {
      padding: 0.06rem 0.06rem 0.36rem 0.18rem;

      border-width: 0.02rem;
      border-radius: 0.04rem;
      box-shadow: 0.06rem 0.06rem $japaneseIndigoBlue--l3;
    }
  }

  &--active {
    grid-column: 1 / -1; /* take the whole row */
    cursor: auto;

    background: #232a3c; /* To Josie - can't find this color in styleguide */
    color: white;

    .timelineItem__body {
      padding: 0;

      border: none;
      box-shadow: none;

      @media (min-width: $md) {
        grid-template-columns: 1fr 7.41rem 1fr;
        grid-template-rows: auto 4.2rem auto 1fr;
        grid-template-areas:
          ". secondaryTitle ."
          ". player ."
          ". baseInfo ."
          ". descriptions .";
      }

      @media (min-width: $xl) {
        grid-column-gap: 0.3rem;
        grid-row-gap: 0.2rem;
        grid-template-columns: 1fr 7.41rem 3.6rem 1fr;
        grid-template-rows: 0.2rem 3.82rem auto;
        grid-template-areas:
          ". player secondaryTitle ."
          ". player descriptions ."
          ". baseInfo descriptions .";

        padding-bottom: 0.45rem;
      }
    }
  }
}

.player {
  grid-area: player;
  border: 1px solid white;

  @media (min-width: $md) {
    width: 100%;
    height: 100%;
  }
}

.secondaryTitle {
  display: grid;
  align-items: center;
  grid-area: secondaryTitle;

  font-size: 0.2rem;

  @media (min-width: $md) {
    grid-template-columns: auto 1fr;
    grid-template-areas: "backToHome timelineName";
  }

  &__backToHome {
    display: none;
    grid-area: backToHome;

    color: $pokemonRed;

    @media (min-width: $md) {
      display: block;
    }
  }

  &__timelineName {
    grid-area: timelineName;
    justify-self: right;
  }
}
</style>