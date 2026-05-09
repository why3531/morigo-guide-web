import siteConfig from '../config/site'

export function getBrandParts() {
  const parts = siteConfig.siteName.trim().split(/\s+/).filter(Boolean)

  return {
    main: parts[0] ?? siteConfig.siteName,
    highlight: parts.slice(1).join(' '),
  }
}
