<template>
  <v-list-tile
    avatar
    ripple
    :href="repo.html_url"
    target="_blank">
    <v-list-tile-avatar>
      <img :src="repo.owner_img">
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title v-text="repo.name"></v-list-tile-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-layout justify-end>
        {{ repo.stars }}
        <v-icon color="black">star</v-icon>
      </v-layout>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  name: 'StarsList',
  props: {
    repo: {
      type: Object,
      required: true
    }
  }
}
</script>
