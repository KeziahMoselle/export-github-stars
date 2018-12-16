<template>
  <v-list>
    <stars-list-item
      v-if="mode === undefined"
      v-for="(repo, index) in repos"
      :key="index"
      :repo="repo">
    </stars-list-item>

    <stars-list-item
      v-if="mode === 'reversed'"
      v-for="(repo, index) in reversedRepos"
      :key="index"
      :repo="repo">
    </stars-list-item>

    <stars-list-item
      v-if="mode === 'asc'"
      v-for="(repo, index) in sortedAsc"
      :key="index"
      :repo="repo">
    </stars-list-item>

    <stars-list-item
      v-if="mode === 'desc'"
      v-for="(repo, index) in sortedDesc"
      :key="index"
      :repo="repo">
    </stars-list-item>

    <stars-list-item
      v-if="mode === 'lang'"
      v-for="(repo, index) in sortedLang"
      :key="index"
      :repo="repo">
    </stars-list-item>
  </v-list>
</template>

<script>
import StarsListItem from './StarsListItem'

export default {
  name: 'StarsList',
  components: {
    StarsListItem
  },
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
    },
    lang: {
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
    },
    sortedLang () {
      return [...this.repos].sort((a, b) => a.lang !== null ? a.lang.localeCompare(b.lang) : -1)
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
    },
    lang () {
      if (this.lang) {
        this.mode = 'lang'
      } else {
        this.mode = undefined
      }
    }
  }
}
</script>
