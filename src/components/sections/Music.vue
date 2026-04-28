
<script lang="ts" setup>
import AlbumCarousel from '../ui/AlbumCarousel.vue';
import MarqueeBox from '../ui/MarqueeBox.vue';

</script>

<template>
  <section class="marquee-wrapper">
    <MarqueeBox phrase="FEAST YOUR EARS" :speed="80">
      <!-- inner slotted content -->
      <div class="content">
        <AlbumCarousel />
      </div>
    </MarqueeBox>
  </section>
</template>

<style lang="scss" scoped>
.marquee-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>