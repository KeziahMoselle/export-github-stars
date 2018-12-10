<template>
  <v-footer height="auto" color="black">
    <v-layout justify-center wrap>
      <template v-for="link in links">
        <v-btn :key="link.title" :href="link.href" color="white" flat round>
          {{ link.title }}
        </v-btn>
      </template>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      links: [
        {
          title: 'Author',
          href: 'https://github.com/KeziahMoselle'
        },
        {
          title: 'Source Code',
          href: 'https://github.com/KeziahMoselle/export-github-stars'
        },
        {
          title: 'Illustrations',
          href: 'https://undraw.co/illustrations'
        }
      ]
    }
  }
}
</script>
