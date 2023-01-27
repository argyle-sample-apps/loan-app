import { atom } from 'jotai'

export const linkScriptLoadedAtom = atom(false)
export const isPLLSelectedAtom = atom(false)
export const isAutofillSelectedAtom = atom(false)
export const isBankVerificationSelectedAtom = atom(false)
export const triggerPdAtom = atom(false)
export const loanAmountAtom = atom(0)

export const userIdAtom = atom('')
export const selectedItemAtom = atom('')
export const selectedItemPdSupportedAtom = atom(false)
