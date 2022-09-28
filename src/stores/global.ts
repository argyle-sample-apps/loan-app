import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const linkScriptLoadedAtom = atom(false)

export const sampleData = atomWithStorage('sample-data', {
  income: [],
  hours: [],
  hourly: [],
})
import create, { SetState, GetState } from 'zustand'
import { StoreSlice } from 'stores/utils'
import { persist, devtools } from 'zustand/middleware'

type GeneralVals = {
  userId: string
  userToken: string
  accountIds: string[]
  linkItemIds: string[]
}

type GeneralActions = {
  getAccountId: () => string
  getLinkItemId: () => string
  addAccountId: (id: string) => void
  addLinkItemId: (id: string) => void
  setUser: (id: string, token: string) => void
  setIsOnboarded: (yesNo: boolean) => void
  setFeatureState: (feature: any, isActive: boolean) => void
  reset: () => void
}

type GeneralStore = GeneralActions & GeneralVals

type GlobalStore = GeneralStore

const initialState: GeneralVals = {
  userId: '',
  userToken: '',
  accountIds: [] as string[],
  linkItemIds: [] as string[],
}

const createGeneralStoreSlice: StoreSlice<GeneralStore> = (
  set: SetState<any>,
  get: GetState<any>
) => ({
  ...initialState,
  getAccountId: () => get().accountIds[0] ?? '',
  getLinkItemId: () => get().linkItemIds ?? '',
  addAccountId: (id) =>
    set((state: GeneralStore) => ({ accountIds: [...state.accountIds, id] })),
  addLinkItemId: (id) =>
    set((state: GeneralStore) => ({ linkItemIds: [...state.linkItemIds, id] })),
  setUser: (id, token) => set({ userId: id, userToken: token }),
  setIsOnboarded: (yesNo) => set({ isOnboarded: yesNo }),
  setFeatureState: (feature, isActive) =>
    set((state: GlobalStore) => ({
      [feature]: { ...state[feature], isActive },
    })),
  reset: () => set(store(set, get), true),
})

const store = (set: SetState<any>, get: GetState<any>) => ({
  ...createGeneralStoreSlice(set, get),
})

export const useGlobalStore = create<GlobalStore>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  devtools(
    persist(store, {
      name: 'global',
    })
  )
)
