<template>
<div class="home">
  <div class="container">
    <div class="filter">
      <span class="filter__caption caption">篩選條件</span>
      <button class="filter__pokemon btn">寶可夢</button>
      <button class="filter__travel btn">旅行</button>
    </div>

    <div class="container__captionNewest caption">最新</div>

    <div class="groups">
      <group-item
        v-for="(groupItem, key, index) in groupItems"
        :key=groupItem.name
        :info="groupItem"
        :theme="themes[index % 4]"
        @click.native="$router.push({ name: 'timeline', params: {timelineId: key} })"
      />
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase/app'
import GroupItem from '@/components/GroupItem.vue'
import GroupItemStructure from '@/components/data-structure/GroupItem.js'

export default {
  name: 'home',
  components: {
    GroupItem,
    GroupItemStructure
  },

  data () {
    return {
      themes: ['eucalyptusGreen', 'orchidPurple', 'japaneseIndigoBlue', 'spanishPink'],
      groupItems: null
    }
  },

  created () {
    firebase.database().ref('timelines').once('value', snapshot => {
      this.groupItems = snapshot.val()
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/stylesheets/styleguide";

.container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 0.62rem 0.5rem auto;
  width: 100%;

  margin: 0 auto;

  @media (min-width: $sm) {
    width: 5.55rem;
  }
}

.filter {
  display: grid;
  grid-gap: 0.16rem;
  grid-template-columns: repeat(auto-fill, minmax(0.72rem, 1fr));
  align-items: center;

  background: white;

  padding: 0 0.27rem 0 0.32rem;

  border: 0.014rem solid $japaneseIndigoBlue--l4;
  border-radius: 0.04rem;

  @media (min-width: $sm) {
    grid-gap: 0.24rem;
    grid-template-columns: repeat(auto-fill, minmax(0.96rem, 1fr));
  }

  &__caption {
    color: $gunmetalBlack--l3;
  }

  &__pokemon {
    grid-column-end: -2;
  }

  &__travel {
    grid-column-end: -1;
  }

  &__pokemon,
  &__travel {
    color: $pokemonRed--l3;
    border-color: $pokemonRed--l3;

    &:hover {
      background: $pokemonRed--l1;
      color: white;
      border-color: $pokemonRed--l1;
    }
  }
}

.container__captionNewest {
  display: grid;
  align-items: center;

  color: $gunmetalBlack--l4;
}

.groups {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 0.56rem;

  @media (min-width: $sm) {
    grid-template-columns: 5.46rem;
  }
}
</style>
