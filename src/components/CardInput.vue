<template>
  <v-card flat>
    <v-toolbar
      color="black"
      :height="`${$vuetify.breakpoint.xsOnly ? 86 : 64}`"
      dark
      extended
      flat>
      <template v-if="starredRepos.length > 0">
        <transition name="slide-x-transition">
          <v-layout justify-center class="sort-container">
            <v-checkbox
              label="Reverse"
              v-model="sortReverse"
              color="white">
            </v-checkbox>
            <v-btn-toggle v-model="sortStars">
              <v-btn flat>
                <v-icon>arrow_drop_up</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon>arrow_drop_down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-layout>
        </transition>
      </template>
    </v-toolbar>

    <v-layout row pb-5>
      <v-flex xs10 offset-xs1 md8 offset-md2 xl6 offset-xl3>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>

            <v-layout row wrap>
              <v-text-field
                v-model="username"
                @keydown.enter="fetchStarredRepos"
                label="Enter a GitHub username..."
                append-icon="search"
                @click:append="fetchStarredRepos"
                solo>
              </v-text-field>
              <v-menu transition="slide-y-transition" bottom v-if="!$vuetify.breakpoint.xsOnly">
                <v-btn
                  slot="activator"
                  class="btn-export"
                  color="black"
                  dark>
                  Export to...
                </v-btn>
                <v-list>
                  <v-list-tile @click="exportToHTML">
                    <v-list-tile-title>
                      <v-layout justify-space-between>
                        HTML
                      <img src="@/assets/html.svg" alt="HTML Logo">
                      </v-layout>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="exportToJSON">
                    <v-list-tile-title>
                      <v-layout justify-space-between>
                        JSON
                      <img src="@/assets/json.svg" alt="JSON logo">
                      </v-layout>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-layout>

          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>

            <v-snackbar
              v-model="snackbar"
              :timeout="5000"
              top>
              This feature is under development...
              <v-btn
                color="white"
                flat
                @click="snackbar = false">
                close
                <v-icon right>close</v-icon>
              </v-btn>
            </v-snackbar>

            <error v-if="error && starredRepos.length === 0" :error="error"></error>
            <no-data v-if="starredRepos.length === 0 && !loading && !error"></no-data>
            <template v-else-if="loading">
              <v-progress-linear color="black" indeterminate></v-progress-linear>
              <h3 class="text-xs-center">Type enter to search for : {{ username }}</h3>
            </template>

            <template v-if="starredRepos.length > 0">

              <v-layout wrap justify-space-between>
                <v-subheader>
                  {{ starredRepos.length }} repositories found
                </v-subheader>

                <v-subheader>
                 Page : {{ page }} / {{ lastPage || 1 }}
                </v-subheader>
              </v-layout>

              <stars-list :sort="sortStars" :sort-reverse="sortReverse" :starred-repos="starredRepos"></stars-list>

            </template>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import axios from 'axios'
import linkParser from 'parse-link-header'
import download from 'downloadjs'

import StarsList from '@/components/StarsList'
import NoData from '@/components/NoData'
import Error from '@/components/Error'

export default {
  name: 'CardInput',
  components: {
    StarsList,
    NoData,
    Error
  },
  data () {
    return {
      username: '',
      page: 0,
      lastPage: null,
      loading: false,
      starredRepos: [],
      error: null,
      snackbar: false,
      sortStars: null,
      sortReverse: false
    }
  },
  methods: {
    async fetchStarredRepos (event, nextUrl) {
      this.page++
      const url = nextUrl || `https://api.github.com/users/${this.username}/starred?per_page=100&page=${this.page}`
      try {
        // Fetch the first page
        if (!nextUrl) {
          const response = await axios.get(url)
          this.updateStarredRepos(response.data)
          // Check if there is an another page
          const { url: nextUrl } = linkParser(response.headers.link).next
          const { page: lastPage } = linkParser(response.headers.link).last
          this.lastPage = lastPage
          // If an another page exists, fetch the page
          if (nextUrl) {
            this.fetchStarredRepos(null, nextUrl)
          } else {
            this.loading = false
          }
        } else { // nextUrl is defined
          // More pages, so fetch this page and add the result to the global array
          const response = await axios.get(nextUrl)
          this.updateStarredRepos(response.data)
          // Check if there is an another page
          const { url: anotherPage } = linkParser(response.headers.link).next
          // If an another page exists, fetch the page
          if (anotherPage) {
            this.fetchStarredRepos(null, anotherPage)
          }
        }
      } catch (error) {
        this.error = error
      }
      this.loading = false
    },
    updateStarredRepos (newStarredRepos) {
      const newRepos = newStarredRepos.map(star => ({
        name: star.full_name,
        owner_img: star.owner.avatar_url,
        html_url: star.html_url,
        stars: star.stargazers_count
      }))
      this.starredRepos = [...this.starredRepos, ...newRepos]
      this.loading = false
    },
    exportToHTML () {
      this.snackbar = true
      let data = `<h1>${this.username}'s starred repositories :</h1>`
      this.starredRepos.forEach(repo => {
        data += `<p><a href="${repo.html_url}">${repo.name} (${repo.stars}⭐)</a></p>`
      })
      download(data, `${this.username}-starred.html`, 'text/html')
    },
    exportToJSON () {
      const data = JSON.stringify(this.starredRepos)
      const blob = new Blob([data])
      download(blob, `${this.username}-starred.json`, 'application/json')
    }
  },
  watch: {
    username () {
      this.starredRepos = []
      this.page = 0
      this.lastPage = null
      this.error = null
      if (this.username.length > 0) {
        this.loading = true
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style>

  .sort-container {
    max-height: 36px;
  }

  .card--flex-toolbar {
    margin-top: -64px;
  }

  .v-input__slot {
    margin-bottom: 0;
  }

  .btn-export {
    height: 48px;
    margin: 0;
  }

  .v-list__tile__title img {
    height: 24px;
    width: 24px;
  }

  .theme--light.v-card {
    background-color: rgba(0, 0, 0, 0);
  }

</style>
