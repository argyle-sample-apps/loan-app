declare global {
  interface Window {
    Argyle: any
  }
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import { useQueryClient } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { CredentialsHints, SamplePasswordButton } from 'views/credentials-hints'
import { ArgyleLinkProps } from 'models/link-config'
import {
  isPLLSelectedAtom,
  linkScriptLoadedAtom,
  selectedItemAtom,
  selectedItemPdSupportedAtom,
  userIdAtom,
} from 'stores/global'
import axios from 'axios'
import { PD_CONFIG } from 'consts'
import { useCleanup } from 'hooks/use-cleanup'
import { fetchProfileById } from 'hooks/use-profile'
import { fetchEmploymentByUserId } from 'hooks/use-employment'
import { fetchPayAllocationsByUserId } from 'hooks/use-pay-allocation'

type BaseConfig = Pick<
  ArgyleLinkProps,
  | 'customizationId'
  | 'linkKey'
  | 'apiHost'
  | 'onUIEvent'
  | 'onTokenExpired'
  | 'userToken'
>

type ArgyleLinkCustomConfig = Omit<ArgyleLinkProps, keyof BaseConfig>

type ArgyleLinkComponentProps = {
  customConfig: ArgyleLinkCustomConfig
  onLinkInit: (link: any) => void
}

export type LinkInstance = {
  id: string
  link: any
}

const MAX_AGE = { maxAge: 60 * 60 * 24 }

export function ArgyleLink({
  customConfig,
  onLinkInit,
}: ArgyleLinkComponentProps) {
  const router = useRouter()

  const queryClient = useQueryClient()
  const userToken = getCookie('argyle-x-user-token') as string

  const isLinkScriptLoaded = useAtomValue(linkScriptLoadedAtom)
  const isPLLSelected = useAtomValue(isPLLSelectedAtom)
  const setUserId = useSetAtom(userIdAtom)
  const setSelectedItem = useSetAtom(selectedItemAtom)
  const setSelectedItemPdSupported = useSetAtom(selectedItemPdSupportedAtom)

  const cleanup = useCleanup()

  const [showHints, setShowHints] = useState(false)
  const [showHintsButton, setShowHintsButton] = useState(false)

  const handleUIEvent = useCallback((event: any) => {
    switch (event.name) {
      case 'search - opened':
      case 'success - opened':
      case 'pd success - opened':
        setShowHintsButton(false)
        break

      case 'login - opened':
      case 'mfa - opened':
        setShowHintsButton(true)
        break

      case 'link closed':
        setShowHintsButton(false)
        setShowHints(false)
        break

      default:
        break
    }
  }, [])

  const handleExpiredToken = useCallback(() => {
    cleanup()

    router.push('/')
  }, [router, cleanup])

  const baseConfig: BaseConfig = useMemo(() => {
    return {
      customizationId: isPLLSelected
        ? process.env.NEXT_PUBLIC_ARGYLE_CUSTOMIZATION_ID_PLL
        : process.env.NEXT_PUBLIC_ARGYLE_CUSTOMIZATION_ID,
      linkKey: process.env.NEXT_PUBLIC_ARGYLE_LINK_KEY,
      apiHost: process.env.NEXT_PUBLIC_ARGYLE_BASE_URL,
      userToken: userToken || '',
      payDistributionConfig: PD_CONFIG,
      payDistributionAutoTrigger: true,
      onUIEvent: handleUIEvent,
      onTokenExpired: handleExpiredToken,
    }
  }, [handleExpiredToken, handleUIEvent, userToken, isPLLSelected])

  const callbacksConfig = useMemo(() => {
    return {
      onUserCreated: ({ userId, userToken }: any) => {
        setCookie('argyle-x-user-id', userId, MAX_AGE)
        setCookie('argyle-x-user-token', userToken, MAX_AGE)
      },
      onAccountConnected: async ({ userId, linkItemId }: any) => {
        setUserId(userId)
        setSelectedItem(linkItemId)

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ARGYLE_BASE_URL}/link-items/${linkItemId}`
        )
        if (res?.data?.features?.pay_distribution_update?.supported) {
          setSelectedItemPdSupported(true)
        }

        queryClient.prefetchQuery({
          queryKey: ['profile'],
          queryFn: fetchProfileById,
        })
        queryClient.prefetchQuery({
          queryKey: ['pay-allocation'],
          queryFn: fetchPayAllocationsByUserId,
        })
        queryClient.prefetchQuery({
          queryKey: ['employment'],
          queryFn: fetchEmploymentByUserId,
        })
      },
      onAccountUpdated: () => {
        queryClient.invalidateQueries()
      },
      onAccountRemoved: () => {
        queryClient.invalidateQueries()
      },
      onPayDistributionSuccess: () => {
        queryClient.invalidateQueries()
      },
    }
  }, [queryClient, setSelectedItem, setSelectedItemPdSupported, setUserId])

  useEffect(() => {
    if (isLinkScriptLoaded) {
      const link = window.Argyle.create({
        ...baseConfig,
        ...callbacksConfig,
        ...customConfig,
      })

      onLinkInit(link)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLinkScriptLoaded])

  return (
    <>
      <CredentialsHints showHints={showHints} setShowHints={setShowHints} />
      <SamplePasswordButton
        showHintsButton={showHintsButton}
        showHints={showHints}
        onClick={() => setShowHints(!showHints)}
      />
    </>
  )
}
