<template>
  <v-footer>
    <v-layout wrap justify-space-between align-center fill-height class="white--text px-5" black>
      <span> <v-icon color="white">change_history</v-icon> Made by <a href="https://github.com/KeziahMoselle">KeziahMoselle</a></span>
      <span>Illustrations by <a href="https://undraw.co/illustrations">Undraw.co</a></span>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

</style>
