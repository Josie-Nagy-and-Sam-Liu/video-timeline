<template>
<div class="descriptions">

  <div class="toggler" @click="isHidden = !isHidden">顯示訊息</div>

  <div :class="['contain', {hidden: isHidden}]">
    <div class="contain__owner">
      <div class="author">劉沛</div>
      <div class="description">
        {{info.description.owner}}
      </div>
    </div>

    <div class="contain__custom" v-if="info.description.custom !== ''">
      <div class="author">Jack</div>
      <div class="description">
        {{info.description.custom}}
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'descriptions',

  data () {
    return {
      isHidden: true
    }
  },

  props: {
    info: Object
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";

.descriptions {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "toggler"
    "contain";
  grid-area: descriptions;
}

.toggler {
  cursor: pointer;

  color: $pokemonRed;
  font-size: 0.16rem;
  text-align: right;

  padding-bottom: 0.16rem;

  border-bottom: 1px solid $japaneseIndigoBlue--l1;

  @media (min-width: $xl) {
    display: none;
  }
}

.contain {
  display: grid;
  grid-template-areas:
    "owner"
    "custom";
  overflow: auto;

  padding: 0.24rem 0 0.4rem 0;

  border-top: 1px solid $japaneseIndigoBlue--l1;

  @media (min-width: $xl) {
    padding: 0.2rem 0 0 0.2rem;
  }

  &.hidden {
    @media (max-width: $xl) {
      display: none;
    }
  }
}

.contain__owner, .contain__custom {
  width: 100%;

  font-size: 0.16rem;

  @media (min-width: $md) {
    width: 5.12rem;
  }

  @media (min-width: $xl) {
    width: 2.8rem;
  }

  .author {
    margin-bottom: 0.3rem;
  }

  .description {
    padding: 0.1rem 0 0.1rem 0.2rem;
  }
}

.contain__owner {
  grid-area: owner;

  .author {
    padding-left: 0.2rem;
  }

  .description {
    padding: 0.1rem 0 0.1rem 0.2rem;
    border-left: 3px solid $japaneseIndigoBlue--l4;
  }
}

.contain__custom {
  grid-area: custom;
  justify-self: right;
  text-align: right;

  .author {
    padding-right: 0.2rem;
  }

  .description {
    padding: 0.1rem 0.2rem 0.1rem 0;
    border-right: 3px solid $japaneseIndigoBlue--l4;
  }
}
</style>
