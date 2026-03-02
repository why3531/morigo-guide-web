import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import siteConfig from './config/site'

document.title = `${siteConfig.title}${siteConfig.titleHighlight} - ${siteConfig.tagline}`

createApp(App).mount('#app')
