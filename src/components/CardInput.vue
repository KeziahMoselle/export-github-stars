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

            <v-text-field
              v-model="username"
              @keydown.enter="fetchStarredRepos"
              label="Enter a GitHub username..."
              solo>
            </v-text-field>

            <v-spacer></v-spacer>

          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>

            <no-data v-if="!username"></no-data>
            <v-progress-linear v-else-if="!starredrepos" :indeterminate="true"></v-progress-linear>
            <div v-else>
              <pre>
                {{ starredrepos }}
              </pre>
            </div>

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
      starredrepos: null,
      error: null
    }
  },
  methods: {
    async fetchStarredRepos () {
      try {
        const response = await axios.get(`https://api.github.com/users/${this.username}/starred`)
        this.starredrepos = response
      } catch (error) {
        this.error = error
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

</style>

