// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  ssr: true,
  nitro: {
    preset: 'static'
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/styles/main.scss'],
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Anton&family=Anton+SC&display=swap'
        }
      ]
    }
  }, 
  compatibilityDate: '2026-04-21'
}) 
