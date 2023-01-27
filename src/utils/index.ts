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

export type BasePay = {
  amount: string
  period: string
  currency: string
}

export function toMonthlyPay(pay: BasePay) {
  const { period, amount } = pay
  const decimal = Number(amount)

  if (period === 'hourly') {
    return decimal * 20 * 8
  }
  if (period === 'weekly') {
    return decimal * 4
  }
  if (period === 'biweekly') {
    return decimal * 2
  }
  if (period === 'semimonthly') {
    return decimal * 2
  }
  if (period === 'monthly') {
    return decimal
  }
  if (period === 'annual') {
    return decimal / 12
  }
  return decimal
}
