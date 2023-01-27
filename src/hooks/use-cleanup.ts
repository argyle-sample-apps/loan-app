import { useSetAtom } from 'jotai'
import {
  loanAmountAtom,
  selectedItemAtom,
  selectedItemPdSupportedAtom,
  triggerPdAtom,
  userIdAtom,
} from 'stores/global'
import { deleteCookie } from 'cookies-next'
import { useQueryClient } from '@tanstack/react-query'

export const clearCookies = () => {
  const cookies = ['argyle-x-user-token', 'argyle-x-user-id']

  cookies.forEach((cookie) => deleteCookie(cookie))
}

export const useCleanup = () => {
  const queryClient = useQueryClient()

  const setLoanAmount = useSetAtom(loanAmountAtom)
  const setSelectedItem = useSetAtom(selectedItemAtom)
  const setSelectedItemPdSupported = useSetAtom(selectedItemPdSupportedAtom)
  const setTriggerPd = useSetAtom(triggerPdAtom)
  const setUserId = useSetAtom(userIdAtom)

  return () => {
    setLoanAmount(0)
    setSelectedItem('')
    setSelectedItemPdSupported(false)
    setTriggerPd(false)
    setUserId('')

    queryClient.clear()
    clearCookies()
  }
}
