<script lang="ts" setup>
import { ref, computed } from 'vue'
import { albums } from '~/data/albums'

const featuredAlbums = computed(() => albums.filter((a) => a.featured))

const carouselContainer = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div ref="carouselContainer" class="carousel relative h-full w-full overflow-hidden">
    <div ref="trackRef" class="carousel__track flex h-full w-max">
      <div
        v-for="album in featuredAlbums"
        :key="album.id"
        class="album-card flex flex-shrink-0 items-start gap-20"
      >
        <div class="album-card__wrapper flex flex-col items-center gap-4">
          <div class="album-card__cover aspect-square w-[30vw]">
            <img
              :src="album.albumCover"
              :alt="`Album cover image of ${album.title} by Rattlesnake Preachers.`"
              class="h-full w-full object-cover"
            />
          </div>
          <button class="album-card__button uppercase">listen</button>
        </div>

        <div class="album-card__details">
          <h3 class="album-card__title mb-4 w-[140px] font-body text-5xl uppercase leading-[1.2]">
            {{ album.title }}
          </h3>
          <p class="album-card__date mb-6 w-[190px] font-body font-bold uppercase">
            released: {{ formatDate(album.releaseDate, 'snakeCase') }}
          </p>
          <div class="album-card__description w-[120px] font-body" v-html="album.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel__track {
  gap: 100vw;
  transform: translateX(-153vw);
}
</style>
