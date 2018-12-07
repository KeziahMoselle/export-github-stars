<template>
  <v-card flat>
    <v-toolbar
      color="black"
      dark
      extended
      flat>
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
              <v-menu transition="slide-y-transition" bottom>
                <v-btn
                  slot="activator"
                  class="btn-export"
                  color="black"
                  dark>
                  Export to...
                </v-btn>
                <v-list>
                  <v-list-tile @click="exportToHTML">
                    <v-list-tile-title>HTML</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="exportToJSON">
                    <v-list-tile-title>JSON</v-list-tile-title>
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

            <error v-if="error && starredRepos.length === 0" :message="error"></error>
            <no-data v-if="starredRepos.length === 0 && !loading && !error"></no-data>
            <template v-else-if="loading">
              <v-progress-linear color="black" indeterminate></v-progress-linear>
              <h3 class="text-xs-center">Type enter to search for : {{ username }}</h3>
            </template>
            
            <template v-if="starredRepos.length > 0">

              <v-layout wrap justify-space-between>
                <v-subheader>
                  {{ starredRepos.length }} starred repositories found.
                </v-subheader>

                <v-subheader>
                 Page : {{ page }} / {{ lastPage }}
                </v-subheader>
              </v-layout>

              <v-list>
                <transition-group name="slide-x-transition" mode="out-in">
                  <v-list-tile
                    v-for="(star, index) in starredRepos"
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
                      <span>
                        {{ star.stars }}
                        <v-icon color="black">star</v-icon>
                      </span>
                    </v-list-tile-action>
                  </v-list-tile>
                </transition-group>
              </v-list>

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

import NoData from '@/components/NoData'
import Error from '@/components/Error'

export default {
  name: 'CardInput',
  components: {
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
      snackbar: false
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
        this.starredRepos = response.data.map(star => ({
          name: star.full_name,
          owner_img: star.owner.avatar_url,
          html_url: star.html_url,
          stars: star.stargazers_count
        }))
      } catch (error) {
        this.error = error.response.data.message
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
    },
    exportToJSON () {
      this.snackbar = true
    }
  },
  watch: {
    username () {
      this.starredRepos = []
      this.page = 0
      this.lastPage = null
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

</style>

