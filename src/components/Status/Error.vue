<template>

  <transition name="slide-y-transition" mode="out-in">
    <v-layout column class="text-xs-center">
      <img class="illustration" src="@/assets/error.svg" alt="Undraw.co Error Illustration">
      <h2>Sorry, there was an error.</h2>
      <h4 class="grey--text">{{ errorMessage }}</h4>
    </v-layout>
  </transition>

</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Error,
      required: true
    }
  },
  computed: {
    errorMessage () {
      if (this.error.response) {
        return `${this.error.response.status} - ${this.error.response.statusText}`
      } else {
        console.error(this.error)
        return this.error.message
      }
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
