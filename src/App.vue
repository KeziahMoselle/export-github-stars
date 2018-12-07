<template>
  <v-app>
    <navbar></navbar>
    <v-content>
      <card-input></card-input>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import CardInput from '@/components/CardInput'

export default {
  name: 'App',
  components: {
    Navbar,
    CardInput
  }
}
</script>


