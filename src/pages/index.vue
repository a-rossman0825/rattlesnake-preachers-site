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
    <Hero class="hero-section page-section" />
    <Media class="media-section page-section" />
    <div class="music-section-wrapper w-full">
      <Music class="music-section page-section" />
    </div>
    <Merch class="merch-section page-section" />
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
