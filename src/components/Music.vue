
<script lang="ts" setup>
import MarqueeBox from './MarqueeBox.vue';

</script>

<template>
  <section class="marquee-wrapper">
    <MarqueeBox phrase="FEAST YOUR EARS" :speed="80">
      <!-- inner slotted content -->
      <div class="content">
        <h2>MUSIC SECTION</h2>
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