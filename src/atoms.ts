import { atom } from 'jotai'

export const selectedItemAtom = atom<any>(null)
export const isLinkLoadedAtom = atom<boolean>(false)
export const linkInstanceAtom = atom<any>(null)
