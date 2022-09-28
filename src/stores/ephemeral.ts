import create, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

type EphemeralStoreVals = {
  isLinkScriptLoaded: boolean
  isLinkScriptVisible: boolean
}

type EphemeralActions = {
  confirmLinkIsLoaded: () => void
  setLinkScriptVisible: (isVisible: boolean) => void
}

type EphemeralStore = EphemeralStoreVals & EphemeralActions

const initialState: EphemeralStoreVals = {
  isLinkScriptLoaded: false,
  isLinkScriptVisible: false,
}

const store = (set: SetState<EphemeralStore>) => ({
  ...initialState,
  confirmLinkIsLoaded: () => set({ isLinkScriptLoaded: true }),
  setLinkScriptVisible: (isLinkScriptVisible) => set({ isLinkScriptVisible }),
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const useEphemeralStore = create<EphemeralStore>(devtools(store))
