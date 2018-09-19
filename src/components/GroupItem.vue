<template>
  <div :class="['groupItem', theme]">
    <div class="header small-text">
      <span>{{getPeriod}}</span>
      <div class="btn header__catogoryTag" v-for="(value, key) in info.categories" :key="key">
        <span>{{key}}</span>
        <span>{{value}}</span>
      </div>
    </div>

    <div class="body body-copy">
      {{info.name}}
    </div>

    <div class="footer">
      <div class="footer__toast"></div>
    </div>
  </div>
</template>

<script>
import GroupItemStructure from '@/components/data-structure/GroupItem.js'

export default {
  name: 'GroupItem',
  components: {
    GroupItemStructure
  },
  props: {
    info: GroupItemStructure,
    theme: String
  },

  computed: {
    getPeriod () {
      let startTime = this.info.period[0].split('-') // 0: year, 1: month
      let endTime = this.info.period[1].split('-') // 0: year, 1: month

      if (startTime[0] === endTime[0]) {
        return startTime[1] + '月 - ' + endTime[1] + '月 ' + endTime[0]
      } else {
        return startTime[1] + '月 ' + startTime[0] + ' - ' + endTime[1] + '月 ' + endTime[0]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/stylesheets/styleguild";

.groupItem {
  display: grid;
  grid-template-rows: [header] auto [body] auto [footer] 1fr;
  grid-gap: 0.24rem;
  height: 1.76rem;
  overflow: hidden;
  cursor: pointer;

  padding: 0.18rem 0.3rem 0 0.3rem;

  border: 0.02rem solid;
  border-radius: 0.11rem;

  &:hover {
    .footer__toast {
      transform: translateY(26.4%);
    }
  }
}

.header {
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: 0.16rem;
  align-items: center;

  &__catogoryTag {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0.16rem;

    color: #444955; /* To Josie - can't find this color in the style guild */
    padding: 0 0.16rem;
    border-color: $japaneseIndigoBlue--l4;
  }
}

.body {
  font-weight: bold;
  color: $gunmetalBlack--l1;
}

.footer {
  position: relative;

  &__toast {
    position: absolute;
    width: 1.96rem;
    height: 0.72rem;
    right: 0;
    bottom: 0;
    transform: translateY(50%);

    background: gray;

    border-radius: 0.36rem;

    transition: .2s;

    @media (min-width: $md) {
      width: 4.94rem;
    }
  }
}

/* themes */
.eucalyptusGreen {
  color: $eucalyptusGreen--d1;
  border-color: $eucalyptusGreen--d1;
  box-shadow: 8px 8px $eucalyptusGreen;

  .footer__toast {
    background: $eucalyptusGreen--d1;
  }
}

.orchidPurple {
  color: #4a90e2; /* To Josie - can't find this color in the style guild */
  border-color: #3f59e699; /* To Josie - can't find this color in the style guild */
  box-shadow: 8px 8px $orchidPurple;

  .footer__toast {
    background: $orchidPurple;
  }
}

.japaneseIndigoBlue {
  color: $japaneseIndigoBlue;
  border-color: #0d3b66bf; /* To Josie - can't find this color in the style guild */
  box-shadow: 8px 8px #0d3b66;

  .footer__toast {
    background: #0d3b66;
  }
}
</style>
