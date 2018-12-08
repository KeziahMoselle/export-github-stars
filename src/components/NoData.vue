<template>

  <transition name="slide-y-transition" mode="out-in">
    <v-layout column class="text-xs-center">
      <img class="illustration" src="@/assets/no-data.svg" alt="Undraw.co No data Illustration">
      <h2>No data available</h2>
      <h4 class="grey--text">Search for a username and hit enter !</h4>
    </v-layout>
  </transition>

</template>

<script>
export default {
  name: 'NoData'
}
</script>

<style scoped>

  .illustration {
    margin: 20px 0;
    height: 400px;
    width: auto;
  }

</style>
