<template>

  <transition name="slide-y-transition" mode="out-in">
    <v-layout column>
      <img class="illustration" src="@/assets/no-data.svg" alt="Undraw.co No data Illustration">
      <h2 class="text-xs-center">No data available</h2>
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
