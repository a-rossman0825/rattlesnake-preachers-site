<script lang="ts" setup>
import { computed } from 'vue'
import { merchItems } from '~/data/MerchItems'
import { usePublicUrl } from '~/utils/publicUrl'

const storeUrl = 'https://placeholder-store-url.com' // TODO - replace when store url is ready
const publicUrl = usePublicUrl()

const merch = computed(() => merchItems.map((item) => ({ ...item, image: publicUrl(item.image) })))

const handleMerchClick = (itemName: string) => {
  // TODO - Route to correct shopify product links
  window.open(`${storeUrl}/${itemName}`, '_blank')
}

const handleStoreClick = () => {
  window.open(storeUrl, '_blank')
}

const ouroborosSrc = publicUrl('/assets/media/ouroboros.png')
</script>

<template>
  <section
    class="merch-section relative flex h-screen w-full flex-col items-center justify-center bg-light"
  >
    <!-- Kaleidoscope background -->
    <div class="kaleidoscope absolute inset-0 z-0 flex items-center justify-center">
      <img
        :src="ouroborosSrc"
        alt="Ouroboros Kaleidoscope"
        class="h-[95vh] w-[95vw] object-cover"
      />
    </div>
    <div class="merch__content relative z-10 flex flex-col items-center gap-8">
      <div class="merch__grid grid grid-cols-4 gap-4">
        <button
          v-for="item in merch"
          :key="item.name"
          @click="handleMerchClick(item.name)"
          class="merch-item h-[400px] cursor-pointer"
        >
          <img
            :src="item.image"
            :alt="`${item.name} merch item`"
            class="h-full w-full object-cover"
          />
        </button>
      </div>
      <a
        href="#"
        @click.prevent="handleStoreClick"
        class="store-link text-2xl font-bold uppercase text-dark"
      >
        FEAST YOUR BODY
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.kaleidoscope {
  img {
    aspect-ratio: 1 / 1;
  }
}

.merch-item {
  aspect-ratio: 2 / 3;

  img {
    display: block;
  }
}
</style>
