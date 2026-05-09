import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'highlight.js/styles/github-dark.css'
import siteConfig from './config/site'

document.title = `${siteConfig.siteName} - ${siteConfig.tagline}`

createApp(App).mount('#app')
