<template>
  <v-app>
    <navbar></navbar>
    <v-content>
      <card-input></card-input>
    </v-content>
    <v-btn fab small class="btn-top" @click="scrollToTop">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import CardInput from '@/components/CardInput'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    CardInput,
    Footer
  },
  methods: {
    scrollToTop () {
      document.querySelector('.v-toolbar')
        .scrollIntoView({
          behavior: 'smooth'
        })
    }
  }
}
</script>

<style>

  html {
    overflow-y: auto;
  }

  .btn-top {
    position: fixed !important;
    bottom: 64px !important;
    right: 16px !important;
  }

</style>
