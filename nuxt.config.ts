// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  ssr: true,
  nitro: {
    preset: 'static'
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/styles/main.scss']
})
