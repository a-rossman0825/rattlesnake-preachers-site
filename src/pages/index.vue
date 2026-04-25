<script setup lang="ts">
import Footer from '~/components/Footer.vue';
import Hero from '~/components/Hero.vue';
import Media from '~/components/Media.vue';
import Merch from '~/components/Merch.vue';
import Music from '~/components/Music.vue';
import Shows from '~/components/Shows.vue';

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