export const API_ROOT = (process.env.NODE_ENV === 'production')
  ? 'https://api.jackhu.top/'
  :'http://admin.lijun1991.com:9001/'

export const CookieDomain = (process.env.NODE_ENV === 'production')
  ? '.jackhu.top'
  : ''