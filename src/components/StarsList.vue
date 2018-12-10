<template>
  <v-list>
    <transition-group name="slide-x-transition" mode="out-in">
      <v-list-tile
        v-if="mode === undefined"
        v-for="(star, index) in repos"
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

    <transition-group name="slide-x-transition" mode="out-in">
      <v-list-tile
        v-if="mode === 'reversed'"
        v-for="(star, index) in reversedRepos"
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

    <transition-group name="slide-x-transition" mode="out-in">
      <v-list-tile
        v-if="mode === 'asc'"
        v-for="(star, index) in sortedAsc"
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

    <transition-group name="slide-x-transition" mode="out-in">
      <v-list-tile
        v-if="mode === 'desc'"
        v-for="(star, index) in sortedDesc"
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
    repos: {
      type: Array,
      required: true
    },
    sort: {
      type: Number,
      required: false
    },
    reversed: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      mode: undefined
    }
  },
  computed: {
    sortedAsc () {
      return [...this.repos].sort((a, b) => a.stars - b.stars)
    },
    sortedDesc () {
      return [...this.repos].sort((a, b) => b.stars - a.stars)
    },
    reversedRepos () {
      return [...this.repos].reverse()
    }
  },
  watch: {
    sort () {
      switch (this.sort) {
        case 0:
          this.mode = 'asc'
        break

        case 1:
          this.mode = 'desc'
        break

        default:
          this.mode = undefined
        break
      }
    },
    reversed () {
      if (this.reversed) {
        this.mode = 'reversed'
      } else {
        this.mode = undefined
      }
    }
  }
}
</script>
