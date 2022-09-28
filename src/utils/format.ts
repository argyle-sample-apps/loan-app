import currency from 'currency.js'

export function formatPercent(num: number) {
  return Math.round(num) + '%'
}

export function formatCurrency(value: number | string) {
  return currency(value, { precision: 0 }).format()
}
