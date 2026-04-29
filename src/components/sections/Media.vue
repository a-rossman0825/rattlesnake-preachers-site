<script lang="ts" setup>
import { ref } from 'vue'
import { imagesArray } from '~/data/imagesArray'

// Array of image paths
const images: string[] = imagesArray

// Reference to the stamps container
const stampsContainer = ref<HTMLDivElement | null>(null)

// Track the current image index
let currentImageIndex = 0

// Limit the number of images on the screen
const maxImages = 30 // Adjust this value based on performance
const stampedImages: HTMLImageElement[] = []

// Track the last mouse position to control stamping frequency
let lastMousePos = { x: 0, y: 0 }

const handleMouseMove = (event: MouseEvent) => {
  if (!stampsContainer.value) return

  // Calculate the distance moved since the last stamp
  const distance = Math.hypot(event.clientX - lastMousePos.x, event.clientY - lastMousePos.y)

  // Only stamp if the mouse has moved more than (x)px
  if (distance > 200) {
    // Change to widen/shorten pixel gap between images (stamp frequency)
    // Update the last mouse position
    lastMousePos = { x: event.clientX, y: event.clientY }

    // Ensure the currentImageIndex is valid
    const imageSrc = images[currentImageIndex] ?? ''

    // Create a new image element
    const img = document.createElement('img')
    img.src = imageSrc
    img.style.position = 'absolute'
    img.style.left = `${event.clientX - 200}px` // Adjusted to center the image horizontally
    img.style.top = `${event.clientY - 200}px` // Adjusted to center the image vertically
    img.style.width = '400px' // Adjust size as needed
    img.style.pointerEvents = 'none' // Prevent interaction with the image
    img.style.opacity = '0'
    img.style.transform = 'scale(0.8)'

    // Append the image to the stamps container
    stampsContainer.value.appendChild(img)

    // Animate the image into view
    requestAnimationFrame(() => {
      img.style.opacity = '1'
      img.style.transform = 'scale(1)'
    })

    // Add the image to the stamped images array
    stampedImages.push(img)

    // Cycle through the image array
    currentImageIndex = (currentImageIndex + 1) % images.length

    // Remove the oldest image if the limit is exceeded
    if (stampedImages.length > maxImages) {
      const oldestImage = stampedImages.shift()
      if (oldestImage) {
        // Animate the removal of the oldest image
        oldestImage.style.opacity = '0'
        oldestImage.style.transform = 'scale(0.8)'
        setTimeout(() => {
          if (stampsContainer.value?.contains(oldestImage)) {
            stampsContainer.value.removeChild(oldestImage)
          }
        }, 20) // duration before "delete" oldestImage (for transition)
      }
    }
  }
}
</script>

<template>
  <section
    class="relative h-screen w-screen overflow-hidden bg-black"
    @mousemove="handleMouseMove"
    aria-label="Interactive section for visual exploration. Images appear as you move your mouse."
  >
    <h1
      class="animate-fadeIn absolute left-10 top-1/2 z-10 -translate-y-1/2 transform text-5xl text-white opacity-0"
    >
      <a
        href="/media"
        aria-label="Go to the gallery page for more visual content"
        class="ms-40 text-white no-underline focus:outline-yellow-500"
      >
        FEAST YOUR EYES
      </a>
    </h1>
    <div
      class="absolute inset-0"
      ref="stampsContainer"
      aria-live="polite"
      aria-label="Images are being stamped as you move your mouse."
    ></div>
  </section>
</template>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 1s forwards;
}
</style>
