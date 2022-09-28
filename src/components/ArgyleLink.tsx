declare global {
  interface Window {
    Argyle: any
  }
}

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { CredentialsHints, SamplePasswordButton } from 'views/credentials-hints'
import { useQueryClient } from '@tanstack/react-query'
import { getCookie, setCookie } from 'cookies-next'
import { useEphemeralStore } from 'stores/ephemeral'
import { useGlobalStore } from 'stores/global'
import axios from 'axios'

type ArgyleLinkProps = {
  onClose: () => void
  onLinkInit: (link: any) => void
  payDistributionUpdateFlow?: boolean
  linkItemId?: string | null
  pdConfig?: any
  setLinkItem: (linkItemId: string) => void
}

export function ArgyleLink({
  onClose,
  onLinkInit,
  payDistributionUpdateFlow,
  linkItemId,
  pdConfig,
  setLinkItem,
}: ArgyleLinkProps) {
  const queryClient = useQueryClient()

  const [showHints, setShowHints] = useState(false)
  const [showHintsButton, setShowHintsButton] = useState(false)
  const confirmLinkIsLoaded = useEphemeralStore(
    (state) => state.confirmLinkIsLoaded
  )
  const addAccountId = useGlobalStore((state) => state.addAccountId)
  const addLinkItemId = useGlobalStore((state) => state.addLinkItemId)
  const setUser = useGlobalStore((state) => state.setUser)
  const userToken = useGlobalStore((state) => state.userToken)
  const isLinkLoaded = useEphemeralStore((state) => state.isLinkScriptLoaded)
  const isLinkScriptVisible = useEphemeralStore(
    (state) => state.isLinkScriptVisible
  )

  const handleUIEvent = (event: any) => {
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
  }

  useEffect(() => {
    if (isLinkLoaded) {
      const isPDOpen = payDistributionUpdateFlow && !!getCookie('is-pd-open')

      const payDistributionOptions = isPDOpen
        ? {
            payDistributionConfig: pdConfig,
          }
        : {}

      const link = window.Argyle.create({
        pluginKey: process.env.NEXT_PUBLIC_ARGYLE_LINK_KEY,
        apiHost: process.env.NEXT_PUBLIC_ARGYLE_BASE_URL,
        userToken: userToken || '',
        payDistributionUpdateFlow: isPDOpen,
        ...payDistributionOptions,
        linkItems: linkItemId ? [linkItemId] : [],
        customizationId: payDistributionUpdateFlow
          ? process.env.NEXT_PUBLIC_ARGYLE_CUSTOMIZATION_ID_PLL
          : process.env.NEXT_PUBLIC_ARGYLE_CUSTOMIZATION_ID,
        payDistributionAutoTrigger: true,
        onUserCreated: async ({
          userId,
          userToken,
        }: {
          userId: string
          userToken: string
        }) => {
          setUser(userId, userToken)
        },
        onAccountConnected: async ({
          userId,
          accountId,
          linkItemId,
        }: {
          userId: string
          accountId: string
          linkItemId: string
        }) => {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_ARGYLE_BASE_URL}/link-items/${linkItemId}`
          )
          if (res?.data?.features?.pay_distribution_update?.supported) {
            setCookie('link-item-pd-supported', true)
          }
          setCookie('link-item', linkItemId)
          setLinkItem(linkItemId)
          addAccountId(accountId)
          addLinkItemId(linkItemId)
          queryClient.invalidateQueries(['accounts'])
        },
        onPayDistributionSuccess: () => {
          queryClient.invalidateQueries(['accounts'])
        },
        onUIEvent: handleUIEvent,
        onClose,
      })

      onLinkInit(link)
    }
  }, [userToken, isLinkLoaded, payDistributionUpdateFlow, linkItemId])

  return (
    <>
      <CredentialsHints isOpen={showHints} />
      <SamplePasswordButton
        showHintsButton={showHintsButton}
        showHints={showHints}
        onClick={() => setShowHints(!showHints)}
      />
      {isLinkScriptVisible && (
        <Script
          src="https://plugin.argyle.com/argyle.web.v3.js"
          onLoad={() => confirmLinkIsLoaded()}
        />
      )}
    </>
  )
}
