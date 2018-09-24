<template>
<div class="timeline">
  <p class="small-text">{{timelines}}</p>
</div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'timeline',

  data () {
    return {
      timelines: null
    }
  },

  created () {
    firebase.database().ref('timeline').orderByChild('groupId').equalTo(this.$route.params.groupId).once('value', snapshot => {
      this.timelines = snapshot.val()
    })
  }
}
</script>

<style lang="scss" scoped></style>
