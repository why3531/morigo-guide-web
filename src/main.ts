import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'highlight.js/styles/github-dark.css'
import { inject } from '@vercel/analytics'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-700.css'
import siteConfig from './config/site'

document.title = `${siteConfig.siteName} - ${siteConfig.tagline}`

inject()

createApp(App).mount('#app')
