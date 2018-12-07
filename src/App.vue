<template>
  <v-app>
    <navbar></navbar>
    <v-content>
      <card-input></card-input>
    </v-content>
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
  }
}
</script>


