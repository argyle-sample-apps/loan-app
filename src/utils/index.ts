import { deleteCookie } from 'cookies-next'
import fallbackItems from '../fallback.json'

export function capitalizeFirstLetter(word: string) {
  if (!word || !word.length) {
    return null
  }

  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function getFallbackItems() {
  return fallbackItems.map((item) => ({
    id: item.toLowerCase().split(' ').join('-'),
    name: item,
  }))
}

type AuthOpts = {
  headers?: { [id: string]: string }
}

export const getAuthOpts = (params?: AuthOpts) => {
  const authString =
    process.env.ARGYLE_API_KEY + ':' + process.env.ARGYLE_API_SECRET

  const authToken = Buffer.from(authString).toString('base64')

  const options = {
    headers: {
      'Authorization': 'Basic ' + authToken,
      'Content-Type': 'application/json',
      ...params?.headers,
    },
  }
  return options
}

export const clearCookies = () => {
  const cookies = [
    'argyle-x-user-token',
    'argyle-x-user-id',
    'link-item',
    'is-pll-selected',
    'is-pd-open',
    'is-bank-verification-selected',
    'loan-amount',
    'link-item-pd-supported',
    'pd-config',
  ]
  cookies.forEach((cookie) => deleteCookie(cookie))
}
