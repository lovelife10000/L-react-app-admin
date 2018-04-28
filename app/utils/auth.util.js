import Cookies from 'universal-cookie'
const cookie = new Cookies()
import  AppConfig  from '../config/app.config'
let cookieConfig = {
  maxAge:AppConfig.cookie.maxAge,
  httpOnly:AppConfig.cookie.httpOnly
}
if(AppConfig.cookieDomain !== ''){
  cookieConfig = { domain: AppConfig.cookieDomain }
}

export function saveCookie(name,value) {
  cookie.set(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookie.get(name)
}
export function getAllCookies() {
  return cookie.getAll()
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