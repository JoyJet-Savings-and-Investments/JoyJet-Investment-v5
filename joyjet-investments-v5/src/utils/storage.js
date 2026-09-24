const STORAGE_KEY = 'joyjet_v5'
const COOKIE_NAME = 'joyjet_pref'
const COOKIE_DAYS = 365
const THEME_KEY = 'joyjet_theme'

export function loadState(defaults) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch (_) {}
  return structuredClone(defaults)
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) {}
}

export function setCookie(value = 'visited') {
  const expires = new Date()
  expires.setTime(expires.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000)
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

export function getCookie() {
  const m = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'))
  return m ? decodeURIComponent(m[2]) : null
}

export function ensureCookie() {
  if (!getCookie()) {
    setCookie('visited')
    return true
  }
  return false
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'light'
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
  document.documentElement.setAttribute('data-theme', theme)
}
