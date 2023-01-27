import currency from 'currency.js'
import { lightFormat, parse } from 'date-fns'

export const formatPercent = (num: number) => {
  return Math.round(num) + '%'
}

export const formatCurrency = (value: number | string) => {
  return currency(value, { precision: 0 }).format()
}

/* format SSN: XXX-XX-XXX */
export const formatSocialSecurityNumber = (val: string) => {
  if (!val) return val
  const ssn = val.replace(/[^\d]/g, '')
  const ssnLength = ssn.length

  if (ssnLength < 4) return ssn

  if (ssnLength < 6) {
    return `${ssn.slice(0, 3)}-${ssn.slice(3)}`
  }

  return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 8)}`
}

/* date format: MM/DD/YYYY */
export const formatDateString = (val: string) => {
  if (!val) return val
  const date = val.replace(/[^\d]/g, '')
  const dateLength = date.length

  if (dateLength < 3) return date

  if (dateLength < 6) {
    return `${date.slice(0, 2)}/${date.slice(2)}`
  }

  return `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4, 8)}`
}

export const reformatDate = (dateString: string) => {
  const date = parse(dateString, 'yyyy-MM-dd', new Date())

  return lightFormat(date, 'dd/MM/yyyy')
}
