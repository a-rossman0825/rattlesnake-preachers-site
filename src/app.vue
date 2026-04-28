<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';

</script>

<template>
  <div class="app min-h-screen bg-dark text-light">
    <Navbar />
    <main class="page">
      <NuxtPage />
    </main>
  </div>
</template>
