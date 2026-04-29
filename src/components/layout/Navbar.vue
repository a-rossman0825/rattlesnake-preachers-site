<script lang="ts" setup>
import { useRoute } from '#vue-router'

const route = useRoute();

const isOuterRoute = (path: string) => {
  const outsideRoutes = ['/', '/shows', '/socials', '/contact', '/subscribe', '/merch'];
  return outsideRoutes.includes(path);
};
</script>

<template>
  <nav
    class="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-light px-2 py-2 font-extrabold uppercase tracking-[0.2em] text-dark"
  >
    <NuxtLink v-if="route.path !== '/shows'" to="/shows" class="w-24">shows</NuxtLink>
    <NuxtLink v-else to="/" class="w-24">close</NuxtLink>
    <NuxtLink v-if="route.path !== '/socials'" to="/socials" class="w-24">socials</NuxtLink>
    <NuxtLink v-else to="/" class="w-24">close</NuxtLink>
    <NuxtLink v-if="!isOuterRoute(route.path)" to="/" class="w-24">close</NuxtLink>
    <NuxtLink v-if="route.path !== '/contact'" to="/contact" class="w-24"> contact </NuxtLink>
    <NuxtLink v-else to="/" class="w-24">close</NuxtLink>
    <NuxtLink v-if="route.path !== '/subscribe'" to="/subscribe" class="w-24 text-end">
      sign up
    </NuxtLink>
    <NuxtLink v-else to="/" class="w-24 text-end">close</NuxtLink>
  </nav>
</template>

<style lang="scss" scoped></style>
