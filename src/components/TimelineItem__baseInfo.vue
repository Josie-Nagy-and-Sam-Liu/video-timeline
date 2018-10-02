<template>
<div :class="['baseInfo', {active: active}]">

  <div class="duration small-text" v-if="!active">
    {{formatDuration(info.duration)}}
  </div>

  <div class="order small-text">
    {{order + 1}}
  </div>

  <div class="title body-copy" :title="info.title">
    {{info.title}}
  </div>

  <div class="recordedAt small-text">
    {{formatRecordedAt(info.recordedAt)}}
  </div>

  <div class="location small-text" v-if="active">
    {{info.location}}
  </div>

  <div class="categories small-text" v-if="active">
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
export default {
  name: 'baseInfo',

  props: {
    info: Object,
    order: Number,
    active: Boolean
  },

  methods: {
    formatDuration (duration) {
      // original duration will look like PT01H30M25S
      // format into 01:30:25
      return duration.toString().replace(/(PT|S)/g, '').replace(/(H|M)/g, ':')
    },

    formatRecordedAt (date) {
      let spDate = date.split('-') // 0: year, 1: month, 2: day
      return Number(spDate[1]) + '月' + Number(spDate[2]) + '日'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";

.baseInfo {
  display: grid;
  grid-template-columns: 0.24rem 1fr 0.8rem;
  grid-template-areas:
    ". . duration"
    "order title recordedAt";
  align-items: center;

  font-size: 0.16rem;

  @media (min-width: $md) {
    grid-template-columns: 0.35rem 1fr 1.75rem;
  }

  &.active {
    display: grid;
    grid-column-gap: 0.16rem;
    grid-row-gap: 0.06rem;
    grid-template-columns: auto auto 1fr;
    grid-template-areas:
      "order . . "
      "title title title"
      "recordedAt location categories";
    grid-area: baseInfo;

    @media (min-width: $md) {
      grid-template-columns: auto auto 1fr;
      grid-column-gap: 0.24rem;
      grid-row-gap: 0.2rem;
    }
  }
}

.duration {
  grid-area: duration;
  justify-self: right;

  background: $gunmetalBlack--l5;
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
  grid-template-columns: repeat(auto-fill, 0.72rem);

  @media (min-width: $md) {
    grid-template-columns: repeat(auto-fill, 0.9rem);
  }
  grid-area: categories;

  &__item {
    display: grid;
    place-items: center center;

    color: #d6d0d2; /* To Josie - can't find this color in the style guild */
    border-color: #d6d0d2; /* To Josie - can't find this color in the style guild */
  }
}
</style>
