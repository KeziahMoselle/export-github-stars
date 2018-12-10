<template>
  <v-list>
    <transition-group name="slide-x-transition" mode="out-in">
      <v-list-tile
        v-for="(star, index) in sortedRepos"
        :key="index"
        avatar
        ripple
        :href="star.html_url"
        target="_blank">
        <v-list-tile-avatar>
          <img :src="star.owner_img">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-text="star.name"></v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-layout justify-end>
            {{ star.stars }}
            <v-icon color="black">star</v-icon>
          </v-layout>
        </v-list-tile-action>
      </v-list-tile>
    </transition-group>
  </v-list>
</template>

<script>
export default {
  name: 'StarsList',
  props: {
    starredRepos: {
      type: Array,
      required: true
    },
    sort: {
      type: Number,
      required: false
    },
    sortReverse: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      sortedRepos: this.starredRepos
    }
  },
  watch: {
    sort () {
      switch (this.sort) {
        case 0:
          this.sortedRepos.sort((a, b) => a.stars - b.stars)
          break
        case 1:
          this.sortedRepos.sort((a, b) => b.stars - a.stars)
          break
      }
    },
    sortReverse () {
      this.sortedRepos.reverse()
    },
    starredRepos () {
      this.sortedRepos = this.starredRepos
    }
  }
}
</script>

<style>

</style>
