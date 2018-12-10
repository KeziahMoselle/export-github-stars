<template>
  <v-app v-scroll="toggleBtn">
    <navbar></navbar>
    <v-content>
      <card-input></card-input>
    </v-content>
    <transition name="slide-y-transition" mode="out-in">
      <v-btn
        v-if="toggle"
        @click="scrollToTop"
        class="btn-top"
        fab
        small>
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </transition>
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
  data () {
    return {
      toggle: false
    }
  },
  methods: {
    toggleBtn () {
      const scrollTop = document.documentElement.scrollTop
      scrollTop >= 300 ? this.toggle = true : this.toggle = false
    },
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
