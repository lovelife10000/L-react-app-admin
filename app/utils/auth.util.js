import Cookies from 'universal-cookie'
const cookie = new Cookies()
import { app } from '../config/app'
let cookieConfig = {}
if(app.cookieDomain !== ''){
  cookieConfig = { domain: app.cookieDomain }
}

export function saveCookie(name,value) {
  cookie.set(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookie.get(name)
}

export function removeCookie(name) {
  cookie.remove(name, cookieConfig)
}

export function signOut() {
  cookie.remove('token', cookieConfig)
}

export function isLogin() {
  return !!cookie.get('token')
}