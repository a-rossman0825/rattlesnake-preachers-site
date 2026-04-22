<script lang="ts" setup></script>

<template>
  <section class="relative h-screen w-full overflow-hidden pt-7">
    <video autoplay muted loop playsinline class="absolute inset-0 h-full w-full object-cover">
      <source src="/assets/media/mash24-vid.mp4" type="video/mp4" />
    </video>

    <div class="absolute inset-0 bg-black/40"></div>
    <div class="text-light relative z-10 flex justify-between px-10 pt-5 text-5xl">
      <NuxtLink to="/listen" class="font-display text-5xl font-extrabold uppercase tracking-[0.1em] no-underline">
        listen
      </NuxtLink>
      <a
        href="#"
        class="font-display text-5xl font-extrabold uppercase tracking-[0.1em] no-underline"
        >merch</a
      >
    </div>

    <div class="relative mt-40 flex h-full text-center">
      <h1 class="font-display text-8xl text-9xl uppercase tracking-[.3em] outline-text">
        Rattlesnake Preachers
      </h1>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.outline-text {
  color: transparent;
  -webkit-text-stroke: 2px var(--color-light);
}
</style>
