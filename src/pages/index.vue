<script setup lang="ts">
import Footer from '~/components/layout/Footer.vue'
import Hero from '~/components/sections/Hero.vue'
import Media from '~/components/sections/Media.vue'
import Merch from '~/components/sections/Merch.vue'
import Music from '~/components/sections/Music.vue'
import Shows from '~/components/sections/Shows.vue'
import { usePageScroll } from '~/composables/usePageScroll'

// Init scroll anims
usePageScroll()
</script>

<template>
  <div class="page-wrapper">
    <Hero class="hero-section mb-[40vh]" />
    <Media class="media-section mt-[20vh]" />
    <div class="music-section music-section-wrapper mt-[20vh] w-full">
      <Music />
    </div>
    <Merch class="merch-section mt-[20vh]" />
    <Shows class="shows-section page-section" />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.music-section-wrapper {
  height: 95dvh;
}

.page-wrapper {
  position: relative;
}
</style>
