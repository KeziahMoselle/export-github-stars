<template>
  <v-card flat>
    <v-toolbar
      color="black"
      dark
      extended
      flat>
    </v-toolbar>

    <v-layout row pb-2>
      <v-flex xs10 offset-xs1 md8 offset-md2 xl6 offset-xl3>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>

            <v-layout row wrap>
              <v-text-field
                v-model="username"
                @keydown.enter="fetchStarredRepos"
                label="Enter a GitHub username..."
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

            <no-data v-if="!starredRepos && !loading"></no-data>
            <v-progress-linear v-if="loading && !starredRepos" color="black" indeterminate></v-progress-linear>
            
            <v-list v-if="starredRepos">
              <transition-group name="slide-x-transition" mode="out-in">
                <v-list-tile
                  v-for="(star, index) in starredRepos"
                  :key="index"
                  avatar
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

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import axios from 'axios'
import NoData from '@/components/NoData'

export default {
  name: 'CardInput',
  components: {
    NoData
  },
  data () {
    return {
      username: '',
      loading: false,
      starredRepos: null,
      error: null
    }
  },
  methods: {
    async fetchStarredRepos () {
      try {
        this.loading = true
        const response = await axios.get(`https://api.github.com/users/${this.username}/starred`)
        this.starredRepos = response.data.map(star => ({
          name: star.full_name,
          owner_img: star.owner.avatar_url,
          html_url: star.html_url,
          stars: star.stargazers_count
        }))
        this.loading = false
      } catch (error) {
        this.error = error
      }
    },
    exportToHTML () {
      console.log('Export to HTML')
    },
    exportToJSON () {
      console.log('Export to JSON')
    }
  },
  watch: {
    username () {
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

