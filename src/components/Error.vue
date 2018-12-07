<template>

  <transition name="slide-y-transition" mode="out-in">
    <v-layout column class="text-xs-center">
      <img class="illustration" src="@/assets/error.svg" alt="Undraw.co Error Illustration">
      <h2>Sorry, there was an error.</h2>
      <h4 class="grey--text">{{ message }}</h4>
    </v-layout>
  </transition>

</template>

<script>
export default {
  name: 'Error',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

  .illustration {
    margin: 20px 0;
    height: 400px;
    width: auto;
  }

</style>
