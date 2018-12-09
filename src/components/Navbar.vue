<template>
  <v-toolbar>
    <v-toolbar-title class="headline text-uppercase">
      <span>GitHub</span>
      <img src="@/assets/star.svg" alt="Star icon">
      <span class="font-weight-light">EXPORT</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      flat
      href="//github.com/KeziahMoselle/export-github-stars"
      target="_blank">
      <span class="mr-2">Source Code</span>
      <img src="@/assets/repo.svg" alt="Repository Icon">
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
