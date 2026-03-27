import config from './app/developer.json'
const siteTitle = `${config.name} | ${config.role}`


/*
 * Nuxt 4 Config File
 Usage: https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  compatibilityDate: '2025-02-28',
  devtools: { enabled: true },
  /**
   * * App Config
   * app config: https://nuxt.com/docs/api/configuration/nuxt-config#app
   * head config: https://nuxt.com/docs/api/configuration/nuxt-config#head
   * meta config: https://nuxt.com/docs/getting-started/seo-meta
   * pageTransition config: https://nuxt.com/docs/getting-started/transitions#transitions
   * TODO: Add more meta tags for SEO
   * TODO: Add tags for social media sharing
   * TODO: Migrate apple-touch-icon config to manifest.json
   */
  app: {
    head: {
      htmlAttrs: {
        lang: 'en', // App language
      },
      title: siteTitle, // App window nav title
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "Hi there, I'm Mert Erbak" },
        { property: 'og:title', content: siteTitle },
        { property: 'og:description', content: "Hi there, I'm Mert Erbak" },
        { property: 'og:image', content: 'demo-share.jpg' },
        { property: 'og:url', content: 'https://merterbak.com/' },
        { name: 'theme-color', content: '#010C15' },
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/icon.jpg' },
        { rel: 'manifest', href: 'pwa/manifest.json' },
        { rel: 'apple-touch-icon', href: '/icon.jpg' },
        // Preload GitHub project images
        { rel: 'preload', as: 'image', href: 'https://opengraph.githubassets.com/1/merterbak/Grok-MCP' },
        { rel: 'preload', as: 'image', href: 'https://opengraph.githubassets.com/1/merterbak/llm-from-scratch' },
        { rel: 'preload', as: 'image', href: 'https://opengraph.githubassets.com/1/merterbak/diffusion-from-scratch' },
        // Preload HuggingFace project images
        { rel: 'preload', as: 'image', href: 'https://cdn-thumbnails.huggingface.co/social-thumbnails/spaces/merterbak/DeepSeek-OCR-Demo.png' },
        { rel: 'preload', as: 'image', href: 'https://cdn-thumbnails.huggingface.co/social-thumbnails/spaces/merterbak/Mistral-OCR.png' },
        { rel: 'preload', as: 'image', href: 'https://cdn-thumbnails.huggingface.co/social-thumbnails/spaces/merterbak/RAG-Llama.png' },
        { rel: 'preload', as: 'image', href: 'https://cdn-thumbnails.huggingface.co/social-thumbnails/spaces/merterbak/gemma-3.png' },
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-FMQYXZ881G', async: true },
        { innerHTML: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-FMQYXZ881G');" },
      ],
    },
  },

  /**
   * * Nuxt 3 Modules
   * Official modules: https://nuxt.com/modules
   */
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  components: {
    dirs: [
      '~/components',
    ],
  },
  
  /**
   * * Tailwind CSS Config
   * Options: https://tailwindcss.nuxt.dev/getting-started/options/
   * Docs: https://tailwindcss.nuxt.dev
   */
  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: true,
    viewer: false,
  },

  /**
   * * Runtime Config (Environment Variables)
   * Usage: https://nuxt.com/docs/guide/going-further/runtime-config
   */
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',

    }
  }
})