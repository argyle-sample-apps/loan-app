export interface AccountCallbackPayload {
  accountId: string
  userId: string
  linkItemId: string
}

export interface UserCreatedCallbackPayload {
  userId: string
  userToken: string
}

export interface ErrorCallbackPayload {
  error: string
}

type AccountCallback = (payload: AccountCallbackPayload) => void
type UserCreatedCallback = (payload: UserCreatedCallbackPayload) => void
type UIEventCallback = (payload: any) => void
type ErrorCallback = (payload: ErrorCallbackPayload) => void

export interface ArgyleLinkProps {
  linkKey?: string
  customizationId?: string
  userToken?: string
  linkItems?: string[] | null
  apiHost?: string
  payDistributionConfig?: string | null
  payDistributionItemsOnly?: boolean
  payDistributionUpdateFlow?: boolean
  payDistributionAutoTrigger?: boolean
  onAccountCreated?: AccountCallback
  onAccountConnected?: AccountCallback
  onAccountUpdated?: AccountCallback
  onAccountRemoved?: AccountCallback
  onAccountError?: AccountCallback
  onUserCreated?: UserCreatedCallback
  onPayDistributionSuccess?: AccountCallback
  onPayDistributionError?: AccountCallback
  onError?: ErrorCallback
  onUIEvent?: UIEventCallback
  onExitIntroClicked?: () => void
  onClose?: () => void
  onTokenExpired?: () => void
}
