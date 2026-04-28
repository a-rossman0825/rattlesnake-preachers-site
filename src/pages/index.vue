<script setup lang="ts">
import Footer from '~/components/layout/Footer.vue'
import Hero from '~/components/sections/Hero.vue'
import Media from '~/components/sections/Media.vue'
import Merch from '~/components/sections/Merch.vue'
import Music from '~/components/sections/Music.vue'
import Shows from '~/components/sections/Shows.vue'
</script>

<template>
  <Hero />
  <Media />
  <div class="music-section-wrapper w-full">
    <Music />
  </div>
  <Merch />
  <Shows />
  <Footer />
</template>

<style lang="scss" scoped>
.music-section-wrapper {
  height: 95dvh;
}
</style>
