// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      '@nuxtjs/supabase',
    'nuxt-chatgpt',
    '@pinia/nuxt',
    'nuxt-mapbox'
  ],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm', // <--
      exclude: ['/', '/onas', '/nastenka-skol', '/register', '/odpo'],
    }
  },
  chatgpt: {
    apiKey: process.env.OPENAI_KEY,
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoibGVlbGVlbGUiLCJhIjoiY2xybHYzZnJlMHdpYjJucXI3Nm1lN3dyaSJ9.Nyo3DwMkdWExjhmgDNIWDQ'
  }
})
